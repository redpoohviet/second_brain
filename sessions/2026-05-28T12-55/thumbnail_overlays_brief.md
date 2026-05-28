<header># 🎨 [썸네일 오버레이 기획서] 문법 오류 & 실생활 표현 편 (Red Tone)</header>

**작성일:** 2026-05-28
**작성자:** 🎨 Designer (Lead Designer)
**타겟:** 중국어를 배우고 싶은 베트남인, 해외 거주 중인 한국인
**주제:** 일상 회화에서 자주 실수하는 '문법 오류'와 '실생활 표현'

---

## 1. 기획 목적 및 배경

### 📌 핵심 목표
- **후킹 (0~3 초):** "이 단어는 절대 틀려도 안 돼!"라는 문법을 시각적으로 강력하게 각인시킴.
- **상호작용 유도:** 빨강 톤 오버레이를 통해 사용자의 주의력을 집중시키고, 시스템 오류를 직관적으로 이해하도록 유도.
- **브랜드 일관성:** Jinny`s Lab 의 '시스템' 감성과 '아날로그 신뢰감'을 유지한 디자인 적용.

### 📊 타겟 및 컨셉
- **타겟:** 중국어 학습자 ( 베트남인 주력, 한국인 포함)
- **컨셉:** "오류 발견 → 시스템 진단 → 해결책 제시"의 3 단계 흐름을 썸네일에서 압축.
- **톤앤매너:** 빨강 (경고), 블랙/차콜 (정보), 화이트 (배경/텍스트).

---

## 2. 썸네일 오버레이 옵션 A/B/C 구성안

각 옵션은 동일한 배경 이미지 (예: 중국어 학습자가 문법 실수를 하는 모습) 위에 적용되는 오버레이 텍스트 및 그래픽 요소를 달리합니다.

### **Option A: 직관적 경고 (Pain Point Focus)**
- **컨셉:** 사용자의 "실수"를 직접적으로 지적하여 호기심과 공포심을 자극.
- **메인 텍스트:** "이 단어는 절대 틀려도 안 돼!"
- **서브 텍스트:** "시스템 오류 진단 완료 ⚠️"
- **시각 요소:** 빨간색 경고 사인 (⚠️), 붉은색 테두리 박스, 배경 이미지 특정 부분 (실수한 문장) 에 'X' 표시.
- **적용 위치:** 화면 상단 1/3 부와 하단 1/4 부 (자막 공간 확보).

### **Option B: 시스템 솔루션 강조 (Solution Focus)**
- **컨셉:** 오류를 해결해 준다는 신뢰감을 주어 클릭 유도.
- **메인 텍스트:** "Jinny`s Lab 이 자동으로 수정합니다 ✅"
- **서브 텍스트:** "문법 오류 100% 자동 진단"
- **시각 요소:** 파란색 체크마크 또는 녹색 배경의 시스템 UI 모티프 (빨강 오버레이와 대비), 중앙에 'Fix' 아이콘.
- **적용 위치:** 화면 중앙에 집중된 컴포넌트.

### **Option C: 궁금증 자극 (Curiosity Focus)**
- **컨셉:** "왜?"라는 질문을 던져 클릭 유도.
- **메인 텍스트:** "이게 왜 틀렸을까요?"
- **서브 텍스트:** "베트남식 발음 특징 vs 중국어"
- **시각 요소:** 빨간색 화살표가 특정 단어 (예: 你好) 를 가리키며, 그 단어 뒤에 '? 기호' 표시.
- **적용 위치:** 화면 우측 하단에 배치하여 시선 유도.

---

## 3. 디자인 시스템 가이드라인 (UX Engineering Spec)

