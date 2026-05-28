# [FINAL] 수익화 퍼널 - 등록 유도 섹션 기술 사양서 (V2.0)

## 🎯 목표: 학습자 행동 전환 극대화
이 Tech Spec은 랜딩 페이지의 '상품 상세 및 구매 CTA' 영역에 적용됩니다. 단순 디자인 가이드가 아닌, 개발자가 즉시 구현 가능한 인터랙티브 로직 정의입니다.

---

### I. 공통 컴포넌트 사양 (Global CSS Vars)
모든 값은 시스템 변수 기반으로 관리되어야 합니다.
- `--color-cta-primary`: `#E65100` (강조 오렌지 계열, 구매 버튼 색상)
- `--size-hero-padding`: `var(--spacing-xl)` (최소 8rem 패딩 확보)
- `--animation-timing-main`: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (부드러운 EaseInOut 커브 적용)

### II. 섹션 구조: 혜택 강조 및 CTA 영역
#### A. 상품 핵심 가치 소개 모듈 (The Hook)
1.  **로직:** 페이지 스크롤에 반응하여 요소가 단계적으로 나타나는 **'Sticky Reveal Animation'**을 사용합니다.
2.  **구현 지침:**
    *   초기 상태: 모든 혜택 아이콘과 텍스트 블록은 `opacity: 0` 및 `transform: translateY(50px)`로 시작합니다.
    *   트리거: 스크롤 위치가 해당 섹션의 상단 20%에 도달하는 순간 (`Intersection Observer API`), 모든 요소가 동시에 `opacity: 1`과 `translateY(0)`으로 부드럽게 페이드 인 됩니다. (Transition Duration: 0.6s)
    *   **마이크로 인터랙션:** 각 혜택 아이콘에 마우스 오버 시, 해당 텍스트 블록이 *미세하게 확장되는 듯한* (`transform: scale(1.03)`) 효과를 추가하여 상호작용을 유도합니다.

#### B. 가격 및 CTA 모듈 (The Conversion Point)
**[가장 중요 - 로직 집중]** 이 컴포넌트의 기술적 완성도가 수익화 성공률을 좌우합니다.

1.  **가격 애니메이션:** 상품 기본 가격은 스크롤 진입 시, **'0부터 시작하여 목표 금액까지 점진적으로 카운팅되는(Counting Up)'** 효과를 반드시 적용해야 합니다. (JS 라이브러리 활용 권장).
    *   `Initial State`: ₩[0].00
    *   `Action`: 스크롤 진입 시 트리거 -> `setInterval()` 또는 애니메이션 프레임워크로 점진적 증가 (`duration: 1s`).
2.  **CTA 버튼 (Buy Now):**
    *   `Default State`: `--color-cta-primary` 배경, `box-shadow: none`.
    *   `Hover State`: 버튼이 클릭되어야 할 순간임을 인지시키기 위해, **배경색을 10% 더 밝게 변경하고**, 아래에 미세한 빛의 반사 효과 (`box-shadow: inset 0 -3px 0 var(--color-cta-dark);`)를 추가합니다.
    *   `Click/Active State`: 버튼이 눌리는 순간, 배경색을 어둡게 만들고 **'눌림(Depress)'** 애니메이션(`transform: translateY(2px)`)을 구현하여 물리적인 피드백을 줍니다. (Transition Duration: 0.1s).

---