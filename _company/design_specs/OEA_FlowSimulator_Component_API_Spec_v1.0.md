# 🎨 OEA Flow Simulator: 컴포넌트별 디자인 API 및 상호작용 명세서 v1.0

## 🎯 개요 (Goal)
이 문서는 `Master Tech Spec V3.0`에 정의된 OEA(Observation $\rightarrow$ Extraction $\rightarrow$ Automation) 플로우를 시각화하는 인터랙티브 컴포넌트 세트를 위한 **개발 계약서**입니다. 모든 요소는 정적 이미지가 아닌, 데이터 값 변화와 시간의 흐름에 따른 상호작용을 기본 전제로 합니다.

## ⚙️ 공통 디자인 시스템 변수 (CSS Variables Contract)
모든 컴포넌트는 다음 CSS 변수를 사용하며, 이 규칙은 수정 없이 준수되어야 합니다. [근거: Designer 검증된 지식]

| 속성 | 변수명 | 값 | 설명 |
| :--- | :--- | :--- | :--- |
| 배경색 (Primary) | `--color-bg-primary` | `#DDC2B9` | 메인 섹션의 뉴트럴 어스톤 바탕. |
| 텍스트 색상 | `--color-text-dark` | `#3A3530` | 본문 및 제목 텍스트의 표준 컬러. |
| 강조색 (Error) | `--color-error-trigger` | `rgb(210, 80, 70)` | 시스템 오류 지표가 임계점을 넘었을 때의 경고 색상. |
| 성공/해결색 (Solution)| `--color-solution` | `rgba(52, 180, 140, 0.9)` | OEA 프로세스 완료 단계에서 사용되는 안정적인 녹색 계열. |
| 애니메이션 시간 | `--transition-duration` | `0.6s` | 모든 상태 변화에 적용되는 표준 트랜지션 지속 시간 (부드러운 느낌 유지를 위해). |

## 1️⃣ SystemicErrorIndexComponent API 명세서
**컴포넌트 ID:** `<SystemicErrorIndexComponent />`
**위치:** OEA 플로우의 'Pain Point Trigger' 단계, 시각적 불안감을 극대화하는 핵심 요소.
**목표:** 실시간으로 변동하는 구조적 오류 지표를 직관적인 애니메이션 그래프와 텍스트로 표현합니다.

### A. Props (Input Data) 정의
| Prop 이름 | 타입 | 필수 여부 | 설명 | 예시 값 |
| :--- | :--- | :--- | :--- | :--- |
| `systemErrorIndex` | `number` | O | 현재 구조적 오류 지표 점수 (0~100). | 78.5 |
| `rateOfChange` | `string` | X | 이전 대비 변화율 ('↑ 급증', '↓ 감소'). | '↑ 급증' |
| `isCritical` | `boolean` | O | 오류 지표가 임계점(Threshold)을 넘었는지 여부. | `true` |

### B. State Logic (상태 변화 로직)
1.  **데이터 바인딩:** `systemErrorIndex` 값을 기반으로 내부 그래프의 높이와 색상이 실시간으로 조정됩니다.
2.  **애니메이션 트리거:**
    *   **[INIT] $\rightarrow$ [ACTIVE]:** 컴포넌트가 로드될 때, 지표는 0부터 시작하여 `systemErrorIndex` 값까지 **선형 증가 애니메이션 (Linear Growth Animation)**을 수행해야 합니다. (`transition-duration: 1.2s`).
    *   **[CRITICAL_TRIGGER]:** `isCritical`이 `true`가 되는 순간, 컴포넌트 전체에 강렬한 깜빡임(Flash) 및 배경 색상 변경(`--color-error-trigger`)을 적용합니다. (CSS: `@keyframes flash { ... }`).
3.  **텍스트 변화:** `rateOfChange`가 '급증'일 경우, 폰트 크기(`var(--font-size-h2)`)를 일시적으로 키우고 애니메이션 효과(Scale Up/Down)를 주어 긴장감을 고조시켜야 합니다.

### C. Visual Attributes (시각적 속성 정의)
*   **그래프 형태:** 단순한 막대 그래프가 아닌, **오류 지표의 누적도를 나타내는 '파동형 게이지'** 형태로 디자인합니다.
*   **색상 로직:** 0-30점 구간은 뉴트럴 어스톤 배경 위에 투명도가 높은 회색 라인으로 처리하고, 30점 초과 시부터 에러 트래킹 컬러(노란색 $\rightarrow$ 주황색)로 점진적으로 변화시키고, 80점 이상에서 빨간 계열(`--color-error-trigger`)을 사용합니다.
*   **폰트:** 숫자는 가독성이 가장 높은 **`Courier New` (모노 스페이스)**를 사용하여 '데이터'라는 느낌을 강조해야 합니다.

---

## 2️⃣ TimePassageSimulationGraphComponent API 명세서
**컴포넌트 ID:** `<TimePassageSimulationGraphComponent />`
**위치:** OEA 플로우의 핵심 시퀀스 배경, 시간 경과에 따른 시스템 비효율성을 그래프로 증명합니다.
**목표:** 시간이 흐르면서 구조적 문제(비용/불안감)가 누적되는 과정을 데이터 기반으로 보여줍니다.

