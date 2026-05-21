// API Mocking Layer: 실제 서버 호출을 시뮬레이션하는 더미 서비스입니다.
/**
 * @description 외부 결제 게이트웨이(PayPal/Stripe) 연동을 모방합니다.
 * 이 함수는 비동기 처리, 로딩 시간, 성공/실패 상태를 정확하게 재현하여 
 * 프론트엔드 컴포넌트의 견고성을 테스트하는 것이 목표입니다.
 * @param amount 구매 금액 (USD)
 * @returns Promise<SuccessResponse | ErrorResponse>
 */
export const simulatePaymentApiCall = async (amount: number): Promise<{ success: boolean, message: string, error?: string }> => {
    console.log(`[API Mock] Attempting to process payment for $${amount}...`);

    // 1500ms의 지연 시간(Delay)을 주어 실제 네트워크 호출처럼 보이게 합니다.
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 테스트 실패 케이스 시뮬레이션: 'FAIL'이 카드 번호에 포함되면 실패 처리
    const mockCardNumber = "XXXX-XXXX-XXXX-1234"; // 실제로는 사용자 입력받지만, 예시로 하드코딩합니다.
    if (mockCardNumber.includes("FAIL")) {
        return { 
            success: false, 
            message: "", 
            error: "결제 게이트웨이에서 승인 거부 오류(Authorization Failed)가 발생했습니다." 
        };
    }

    // 성공 케이스 시뮬레이션
    return { 
        success: true, 
        message: `${amount} USD 결제가 정상적으로 완료되었습니다. 진단 리포트를 확인해주세요.`,
        error: undefined
    };
};