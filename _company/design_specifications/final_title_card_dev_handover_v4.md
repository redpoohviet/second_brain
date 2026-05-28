# 🎨 Jinny's Lab: 후킹 타이틀 카드 (Hooking Title Card) 개발 핸드오버 블루프린트 V4.0

## 🎯 핵심 목표 및 범위
본 문서는 '후킹 타이틀 카드 모듈 시스템(V3.0)'을 기반으로, 모든 감성적 변주(`Emotional Variations`)가 개발 환경에서 오차 없이 구현될 수 있도록 설계된 **최종 코드 명세서**입니다. 단순한 디자인 가이드가 아닌, 개발팀이 즉시 참조할 수 있는 CSS 및 JavaScript 로직 지침에 초점을 맞춥니다.

## 🧱 섹션 1: 전역 변수 시스템 (Global Variables - MUST USE)
모든 시각 요소는 아래 정의된 CSS 변수를 사용해야 합니다. 이 변수는 `<body>` 또는 최상위 `<style>` 태그에서 선언되어야 합니다.

```css
:root {
    /* --- COLOR VARIABLES (Primary Palette) --- */
    --color-bg-primary: #DDC2B9; /* 뉴트럴 어스톤 / 세피아 베이지 */
    --color-text-dark: #3A3530;  /* 짙은 차콜 그레이 */
    --color-secondary-highlight: #FFC74F; /* 강조 노랑 (Attention Grabber) */
    --color-accent-red: var(--color-text-dark); /* 부정적 감정 자극 시 사용 */
    --color-success-green: #5BAE6A; /* 해결책 제시 시 사용 */

    /* --- TYPOGRAPHY & SIZE VARIABLES --- */
    --font-family-hooking: 'Brush Script MT', cursive, sans-serif; /* Headline/Hook 느낌 */
    --font-family-body: 'Pretendard', 'Noto Sans KR', sans-serif; /* 본문/시스템 정보 */
    --size-h1: 3.5rem;           /* 메인 후킹 문구 (가장 크게) */
    --size-h2: 2.0rem;           /* 서브 타이틀 또는 핵심 단어 */
    --size-p: 1.1rem;            /* 일반 설명 텍스트 */

    /* --- INTERACTION & TIMING VARIABLES --- */
    --transition-duration: 0.5s; /* 기본 전환 시간 (Transition Time) */
    --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* 부드러운 아웃 트랜지션 함수 */
}
```

## 📐 섹션 2: 컴포넌트 구조 및 HTML/CSS Skeleton
**[컴포넌트 이름]**: `HookingTitleCard` (모듈 단위로 개발)

### 2.1 기본 HTML 구조 (Skeleton)
<div class="hooking-title-card" id="main-container">
    <!-- Pain Point Trigger: 좌측 섹션 -->
    <div class="trigger-module">
        <h3 class="hook-text">[Hooking Text Goes Here]</h3>
        <p class="pain-point-detail">Pain Point Description. (Ex: 시간 낭비, 비효율성)</p>
    </div>

    <!-- Solution/OEA Process: 우측 섹션 -->
    <div class="solution-module">
        <h2 class="system-title">[Solution Title]</h2>
        <div class="process-flow-container">
            <!-- 여기에 O->E->A 단계별 컴포넌트가 들어감 -->
        </div>
        <button id="cta-button" class="action-button">자세히 보기 / 자동화 시작</button>
    </div>
</div>
```

### 2.2 핵심 CSS 스타일링 (Skeleton)
(모든 속성은 `var(--...)` 변수를 사용해야 함.)
```css
/* --- A. 전체 컨테이너 설정 --- */
.hooking-title-card {
    display: flex;
    justify-content: space-between; /* 좌우 구조 분할 필수 */
    gap: 40px;
    padding: 50px;
    background-color: var(--color-bg-primary);
    /* 빈티지 필름 질감 적용 (Global CSS에서 background-image로 처리) */
}

/* --- B. Pain Point Trigger Module (좌측) --- */
.trigger-module {
    flex: 1; /* 전체 공간의 40% 차지 */
}
.hook-text {
    font-family: var(--font-family-hooking);
    font-size: var(--size-h1);
    color: var(--color-accent-red); /* 감성적 자극을 위해 강조 색상 사용 */
    animation: slideInLeft 0.8s ease-out; /* 애니메이션 적용 */
}

/* --- C. Solution Module (우측) --- */
.solution-module {
    flex: 1.2; /* 전체 공간의 60% 차지 */
}
.system-title {
    font-family: var(--font-family-body);
    color: var(--color-text-dark);
    /* ... 나머지 스타일링 ... */
}

/* --- D. 상호작용 요소 (Interactive Element) --- */
.action-button {
    background-color: var(--color-success-green);
    transition: transform 0.2s, box-shadow 0.2s; /* 애니메이션 필수 */
    cursor: pointer;
}
/* [상태 변화]: Hover 시 살짝 커지거나(transform: scale(1.05)), 그림자가 깊어지는 효과 필요 */
```

## ✨ 섹션 3: 상호작용 로직 (JavaScript Event Listener 명세)
모든 애니메이션과 상태 변경은 JS 이벤트 리스너를 통해 제어되어야 합니다.

### 3.1 초기 로딩 시퀀스 (Initial Load Sequence)
*   **요소:** `hook-text`와 `.process-flow-container`
*   **로직:** 페이지가 로드된 후, 애니메이션 타이밍에 맞춰 순차적으로 등장해야 함.
    ```javascript
    // JS 예시: 0초 지연 -> .trigger-module fadeIn (duration 0.5s)
    setTimeout(() => {
        document.querySelector('.hook-text').classList.add('visible');
    }, 100);

    // JS 예시: 0.3초 지연 후, OEA 플로우 차트 애니메이션 시작
    setTimeout(() => {
        document.querySelector('.process-flow-container').classList.add('active');
    }, 300);
    ```

### 3.2 버튼 클릭 시 로직 (CTA Interaction)
*   **요소:** `#cta-button`
*   **로직:** 사용자가 CTA를 클릭하면, 단순한 페이지 이동이 아니라 **'데이터 로딩 애니메이션'**과 함께 다음 단계(예: OEA 프로세스 상세 설명 화면)로 전환되어야 함.
    ```javascript
    document.getElementById('cta-button').addEventListener('click', () => {
        // 1. 버튼 비활성화 및 로딩 상태 변경 (시각적 피드백 제공)
        const button = document.getElementById('cta-button');
        button.innerHTML = '데이터 분석 중...';
        button.disabled = true;

        // 2. Simulate API Call / Data Load Animation (3초 동안 진행되는 애니메이션을 구현할 영역)
        setTimeout(() => {
            // 성공적으로 로딩 완료 시, 다음 섹션으로 스크롤 이동 또는 컴포넌트 교체
            alert('자동화 파이프라인 연결 준비 완료! 다음 페이지로 이동합니다.');
        }, 3000);
    });
    ```

---
**[개발팀 검토 요청 사항]**: 위의 `final_title_card_dev_handover_v4.md` 파일을 기반으로, **실제 동작하는 인터랙티브 프로토타입(Mock-up Video 또는 Figma Link 형태)**을 제작하여 시각적 정확성을 최종적으로 검증해주십시오.