### 🎨 색상 팔레트 (CSS Variable 기반)
| 구분 | 이름 | 색상 코드 | CSS 변수명 | 비고 |
| :-- | :-- | :-- | :-- | :-- |
| **Primary** | 경고 빨강 | `#FF4D4F` | `var(--color-alert-red)` | 오버레이 배경, 테두리, 강조 텍스트. |
| **Secondary** | 경고 옐로우 | `#FAAD14` | `var(--color-warning-yellow)` | 주의 아이콘, 하이라이트. |
| **Text Dark** | 짙은 차콜 | `#3A3530` | `var(--color-text-dark)` | 본문 텍스트, 오버레이 배경 위에 사용. |
| **BG Primary** | 뉴트럴 어스톤 | `#DDC2B9` | `var(--color-bg-primary)` | 전체 썸네일 배경 또는 오버레이 배경. |
| **BG Secondary** | 밝은 크림색 | `#F5EFEA` | `var(--color-bg-secondary)` | 정보 블록, 하이라이트 영역. |

### 📐 타이포그래피 (Font Stack)
- **Headline/Hook:** *Brush Script MT* 또는 유사한 캘리그래피체 (`font-family: 'Brush Script', cursive;`)
  - `font-size`: 48px~60px (모바일 최적화 고려 시 약 32px~40px)
- **Body/System:** *Pretendard* 또는 *Noto Sans KR* (`font-family: 'Pretendard', sans-serif;`)
  - `font-weight`: 500~700 (가독성 확보)
- **Detail/Callout:** *Courier New* 또는 유사 코딩 서체 (`font-family: 'Courier New', monospace;`)
  - `font-size`: 12px~14px (기술적 정보 전달)

### 🖼️ 레이아웃 및 컴포넌트 스펙

#### **A. 후킹 자막 (Hooking Title Card)**
- **배경:** `var(--color-bg-primary)` + `opacity: 0.8` 필터 적용.
- **텍스트 배치:** 화면 중앙 상단, `text-align: center`.
- **애니메이션:** 페이드 인 (`fadeIn`) 0.5 초 후, 스케일 업 (`scale(1) -> scale(1.05)`) 0.2 초.

#### **B. 시스템 오류 시각화 (System Error Visual)**
- **컴포넌트:** 붉은색 테두리 박스 (`border: 4px solid var(--color-alert-red)`), 내부에 빨간색 `⚠️` 아이콘.
- **레이어:** 오버레이 상단에 고정, 배경 이미지보다 지상 (`z-index: 10`).

#### **C. 솔루션 시각화 (Solution Visual)**
- **컴포넌트:** 파란색 또는 녹색 체크마크 아이콘 (`checkmark-icon.svg`), 흰색 배경 박스 (`background: var(--color-bg-secondary)`).
- **레이어:** 중앙 하단에 배치, 클릭 유도 요소.

---

## 4. 애니메이션 및 상호작용 가이드 (Tech Spec)

| 컴포넌트 | 애니메이션 타이밍 | 함수 | 비고 |
| :-- | :-- | :-- | :-- |
| **후킹 자막** | `0.5s` | `ease-out` | 화면 중앙에서 페이드 인 후 스케일 업. |
| **오류 아이콘** | `1.0s` | `bounce` | 경고 아이콘이 살짝 튕기는 효과 (주의 강조). |
| **시스템 업데이트** | `2.0s` | `step-end` | 오류 박스가 사라지고 솔루션 박스가 페이드 인. |

---

## 5. 결론 및 제언

- **추천 옵션:** **Option A (직관적 경고)**가 초기 클릭률(CTR) 이 가장 높을 것으로 예상됨. 베트남인 학습자의 심리적으로 "실수"를 강조하는 것이 호기심을 자극함.
- **실행 계획:**
  1.  Writer 의 스크립트 내용을 기반으로 Option A, B, C 의 썸네일 이미지를 제작 (Figma 또는 AI 이미지 생성 도구 활용).
  2.  Designer 가 제공한 디자인 시스템 가이드라인을 준수하여, 각 옵션의 PNG/JPG 파일 export.
  3.  YouTube Studio 에 업로드 시, 해당 썸네일과 함께 A/B 제목 전략 적용.

<create_file path="sessions/2026-05-28T12-55/interactive_components_brief.md"><header># 🧩 [인터랙티브 컴포넌트 레이아웃 브리프] 문법 오류 & 실생활 표현 편 (UX Engineering Spec)</header>

