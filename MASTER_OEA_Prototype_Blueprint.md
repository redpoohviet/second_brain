# 🎨 Master OEA Prototype Blueprint (Actionable Mockup)

## 🎯 목표: 'Pain Point 인식' 모듈의 인터랙티브 프로토타이핑 및 개발자 검증 준비
*   **원천 명세서**: MASTER\_INTERACTIVE\_FLOW\_SIMULATION\_V1.0.md [근거: Master Flow Simulation]
*   **핵심 상호작용**: 사용자가 Pain Point 영역을 *인식(Observe)*하는 순간, 시스템이 활성화되어 해결책으로 유도하는 흐름 구현.

### 🎨 디자인/UX 명세 (Designer Action)
1.  **컴포넌트 이름**: PainPoint\_Observer\_Module
2.  **사이즈**: Mobile Vertical View (`360px` x `640px`) [근거: Designer 개인 메모리]
3.  **배경/스타일**: `--color-bg-primary` (뉴트럴 어스톤) + 빈티지 필름 노이즈 레이어 (`opacity: 0.1`).
4.  **핵심 구조**: 좌측(Pain Point Trigger), 우측(Solution Placeholder)으로 분할된 Two-Column Layout.

#### 💡 상호작용 정의 (State Change Protocol)
| 상태 (State) | 트리거 (Trigger) | 시각적 변화/효과 (Visual Effect) | 기술 요구사항 (Tech Spec Focus) |
| :--- | :--- | :--- | :--- |
| **S1. 초기 상태 (Default)** | 페이지 로드 시 | 좌측: `Pain Point` 텍스트 배치. 애니메이션 없음. 우측: 비어있거나 희미한 가이드라인만 표시. | CSS `:hover` 이벤트 대기 상태 준비. 기본 레이아웃 정의. |
| **S2. 상호작용 발생 (Hover/Click)** | 사용자가 좌측 Pain Point 영역에 마우스를 올리거나 클릭할 때 (`:hover` / `onClick`) | 1. 배경이 미세하게 어두워짐(Shadow Overlay). 2. Pain Point 요소의 색상이 `--color-accent-warning`으로 즉시 변경됨. 3. **애니메이션**: 모든 변화는 `transition-duration: 0.3s; transition-timing-function: ease-out;`를 따름. | JavaScript 이벤트 리스너 (`onMouseEnter`/`onClick`)가 필수. 상태 전환 로직 테스트 필요. |
| **S3. 해결책 노출 (Solution Reveal)** | S2 발생 후, 0.5초 뒤 자동 또는 클릭 시. | 1. 우측 Placeholder 영역이 Fade-in 되며 내용물(OEA 프로세스 설명)을 보여줌. 2. OEA 플로우의 핵심 요소가 마치 데이터 로딩되듯 **단계적으로 (Step-by-step)** 나타남. | JS 타이머 (`setTimeout`) 또는 상태 변경 기반 컴포넌트 활성화 필요. `IntersectionObserver` 활용 가능성 검토. |

### 🛠️ 다음 단계 액션 아이템
1.  **Designer**: 위 명세서에 따라 Figma 프로토타입 링크를 생성하여 공유 (S2, S3의 인터랙션을 중심으로).
2.  **Codari**: 받은 프로토타입을 기반으로 핵심 컴포넌트 (`PainPoint_Observer_Module`)의 CSS/JS 통합 테스트 케이스(V4.0)를 업데이트하고 실행한다.