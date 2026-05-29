# 🧠 automation_core.py — 기술 명세서 및 비즈니스 KPI 정의

## 1. 🎯 프로젝트 개요 (Project Overview)
| 항목 | 내용 |
| :--- | :--- |
| **프로젝트명** | 쇼츠 제작 자동화 프로그램 (`automation_core`) |
| **주요 기능** | YouTube API 연동, 콘텐츠 자산(스크립트/디자인) 처리, 수익화 퍼널 로직 (CTA 타이밍) 통합 |
| **핵심 목표** | **'시스템 오류' 컨셉의 쇼츠 영상이 자동 생성되어, T=10~15초 구간에서 $27 진입 상품 CTA 클릭률 4% 달성** |

## 2. 🛠️ 기술 요구사항 (Technical Requirements)
`automation_core.py` 는 단순 스크립트가 아닌, 비즈니스 로직을 코드로 구현하는 **AI 오케스트레이션 엔진**으로 설계합니다.

### A. YouTube API 연동 모듈 (`youtube_api`)
```python
# 핵심 기능: 업로드 전 콘텐츠 검증 및 자동 업로드 (MVP)
class YouTubeManager:
    def __init__(self, api_key): ...
    
    def fetch_video_stats(self, video_id): 
        """영상별 조회수, 평점, 지속율 데이터 가져오기"""
        
    def upload_shorts(assets_path, title, thumbnail_url):
        """자동화 생성된 쇼츠 업로드 (권장: 테스트 계정 먼저)"""
```

### B. 자산 처리 모듈 (`asset_processor`)
*   **입력**: `Writer` 의 스크립트 (.txt/.md), `Designer` 의 비주얼 명세 (.png/.json)
*   **출력**: 편집된 영상 파일 (.mp4) 또는 로컬 저장소 경로 반환 (외부 편집 툴 연동 시 가능)
*   **로직**: OEA 프로세스 (Observation -> Evaluation -> Action) 흐름 시각화 이미지 자동 배치.

### C. 실행 결과 로그 관리 (`logging_system`)
*   모든 실행이 완료되면 `execution_log.json` 파일 생성.
*   **로그 필드 정의**:
    *   `cta_click_rate`: 실제 클릭률 (초기값 0% → 목표 4%)
    *   `drop_off_rate_pain_point`: Pain Point 구간 이탈율
    *   `watch_time_avg`: 평균 시청 시간

## 3. 📈 비즈니스 KPI 및 로직 정의 (Business KPI & Logic)
코다리가 구현할 코드의 **핵심 변수**는 단순 영상 생성이 아니라, **수익화 퍼널 최적화**입니다. 아래 기준값을 코드 상수에 (`CONSTANTS`) 포함시켜야 합니다.

| 지표명 | 목표치 (Target) | 측정 타이밍 (Timing) | 로직/구현 위치 |
| :--- | :--- | :--- | :--- |
| **Primary KPI: CTA 클릭률** | **≥ 4%** | 영상 재생 시간 T=10~15초 | `youtube_api` 내 광고/링크 클릭 이벤트 연동 또는 랜딩 페이지 접속 로그 분석 |
| **Secondary KPI: 이탈율 감소** | **-15% (기존 대비)** | Pain Point 구간 종료 직후 (`T+2s`) | `asset_processor` 내 시각적 전환(Visual Transition) 로직 최적화 필요 |
| **Tertiary KPI: 평균 시청 시간** | **22~26초 (30초 영상 기준)** | 전체 재생 기간 | `youtube_api` 조회수 및 지속율 데이터 반영 |
| **Price Strategy: 진입 상품** | **$27 USD** | CTA 버튼 텍스트/링크 대상 | `asset_processor` 내 랜딩 페이지 파라미터 (`price=27`) 자동 주입 |

## 4. 📂 파일 구조 및 경로 (File Structure)
코다리가 작업할 절대 경로를 정확히 명시합니다.

```text
j:\workspace\_company\agents\developer\tools/
├── automation_core.py          # 메인 오케스트레이션 엔진
├── youtube_api_wrapper.py      # YouTube API 호출 모듈
├── asset_processor.py          # 자산 (스크립트/디자인) 처리 로직
└── execution_log.json          # 실행 결과 로그 (자동 생성)

j:\workspace\_company\sessions\2026-05-29T07-30/
└── automation_core_spec.md     # 이 명세서 파일
```

## 5. 🚀 개발 우선순위 및 다음 작업 (Next Steps)
1.  **Priority 1**: `automation_core.py` 메인 스크립트 초안 생성 (API 키는 환경 변수로 처리).
2.  **Priority 2**: `$27 진입 상품 가격 전략` 로직을 코드 상수에 반영 (CTA 버튼 텍스트 자동화 포함).
3.  **Priority 3**: 실행 시 `execution_log.json` 에 CTA 클릭률 데이터를 기록하는 모듈 구현.

---
**💼 현빈 비고**: 이 명세서를 바탕으로 `automation_core.py` 를 작성하고, 첫 번째 테스트 영상을 생성하여 실제 CTA 클릭률 데이터를 확보해야 합니다. 데이터 기반의 가격 전략 (Tier B/C 번들) 은 이 초기 단계에서 검증된 후 진행합니다.