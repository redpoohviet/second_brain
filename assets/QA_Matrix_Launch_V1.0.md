# 🚀 Jinny's Lab Cross-Platform Launch QA Matrix (Master)
## 🎯 목적: 모든 콘텐츠 에셋이 Global Design System Manual V1.0에 완벽히 부합하는지 검증하고, 출시 준비 상태를 최종 확인한다.

### I. 핵심 시스템 검토 기준 (Designer 주도)

| 영역 | 검증 항목 | 목표 규칙 (V1.0 근거) | Pass/Fail | 비고 및 수정 필요 사항 |
| :--- | :--- | :--- | :--- | :--- |
| **[COLOR]** | Primary BG 준수 여부 | `var(--color-bg-primary)` (`#DDC2B9`) 사용 필수. 노출된 배경색이 다른 색상으로 오버라이드 되어서는 안 됨. | [ ] | 예: CTA 화면 일부가 `#FFFFFF`로 잘못 설정됨. |
| **[TYPO]** | Heading/Hook 준수 여부 | 메인 제목(Hook)은 `Brush Script` 계열의 손글씨 느낌을 유지하며, 크기는 `var(--size-h1)`를 따름. | [ ] | 예: 쇼츠 자막 일부가 폰트 사이즈가 작음. |
| **[INTERACTION]** | 트랜지션 및 애니메이션 | 모든 상태 변화(State Change)는 부드러운 페이드/슬라이드 인아웃 효과(`transition-duration: 0.5s`)를 사용해야 함. 갑작스러운 전환은 금지. | [ ] | 예: 플로우차트에서 단계가 '점프'하는 애니메이션이 발견됨. |
| **[CONTENT]** | CTA 명확성 (KPI) | 모든 콘텐츠는 15~60초 사이의 특정 구간에, 목표 KPI(CTR > 4%, 시청 지속 시간 > 22초)를 달성할 수 있는 명확한 행동 유도 장치를 포함해야 함. | [ ] | 예: CTA가 영상 끝부분에서 사라지는 경우가 있음. |

### II. 에셋별 검증 체크리스트 (에이전트 분담 영역)
#### A. 썸네일 및 커버 이미지 (`assets/Thumbnail_A_B_Test_Matrix_V1.0.md` 기반)
*   [체크] 모든 핵심 메시지가 `Headline / Hook` 타입으로 디자인되었는가? (O/X)
*   [체크] 텍스트와 배경의 대비(Contrast Ratio)가 충분하여 가독성이 높은가? (O/X)

#### B. 쇼츠 및 릴스 콘텐츠 (`sessions/...youtube.md`, `sessions/...instagram.md` 기반)
*   [체크] '관찰→추출→자동화' 프로세스 설명 시, 각 단계 전환이 시각적으로 명확하게 분리되는가? (O/X)
*   [체크] 모든 텍스트 오버레이(Overlay)는 `Body / System` 타입의 Pretendard를 사용했는가? (O/X)

#### C. 랜딩 페이지 MVP (`sessions/...developer.md` 기반)
*   [체크] 'Pain Point Trigger' 모듈과 'Solution' 모듈 간의 시각적 흐름(좌-우 분할 구조)이 유지되는가? (O/X)
*   [체크] 최종 Callout 영역에 필요한 데이터 라벨링은 `Courier New` 등 모노 스페이스체를 사용하고 있는가? (O/X)

---
**다음 단계: Kodari 에이전트에게 기술적 검증을 요청합니다.**