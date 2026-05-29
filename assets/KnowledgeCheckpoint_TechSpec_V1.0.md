# 지식 점검 컴포넌트(Knowledge Checkpoint) - Technical Specification V1.0

## ⚙️ 기본 원칙 및 시스템 변수 적용
*   **CSS 변수 사용:** 모든 크기, 색상 코드는 `var(--color-*)`를 따릅니다. (재사용성 확보)
*   **애니메이션 기반:** 정적인 이미지를 지양하며, **모든 정보 노출은 애니메이션(Transition)**을 통해 이루어져야 합니다.

## 🖥️ 컴포넌트 레이아웃 및 인터랙션 상세 명세

### A. 기본 구조 (Container)
*   **크기/비율:** 16:9 (웹페이지 기준), 또는 9:16 (모바일 숏폼 시퀀스).
*   **배경 (BG):** `var(--color-bg-secondary)` (`#F5EFEA`). 배경 전체에 미세한 빈티지 필름 노이즈 오버레이 적용.

### B. 핵심 요소 정의 및 애니메이션 로직

| 요소 | 역할/내용 | 크기/좌표 (예시) | 인터랙션/애니메이션 로직 |
| :--- | :--- | :--- | :--- |
| **[Title Card]** | "잠시 멈추고 점검해 보세요." | 전체 너비, 상단 중앙 | `opacity: 0`에서 시작하여 `setTimeout(200ms)` 후 `opacity: 1`로 부드럽게 페이드 인 (`transition-duration: 0.5s`, `ease-out`). |
| **[Question Box]** | 질문 내용 (Q1) 표시 영역. | 좌측 섹션, 가로 70% | 데이터 로딩 시뮬레이션을 위해, Q가 한 줄씩 타이핑되는 효과 (`typing effect`)를 적용합니다. |
| **[Option Buttons]** | 선택지 A, B, C 등. | 중앙 하단, 그리드 배치 (3열) | *Hover State:* 버튼 위에 마우스 오버 시 `box-shadow`와 함께 미세하게 커지는(Scale up 1.05) 효과를 주어 사용자의 상호작용을 유도합니다. |
| **[Submit Button]** | '확인하기' 버튼. | 중앙 하단, 옵션 아래 | *Click Action:* 클릭 시 `disabled` 상태로 전환되며, 백그라운드에 로딩 스피너가 나타나고(`isLoading: true`), 서버 응답을 기다리는 시간을 시각화합니다. |
| **[Feedback Module]** | 정답/오답 피드백 표시 영역. | 중앙 하단, Submit 버튼 위 | *State Change:* 답변 확인 후, 0.3초간 배경색이 `var(--color-accent-correct)` (녹색 계열)로 채워지거나(`isCorrect: true`), 오답일 경우 `var(--color-accent-wrong)` (빨강 계열)으로 깜빡이며 표시됩니다. |

## 🖥️ 개발자 통합 지침 (Code Integration Notes)
1.  **데이터 로딩 시뮬레이션:** 질문이 즉시 나타나지 않도록, 실제 데이터 API 호출을 기다리는 듯한 2초 간격의 애니메이션(예: 점 세 개가 찍히는 효과)을 반드시 포함해야 합니다. [근거: Master Flow Simulation]
2.  **상태 기반 로직 (State-Based Logic):** 모든 컴포넌트의 가시성은 `isLearned`, `hasAnswered`, `isLoading`과 같은 **Boolean 플래그**에 의존하여 제어되어야 합니다. [근거: Video System V1.0]

---