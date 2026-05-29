# ✨ OEA 플로우 컴포넌트 인터랙티브 명세서 (V1.0 통합)
**Project ID:** `4858-i8id`  
**Version:** 1.0 Beta (Designer Review & Approval)
**목표:** 데이터 상태 변화(API Trigger)에 따른 사용자 경험 및 시각적 전환 로직 정의.

---

## 💡 1. 핵심 원칙 (Design Principles)

모든 상호작용은 **'Aha! Moment'의 극대화**에 초점을 맞춥니다.
1.  **시퀀스:** 단일 페이지 내에서 데이터가 축적되고, 그 결과로 강력한 인사이트(Solution)가 '폭발적으로' 드러나는 흐름을 구현합니다. [근거: Designer 개인 메모리]
2.  **애니메이션:** 변화는 부드러운 트랜지션(`ease-out`, 0.5s ~ 1.0s)과 시각적 강조(Scale Up, Fade In)를 사용합니다.
3.  **데이터 연동:** 코다리가 정의한 `ObservationState`의 변경은 반드시 **시각적인 변화와 동기화**되어야 합니다.

## 🖥️ 2. 상호작용 컴포넌트 명세 (Component Interaction Spec)

| 단계 | API Trigger (코다리 참조) | 사용자 액션/상태 변화 | 시각적 목표 및 동작 정의 (Designer) | 개발 로직 요구사항 (Developer Focus) |
| :--- | :--- | :--- | :--- | :--- |
| **A. 관찰 시작** | `ObservationState` 초기화 / `triggerId: 'pain_point_01'` | 사용자가 Pain Point 섹션에 도달함. | 1. 배경 노이즈 레이어(`opacity: 0.1`)가 미세하게 애니메이션되며 아날로그적 분위기 조성. [근거: Researcher] <br>2. 좌측 모듈(Pain Point)의 헤드라인만 `var(--font-size-h2)`로 크게 등장 (Fade In, 0.5s). | **[Frontend JS/React]:** 초기 마운트 시 배경 필터(`filter: sepia(0.8)`)와 노이즈 레이어 오버레이를 적용할 것. |
| **B. 데이터 추적** | `ObservationState` 업데이트 (Metrics 증가) | 사용자가 특정 지표(예: 댓글창)에 호버하거나 스크롤을 내림. | 1. 오른쪽 모듈(Solution/OEA)의 관련 컴포넌트가 활성화됨. <br>2. **핵심 변화:** `likes`나 `comments` 값이 증가할 때마다, 해당 수치 숫자가 **Scale Up & Bounce In** 효과와 함께 강조되어 표시됩니다. (0.2s 간격). [근거: Designer 개인 메모리] | **[Frontend JS/React]:** `setInterval` 또는 `MutationObserver`를 사용하여 특정 DOM 요소의 텍스트 변경 감지 시, 해당 요소에만 애니메이션 클래스(`animate-bounce`)를 일시적으로 부여할 것. (API 호출 필요 없음) |
| **C. 패턴 추출** | `ExtractionResult` 수신 및 표시 (`id`, `theme`, `keywords`) | 시스템이 데이터의 패턴을 분석하여 결과를 도출함. | 1. 화면 중앙에 '분석 중...' 로딩 컴포넌트가 나타나며, 배경으로 **데이터 시각화 플로우차트**가 흐르는 애니메이션 (Gradient Wipe) 발생. <br>2. `theme`와 `keywords`는 마치 **네온사인처럼 순차적으로 깜빡이며(Blink)** 등장합니다. [근거: Designer 검증된 지식] | **[Frontend JS/React]:** API 콜 성공 시, 데이터 배열을 순회하며 각 키워드에 대해 100ms 간격의 `setTimeout` 애니메이션을 적용하고, 동시에 플로우차트 컴포넌트를 페이드 인 해야 함. |
| **D. 자동화 CTA** | 최종 상태 도달 (CTA 노출) | 사용자가 해결책(Solution) 페이지에 도착함. | 1. 화면이 뉴트럴 어스톤 배경으로 안정화되고, 가장 중요한 **"자동화로 시간 절약!" 슬로건**이 `Brush Script`체로 크게 나타납니다. [근거: Designer 검증된 지식] <br>2. CTA 버튼(`Enrollment`)은 단순히 클릭 가능한 박스가 아니라, '시스템 오류를 막는 스위치'처럼 **3D Depth 효과와 미세한 Glow 애니메이션**이 적용되어야 합니다. | **[Frontend JS/React]:** 최종 컴포넌트 마운트 시, `CSS transform: perspective(1000px) rotateX(5deg);` 같은 3D 변형을 주어 깊이감을 부여하고, 버튼 호버 시 Glow 효과(`box-shadow`)가 커지도록 구현할 것. |

