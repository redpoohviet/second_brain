# 🎨 Jinny`s Lab 브랜드 비주얼 시스템 가이드라인 V2.0 (Tech Spec 기반)

## 1. 디자인 목표
*   **핵심 원칙:** 모든 시각 요소는 '기술적 정확성'과 '따뜻한 인간적인 감성(Vintage Film)'의 균형을 유지해야 한다.
*   **확장성 확보:** 초기 콘텐츠의 강렬함(빨간 경고색)은 유지하되, 채널이 성장하며 다루게 될 다양한 주제에 대응할 수 있는 **Neutral Palette (중립 팔레트)**를 확정한다.

## 2. 컬러 시스템 정의 (Color Variables - CSS 변수 활용 필수)
모든 색상은 다음의 네 가지 카테고리로 분류되며, `var(--color-...)` 형태로 관리되어야 합니다.

| 역할 | 이름/용도 | HEX 코드 | CSS Variable | 적용 범위 및 지침 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary BG** (기본 배경) | 뉴트럴 어스톤 / 베이지 | `#DDC2B9` | `--color-bg-primary` | 모든 콘텐츠의 주 배경. 안정감과 아날로그 감성 부여. |
| **Text Dark** (주 텍스트) | 차콜 그레이 | `#3A3530` | `--color-text-dark` | 본문, 자막 등 가장 많은 텍스트에 사용. 가독성 최우선. |
| **Accent Red** (경고/Hook) | 시스템 경고 빨강 | `#D94B3C` | `--color-alert-red` | *[제한적]* '오류', '주의' 등 핵심 후킹 포인트에만 사용. 과도한 사용 금지. |
| **Secondary Accent** (행동 유도) | 신뢰 청록색 | `#3C8A6C` | `--color-cta-green` | CTA 버튼, 최종 결론(Solution), 성공적인 프로세스 완료 지점 등 **'긍정적 행동 유도'**에만 사용. [근거: 추가 디자인 가이드라인] |
| **Neutral Contrast** (구분선) | 밝은 크림색 / 종이 질감 | `#F5EFEA` | `--color-bg-secondary` | 정보 블록의 배경 분리, 섹션 구분을 위해 사용. 대비 효과를 극대화. |

## 3. 타이포그래피 시스템 (Typography Hierarchy)
| 역할 | 추천 폰트 | 용도 및 특징 | CSS Variable |
| :--- | :--- | :--- | :--- |
| **Headline / Hook** | *Brush Script* 또는 유사 캘리그래피체 | 채널 슬로건, 감성적 연결 유도. (따뜻함) | `--font-h1` |
| **Body / System** | Pretendard / Noto Sans KR | OEA 과정 설명, 자막의 핵심 정보 전달. (명확한 시스템 구조) | `--font-body` |
| **Callout / Detail** | Courier New 또는 모노 스페이스체 | 데이터 레이블, 기술 용어(OEA), 플로우차트 라벨링. (전문성/시스템 느낌 부여) | `--font-detail` |

## 4. 로고 및 에셋 활용 가이드라인
*   **로고 사용:** 로고는 채널 배너 좌측 상단에 배치하되, 콘텐츠의 주 배경색과 대비를 이루도록 **'흰색 (Opacity: 80%)' 또는 '짙은 차콜 그레이'** 단색 버전만 사용합니다.
*   **애셋 스타일:** 모든 에셋은 '빈티지 필름 질감(Film Grain)'을 미세하게 오버레이하여 아날로그적 신뢰감을 유지해야 합니다. (CSS: `background-image: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);` 사용 권장).

---