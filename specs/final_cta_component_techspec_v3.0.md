# 🚀 CTA 컴포넌트 최종 인터랙티브 기술 사양서 (V3.0)
## 1. 개요 및 목표 [Goal]
*   **목표:** 사용자가 Pain Point를 자각하고 Solution을 인지한 시점에, 행동 유도(CTA) 버튼의 클릭률(CTR)을 극대화하는 인터랙티브 컴포넌트를 구현한다. (KPI 연동 최우선)
*   **활용 범위:** 랜딩 페이지 최종 등록 섹션 및 영상 내 마스터 CTA 카드.
*   **핵심 원칙:** 모든 상태 변화는 CSS 변수와 JS 이벤트 리스너 기반으로 동작해야 하며, 애니메이션은 부드러운 가속도(ease-out)를 유지한다.

## 2. 디자인 시스템 참조 [Reference]
*   **Primary Color:** `--color-primary` (액션 유발색 - 예: 진한 오렌지 계열).
*   **Background:** `--color-bg-secondary` (#F5EFEA, 크림색)를 기본 배경으로 사용하며, CTA 섹션은 미세한 노이즈 레이어를 적용한다.
*   **Typography:** Headline는 *Brush Script*, Body/System은 *Pretendard*.

## 3. 컴포넌트별 상세 인터랙티브 명세 [Tech Spec Detail]

### A. 기본 상태 (Default State)
| 요소 | 설명 | CSS 변수 / 값 | JS 이벤트 리스너 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **✅ CTA 버튼 (최종 승인)** | '지금 바로 시작하기' 텍스트, 직사각형 형태. | `background-color: var(--color-primary);` <br> `var(--padding): 16px;` | None (Initial Load) | 노출 시 Fade In 애니메이션 필수. |
| **설명 문구** | '더 이상 시간 낭비하지 마세요.' 등 Pain Point 강조 문구. | `--color-text-dark`: `#3A3530`; <br> `var(--font-size): 18px;` | None (Initial Load) | 좌우 구조 분할의 핵심 메시지 배치. |

### B. 마우스 오버 상태 (Hover State: `:hover`)
| 요소 | 동작 정의 | CSS/JS 로직 | 애니메이션 타이밍 가이드 | 검증 포인트 |
| :--- | :--- | :--- | :--- | :--- |
| **✅ CTA 버튼 (최종 승인)** | 1. 배경색이 미세하게 어두워지면서 깊이가 느껴짐 (Shadow Effect). <br> 2. 크기가 X축으로 미세하게 확장됨 (Scale Up). | `transform: scale(1.03);` <br> `background-color: var(--color-primary-dark);` <br> `box-shadow: 0 4px 15px rgba(0,0,0,0.2);` | `transition: all 0.3s ease-out;` | **필수:** `:hover` 시점에 애니메이션이 끊기지 않도록 부드러워야 함. |
| **설명 문구** | (변화 없음) | N/A | N/A | 사용자의 주의를 CTA에 집중시키기 위해 배경 변화는 자제. |

### C. 클릭 활성화 상태 (Active State: `:active` / `onClick`)
| 요소 | 동작 정의 | CSS/JS 로직 | 애니메이션 타이밍 가이드 | 검증 포인트 |
| :--- | :--- | :--- | :--- | :--- |
| **✅ CTA 버튼 (최종 승인)** | 1. 즉각적인 '눌림' 효과 (Depressed Look). <br> 2. 배경색이 가장 진하게 변하며, 그림자(Shadow)가 사라지거나 역방향으로 움직임. | `transform: scale(0.98);` <br> `box-shadow: none;` <br> `filter: brightness(0.9);` | `transition: all 0.1s ease-out;` | **핵심:** 물리적인 버튼을 누르는 듯한 느낌이 가장 중요하며, 즉각성이 생명임. |
| **JS 로직** | 클릭 시 (onClick): CTA가 비활성화(Disabled)되고, 다음 단계로의 페이지 전환 혹은 모달 호출이 시작되어야 함. | `button.disabled = true;` <br> `setTimeout(() => { window.location.href = '/enroll'; }, 500);` | N/A | **필수:** 비활성화 후 일정 시간 동안 재클릭 방지 로직 필수. |

## 4. 추가 검토 및 ➡️ 코다리: 기술 검증 및 구현 우선순위 지정 필요 [Action Items for Developer]
1.  **CSS 변수 통합 확인:** 모든 색상, 크기 값은 반드시 `var(--...)` 형태로 정의되어야 합니다.
2.  **JS State Management:** CTA의 `:disabled` 상태는 단순히 비활성화되는 것을 넘어, 사용자에게 '잠시만 기다려 주세요'와 같은 피드백(Loading Spinner)을 시각적으로 제공해야 합니다. (이 과정에서 배경색 변화가 필요할 수 있음).