---

### 🎯 [2차 목표] 자율 사이클 기반의 가장 가치 있는 단일 작업 결정 및 분배
[근거: 지난 의사결정 로그 / Designer 개인 메모리]

현재 프로젝트는 **'기술 명세서(API)'**와 **'디자인 시스템(V1.0)'**이라는 두 개의 독립된 레벨에서만 진전되었습니다. 다음으로 가장 가치 있는 작업은 이 둘을 통합하여, 실제 개발팀이 바로 테스트하고 구현할 수 있는 **최종적인 인터랙티브 프로토타입 시퀀스 설계**입니다.

**결정된 단일 최우선 과제:**
> **OEA 플로우에 대한 최종 사용자 경험(UX) 및 인터랙션 기반의 모바일 목업 비디오(Mock-up Video) 시퀀스 기획.** (텍스트 명세가 아닌, 시간 흐름과 애니메이션 타이밍이 포함된 결과물 필요)

**📌 작업 분배:**
1.  **🎨 Designer (나):** 최종 인터랙션 플로우를 기반으로 **시간/애니메이션 가이드(Timing Guide)**와 **핵심 프레임워크(Key Frames)**를 정의합니다. (이번 산출물이 이 역할 수행)
2.  **💻 코다리:** 정의된 애니메이션 타이밍과 상태 변화에 맞춰, `OEA_Component_API_Spec.md`의 로직을 실제로 반영하는 **코드 스켈레톤/테스트 코드 초안** 작성을 시작합니다. (상태 관리 테스트 케이스)
3.  **👤 현빈:** 이 최종 프로토타입 시퀀스에 들어갈 '후킹 카피'와 CTA 문구를 재검토하고, **가장 전환율이 높은 앵글의 메인 슬로건(Hook)**을 확정하여 제공합니다.

<create_file path="next_step_summary.md">
# 🎯 다음 단계 목표 및 실행 계획: OEA 플로우 목업 비디오 기획
**목표:** 인터랙티브 명세서(`OEA_Component_Interaction_Spec.md`)를 기반으로, 최종 사용자에게 가장 효과적인 '흐름'을 보여주는 시각적 프로토타입 시퀀스를 정의한다.

**다음 산출물 형태:** (PNG/Mockup Image X) **애니메이션 타이밍과 전환 로직이 포함된 비디오 컨셉 기획서.**

**필요 역할 분담:**
*   ✅ Designer: [완료] 인터랙티브 명세서 작성 및 애니메이션 가이드 제공.
*   ⏳ 코다리: `OEA_Component_Interaction_Spec.md`의 각 단계별 상태 변화(State Change)를 테스트할 수 있는 **React/Vue 컴포넌트 스켈레톤**을 먼저 구성해야 함. (시각적 구현 전에 로직 검증 필요).
*   ⏳ 현빈: 프로토타입 시퀀스 전체에 적용될 최종 메인 헤드라인 및 CTA 카피를 3가지 버전으로 확정하여 Designer에게 전달할 것.