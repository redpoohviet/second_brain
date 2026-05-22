# 🛠️ Jinny`s Lab — AutoShorts En V1.0 (System Error) 제작 사양서

**목표:** 스크립트의 메시지(Chaos → System Fix)를 시각적으로 극대화하고, 개발팀이 즉시 구현 가능한 인터랙티브 컴포넌트로 정의한다.
**핵심 테마:** 네온/글리치 (Neon/Glitch) & 아날로그 신뢰감 (Neutral Earth Tone).

---

## 🖼️ 파트 1: 최종 썸네일 디자인 사양서 (Thumbnail Spec)

최대 CTR을 위해, 영상의 **가장 충격적이고 명확한 메시지**를 전면에 배치합니다.
**(사이즈 권고: 1080x1920 px / 비율 9:16)**

### A. 컴포넌트 정의 및 레이아웃 (Mockup View)
*   **배경:** `var(--color-bg-primary)` (#DDC2B9)를 사용하되, 미세한 빈티지 필름 노이즈 오버레이 유지. [근거: Designer 개인 메모리 / Researcher]
*   **구조:** 텍스트와 시각적 충격을 극대화하기 위해 화면의 상단 1/3 지점에 모든 초점을 맞춥니다.

### B. 핵심 요소 상세 사양 (The Hook)
| 컴포넌트 | 내용물 | 스타일 및 효과 | 기술 명세 (CSS Variables) | [근거: Writer / Designer 개인 메모리] |
| :--- | :--- | :--- | :--- | :--- |
| **메인 텍스트** | `SYSTEM ERROR:` | 네온 글리치 효과 적용. 색상: `#FF3366` (강한 핑크/레드). 폰트: *Courier New* 또는 유사 모노 스페이스체. | `--color-error-neon: #FF3366;` <br> `font-family: 'Courier New', monospace;` | 글리치 효과를 통해 시스템적 오류임을 강조. |
| **서브 텍스트** | `TIME_WASTED` | 메인 텍스트 아래에 배치. 글자 간격을 넓게 (Letter Spacing: 5px). | `--color-text-dark: #3A3530;` <br> `font-size: var(--size-h1);` | 주 메시지(`TIME_WASTED`)를 명확히 전달. |
| **시각적 요소** | 글리치 노이즈 오버레이 | 텍스트 주변에 낮은 빈도로 무작위로 발생하는 사각형/수평선형 '깨짐' 효과 (Pixelation). 애니메이션 필요. | `background-image: linear-gradient(to right, transparent 1px, rgba(255,0,0,0.3) 1px); opacity: 0.1;` | 네온/글리치 비주얼 시스템을 상징하는 핵심 요소. [근거: 지난 의사결정 로그] |
| **추가 레이어** | Warning Icon (⚠️) | 화면 좌측 하단에 작게 배치하여 경고의 느낌 부여. | `opacity: 0.8;` | 시각적 강조점 및 시스템 경고 연상 유도. |

---

## 💻 파트 2: 본편 모션 그래픽 기술 명세서 (Motion Tech Spec)

영상은 단순한 슬라이드가 아닌, **'데이터가 로딩되고 오류를 수정하는 과정'**의 상호작용을 시각화합니다. 모든 애니메이션은 `transition-duration: 0.5s;`와 같은 구체적인 타이밍 가이드를 따릅니다.

### A. [Phase 1] Hook & Pain Point (시스템 오염/오류 진단) - 0s ~ 15s
**목표:** 시청자가 현재의 학습 방식에 문제가 있음을 '느끼게' 만드는 것.

| 요소 | 애니메이션 동작 (Action) | 타이밍 / 함수 | 기술적 지시 사항 (Tech Spec) | [근거: Writer] |
| :--- | :--- | :--- | :--- | :--- |
| **배경** | **[0s - 3s]:** 진한 뉴트럴 어스톤 배경 위에, 미세하게 깜빡이는 네온 글리치 레이어 (`#FF3366`)가 지속적으로 노이즈를 발생시킨다. | `animation: glitch-noise 2s infinite steps(1);` | CSS Keyframes 사용 필수. 주파수와 강도는 점진적으로 높아져야 함 (시간 경과에 따른 불안감). |
| **텍스트 (Hook)** | **[0s]:** "SYSTEM ERROR"가 화면 중앙에 강렬하게 '점멸하며 나타난다'. `ERROR 404`는 글리치 효과와 함께 폭발하듯 사라진다. | `animation: glitch-fade 1s ease-out;` <br> `transform: translate(-5px, -5px);` | 네온 글로우(Neon Glow)를 반드시 적용하여 빛의 존재감을 강조한다. [근거: Designer 검증된 지식] |
| **Pain Point Data** | **[3s - 15s]:** '단편적 단어 암기', '같은 실수 반복' 등의 키워드들이 화면을 가로지르는 데이터 패킷처럼 빠르게 지나가며 글리치 노이즈를 유발한다. | `animation: data-stream 2s linear infinite;` <br> `opacity: var(--color-text-dark);` (낮은 투명도로 사용) | **상태 변화:** 키워드가 화면을 통과할 때마다 배경의 네온 노이즈가 순간적으로 증폭(Flash)되었다가 진정되어야 한다. |

### B. [Phase 2] Solution 제시 (OEA 프로세스 적용/시스템 복구) - 15s ~ 30s
**목표:** 혼란스러운 상황을 '명확한 시스템'으로 전환시키며, 해결책의 신뢰도를 높이는 것.

| 요소 | 애니메이션 동작 (Action) | 타이밍 / 함수 | 기술적 지시 사항 (Tech Spec) | [근거: Writer] |
| :--- | :--- | :--- | :--- | :--- |
| **배경 전환** | **[15s]:** 기존의 글리치 노이즈가 급격하게 사라지고, 배경 전체가 깨끗하고 정돈된 `var(--color-bg-secondary)` (밝은 크림색) 톤으로 페이드 아웃/인 된다. | `transition: background-color 0.8s ease-in-out;` | 시스템이 정상화되는 시각적 신호로, **'진정(Calmness)'**을 주는 색상 전환이 중요함. [근거: Designer 검증된 지식] |
| **OEA 프로세스 등장** | `Observe -> Extract -> Automate`가 순차적으로 화면 중앙에 '데이터 로딩'되듯 나타난다. (각 단어는 개별 컴포넌트로 취급) | `transition-delay`: 각 단계마다 0.7초 간격으로 지연되어야 함. <br> `animation: load-data 1s ease-out;` | **핵심:** 단순히 텍스트가 나타나는 것이 아니라, '데이터 블록'이 하단에서 위로 쌓이며(Build-up) 완성되는 애니메이션을 구현한다. [근거: Designer 개인 메모리] |
| **결과 메시지** | `SYSTEM FIXED`라는 초록색 네온 텍스트가 화면 전체를 감싸는 듯한 '패드' 형태로 나타나며 확신감을 준다. | `animation: glow-pulse 1s infinite alternate;` | 녹색(Green)은 성공/정상화의 상징성을 부여해야 한다. (네온 그린 사용 권장). |

### C. [Phase 3] CTA (행동 유도) - 30s ~ 40s
**목표:** 자연스럽게 다음 행동을 유도하며, 브랜드 아이덴티티를 각인시킨다.

| 요소 | 애니메이션 동작 (Action) | 타이밍 / 함수 | 기술적 지시 사항 (Tech Spec) | [근거: Writer] |
| :--- | :--- | :--- | :--- | :--- |
| **CTA 모듈** | 화면 하단에 "구독" 및 "가이드 다운로드" 버튼이 깔끔한 카드 형태로 팝업되어 나타난다. | `opacity: 0` → `1` (페이드 인). <br> `transform: translateY(50px)` → `translateY(0)`. | 이 모듈은 **'클릭 가능한 인터랙티브 컴포넌트'**로 설계되어야 하며, 마우스 오버 시 미세한 네온 글로우 효과가 발생해야 한다. [근거: Designer 개인 메모리] |
| **브랜드 로고** | 배경의 가장 안정적인 위치 (좌측 하단)에 배치되며, 잔잔하게 맥동하는 듯한(Pulsing) 애니메이션을 적용하여 존재감을 유지한다. | `animation: subtle-pulse 5s infinite;` |

---
***[종합 검토 및 실행 지시]***
1.  **자산 통합:** 위 Tech Spec에 따라 제작되는 모든 컴포넌트는 **'CSS 변수 기반의 구조화된 에셋'**으로 관리되어야 합니다. [근거: Designer 검증된 지식]
2.  **개발 우선순위:** 애니메이션 구현 시, 가장 복잡하고 핵심적인 'OEA 프로세스 데이터 로딩/정렬(Phase 2)' 컴포넌트를 최우선 순위로 코다리가 개발해야 합니다.