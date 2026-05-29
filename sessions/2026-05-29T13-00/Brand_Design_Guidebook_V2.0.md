# 📚 Jinny`s Lab 비주얼 시스템 가이드북 V2.0 (최종 확정안)

**[버전]** V2.0 | **[작성 목적]** 모든 콘텐츠(숏폼, 웹페이지, CTA)의 시각적 일관성 확보 및 개발 명세서화
**[핵심 원칙]** 정적인 이미지가 아닌, **상태 변화(State Change)**를 기반으로 하는 인터랙티브 컴포넌트 시스템.

---

## 1. 컬러 팔레트 (Color Palette) - 세미-어스톤 & 아날로그 신뢰감
모든 색상은 CSS 변수(`var(--color-...)`)로 정의하며, 사용 목적에 따라 그 역할을 명확히 분리합니다.

| 코드명 | HEX Code | 역할 및 용도 (Semantic Use) | [근거: Self-RAG] |
| :--- | :--- | :--- | :--- |
| `--color-bg-primary` | `#DDC2B9` | **기본 배경/휴식 공간.** 채널 배너, 전체 페이지의 메인 배경. 안정감과 아날로그 감성 유지. | [근거: Self-RAG] |
| `--color-text-dark` | `#3A3530` | **주요 텍스트.** 모든 제목 및 본문 기본 색상. 가독성이 높고 블랙보다 부드러움. | [근거: Self-RAG] |
| `--color-bg-secondary` | `#F5EFEA` | **정보 블록/구분 영역.** 데이터 패널, 강조 정보 등 대비를 통한 가독성 확보 공간. | [근거: Self-RAG] |
| `--color-accent-cta` | `#C94B38` | **Call to Action (CTA).** 가장 중요한 행동 유도 요소(버튼, 구매 링크). 시선 강탈을 위해 채도를 높임. | [추측] |
| `--color-warning-fail` | `#A0522D` | **Pain Point/경고.** 문제점 제시('시간 낭비'). 경각심 유도에 사용되는 어두운 브라운 계열. | [근거: Context] |
| `--color-solution-success` | `#6B8E23` | **Solution/해결책.** OEA 프로세스 성공 단계(자동화). 신뢰감과 성장의 느낌을 주는 톤 다운된 그린. | [추측] |

---

## 2. 타이포그래피 시스템 (Typography System) - 역할 기반 위계 설정
폰트 선택은 '느낌'이 아닌, **'정보의 종류'**에 따라 명확히 분리합니다.

| 요소 (Element) | 폰트군 (Font Family) | 사용 목적 및 규정 (Usage Rule) | [근거: Self-RAG] |
| :--- | :--- | :--- | :--- |
| **H1/Hook Title** | *Brush Script* 또는 유사 캘리그라피체 | 메인 슬로건, 강한 감성적 연결 유도. (예: "이 방법, 왜 이제 알았을까요?") – **가장 크게 배치.** | [근거: Self-RAG] |
| **Body/System Text** | *Pretendard* / Noto Sans KR (San Serif) | OEA 프로세스 설명, 세부 지식, 자막의 핵심 정보 전달. **시스템의 논리적 흐름 담당.** | [근거: Self-RAG] |
| **Detail/Label** | *Courier New* 또는 유사 모노 스페이스체 | 데이터 레이블, 기술 용어(OEA), 플로우차트의 작은 라벨링. 전문성 및 '시스템' 느낌 부여. | [근거: Self-RAG] |

---

## 3. 핵심 컴포넌트 정의 (Component Definition)
썸네일과 영상 내 모든 UI 요소는 아래의 **상태 변화(State Change)**를 포함해야 합니다.

### A. OEA 프로세스 플로우차트 컴포넌트
*   **구조:** 좌측 Pain Point Trigger $\to$ 우측 Solution/OEA Process (화살표로 연결)
*   **핵심 인터랙션:**
    1.  **Hover State:** 마우스 오버 시, 해당 박스의 테두리가 `--color-solution-success`로 밝게 빛나고, 내부 텍스트가 미세하게 확대되어 사용자의 관심을 유도합니다. (Transition: `transform: scale(1.05)` / Duration: `0.3s`).
    2.  **Active State:** 클릭 또는 애니메이션 강조 시, 박스 뒤에 **`--color-bg-secondary` 바탕의 노이즈 오버레이**가 잠깐 나타나며 '데이터 처리' 느낌을 줍니다.

### B. CTA 버튼 컴포넌트 (수익화 퍼널 연동)
*   **규정:** 단순한 버튼이 아닌, **전환 트리거(Conversion Trigger)**임을 시각적으로 인식시켜야 합니다.
*   **애니메이션 로직:** `disabled` $\xrightarrow{0.2s}$ `hover` $\xrightarrow{0.3s}$ `active` 순서로 색상 변화 및 노이즈 효과를 적용합니다. (기술 명세서 기반)

---

## 4. 결론: 썸네일 컨셉 통합 가이드라인
모든 썸네일은 다음 세 가지 요소를 필수로 포함하여 제작해야 합니다.
1.  **후킹 헤드라인:** H1 타입의 감성적 문구 (예: "시간을 돈으로 바꾼 비결")를 전면 배치합니다. (`[근거: Writer]`)
2.  **핵심 프로세스 시각화:** OEA 플로우차트의 간소화된 구조(Observe $\to$ Extract $\to$ Automate)를 배경에 흐릿한 워터마크 형태로 녹여 넣어 주제를 명확히 합니다. (`[근거: Self-RAG]`)
3.  **명암 대비:** **좌측은 `--color-warning-fail` (문제), 우측은 `--color-solution-success` (해결책)**의 색상 구도를 명확하게 사용하여 메시지 전달력을 극대화합니다.