**작성일:** 2026-05-28
**작성자:** 🎨 Designer (Lead Designer)
**타겟:** 중국어를 배우고 싶은 베트남인, 해외 거주 중인 한국인
**주제:** 일상 회화에서 자주 실수하는 '문법 오류'와 '실생활 표현'

---

## 1. 개요 및 목표

- **목표:** 단순한 정지된 이미지가 아닌, 사용자가 클릭하거나 마우스를 올렸을 때 반응하는 **'인터랙티브 시스템 컴포넌트'** 제작.
- **배경:** 로컬 FLIX 엔진 연동 없이, 개발자가 코딩하여 구현할 수 있는 기술 명세서 (Tech Spec) 제공.

---

## 2. 컴포넌트 목록 및 스펙

### 🟢 Component 01: Pain Point Trigger Module (좌측)
**사용자 행동:** 화면에 고정되어 있으나, 특정 키워드 (예: "Nǐ hǎo") 를 마우스 오버 시 빨간색 경고 사인이 나타남.

#### **Spec:**
- **HTML 구조:**
    <div class="pain-point-trigger">
    <span class="keyword">Nǐ hǎo</span>
    <span class="warning-icon" id="warning-icon">⚠️</span>
  </div>
  ```
- **CSS 스타일:**
  ```css
  .pain-point-trigger {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
    border: 2px solid transparent; /* 기본 상태 */
    transition: all 0.3s ease;
  }

  .keyword {
    font-family: 'Pretendard', sans-serif;
    font-weight: bold;
    color: var(--color-text-dark);
    font-size: var(--font-size-h2);
  }

  .warning-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 24px;
    color: transparent; /* 기본 상태 */
    transition: color 0.3s ease, transform 0.3s ease;
  }

  /* 마우스 오버 시 반응 */
  .pain-point-trigger:hover {
    border-color: var(--color-alert-red);
    box-shadow: 0 0 10px rgba(255, 77, 79, 0.3);
  }

  .pain-point-trigger:hover .warning-icon {
    color: var(--color-alert-red);
    transform: scale(1.2);
  }
  ```
- **JS 로직:**
  ```javascript
  const trigger = document.querySelector('.pain-point-trigger');
  const warningIcon = document.getElementById('warning-icon');

  // 이미오버 시 즉시 경고 아이콘 표시 (애니메이션 추가)
  trigger.addEventListener('mouseenter', () => {
    warningIcon.style.color = 'var(--color-alert-red)';
    warningIcon.style.transform = 'scale(1.2)';
  });

  trigger.addEventListener('mouseleave', () => {
    // 마우스 나간 후 일정 시간 유지하거나 초기화 (옵션: 초기화 권장)
    warningIcon.style.color = 'transparent';
    warningIcon.style.transform = 'scale(1)';
  });
  ```

### 🟢 Component 02: Solution/OEA Process Module (우측)
**사용자 행동:** "System Update" 버튼 클릭 시, 오류가 사라지고 올바른 문법으로 전환됨.

#### **Spec:**
- **HTML 구조:**
    <div class="oea-process">
    <div class="process-step active">Step 1: Observe</div>
    <div class="process-step">Step 2: Extract</div>
    <div class="process-step">Step 3: Automate</div>
    <button id="update-btn">System Update</button>
  </div>
  ```
- **CSS 스타일:**
  ```css
  .oea-process {
    position: relative;
    padding: 20px;
    background-color: var(--color-bg-primary);
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .process-step {
    display: none; /* 기본 숨김 */
    font-family: 'Pretendard', sans-serif;
    color: var(--color-text-dark);
    margin-bottom: 10px;
  }

  .process-step.active {
    display: block;
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  ```
- **JS 로직:**
  ```javascript
  const updateBtn = document.getElementById('update-btn');
  const steps = document.querySelectorAll('.process-step');

  // 버튼 클릭 시 Step 전환
  updateBtn.addEventListener('click', () => {
    // Step 1 은 이미 active 가정, 다음 단계로 이동
    steps.forEach(step => step.classList.remove('active'));

    const currentStepIndex = Array.from(steps).findIndex(s => s.classList.contains('active'));
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      nextStep.style.display = 'block'; // 초기 display 설정 후 transition 적용 시 변경
      setTimeout(() => {
        nextStep.classList.add('active');
      }, 50); // 애니메이션 타이밍 조정
    } else {
      // 마지막 단계 도달 시 CTA 버튼 활성화
      updateBtn.textContent = "Start Learning";
      updateBtn.style.backgroundColor = 'var(--color-alert-red)';
      updateBtn.style.color = 'white';
    }
  });
  ```

