# 🖼️ Jinny's Lab - 최종 에셋 마스터 QA 체크리스트 (시스템 오류 테마)

**[문서 목적]**
본 문서는 `final_asset_production_spec.md`를 기반으로 제작되는 모든 시각적 에셋(썸네일, 모션 그래픽)의 기술적 완성도와 배포 적합성을 최종 검증하는 체크리스트이자, 개발 및 디자인 간의 유일한 진실의 출처(SSOT)입니다.

**[프로젝트 테마]**
'시스템 오류 (System Error)'를 통한 시청자 Pain Point 상기 → OEA 프로세스 기반 해결책 제시.

---

## 💾 1. 공통 스타일 및 시스템 검증 (Mandatory QA)

| 요소 | 세부 요구사항 | 기술 명세 (Tech Spec) | QA 상태 |
| :--- | :--- | :--- | :--- |
| **컬러 팔레트** | 뉴트럴 어스톤/빈티지 필름 질감 유지. 모든 텍스트는 `#3A3530` 사용. | `var(--color-bg-primary): #DDC2B9;` <br> `var(--color-text-dark): #3A3530;` | [✓] 확정 (CSS 변수 적용) |
| **폰트 시스템** | 제목/후킹: Brush Script 유사 캘리그라피체. 본문/정보: Pretendard 또는 Noto Sans KR. 강조: Courier New(모노 스페이스). | `var(--font-h1): 'Brush Script', cursive;` <br> `var(--font-body): 'Pretendard', sans-serif;` | [✓] 확정 (Fallback 지정) |
| **배경 질감** | 아날로그 신뢰감 부여. 빈티지 필름 노이즈 레이어 필수 적용. | `radial-gradient(circle at center, rgba(0, 0, 0, 0.05));` (opacity: 0.1) | [✓] 확정 (CSS Background Layer) |
| **레이아웃 구조** | 시선 유도: Pain Point를 좌측에 배치하고, Solution/OEA 프로세스는 우측 흐름도를 통해 제시하는 비대칭 구조 필수. | `display: flex; justify-content: space-between;` | [✓] 확정 (좌우 분할 레이아웃) |

---

## 🖼️ 2. 썸네일 에셋 QA (Thumbnail Asset Checklist)

**[목표]**: 클릭 유도(Hooking) 극대화 및 정보 전달력 확보.
**[규격]**: 모바일 최적화 (16:9 비율, 권장 해상도: 1280x720px).

| 체크 항목 | 상세 요구사항 | 기술적 검증 포인트 | QA 상태 |
| :--- | :--- | :--- | :--- |
| **핵심 메시지 강조** | '시스템 오류(System Error)' 타이포그래피가 가장 시각적으로 충격적이면서도 뉴트럴 톤을 유지해야 함. | 대비되는 색상(예: `--color-text-dark`를 배경에 오버레이)과 모션 효과(`keyframe: glitch`)를 활용하여 강조. | [ ] 미완료 (애니메이션 추가 필요) |
| **브랜딩 명확성** | 진지하고 지적인 톤을 유지하며, 'Jinny's Lab' 로고 및 슬로건이 하단에 배치되어 신뢰도를 확보해야 함. | 로고는 투명도 조절된 워터마크 형태로 사용 (`opacity: 0.2`). | [✓] 완료 |
| **Call-to-Action (CTA)** | 썸네일 내에서 시청자가 얻게 될 '가치(Solution)'를 명확히 제시해야 함. (예: "이 방법을 모르면...") | CTA 문구는 일반 본문체보다 크고, 배경과 분리된 별도의 영역에 배치 (`var(--size-cta)`). | [ ] 검토 필요 (카피 최종 확정 후 반영) |
| **모바일 가독성** | 썸네일이 모바일에 축소되었을 때도 핵심 키워드와 이미지가 명확히 구분되어야 함. | 모든 중요 텍스트는 최소 `18px` 이상 유지, 대비율(Contrast Ratio) 체크 필수. | [✓] 완료 |

---

## 🎬 3. 모션 그래픽 (Motion Graphics) QA Checklist

**[목표]**: '시스템 오류'가 발생하는 과정과 OEA 프로세스로 해결되는 흐름을 인터랙티브하게 보여주기.
**[규격]**: 9:16 비율, 총 길이 35~45초 분량의 플로우 기반 애니메이션.

| 체크 항목 | 상세 요구사항 | 기술적 검증 포인트 (Animation Tech Spec) | QA 상태 |
| :--- | :--- | :--- | :--- |
| **오류 발생 시퀀스** | '시스템 오류' 메시지 등장 시, 단순 페이드 인이 아닌, 데이터 노이즈/글리치 효과를 포함한 충격적인 애니메이션 구현. | `keyframes glitch { 0% { transform: translate(0); } 50% { transform: translate(-2px, -1px); opacity: 0.8; } 100% { transform: translate(0); opacity: 1; } }` (Timing: 0.5s) | [ ] 기술 구현 필요 (코다리 협업 필수) |
| **OEA 프로세스 전환** | '오류' → '관찰(Observe)'으로의 상태 변화 시, 배경색이나 레이아웃이 부드럽게 바뀌며 다음 단계로 유도되어야 함. | `transition: background-color 0.8s ease-out, transform 0.8s cubic-bezier(...)`. (Transition Duration 명시) | [✓] 완료 (기술 사양서 기반) |
| **정보 노출 로직** | 데이터가 순차적으로 '추출(Extract)'되고 '자동화(Automate)'되는 과정을 보여줄 때, 정보가 한 번에 나타나지 않고 단계별로 점진적(Gradual)으로 로딩되도록 설계. | JavaScript를 활용한 스크롤/시간 기반 애니메이션 트리거 (예: `setTimeout` 또는 Intersection Observer API). | [✓] 완료 (API 연동 명세서 참조) |
| **배경 애니메이션** | 배경은 정적이지 않고, 데이터가 흐르는 듯한 미세한 움직임(Parallax Effect 또는 Subtle Gradient Shift)이 유지되어야 함. | CSS `transform: translate3d()`를 이용한 2D/3D 공간감 연출 및 반복적인 루프 효과 적용. | [✓] 완료 |

---
**[결론]**
현재 모든 에셋은 기술 사양서(`final_asset_production_spec.md`)에 명시된 인터랙티브 컴포넌트 원칙을 따르고 있습니다. **'시스템 오류' 메시지의 시각적 충격과 OEA 프로세스의 논리적 흐름 연결**이라는 두 축이 잘 유지되고 있으나, '오류 발생 시퀀스'의 글리치 효과와 최종 CTA 문구의 확정만 남았습니다.