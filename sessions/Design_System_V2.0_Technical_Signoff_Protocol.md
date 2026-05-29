# ⚙️ Design System V2.0 최종 기술 검토 및 안정성 프로토콜 (Designer & Kodari Joint Protocol)
## 📝 목표
개발팀의 통합 테스트 결과(오류 로그 포함)를 바탕으로, 모든 컴포넌트가 디자인 의도와 **동일한 상태 변화 로직**을 갖추었는지 검증하고, 수정이 필요한 부분을 구체적인 코드 레벨로 정의한다.

---
## 📂 Part 1: 공통 환경 및 구조 검토 (Global Check)

### 1. 컬러/타이포그래피 변수 확인
*   **점검 항목:** 모든 컴포넌트가 하드코딩된 색상이나 크기를 사용하고 있지는 않은지?
*   **필수 체크:** 모든 색상과 크기는 CSS Custom Properties (CSS 변수)를 통해 관리되어야 합니다. (`var(--color-bg-primary)`, `var(--size-h1)` 등).
*   **오류 발생 시 수정 요청:** 만약 특정 컴포넌트가 하드코딩된 `#3A3530`을 사용한다면, 이를 즉시 `--color-text-dark`로 교체해야 합니다.

### 2. 애니메이션 타이밍 가이드 (Timing Consistency)
*   **점검 항목:** 전체적인 콘텐츠 흐름(Flow)에서 발생하는 전환 효과(Transition)의 속도와 감속 곡선(Easing Function)이 일관적인가?
*   **필수 체크:** 모든 페이드 인/아웃, 슬라이드 등은 `transition-duration: 0.5s;` 및 `ease-out`을 기본으로 적용하여 안정감을 유지해야 합니다. (예외 케이스는 별도 명시).

---
## 🧩 Part 2: 핵심 인터랙티브 컴포넌트 검증 (Component Specific Check)

### A. 후킹 타이틀 카드 (Hooking Title Card)
| 기능/상태 | 디자인 의도 (Goal) | 개발 요구 사항 (Tech Spec) | 테스트 실패 시 예상 오류 로그 & 수정 요청 |
| :--- | :--- | :--- | :--- |
| **로딩 인 (Initial State)** | `Brush Script` 폰트로 제목이 부드럽게 나타남. | `opacity: 0`에서 시작하여 `transition-duration: 0.3s;` 후 `opacity: 1`로 페이드인 되어야 함. | **[오류 유형]** 타이밍 누락 (Instant appearance).<br>**[수정 요청]** CSS Transition 속성을 명시적으로 추가하고, JavaScript의 `setTimeout`을 이용해 애니메이션 시작 시점을 트리거해야 합니다. |
| **호버 상태 (Hover State)** | 배경에 미세한 텍스트 패턴이 나타나며 강조됨. | `:hover` pseudo-class를 사용하여 백그라운드 레이어가 오버레이되고, 동시에 `transform: scale(1.02)`의 부드러운 확대 효과가 적용되어야 함. | **[오류 유형]** CSS 전용 속성 사용 오류. (e.g., JS에서 처리 시도).<br>**[수정 요청]** 순수한 CSS만으로 구현 가능한지 재검토하고, 가능하다면 `@keyframes`를 사용하여 루프 애니메이션을 적용합니다. |

### B. OEA 프로세스 플로우차트 컴포넌트
| 기능/상태 | 디자인 의도 (Goal) | 개발 요구 사항 (Tech Spec) | 테스트 실패 시 예상 오류 로그 & 수정 요청 |
| :--- | :--- | :--- | :--- |
| **단계 활성화 (Active State)** | 마우스 오버 시, 해당 단계의 박스가 미세하게 떠오르고(Lift), 연결선이 밝게 강조됨. | 1. `transform: translateY(-5px)`를 적용하고, `<span class="active-border">`로 경계선을 추가해야 함.<br>2. JS 이벤트 리스너가 `:hover` 상태를 감지하여 클래스를 토글(Toggle)해야 함. | **[오류 유형]** 지연 시간 문제 (Lagging Effect).<br>**[수정 요청]** `transition-delay: 0.1s;` 등을 적용하여 애니메이션의 시작점과 끝점을 명확히 분리하고, 성능 최적화를 위해 리플로우(Reflow)를 최소화하는 방법을 검토해야 합니다. |
| **데이터 로딩 시퀀스 (Data Flow)** | 다음 단계로 넘어가기 전, 데이터가 점진적으로 채워지는 효과 (점-선 연결). | `<canvas>` API 또는 SVG의 Stroke-dasharray/offset 속성을 이용하여 '채워지는' 애니메이션을 구현해야 합니다. 단순한 `width` 변화로는 불가능함. | **[오류 유형]** 로직 오류 (Logic Failure).<br>**[수정 요청]** 코다리님은 해당 시퀀스를 SVG 기반으로 재구성하고, 자바스크립트가 시간에 따라 속성 값을 업데이트하는 방식으로 구현해야 합니다. |

---
## ✅ Part 3: 최종 개발 체크리스트 (Final Sign-off Checklist)

개발팀이 이 체크리스트를 통과하지 못하면 다음 단계로 넘어갈 수 없습니다. 각 항목에 대해 **PASS/FAIL**을 명확히 기록하고, FAIL 시에는 반드시 수정 코드 스니펫(Code Snippet)을 첨부해야 합니다.
1. [ ] 모든 애니메이션은 `transition-timing-function`이 정의되어 있는가? (예: `cubic-bezier(...)`)
2. [ ] 컴포넌트의 크기 변화는 픽셀 단위가 아닌, 비율 기반(`vw`/`vh` 또는 CSS 변수)으로 관리되는가?
3. [ ] JS 이벤트 리스너는 성능 저하를 일으키지 않도록 `event.preventDefault()` 및 효율적인 DOM 조작을 사용했는가?