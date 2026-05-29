# 🎨 Jinny's Lab V2.0 디자인 시스템 - 최종 개발 핸드오프 키트 (Design-to-Code Handoff Kit)

**작성 목적:** 모든 콘텐츠 에셋(썸네일, 인트로 카드, 웹 컴포넌트 등)을 정적인 이미지가 아닌, 코딩 가능한 '상태 변화 기반 인터랙티브 시스템'으로 개발팀에 전달하고 통합 검증하는 것이 목표입니다. (V2.0 최종 버전).
**기준 파일:** sessions/2026-05-29T17-41/designer.md 및 Master_Video_Flow_Spec_V3.0.md

---

## I. 핵심 컴포넌트 인벤토리 (Component Inventory & Variable Definition)

| 컴포넌트 이름 | 기능/역할 | 사용 영역 | CSS 변수 매핑 | 필수 스펙 정의 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary BG** | 기본 배경 톤 (아날로그 신뢰감). | 모든 에셋 | `--color-bg-primary` (`#DDC2B9`) | `background: var(--color-bg-primary); opacity: 0.9;` |
| **Text Dark** | 본문/제목 텍스트 기본색. | 제목, 설명 자막 | `--color-text-dark` (`#3A3530`) | 가독성 확보를 위해 `letter-spacing: -0.02em;` 적용 권장. |
| **OEA 플로우 화살표** | 프로세스 흐름 연결 (상태 변화 유도). | 웹, 인트로 카드 | `--color-accent-flow` (`#B87333`) | `border-radius: 50%; transition: all 0.3s ease;` (마우스 오버 시 크기/색상 변경 필수) |
| **Hooking Title Card** | 시작부 후킹 자막 영역. | 쇼츠, 릴스, 인트로 | `--color-hook-bg` (`#F5EFEA`) | `font-family: 'Brush Script', cursive;` / 애니메이션: Fade In + Scale Up (0.2s). |
| **Info Block** | 핵심 지식/기술 용어 설명 영역. | 웹, 쇼츠 자막 | `--color-bg-secondary` (`#F5EFEA`) | `padding: var(--size-lg); border-left: 4px solid var(--color-accent-flow);` (강조 경계선 필수) |
| **Module Separator** | 좌우 구조 분할 및 섹션 구분. | 웹, 인트로 카드 | `--color-border-sep` (`#E0D3C1`) | `opacity: 0.8; height: var(--size-sm);` (미세한 노이즈/선 그라디언트 처리) |

## II. 인터랙션 플로우 브리프 (Interactive Flow Blueprint - State Change Focus)

모든 에셋은 **[State A] → [Transition Logic] → [State B]**의 흐름을 갖습니다. 정지 이미지는 허용되지 않습니다.

### 1. 후킹 타이틀 카드 (Hooking Title Card)
*   **목표:** 시청자의 주의를 즉시 사로잡고, 문제 인식(Pain Point Trigger)에 집중시킨다.
*   **State A (초기):** 화면 전체가 뉴트럴 어스톤 배경 위에 미세한 노이즈 레이어만 존재. 타이틀 텍스트는 투명도 0%로 숨겨져 있다.
*   **Transition Logic:**
    1.  (T=0s) 노이즈 필터 효과 (Radial Gradient, opacity: 0.1)가 서서히 증가하며 배경을 채운다. (`transition-duration: 0.5s;`)
    2.  (T=0.2s) 메인 타이틀(`var(--size-h1)` 크기)이 화면 중앙에서 **Scale Up (1.0 → 1.1)** 되며 등장한다. (Ease Out).
    3.  (T=0.4s) 보조 텍스트가 하단에서 위로 슬라이드 인 (`transform: translateY(20px)` -> `translateY(0)`).
*   **State B (완료):** 타이틀과 부가 설명이 명확하게 정착된 상태.

### 2. OEA 프로세스 플로우차트 (Observe → Extract → Automate)
*   **목표:** 복잡한 과정을 단순하고 신뢰성 있게 보여준다.
*   **Interaction Rule:** 사용자가 마우스(또는 화면이 스크롤되는 위치)가 특정 컴포넌트 근처를 지날 때, 해당 요소의 **'활성화 상태(Active State)'**로 변해야 합니다.
    *   **Observe Module (좌측):** 커서 진입 시, 배경색이 `--color-bg-primary`에서 `#C4B09A`로 밝게 변화하며 경계선(`border`)에 약한 Glow 효과가 추가된다.
    *   **Extract/Automate Module (우측):** 플로우 화살표(OEA)를 따라 커서가 이동할 때, 화살표 자체가 **데이터 로딩 애니메이션(Dot-by-dot path animation)**을 거치며 다음 단계로 연결되는 시각적 피드백을 제공한다.
*   **Technical Requirement:** 모든 컴포넌트는 `display: flex;`를 기본으로 사용하며, 레이아웃은 반응형 그리드를 따르도록 코딩해야 합니다.

## III. 플랫폼 적응성 매트릭스 (Cross-Platform Adaptability Matrix)

| 에셋 종류 | 웹 프로토타입 (16:9) | 유튜브 쇼츠/릴스 (9:16) | 조정 규칙 및 주의 사항 |
| :--- | :--- | :--- | :--- |
| **전체 레이아웃** | 좌우 3단 구조 유지. 넓은 여백 활용 가능. | 상하 2~3단 구조로 수직 스태킹(Stacking) 필수. | **절대 금지:** 좌측-우측 분할 레이아웃을 그대로 사용하면 상하단의 중요 정보가 잘릴 위험이 크므로, 핵심 메시지를 중심으로 재배치해야 함. |
| **타이포그래피** | `--size-h1` (상단), `--size-body` (본문) 순서로 배치. | `--size-text-xl`을 활용하여 화면 상/중앙에 반복적으로 배치. | 텍스트가 너무 작거나, 배경 노이즈 레이어 아래에 가려지지 않도록 **최소 대비율(Contrast Ratio)** 확보 필수. |
| **애니메이션** | 전체 플로우를 보여주는 긴 애니메이션 루프 가능. | 짧은 순간적 충격(Impact)과 반복적인 후킹 효과가 중요함. | **편집 시점:** 모든 트랜지션 타이밍을 0.3초 이하로 압축하거나, 속도를 급격하게 변화시켜 지루함을 제거해야 합니다. |