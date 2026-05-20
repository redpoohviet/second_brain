// @file: interact-flowchart.ts
/**
 * @description '관찰→추출→자동화' 플로우차트의 인터랙티브 프로토타입 컴포넌트 구현 (TypeScript)
 * 이 코드는 Designer가 제공한 V1.0 명세서 및 기술 브리프를 기반으로 작성되었습니다.
 * 핵심 목표: 단순 시각화를 넘어, 사용자 액션(Hover/Click)에 따른 상태 변화와 트래킹 이벤트 발생 보장.
 */

// --- [ 🛠️ Utility & Tracking Functions ] ---

/**
 * @function trackEvent
 * @description Google Analytics 또는 자체 추적 API를 호출하는 가상의 함수입니다.
 * 실제 환경에서는 이 부분에 GA/GTM 스니펫을 삽입해야 합니다.
 * @param {string} eventName - 발생한 이벤트의 고유 이름 (예: 'observe_click', 'extract_complete')
 * @param {Object} [details] - 추가적인 속성 정보 (예: componentId, value)
 */
const trackEvent = (eventName: string, details: Record<string, any> = {}) => {
    console.log(`[TRACKING EVENT FIRED] Name: ${eventName}, Details: `, details);
    // TODO: 실제 API 호출 로직 구현 필요 (e.g., gtag('event', eventName, {...}))
};


// --- [ 🧱 Core Component Logic ] ---

/**
 * @function setupInteractiveObserveCard
 * @description 관찰(Observe) 단계의 카드 상호작용을 설정합니다.
 * 목표: 마우스 오버 시 '집중도' 변화 애니메이션 + 트래킹 발동.
 * @param {HTMLElement} element - DOM 요소 (관찰 카드)
 */
const setupInteractiveObserveCard = (element: HTMLElement) => {
    // 1. Hover 이벤트 리스너 추가
    element.addEventListener('mouseenter', () => {
        console.log("Observer Card: Mouse Entered");
        trackEvent('observe_card_hover', { componentId: 'obs-001' });
        element.classList.add('is-focused'); // CSS로 집중 애니메이션 트리거
    });

    // 2. Leave 이벤트 리스너 추가
    element.addEventListener('mouseleave', () => {
        console.log("Observer Card: Mouse Left");
        element.classList.remove('is-focused');
    });
};


/**
 * @function setupExtractInputComponent
 * @description 추출(Extract) 단계의 입력 폼 상호작용을 설정합니다.
 * 목표: 버튼 클릭 시 유효성 검사 및 '추출 성공' 트래킹 발동.
 * @param {HTMLElement} formElement - 폼 요소
 */
const setupExtractInputComponent = (formElement: HTMLFormElement) => {
    const submitButton = formElement.querySelector('.btn-extract');

    if (!submitButton) return;

    // 1. Submit 이벤트 리스너 추가
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputValue = (e.target as any).querySelector('#extractedValue') as HTMLInputElement;
        const extractedData = inputValue ? inputValue.value.trim() : '';

        if (!extractedData || extractedData.length < 5) {
            alert("⚠️ 유효한 데이터를 입력해주세요. 최소 5글자 이상이어야 합니다.");
            return; // 유효성 검사 실패 시 진행 중단
        }

        // 성공 로직 실행
        trackEvent('extract_successful', { dataLength: extractedData.length, source: 'user_input' });
        alert(`✅ 추출 완료! 데이터 '${extractedData}'를 다음 단계로 전송했습니다.`);
    });
};


/**
 * @function setupAutomateTriggerComponent
 * @description 자동화(Automate) 트리거의 핵심 인터랙션입니다.
 * 목표: 클릭 시 '자동화 프로세스 시작' 애니메이션 + 트래킹 발동.
 * @param {HTMLElement} triggerElement - 최종 액션 버튼/요소
 */
const setupAutomateTriggerComponent = (triggerElement: HTMLElement) => {
    // 1. Click 이벤트 리스너 추가
    triggerElement.addEventListener('click', () => {
        console.log("Automator Trigger: Action Initiated");
        trackEvent('automate_process_start', { targetSection: 'full_automation' });

        // 시뮬레이션 로직 (실제 API 호출을 가정)
        triggerElement.innerHTML = '<div class="loader-dots">Processing...</div>'; // 로딩 상태로 변경
        triggerElement.disabled = true;

        setTimeout(() => {
            alert("🚀 자동화 프로세스가 성공적으로 시작되었습니다! (API 호출 시뮬레이션)");
            triggerElement.innerHTML = '✅ 자동화 완료!';
            triggerElement.style.backgroundColor = '#4CAF50'; // 녹색으로 상태 변경
            // TODO: 실제 백엔드 API 콜과 성공/실패 핸들링 로직 추가 필요
        }, 1500);
    });
};


/**
 * @function initializeFlowchartPrototype
 * @description 모든 인터랙티브 컴포넌트의 초기화 함수. (메인 실행 지점)
 */
const initializeFlowchartPrototype = () => {
    console.log("💡 플로우차트 프로토타입 스크립트 로드 완료.");

    // 1. Observe Card 설정
    const observeCard = document.getElementById('observe-card');
    if (observeCard) setupInteractiveObserveCard(observeCard);

    // 2. Extract Component 설정
    const extractForm = document.querySelector('.extract-form');
    if (extractForm) setupExtractInputComponent(extractForm);

    // 3. Automate Trigger 설정
    const automateTrigger = document.getElementById('automate-trigger');
    if (automateTrigger) setupAutomateTriggerComponent(automateTrigger);
};


// DOMContentLoaded 이벤트가 발생하면 프로토타입 초기화 함수 실행
document.addEventListener('DOMContentLoaded', initializeFlowchartPrototype);