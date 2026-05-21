# 📈 System Error Index (SEI) 데이터 피드: 최종 API 스키마 정의서 v3.0

## 📄 개요 및 목적
본 스키마는 콘텐츠의 핵심 서사 구조를 지탱하는 '시간 경과에 따른 시스템적 비효율성(Systemic Inefficiency)'을 정량화하여 시각화하기 위한 표준 데이터 인터페이스를 정의합니다. 단순한 데이터셋이 아닌, **상태 전이(State Transition)** 기반의 Time-Series API 엔드포인트 형태로 설계되었습니다.

**핵심 가치:** 감정적 공감 $\rightarrow$ 시스템 오류 지표 증명 (SEI) $\rightarrow$ 통제력 상실 경고
**개발 목표:** 코다리 에이전트가 이 스키마에 따라 백엔드 데이터를 생성 및 테스트할 수 있도록 API 엔드포인트와 데이터 필드를 정의합니다.

---

## ⚙️ I. API 엔드포인트 설계 (Time-Series Simulation)

| 항목 | 내용 | 비고 |
| :--- | :--- | :--- |
| **엔드포인트** | `/api/v1/sei/simulate` | 시뮬레이션 실행 및 데이터 스트리밍용 |
| **메서드** | `POST` | 초기 조건(Start Time, Initial SEI)을 받아 데이터를 요청함. |
| **요청 본문 (Body)** | `{ "start_time": "YYYY-MM-DDTHH:MM:SSZ", "initial_sei": 10.0, "duration_minutes": 120 }` | 시뮬레이션 시작 시간과 초기 SEI 값을 필수 입력받습니다. |
| **응답 본문 (Response)** | `[ { time: ..., sei: ..., status: ... }, ... ]` | 시간 순서대로 변화하는 상태 변화 배열을 반환합니다. |

---

## 🧱 II. 데이터 스키마 정의 (JSON Structure)

다음은 API의 응답 본문에 사용될 표준 JSON 객체 구조입니다.

```json
{
  "timestamp": "2026-05-XXT14:30:00Z", // [String] 시간 기록 (ISO 8601 Format 필수)
  "sei_value": 15.2,                       // [Float] 현재 시점의 시스템 오류 지표 값 (SEI)
  "status": "NORMAL",                      // [String] 시스템 상태 분류 (ENUM Type)
  "threshold_info": {                     // [Object] 구조적 임계치 관련 정보
    "is_warning_zone": false,             // [Boolean] 경고 구역 진입 여부 (SEI > T1)
    "structural_error_index": 0.75        // [Float] 현재 시간대에 누적된 오류 지표(0~1)
  },
  "narrative_event": {                    // [Object] 스토리텔링 연동 요소 (선택적)
    "trigger": "Daily Routine Start",   // [String] 상태 변화를 유발한 이벤트 (예: 'Task Switching', 'Decision Paralysis')
    "description": "반복되는 일상 패턴으로 인한 초기 비효율성 발생." // [String] 시청자에게 노출될 간결한 설명
  }
}
```

---

## 🔄 III. 핵심 상태 전이 로직 (State Transition & Threshold)

데이터의 설득력을 높이기 위해, SEI 값이 다음 세 가지 **상태(Status)**를 거치며 변화해야 합니다. 이 논리는 개발자가 시뮬레이션 엔진에 구현해야 할 가장 중요한 부분입니다.

### 1. 상태 분류 (ENUM Type: `status`)
| Status | SEI 값 범위 | 의미 및 스토리텔링 연동 | 비주얼 연출 가이드라인 |
| :--- | :--- | :--- | :--- |
| **NORMAL** | $0 \le SEI < 25$ | 초기 단계. 사소한 비효율성 발생. '개인의 노력'으로 해결 가능하다고 착각하는 구간. (진지하고 무표정한 배경) | 안정적인 파란색/회색 계열의 그래프 라인. 낮은 노이즈 레벨. |
| **WARNING** | $25 \le SEI < 80$ | 시스템적 문제 인지 단계. '나만의 방법'으로는 안 되는 구조적 오류 발견. (긴장감 고조) | 주황색 경고 영역 진입. 그래프 라인에 떨림(Jitter) 및 노이즈 효과 추가. **`is_warning_zone: true`** |
| **CRITICAL** | $SEI \ge 80$ | 임계점 돌파, '통제력 상실' 직전의 구조적 오류 증명 구간. (클라이맥스) | 빨간색 경고 영역 폭발. 글리치 노이즈(Glitch Noise), 오버레이 효과, 데이터 파동 시각화 필수. **`status: CRITICAL`** |

### 2. 임계점 정의 및 변화 공식
*   **T1 (경고 임계치):** SEI = 25.0
    *   **의미:** 일상적 비효율성이 시스템적 문제로 인식되는 경계.
    *   **데이터 처리:** 이 지점을 통과하는 순간, `status`가 **WARNING**으로 강제 변경되어야 합니다.
*   **T2 (위기 임계치):** SEI = 80.0
    *   **의미:** 개인 역량만으로는 해결 불가능한 '구조적 시스템 오류'가 명확히 드러나는 지점.
    *   **데이터 처리:** 이 지점을 통과하는 순간, `status`가 **CRITICAL**로 강제 변경되어야 하며, 콘텐츠 클라이맥스 카피(통제력 상실)와 완벽하게 동기화됩니다.

---

## 📂 IV. 테스트용 시뮬레이션 데이터셋 (참조 파일)
개발 테스트를 위해, 이전 작업에서 생성된 구조화된 JSON 데이터를 참고 자료로 사용합니다. 이 데이터는 최종 스키마의 유효성을 검증하는 기초 자산입니다.

**파일 경로:** `j:\workspace\_company\data\system_error_index_simulation.json` (이 파일을 기준으로 필드와 타입을 매핑하여 개발을 진행하십시오.)