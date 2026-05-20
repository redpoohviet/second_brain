document.addEventListener('DOMContentLoaded', () => {
    const abTestHookEl = document.getElementById('ab-test-hook');
    const productCtaBanner = document.getElementById('product-cta-banner');

    // 1. Writer가 제공한 A/B 테스트 변수 목록 (데이터 레이블화)
    const hookVariables = [
        { name: 'HOOK_SHOCK', copy: "⚠️ 당신이 이 영상을 끝까지 안 보면, 최소 5시간을 버리는 거예요.", weight: 3 }, // 높은 중요도 부여
        { name: 'HOOK_EMPATHY', copy: "어제만 해도 저도 시간 낭비하는 게 습관이었어요. 그래서요...", weight: 2 },
        { name: 'HOOK_CURIO', copy: "혹시, 우리가 무의식적으로 'OEA 프로세스'를 사용하고 있다는 사실 아세요?", weight: 1 },
        { name: 'HOOK_DIRECT', copy: "✋ 잠깐, 멈추세요. 지금 당신이 하는 이 행동, 효율 0%입니다.", weight: 3 }, // 높은 중요도 부여
        { name: 'HOOK_IRONY', copy: "만약 시간 낭비가 쌓인 총량이 1년 치 월급이었다면?", weight: 2 }
    ];

    // Hook 변수를 가중치 기반으로 무작위 선택 (A/B 테스트 시뮬레이션)
    function selectRandomHook() {
        let totalWeight = hookVariables.reduce((sum, item) => sum + item.weight, 0);
        let randomNum = Math.random() * totalWeight;

        for (const variable of hookVariables) {
            if (randomNum < variable.weight) {
                return variable.copy;
            }
            randomNum -= variable.weight;
        }
    }

    // A/B 테스트 Hook을 Hero Section에 동적 주입
    abTestHookEl.textContent = selectRandomHook();
    document.getElementById('hero-section').classList.add('visible');


    // 2. KPI Critical Zone: 타이밍 기반 CTA 강제 등장 로직 (T=10s~T=15s 시뮬레이션)
    // 스크롤 위치와 시간 경과를 결합하여 가장 강력한 순간에 배너가 터지게 합니다.
    window.addEventListener('scroll', () => {
        const ctaZone = document.getElementById('cta-zone');
        if (ctaZone && !productCtaBanner.classList.contains('visible')) {
            // 스크롤이 CTA Zone의 70% 지점을 넘었을 때, 타이머를 재설정하거나 즉시 활성화합니다.
            const rect = ctaZone.getBoundingClientRect();
            if (rect.top - window.innerHeight / 2 < 150 && rect.bottom > window.innerHeight / 2) {
                // 스크롤이 해당 영역에 진입했으면, 배너를 강제로 노출시키고 애니메이션 시작
                productCtaBanner.classList.remove('hidden');
                setTimeout(() => {
                    productCtaBanner.classList.add('visible');
                }, 100); // 약간의 지연 시간을 주어 깜짝 효과 극대화
            }
        }
    });

    // 3. OEA 플로우차트 상호작용 로직 (State Management) - 간소화된 버전
    const flowComponents = document.querySelectorAll('.flow-component');
    let flowState = { currentStage: 'observe', hasTriggeredBuy: false };

    // 단계별 이벤트 리스너 부착 (클릭 또는 스크롤 시 상태 변화 유도)
    flowComponents.forEach(component => {
        component.addEventListener('click', () => {
            const targetStage = component.dataset.stage;
            if (!checkStateTransition(targetStage)) return;

            // 단계별 이벤트 로직 실행 (여기서 API 호출을 시뮬레이션)
            processOeaStep(targetStage);
        });
    });
});


/**
 * 상태 전이 가드 로직: 현재 상태가 다음 단계로 이동하는 것이 논리적으로 가능한지 검증합니다.
 * @param {string} nextState - 목표 스테이지 ('observe', 'extract', 'automate')
 * @returns {boolean} - 전이가 가능하면 true, 아니면 false
 */
function checkStateTransition(nextState) {
    const currentState = document.querySelector('.flow-component.active')?.dataset.stage || 'none';

    if (currentState === nextState) return false; // 이미 그 단계임

    // 논리적 순서 강제: Observe -> Extract -> Automate
    if (nextState === 'extract' && currentState !== 'observe') {
        console.warn("⚠️ [System Error] Extraction은 Observation 단계를 거쳐야 합니다.");
        return false;
    }
    if (nextState === 'automate' && currentState !== 'extract') {
        console.warn("⚠️ [System Error] Automation은 Extraction 단계가 완료되어야 합니다.");
        return false;
    }

    // 유효성 검증 통과
    document.querySelector('.flow-component')?.classList.remove('active'); // 기존 활성화 해제
    const newComponent = document.querySelector(`.flow-component[data-stage="${nextState}"]`);
    if (newComponent) {
        newComponent.classList.add('active');
    }
    return true;
}

/**
 * OEA 단계별 프로세스 시뮬레이션 및 API 호출 가짜(Mock) 로직 실행
 * @param {string} stage - 현재 진행 중인 스테이지
 */
function processOeaStep(stage) {
    console.log(`[PROCESS] Starting ${stage} step...`);

    // 1. Observation -> Extract: 시뮬레이션 API 호출 (데이터 추출 과정)
    if (stage === 'extract') {
        const apiSimulator = window.simulateApiCall; // utils/api_simulator.js에서 정의된다고 가정
        
        // 실제 API 호출을 시뮬레이션하며 로딩 스피너와 데이터 수신 과정을 보여줌
        apiSimulator("비효율 패턴 분석"); 

    } else if (stage === 'automate') {
        alert("🎉 OEA 프로세스 완벽 완료! 이제 시스템적 해결책이 눈앞에 있습니다.");
        // 자동화 단계가 끝나면, 최종 CTA 배너의 가시성을 높이는 로직을 추가할 수 있음.
    }
}

</script>