### A. Props (Input Data) 정의
| Prop 이름 | 타입 | 필수 여부 | 설명 | 예시 값 |
| :--- | :--- | :--- | :--- | :--- |
| `timeElapsedSeconds` | `number` | O | 시뮬레이션이 시작된 이후 경과한 총 시간 (초). | 3600 |
| `cumulativeCostIndex` | `number` | O | 누적되는 구조적 비용 지표 (Time/Effort Cost Index, TECI). | 125.7 |
| `graphType` | `'linear' \| 'spike'` | O | 그래프의 변화 유형 ('선형 증가' 또는 '특정 사건으로 인한 급격한 증폭'). | `'spike'` |

### B. State Logic (상태 변화 로직)
1.  **데이터 바인딩:** `timeElapsedSeconds`를 X축, `cumulativeCostIndex`를 Y축으로 사용하여 그래프 라인을 그립니다.
2.  **애니메이션 트리거:**
    *   **[INIT] $\rightarrow$ [ACTIVE]:** 시간 경과에 따라 **지연된 애니메이션 (Delayed Animation)**을 적용합니다. 1초가 지날 때마다 X축의 점이 찍히고, 비용 곡선(Line Graph)이 그 점들을 연결하며 부드럽게 그려지는 방식입니다.
    *   **[SPIKE_EVENT]:** `graphType`이 `'spike'`일 경우, 특정 시간대(예: 150초 지점)에 Y축 값이 급격하게 수직으로 치솟는 **'데이터 플래시 효과'**가 발생해야 합니다. 이 부분은 가장 시각적 긴장감이 높은 포인트입니다.
3.  **레이블링:** X축에는 시간 경과를 나타내는 간결한 레이블(예: "0시간", "1시간")을 붙이고, Y축의 주요 구간마다 **'시스템 비용 단위 (SEI)'**라는 명확한 축 설명을 고정해야 합니다.

### C. Visual Attributes (시각적 속성 정의)
*   **라인 스타일:** 라인 자체는 부드러운 `cubic-bezier` 곡선을 사용하되, 중요한 지점(Spike/Peak)에서는 날카로운 각진 변화를 주어 '문제 발생'의 느낌을 강조합니다.
*   **배경 요소:** 그래프 영역 전체에 미세한 **그리드 라인 (Grid Lines)** (`opacity: 0.1`)을 깔아 데이터 분석적인 신뢰감을 높여야 합니다.
*   **컬러 팔레트:** 비용 곡선 자체는 대비가 강한 주황색 계열(Warning Orange)을 사용하고, 축과 배경은 뉴트럴 어스톤의 차분함을 유지합니다.

---

## 3️⃣ OEA_FlowSimulator Container (최상위 컨테이너)
**컴포넌트 ID:** `<OeaFlowSimulator />`
**역할:** 위 두 컴포넌트를 배치하고, 전체 스토리텔링 흐름(Pain Point $\rightarrow$ Solution)을 통제하는 상위 레이아웃.

### A. Props (Input Data) 정의
| Prop 이름 | 타입 | 필수 여부 | 설명 | 예시 값 |
| :--- | :--- | :--- | :--- | :--- |
| `flowProgress` | `number` | O | 현재 시뮬레이션의 전체 진행도 (0.0 ~ 1.0). | 0.65 |
| `currentPhase` | `'PAIN' \| 'TRANSITION' \| 'SOLUTION'` | O | 현재 플로우가 어느 단계에 있는지 정의합니다. | `'SOLUTION'` |

### B. State Logic & Interaction Flow (흐름 제어)
1.  **레이아웃 전환:** `currentPhase` 값에 따라 컴포넌트의 배치와 애니메이션이 달라져야 합니다.
    *   **PAIN Phase:** `<SystemicErrorIndexComponent />`를 화면 좌측에 크고 공격적으로 노출하고, 배경 전체가 어두워지며 불안감을 조성합니다. (전체 `opacity: 0.8` 적용).
    *   **SOLUTION Phase:** 레이아웃이 중앙 집중화되며, 두 컴포넌트가 분리된 '분석' 느낌의 구조로 재배치됩니다. 배경은 밝고 안정적인 뉴트럴 어스톤으로 회복되어야 합니다.
2.  **전환 애니메이션 (Transition):**
    *   **PAIN $\rightarrow$ SOLUTION:** 이 전환이 가장 중요합니다. 마치 **'시스템 리부팅(System Reboot)'**되는 듯한 효과를 주어야 합니다. 화면 전체가 잠시 어두워지거나, 노이즈 필터가 걸리며 부드럽게 원래의 뉴트럴 어스톤 배경으로 돌아오는 애니메이션을 적용해야 합니다. (CSS: `transition-property: background-color, filter;`).

***
**[SUMMARY CHECKLIST FOR DEVELOPER]**

*   ✅ 모든 값은 CSS 변수(`var(--...)`)를 통해 관리되어야 한다. [근거: Designer 검증된 지식]
*   ✅ 애니메이션은 단순한 변화가 아닌 **'데이터의 흐름(Data Flow)'**을 시각화해야 한다. [근거: Designer 개인 메모리]
*   ✅ 모든 컴포넌트 로직은 `Props`와 `State Logic`에 의해 명확하게 정의되어야 하며, 수작업 추측을 배제한다. [근거: Designer 개인 메모리 / 코다 활동]