/**
 * [MOCK] 외부 API와 연동되는 과정을 시뮬레이션합니다. 
 * 실제 로딩 시간과 성공/실패 메시지를 통해 기술적 신뢰도를 높입니다.
 * @param {string} processName - 수행하는 프로세스 이름
 */
function simulateApiCall(processName) {
    const element = document.querySelector('.flow-component[data-stage="extract"]');
    if (!element) return;

    // 로딩 상태 초기화
    element.innerHTML += '<div class="loader" aria-live="polite">데이터 분석 중... 잠시만 기다려주세요 ⚙️</div>';

    console.log(`[API Mock] ${processName} 프로세스 시작.`);

    setTimeout(() => {
        // 성공 시뮬레이션 (1500ms 지연)
        const resultHtml = `
            <div class="api-result success">
                <h4>✅ 분석 완료: 핵심 원인 추출 성공</h4>
                <p>가장 큰 비효율의 근본 원인은 '정보의 파편화'와 '선형적 사고방식'에 있습니다. 이를 구조적으로 접근해야 합니다.</p>
                <button class="cta-button secondary" onclick="console.log('추출된 핵심 키워드: Data Fragmentation')">키워드 저장</button>
            </div>
        `;
        element.innerHTML = element.innerHTML.replace('.loader', resultHtml);
        console.log("[API Mock] 데이터 추출 성공.");

    }, 1500); // KPI Critical Zone의 타이밍에 맞춘 지연 시간 (1.5초)
}