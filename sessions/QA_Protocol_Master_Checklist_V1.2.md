# 🚨 Global Design System 최종 QA 프로토콜 (V1.2)

## 🎯 목표
MVP 코드가 Jinny`s Lab의 모든 시각적/기술적 표준을 완벽하게 준수하는지 검증합니다. 이 체크리스트를 통과해야만 'Go-Live'가 가능합니다.

## 🔍 참조 자료 (Source of Truth)
1. Global Design System Manual V1.0 (최종 승인 버전 확인 필요) [근거: 지난 의사결정 로그]
2. Jinny`s Lab Component Library V2.0 (Atomic Components 사양서) [근거: 시스템 컨텍스트]

---

## 🛠️ A. 시각적 일관성 QA (Designer Focus)

| 영역 | 체크 항목 | 기준 명세 (Spec) | 검증 지점 (Pass/Fail) |
| :--- | :--- | :--- | :--- |
| **색상 시스템** | 모든 요소의 배경, 텍스트, 액센트 색상이 변수(CSS Variable) 기반인가? | `--color-bg-primary` (#DDC2B9), `--color-text-dark` (#3A3530) 등 정의된 CSS 변수 사용 필수. [근거: Designer 검증된 지식] | |
| **타이포그래피** | 제목, 본문, 강조 텍스트의 폰트와 크기 변화가 일관적인가? | H1 (`var(--font-size-h1)`): *Brush Script* (Hook) / Body: *Pretendard* 또는 *Noto Sans KR*. [근거: Designer 검증된 지식] | |
| **애셋 품질** | 모든 이미지/아이콘이 웹 최적화(SVG, WebP 등)되었으며 저용량 고효율인가? | 벡터 기반 아이콘 사용 원칙. 모바일 해상도 기준 1x, 2x 대응 필수. [근거: Researcher] | |
| **질감 및 배경** | 빈티지 필름 질감(`opacity: 0.1`의 `radial-gradient`)이 모든 섹션에 일관되게 적용되었는가? | 아날로그적 신뢰감을 주기 위해, 배경은 단순한 단색이 아닌 미세 노이즈 레이어 필수. [근거: Designer 검증된 지식] | |

## 💡 B. 상호작용/기술적 QA (Developer Focus)

| 영역 | 체크 항목 | 기준 명세 (Spec) | 검증 지점 (Pass/Fail) |
| :--- | :--- | :--- | :--- |
| **애니메이션** | 모든 컴포넌트의 전환(Transition)이 부드럽고 의도된 타이밍을 갖는가? | `transition-duration: 0.5s;` / `ease-out`. 애니메이션 시작 지점과 끝 지점이 명확해야 함. [근거: Designer 개인 메모리] | |
| **상태 변화 (State Change)** | 컴포넌트의 인터랙션(Hover, Click)에 따른 시각적 피드백이 정의되었는가? | 마우스 오버/클릭 이벤트 발생 시, 명세서에 정의된 애니메이션 키프레임과 크기 변화가 정확히 작동해야 함. [근거: Designer 개인 메모리] | |
| **코드 구조** | 모든 요소의 좌표(Layout)와 크기가 절대 픽셀(`px`)이 아닌 CSS 변수 기반으로 정의되었는가? | `var(--size-h1)`, `var(--color-text-dark)` 등 변수를 사용해야 시스템 확장이 용이함. [근거: Designer 검증된 지식] | |
| **데이터 흐름** | CTA 및 핵심 정보(OEA)의 노출 타이밍과 로직이 스크립트와 정합성을 갖는가? | 15~60초 구간에 명시된 CTA 문구/버튼은 반드시 해당 시간에 맞춰, 코드 레벨에서 구현되어야 함. [근거: 지난 의사결정 로그] | |

## ✅ 다음 단계 (Action Plan)
1. **코다리:** 본 체크리스트의 B 영역(기술적 QA)을 기반으로 MVP 코드를 라인별로 검토하고, 미준수 사항에 대해 구체적인 수정 코드 스니펫을 제시할 것.
2. **Designer:** 본 체크리스트의 A 영역(시각적 QA)과 함께, 미흡한 부분이 발견되면 즉시 `Advanced_Component_TechSpec` 파일을 업데이트하여 코다리에게 재요청할 것.