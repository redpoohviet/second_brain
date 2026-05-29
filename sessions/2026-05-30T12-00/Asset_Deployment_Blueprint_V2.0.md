# 🚀 Jinny's Lab 마스터 자산 배포 블루프린트 (V2.0)

## 📝 개요 및 목표
본 문서는 'Jinny's Lab'의 모든 콘텐츠 유형(유튜브, 인스타그램)에 사용될 디자인 에셋을 통합하고, 개발팀이 즉시 구현 가능한 기술적 명세서(Technical Specification)를 제공합니다. **모든 자산은 정적인 이미지가 아닌, 상태 변화 기반 인터랙티브 컴포넌트임을 전제**합니다.

## 🛠️ I. 공통 시스템 가이드라인 (Design System V2.0 통합)
| 요소 | 스펙/규칙 | 구현 지침 | 근거 |
| :--- | :--- | :--- | :--- |
| **색상 변수 관리** | 모든 색상은 CSS Variable 사용 필수 (`var(--color-...)`) | 배경: `--color-bg-primary` (#DDC2B9) / 텍스트: `--color-text-dark` (#3A3530) | [근거: Designer 검증된 지식] |
| **비주얼 질감** | 뉴트럴 어스톤 베이스 + 미세 노이즈 레이어 적용 | `background: linear-gradient(radial-gradient(circle at center, var(--color-bg-primary), #DDC2B9 0.8) rgba(0,0,0,0.1));` | [근거: Designer 검증된 지식] |
| **애니메이션 원칙** | 모든 전환은 부드러운 `ease-out` 트랜지션을 기본으로 합니다. | `transition-property: all; transition-duration: 0.4s; transition-timing-function: ease-out;` | [근거: Designer 개인 메모리] |

## ✨ II. 핵심 컴포넌트 라이브러리 (Master Component Library)
다음 3가지 컴포넌트를 모든 콘텐츠에 재사용하는 것을 원칙으로 합니다.

### A. Hooking Title Card (`<HookTitleCard />`)
*   **목적:** 시청자의 주의를 즉각적으로 포착하고, 문제 제기를 유도합니다. (Pain Point Trigger)
*   **스펙:** 9:16 비율 기준, 상단에 가장 큰 타이틀을 배치합니다. 배경은 노이즈 필름 질감입니다.
*   **상호작용 스펙:** 화면 진입 시 **좌측에서 `translateY(-50px)`하며 페이드 인(Fade-In)** 합니다. (Transition Duration: 0.6s)
*   **개발 지침:** Props를 통해 Title, SubTitle만 변경 가능해야 합니다.

### B. OEA Process Step Block (`<ProcessStepBlock />`)
*   **목적:** 핵심 프로세스('관찰→추출→자동화') 단계를 명확히 설명합니다. (Solution/System)
*   **스펙:** 3단계의 수직 또는 수평 플로우차트 형태로 구성됩니다. 각 단계는 독립적인 `var(--color-bg-secondary)` 박스로 구분되어야 합니다.
*   **상호작용 스펙:** 마우스 오버(Hover) 시, 해당 블록의 테두리 색상이 **`var(--color-accent)` (진한 차콜)**로 변하고, 내부 아이콘이 살짝 커지며(`scale: 1.05`), 관련 설명 텍스트가 부드럽게 나타납니다.
*   **개발 지침:** `onClick` 이벤트를 통해 다음 단계의 시각적 전환(예: 배경색 변경 또는 데이터 로딩 스피너 표시)이 트리거되어야 합니다.

### C. CTA Banner (`<CTABanner />`)
*   **목적:** 콘텐츠 말미에 행동 유도를 최대로 끌어올립니다. (Call To Action)
*   **스펙:** 시선을 강하게 잡는 대비 색상과 명확한 문구("지금 바로 시작하세요").
*   **상호작용 스펙:** 화면 하단에서 **'위로 스크롤되면서(Scroll-Driven)'** 부드럽게 나타납니다. (Animation: Scale Y from 0 to 1)

## ✅ III. 통합 배포 QA 체크리스트 (Deployment Checkpoints)
개발팀은 다음 항목들을 반드시 검증해야 합니다.

| ID | 점검 항목 | 목표 상태 | 테스트 유형 | 비고 |
| :--- | :--- | :--- | :--- | :--- |
| **QA-1** | CSS 변수 일관성 | 모든 색상과 폰트 크기가 `--color-*`를 따르는가? | Lint/Style Check | `var(--font-size-h1)` 오용 여부 확인. |
| **QA-2** | 애니메이션 타이밍 | 모든 전환 효과(Transition)가 지정된 Duration(0.4s~0.6s)를 준수하는가? | User Experience Test | 특히, 마우스 오버/호버 시 지연되거나 끊기는 현상 확인. |
| **QA-3** | 모바일 반응성 | 9:16 비율에서 모든 컴포넌트의 레이아웃이 깨지지 않는가? | Cross-Platform Test | Padding 및 Margin 값이 유동적으로 처리되는지 검증. |