# 🎨 Jinny's Lab 핵심 컴포넌트 통합 청사진 (Core Component Blueprint) V2.0
## I. 개요 및 재검토된 디자인 목표
*   **목표:** 모든 콘텐츠의 시각적/기술적 일관성 확보 및 개발 구현 용이성 최대화.
*   **핵심 원칙:** 상호작용 시스템 컴포넌트 (Static Image X, Interactive Component O) [근거: Designer 개인 메모리].

## II. 디자인 언어 정의 (Design Language Definition)
### A. 컬러 팔레트 및 CSS 변수 통합 관리
| 역할 | 명칭 | HEX Code | CSS Variable | 용도 | 근거 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Primary BG | 뉴트럴 어스톤 | `#DDC2B9` | `--color-bg-primary` | 전체 배경, 안정감 부여. | [근거: Researcher] |
| Text Dark | 짙은 차콜 그레이 | `#3A3530` | `--color-text-dark` | 본문 및 제목 텍스트. | [근거: Researcher] |
| Secondary BG | 밝은 크림색 | `#F5EFEA` | `--color-bg-secondary` | 정보 블록 구분 영역, 대비 강조. | [근거: Researcher] |
| Accent / CTA | (미정) | TBD | `--color-cta` | Call To Action 버튼 및 하이라이트. | *재검토 필요* |

### B. 타이포그래피 시스템 통합 관리
| 역할 | 폰트명 | 가중치/스타일 | 사용 목적 | [근거: Researcher] |
| :--- | :--- | :--- | :--- | :--- |
| Headline / Hook (H1) | *Brush Script* 또는 유사체 | Regular, Bold | 감성적 연결 유도, 메인 슬로건. | [근거: Writer] |
| Body / System (P) | Pretendard 또는 Noto Sans KR | Regular, SemiBold | OEA 프로세스 설명, 자막의 핵심 정보 전달. | [근거: Researcher] |
| Callout / Detail (Code) | Courier New 등 모노 스페이스체 | Regular | 데이터 레이블, 기술 용어(OEA), 플로우차트 라벨링. | [근거: Tech Spec Focus] |

## III. 핵심 컴포넌트 청사진 (Core Component Blueprint) V2.0
모든 콘텐츠는 다음 3가지 시퀀스를 거치며 구성되어야 하며, 각 단계별 인터랙션 및 기술 사양이 정의됩니다.

### 1️⃣ [컴포넌트 A] 후킹 타이틀 카드 (Hooking Title Card - H-Card)
*   **목표:** 사용자의 Pain Point를 즉각적으로 자극하고 콘텐츠에 몰입하게 만듭니다.
*   **시나리오/사용처:** 영상 시작 0~3초 구간, 블로그 포스트 도입부.
*   **기술 사양 (Tech Spec):**
    *   **배경:** 뉴트럴 어스톤 기반 + 미세한 빈티지 필름 노이즈 오버레이 (`opacity: 0.1` radial-gradient).
    *   **애니메이션:** `Fade In & Scale Up`: H1 텍스트가 화면 중앙에서 좌우로 커지며 나타남 (Duration: 0.4s, Timing Function: ease-out).
    *   **레이아웃:** 상단에 '질문/후회' 키워드(H1)를 크게 배치하고, 하단에는 작고 정제된 모노 스페이스체로 핵심 메시지(`var(--color-text-dark)`)를 제공.

### 2️⃣ [컴포넌트 B] 프로세스 설명 시퀀스 (Process Explanation Flow - P-Flow)
*   **목표:** 복잡한 개념(OEA 등)을 구조화된 시스템 과정으로 이해시킵니다.
*   **시나리오/사용처:** 영상의 메인 강의 구간, 웹페이지 플로우차트 섹션.
*   **기술 사양 (Tech Spec):**
    *   **구조:** 좌우 분할 레이아웃 유지 (Left: Pain Point Trigger / Right: Solution Flow).
    *   **상호작용:** **Step-by-Step Reveal (핵심)**: 각 단계(Observe -> Extract -> Automate)는 마우스 오버 또는 스크롤 시에만 내용이 페이드 인 되도록 구현합니다. (`opacity: 0` -> `opacity: 1`, Transition: 0.6s).
    *   **요소:** 플로우차트 연결선은 단순한 선이 아닌, 데이터 흐름을 암시하는 **애니메이션 경로(Animated Path)**를 사용해야 합니다.

### 3️⃣ [컴포넌트 C] 최종 CTA 컴포넌트 (Call To Action - CTA)
*   **목표:** 시청자의 행동 변화를 유도하고 트래픽 목표 KPI 달성을 극대화합니다.
*   **시나리오/사용처:** 영상 후반부, 모든 콘텐츠의 결론 부분.
*   **기술 사양 (Tech Spec):**
    *   **노출 로직:** @10~15초 구간 감지 시 자동 노출되어야 합니다 [근거: 코다리 활동].
    *   **디자인:** `var(--color-bg-secondary)`의 배경 위에, 대비되는 색상 (`--color-cta` - 추후 확정)의 버튼을 배치합니다.
    *   **애니메이션:** 단순 노출이 아닌, **'Pulse Effect'**를 통해 시각적 주의 집중(Attention Grabber) 효과를 부여해야 합니다 (반복적인 Scale Up/Down 애니메이션).

## IV. 다음 단계 및 액션 아이템
1.  CTA의 `var(--color-cta)` 색상 최종 확정: 마케팅 목표 KPI 달성도를 고려하여, 기존 어스톤 계열과 대비되면서 신뢰감을 주는 원색을 선정해야 함. (Leo/Researcher 협업 필요)
2.  A/B 테스트용 썸네일 컨셉 3안에 대한 기술적 사양(Size/Layout Grid) 최종 확정.