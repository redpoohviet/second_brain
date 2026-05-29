# 📊 자동화 로직 KPI 측정 및 로그 시스템 명세서

## 1. 목적 (Objective)
자동화 프로그램이 수집한 사용자 행동 데이터를 기반으로, **Primary KPI ($27 CTA Click Rate ≥ 4%)** 를 포함한 핵심 비즈니스 지표를 실시간으로 모니터링하고 최적화할 수 있는 데이터 파이프라인을 구축합니다.

## 2. 핵심 KPI 지표 정의 (KPI Definition)
코다리 개발자가 구현해야 할 측정 항목은 다음과 같습니다.

| 우선순위 | KPI 명칭 | 목표치 | 로그 필드 매핑 필요 항목 |
| :--- | :--- | :--- | :--- |
| **Primary** | **$27 CTA Click Rate (CTR)** | **≥ 4%** | `event_type` (view, cta_click), `variant_id`, `timestamp`, `user_location` |
| **Secondary** | **Pain Point 구간 이탈률 (Drop-off)** | **기존 대비 -15%** | `segment_tag` (Pain_Point_Max), `session_duration`, `exit_event` |
| **Tertiary** | **Avg Watch Time** | **22~26 초 (총 30s 기준)** | `start_time`, `end_time`, `video_id` |

## 3. 로그 데이터 구조 (Log Data Schema)
Python 객체 (Dict 또는 Pandas DataFrame Row) 로 처리 가능한 필드 명세를 정의합니다.

```python
import json
from datetime import datetime

class KPIEventLog:
    def __init__(self):
        self.event_id = "uuid-v4"  # 고유 식별자
        self.timestamp = datetime.utcnow().isoformat()
        self.user_segment = None   # 예: 'Pain_Point_Max', 'Awareness'
        self.video_duration = 30.0 # 초 (동일 영상 기준)
        self.action_type = "view" | "cta_click" | "exit"
        self.cta_variant = "$27_Enterance" 
        self.user_location = None   # API 에서 가져온 지역 정보
        self.source_referral = "youtube_shorts"
        
    def serialize(self):
        return {
            "event_id": self.event_id,
            "timestamp": self.timestamp,
            "segment_tag": self.user_segment,
            "duration_seconds": self.video_duration,
            "action_type": self.action_type,
            "variant_id": self.cta_variant,
            "location_code": self.user_location,
            "source": self.source_referral
        }

# 예시 로그 데이터 (코다리가 수집해야 할 형태)
sample_log = {
    "event_id": "e-29052023-8a1b",
    "timestamp": "2026-05-29T08:45:12.345Z",
    "segment_tag": "Pain_Point_Max", 
    "duration_seconds": 12.5,
    "action_type": "cta_click",
    "variant_id": "$27_Enterance",
    "location_code": "VN_Hanoi"
}
```

## 4. API 연동 명세 (API Integration Specification)
실시간 데이터 수집을 위해 외부 분석 도구 (Google Analytics 4,自建 DB 등) 로 데이터를 전송하는 API 구조입니다. 현재 PayPal 과는 무관하므로 내부 로그 또는 외부 분석 툴용 인바운드 인터페이스로 설정합니다.

### 4.1 이벤트 송신 엔드포인트 (Inbound Event Stream)
코다리가 구현할 `logger.py` 모듈 내 함수 명세.

```python
# 파일: logger.py

def send_kpi_event(event_data):
    """
    자동화 프로그램이 발생하는 사용자 행동을 분석 서버로 전송
    
    Args:
        event_data (dict): 3-2 에서 정의된 KPIEventLog 객체의 dict 형태 데이터
    Returns:
        bool: 전송 성공 여부
    """
    
    # [구현 로직]
    # 1. 데이터 검증 (필수 필드 누락 방지)
    required_fields = ["timestamp", "action_type", "variant_id"]
    if not all(field in event_data for field in required_fields):
        return False
        
    # 2. API 호출 (예시: POST /events/ingest)
    # 실제 시스템에 따라 URL 및 인증 헤더 수정 필요
    payload = {
        "event": event_data,
        "source_app": "automation_core",
        "version": "1.0"
    }
    
    try:
        import requests
        response = requests.post(
            "https://your-analytics-api.com/ingest", 
            json=payload, 
            timeout=5
        )
        return response.status_code == 200
    except Exception as e:
        # 에러 로깅 (필수)
        print(f"[KPI Logger Error] {e}")
        return False

# [테스트용 인메모리 저장소 - 코다리가 초기 테스트용으로 사용]
def save_local_debug(event_data):
    """코다리가 로컬 디버깅 및 개발 중 KPI 가 제대로 잡히는지 확인을 위해 로컬 파일에 쓰기"""
    import json
    from datetime import datetime
    log_file = "j:/workspace/_company/logs/kpi_events.jsonl"
    
    with open(log_file, "a", encoding="utf-8") as f:
        # 줄바꿈 포함 JSON Lines 포맷 저장
        f.write(json.dumps(event_data) + "\n")
```

## 5. 데이터 처리 및 분석 파이프라인 (Data Pipeline)
수집된 로그 데이터를 기반으로 KPI 를 계산하는 로직 명세입니다.

### 5.1 이벤트 집계 주기 (Aggregation Interval)
- **단위:** 24 시간 / 7 일 / 30 일
- **최소 단위:** 실시간 스트림 -> 1 분 평균치

### 5.2 CTA 클릭률 계산 공식 (Primary KPI Algorithm)
$$CTR = \frac{\text{Count(Action="cta_click")}}{\text{Count(Video_Started)}} \times 100\%$$
- **필터 조건:** `segment_tag` = 'Pain_Point_Max' 또는 `variant_id` = '$27_Enterance'

### 5.3 이탈률 계산 공식 (Secondary KPI Algorithm)
$$Drop-off Rate = \frac{\text{Count(Event="exit") in Segment}}{\text{Total Events in Segment}}$$

## 6. 개발 우선순위 및 리소스 할당
1.  **우선 작업:** `logger.py` 파일 생성 및 로컬 저장 기능 (`save_local_debug`) 구현 (개발 환경 안정화).
2.  **다음 단계:** 실제 분석 서버 API 연동 코드 작성.
3.  **검증:** 코다리가 구현한 로그 시스템에 위 KPI 공식이 적용되어 정확한 값이 산출되는지 테스트.

---
💼 현빈: [근거: 현빈 개인 메모리 - Primary/Secondary/Tertiary KPI 정의 (2026-05-28)]