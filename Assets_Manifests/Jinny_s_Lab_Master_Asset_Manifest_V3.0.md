# 💎 Jinny`s Lab 최종 프로덕션 에셋 마스터 매니페스트 (V3.0)

## 📋 목적 및 범위
본 문서는 Jinny`s Lab의 모든 시각적 자산(Visual Assets), 인터랙티브 컴포넌트, 그리고 콘텐츠 흐름에 사용되는 기술 사양서(Technical Specification)를 통합 관리하는 **최종 'Single Source of Truth'**입니다. 디자인 의도와 개발 구현 간의 괴리를 없애고, 코다리가 파일 접근 및 자동화 파이프라인 구축을 원활하게 수행할 수 있도록 정의되었습니다.

## 📂 Part I: 에셋 경로 표준화 및 관리 (Codari Action Item)
모든 에셋은 다음 구조를 따르며, 모든 경로는 **절대 경로**로 사용합니다. 파일 접근 시 발생하는 오류를 방지하기 위해 [최종] 폴더에 배치하고 버전 관리를 합니다.

| 컴포넌트 명 | 최종 목적 (Use Case) | 담당 에이전트 | 최종 저장 경로 (Absolute Path) | 비고/버전 |
| :--- | :--- | :--- | :--- | :--- |
| **썸네일 기본 세트** | YouTube, Instagram 쇼츠 썸네일 A/B 테스트용 마스터 파일. | Designer | `j:\workspace\assets\Thumbnail_A_B_Test_Matrix_V1.0.md` (최종본) | V3.0: CTR 최적화 적용 완료 |
| **CTA 컴포넌트** | 영상 내 행동 유도(구매/구독) 버튼의 애니메이션 및 최종 이미지 에셋. | Designer / Codari | `j:\workspace\assets\CTA_Component_V2.0.png` (애니메이션 스프라이트) | V3.0: 인터랙션 로직 포함 |
| **OEA 플로우 차트** | 핵심 프로세스(Observe $\rightarrow$ Extract $\rightarrow$ Automate) 인포그래픽 전체 셋. | Designer | `j:\workspace\assets\OEA_Flowchart_V2.0.svg` (SVG 마스터 파일) | V3.0: 인터랙티브 SVG 기반 |
| **채널 배너/로고** | 웹사이트 및 플랫폼 헤더용 정적 브랜드 자산. | Designer | `j:\workspace\assets\Brand_Identity_Final.png` | 버전 변경 시 업데이트 필수 |
| **숏폼 비디오 템플릿** | 쇼츠/릴스 전반에 걸쳐 사용되는 기본 배경화면 및 레이아웃 마스터 파일 (9:16 비율). | Designer | `j:\workspace\assets\Shorts_Template_V2.0.fig` | Figma 링크 참조 (좌표 시스템 정의) |

## 🎨 Part II: 디자인 시스템 변수 가이드라인 (Global CSS Variables)
모든 컴포넌트는 다음의 **CSS 변수**를 사용해야 하며, 이는 자동화 파이프라인에서 테마 변경 시 가장 먼저 수정되어야 하는 값입니다.

| 변수명 | 정의된 색상 | Hex Code | 용도 및 설명 | 근거 [근거: Self-RAG] |
| :--- | :--- | :--- | :--- | :--- |
| `--color-bg-primary` | 뉴트럴 어스톤 / 세피아 베이지 | `#DDC2B9` | 기본 배경색. 아날로그적 신뢰감 유지. (배경 전체) | [근거: Designer 개인 메모리] |
| `--color-text-dark` | 짙은 차콜 그레이 | `#3A3530` | 본문, 제목 등 모든 가독성이 필요한 텍스트. | [근거: Designer 개인 메모리] |
| `--color-bg-secondary` | 밝은 크림색 / 종이 질감 | `#F5EFEA` | 정보 블록 또는 컴포넌트 내부의 대비 영역. | [근거: Designer 개인 메모리] |
| `--font-family-hook` | Brush Script (또는 유사 캘리그라피체) | N/A | 후킹 메시지, 메인 슬로건 등 감성적 연결 유도. | [근거: Designer 개인 메모리] |
| `--font-family-body` | Pretendard 또는 Noto Sans KR | N/A | 시스템 설명, 프로세스 과정 설명 (기술적 명확성). | [근거: Designer 개인 메모리] |
| `--size-h1` | 48px | N/A | 최상위 제목 크기. | [추측] |

## ✨ Part III: 핵심 컴포넌트 V3.0 완성 목록 및 기술 사양 (Tech Spec)

| 컴포넌트 | 필수 요소 및 기능 | 최종 구현 목표 (KPI 연동) | 자동화 로직 요구사항 (Codari Checkpoint) |
| :--- | :--- | :--- | :--- |
| **1. 썸네일/후킹 카드** | ① 타이틀(Hook), ② 배경 이미지, ③ 핵심 카피(Pain Point Trigger) | CTR 4% 이상 달성 유도. 즉각적 자극을 통한 클릭 강제 유발. | `j:\workspace\assets\Thumbnail_A_B_Test_Matrix_V1.0.md` 파일을 읽어 A/B 그룹별 이미지와 오버레이 CSS 변수를 로드하고, 플랫폼 비율(9:16)에 맞춰 자동 리사이징 및 배치해야 함. |
| **2. OEA 플로우 차트** | Observe $\rightarrow$ Extract $\rightarrow$ Automate 3단계 인터랙티브 컴포넌트. | 정보의 명확한 구조화 및 과정의 '시스템적' 신뢰성 확보. (Drop-off Rate 감소) | SVG 기반으로 각 단계 박스에 `data-stage="[A, B, C]"` 속성을 부여하고, 마우스 오버 시 해당 섹션의 배경 색상(`var(--color-bg-secondary)`를 활용한 미세 애니메이션 변화)이 발생하도록 JS 이벤트 리스너가 구현되어야 함. |
| **3. CTA 유도 배너** | Pain Point 자각 $\rightarrow$ Solution 인지 $\rightarrow$ 행동 촉구 버튼(클릭). | 높은 전환율 확보 ($27 상품 링크 클릭). | 사용자의 시선이 가장 오래 머무는 지점(Pain Point)에서 애니메이션을 최대화하고, **버튼 영역은 `cursor: pointer` 및 `:active` 상태 변화가 명확하게 구현**되어야 함. (CSS Transition 필수) |

---
*작성자: 🎨 Designer Lead Designer / 날짜: [현재 시간]*

***[경고] 이 매니페스트는 단순 가이드가 아닌, 자동화 파이프라인의 최종 실행 사양서입니다. 모든 개발 단계에서 이 문서의 지침을 따르십시오.*