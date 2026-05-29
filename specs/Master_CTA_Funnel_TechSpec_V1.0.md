# 🎯 [최종 통합] CTA / 수익화 퍼널 마스터 기술 사양서 (Master Tech Spec) V1.0`
`## 📌 개요 및 목적`
이 문서는 '진짜 학습 방법' 콘텐츠(OEA Flow) 시청 직후, 사용자가 구매 버튼을 누르는 최종 전환 지점(`CTA`)까지의 모든 인터랙션과 로직을 정의합니다. 단순한 배너가 아닌, **KPI 목표 달성을 위한 상호작용적 사용자 경험 컴포넌트**를 구축하는 것이 목적입니다.

`## 🎯 핵심 KPI 및 목표 상태 (Goal State)`
*   **최종 목표:** $27 USD 상품 등록 유도 (전환율 극대화).
*   **KPI 검증 요소:**
    1.  **시청 지속성 (Retention):** OEA Flow에서 CTA로의 자연스러운 흐름 유지.
    2.  **CTA 클릭률 (CTR):** 최종 구매 유도 섹션의 주목도를 3단계 인터랙션을 통해 극대화.

`## 🖼️ 플로우 구조 정의: [OEA Flow 종료] $\rightarrow$ [Pain Point 상기] $\rightarrow$ [Solution/상품 제시] $\rightarrow$ [CTA 액션]`

`### 1단계: 전환 트리거 (The Transition Trigger)`
*   **Trigger:** OEA 프로세스 설명 마지막 컴포넌트가 페이드 아웃되는 순간 (`setTimeout(0.5s)`).
*   **시각적 변화:** 배경이 뉴트럴 어스톤(`var(--color-bg-primary)`)에서 **짙은 차콜 그레이(`var(--color-text-dark)`)로 급격하게 반전 (Hard Cut)**하며, '잠깐! 이대로 끝낼 수 없습니다.' 라는 훅 문구가 전면 오버레이 됩니다.
*   **애니메이션:** 배경 전환 시 `transition: background-color 0.3s ease-in;` 적용 후, 강한 충격파 같은 느낌의 미세 노이즈 레이어(Visual Noise Overlay)가 1초간 깜빡입니다.

`### 2단계: Pain Point 재상기 및 공감 유도 (The Hooking Module)`
*   **컴포넌트:** '아직도 시간과 노력을 낭비하고 계시진 않나요?' 라는 문구와, 사용자가 겪는 구체적인 어려움(예: "수많은 정보 속에서 핵심을 놓치는 경험")이 애니메이션으로 순차적으로 나열됩니다.
*   **인터랙션:** 각 Pain Point가 **좌측에서 오른쪽으로 타이핑되듯(Typewriter Effect)** 나타나며, 사용자의 시선을 2초 이상 붙잡아 두도록 설계합니다. (CSS/JS 필요: Character-by-Character rendering).
*   **비주얼 요소:** 좌우 구조 분할을 유지하되, 왼쪽 영역에 이 Pain Point가 집중적으로 배치되어 긴장감을 조성합니다.

`### 3단계: 솔루션 제시 및 상품 가치 극대화 (The Reveal)`
*   **전환 로직:** 사용자가 Pain Point를 충분히 인지했을 때(약 5초 경과 후), 화면 중앙 하단에 'OEA 시스템을 완성할 단 하나의 방법'이라는 문구와 함께 **상품의 핵심 이점(Value Proposition)**이 서서히 나타납니다.
*   **컴포넌트:** 상품 상세 정보를 담는 모달 또는 섹션 컴포넌트가 페이드 인 됩니다.
    *   `[Title Card]` : 'OEA 시스템으로 당신의 학습을 자동화하세요.' (Headline Font, 크기: `var(--size-h1)`).
    *   `[Feature List]` : 3가지 핵심 기능(Observe/Extract/Automate)이 체크리스트 형태로 애니메이션되며 나열됩니다. (각 항목은 마우스 오버 시 작은 아이콘 애니메이션 변화 필수).

`### 4단계: 최종 CTA 및 액션 유도 (The Conversion Point)`
*   **핵심 컴포넌트:** 가장 중요한 영역입니다. **'지금 등록하고 학습 시스템을 완성하세요.'** 라는 강력한 문구와 상품 가격/버튼이 배치됩니다.
*   **인터랙션 로직 (⭐KPI Critical⭐):**
    1.  **Initial State:** 버튼은 비활성화 상태(`opacity: 0.5`)로 유지되며, 주변에 미세하게 맥동하는 효과(Pulse Effect)를 주어 주목을 유도합니다. (`animation-name: pulse; animation-duration: 2s;`).
    2.  **Micro-Interaction (Hover):** 사용자가 버튼 위에 마우스를 올리면 (Hover), 배경색이 일시적으로 밝은 크림색(`var(--color-bg-secondary)`)으로 변하고, 타이포그래피가 살짝 커지며(Scale Up 1.05x), **'클릭할 수 있는 상태'임을 강하게 인지**시켜야 합니다.
    3.  **API 연동 지점:** 버튼 클릭 시, 단순히 다음 페이지로 넘어가는 것이 아니라, 간결한 **데이터 로딩 스피너 애니메이션(Loading Spinner)**을 1초간 보여준 후 (기술적 신뢰도 확보), 최종 결제/등록 API 엔드포인트(`api/register_completion`)로 이동합니다.

`## 💡 추가 검증 요청 사항 (To Hyunbin & Kodari)`
*   **현빈:** 이 전환 플로우의 모든 애니메이션 타이밍(특히 Pain Point 재상기 시점)이 **사용자 집중도 피크 시간대(Peak Focus Time)**에 정확히 맞춰져 있는지 비즈니스 관점에서 최종 검증 부탁드립니다. (KPI 근거: 26초 지속 유지).
*   **코다리:** 위 마스터 스펙을 기반으로, CTA 버튼의 상태 변화(`disabled` $\rightarrow$ `hover` $\rightarrow$ `active`)를 처리하는 **CSS/JS 통합 테스트 케이스 3종 세트** 작성을 요청합니다.