### 🟢 Component 03: Callout/Detail Module (하단)
**사용자 행동:** 데이터 레이블, 기술 용어 등 작은 정보 표시. 마우스 오버 시 상세 설명 팝업 등장.

#### **Spec:**
- **HTML 구조:**
    <div class="detail-label">OEA Process</div>
  <div class="detail-popup" id="detail-popup">
    <p>Observe: 학습자의 오류를 관찰.</p>
    <p>Extract: 문제점을 추출.</p>
    <p>Automate: 자동화 시스템을 적용.</p>
  </div>
  ```
- **CSS 스타일:**
  ```css
  .detail-label {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: var(--color-text-dark);
    background-color: var(--color-bg-primary);
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .detail-popup {
    position: absolute;
    top: 100%;
    left: 0;
    width: 200px;
    background-color: var(--color-bg-secondary);
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 100;
  }

  .detail-label:hover + .detail-popup {
    opacity: 1;
    visibility: visible;
  }
  ```

---

## 3. 디자인 시스템 및 브랜드 가이드라인 적용

### 🎨 색상 팔레트 (CSS Variable 기반)
| 구분 | 이름 | 색상 코드 | CSS 변수명 | 비고 |
| :-- | :-- | :-- | :-- | :-- |
| **Primary** | 경고 빨강 | `#FF4D4F` | `var(--color-alert-red)` | 오버레이 배경, 테두리, 강조 텍스트. |
| **Secondary** | 경고 옐로우 | `#FAAD14` | `var(--color-warning-yellow)` | 주의 아이콘, 하이라이트. |
| **Text Dark** | 짙은 차콜 | `#3A3530` | `var(--color-text-dark)` | 본문 텍스트, 오버레이 배경 위에 사용. |
| **BG Primary** | 뉴트럴 어스톤 | `#DDC2B9` | `var(--color-bg-primary)` | 전체 썸네일 배경 또는 오버레이 배경. |
| **BG Secondary** | 밝은 크림색 | `#F5EFEA` | `var(--color-bg-secondary)` | 정보 블록, 하이라이트 영역. |

### 📐 타이포그래피 (Font Stack)
- **Headline/Hook:** *Brush Script MT* 또는 유사한 캘리그래피체 (`font-family: 'Brush Script', cursive;`)
  - `font-size`: 48px~60px (모바일 최적화 고려 시 약 32px~40px)
- **Body/System:** *Pretendard* 또는 *Noto Sans KR* (`font-family: 'Pretendard', sans-serif;`)
  - `font-weight`: 500~700 (가독성 확보)
- **Detail/Callout:** *Courier New* 또는 유사 코딩 서체 (`font-family: 'Courier New', monospace;`)
  - `font-size`: 12px~14px (기술적 정보 전달)

### 🖼️ 레이아웃 및 컴포넌트 스펙

#### **A. 후킹 자막 (Hooking Title Card)**
- **배경:** `var(--color-bg-primary)` + `opacity: 0.8` 필터 적용.
- **텍스트 배치:** 화면 중앙 상단, `text-align: center`.
- **애니메이션:** 페이드 인 (`fadeIn`) 0.5 초 후, 스케일 업 (`scale(1) -> scale(1.05)`) 0.2 초.

#### **B. 시스템 오류 시각화 (System Error Visual)**
- **컴포넌트:** 붉은색 테두리 박스 (`border: 4px solid var(--color-alert-red)`), 내부에 빨간색 `⚠️` 아이콘.
- **레이어:** 오버레이 상단에 고정, 배경 이미지보다 지상 (`z-index: 10`).

#### **C. 솔루션 시각화 (Solution Visual)**
- **컴포넌트:** 파란색 또는 녹색 체크마크 아이콘 (`checkmark-icon.svg`), 흰색 배경 박스 (`background: var(--color-bg-secondary)`).
- **레이어:** 중앙 하단에 배치, 클릭 유도 요소.

---

## 4. 애니메이션 및 상호작용 가이드 (Tech Spec)

| 컴포넌트 | 애니메이션 타이밍 | 함수 | 비고 |
| :-- | :-- | :-- | :-- |
| **후킹 자막** | `0.5s` | `ease-out` | 화면 중앙에서 페이드 인 후 스케일 업. |
| **오류 아이콘** | `1.0s` | `bounce` | 경고 아이콘이 살짝 튕기는 효과 (주의 강조). |
| **시스템 업데이트** | `2.0s` | `step-end` | 오류 박스가 사라지고 솔루션 박스가 페이드 인. |

---

## 5. 결론 및 제언

- **추천 옵션:** **Option A (직관적 경고)**가 초기 클릭률(CTR) 이 가장 높을 것으로 예상됨. 베트남인 학습자의 심리적으로 "실수"를 강조하는 것이 호기심을 자극함.
- **실행 계획:**
  1.  Writer 의 스크립트 내용을 기반으로 Option A, B, C 의 썸네일 이미지를 제작 (Figma 또는 AI 이미지 생성 도구 활용).
  2.  Designer 가 제공한 디자인 시스템 가이드라인을 준수하여, 각 옵션의 PNG/JPG 파일 export.
  3.  YouTube Studio 에 업로드 시, 해당 썸네일과 함께 A/B 제목 전략 적용.

<create_file path="sessions/2026-05-28T12-55/designer_goal.md"><header># 🎨 Designer 에이전트 — 이번 주 목표</header>

**작성일:** 2026-05-28
**작성자:** 🎨 Designer (Lead Designer)

---

## 장기 목표 (3~6 개월)
- 브랜드 컬러·타이포·로고 시스템 확정
- 썸네일/포스트 템플릿 3 종 표준화

## 이번 주 목표
- **디자인 브리프 1 건 작성 (레퍼런스 5 장 포함):** ✅ (완료 — `thumbnail_overlays_brief.md` 및 `interactive_components_brief.md`)
- **썸네일 컨셉 3 안 비교 정리:** 🔄 (진행 중 — 다음 사이클에 이미지 생성 후 비교)

## 작업 원칙
- 텍스트 설명만 X — 색상 코드·폰트명·레이아웃 좌표까지 구체적으로

<create_file path="sessions/2026-05-28T12-55/designer.md"><header># 🎨 Designer (Lead Designer) — 2026. 05. 28 작업 로그</header>

**작성일:** 2026-05-28
**작성자:** 🎨 Designer (Lead Designer)

---

## ✅ 완료된 작업
1. **썸네일 오버레이 기획서 (`thumbnail_overlays_brief.md`) 작성:**
   - Option A (직관적 경고), B (솔루션 강조), C (궁금증 자극) 3 가지 옵션 구성.
   - 빨강 톤 유지 및 디자인 시스템 가이드라인 적용.
2. **인터랙티브 컴포넌트 레이아웃 브리프 (`interactive_components_brief.md`) 작성:**
   - UX 엔지니어링 명세서 스타일 (CSS 변수, 애니메이션 타이밍 포함).
   - Pain Point Trigger, Solution/OEA Process, Callout/Detail 3 가지 컴포넌트 상세 스펙 제공.

## 🔄 다음 단계
- **썸네일 이미지 생성 및 비교:** Option A, B, C 의 실제 썸네일 이미지를 생성하여 CTR 테스트를 위한 최적 옵션 선택.
- **비디오 파일 제작 지원:** 코다리 에이전트에게 인터랙티브 컴포넌트 스펙을 전달하여 로컬 자동화 파이프라인에 반영.

📊 평가: 완료 — 이번 사이클 목표 (디자인 브리프 1 건) 달성 및 다음 단계로 전환
📝 다음 단계: 썸네일 이미지 생성 및 CTR 테스트 옵션 선택