import React, { useState } from 'react';
// Mock API Call 함수를 구현할 파일입니다.
import { simulatePaymentApiCall } from '../utils/apiService'; 

interface PaymentState {
    isLoading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
}

const PurchaseFormSection: React.FC = () => {
  const [state, setState] = useState<PaymentState>({
    isLoading: false,
    isSuccess: false,
    errorMessage: null,
  });

  // 🚀 핵심 로직: 결제 시뮬레이션 함수
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ isLoading: true, isSuccess: false, errorMessage: null });

    try {
      // Mock API 호출을 사용하여 실제 서버 통신처럼 보이게 합니다.
      const result = await simulatePaymentApiCall(27); 

      if (result.success) {
        setState({ isLoading: false, isSuccess: true, errorMessage: null });
        alert(`✅ 결제 성공! ${result.message}`);
      } else {
        setState({ isLoading: false, isSuccess: false, errorMessage: result.error || "알 수 없는 오류가 발생했습니다." });
      }
    } catch (e) {
      console.error("Payment processing failed:", e);
      setState({ isLoading: false, isSuccess: false, errorMessage: "네트워크 연결을 확인해주세요." });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-12 rounded-xl shadow-[0_0_30px_rgba(255,69,0,0.4)] border-t-4 border-red-600">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-white">
        🚨 시스템 구조 오류 진단 (Tripwire Product)
      </h2>
      <p className="text-lg text-gray-300 text-center mb-8">
        $27 USD 체크리스트. 1단계로 통제력 상실의 근본 원인을 파악하세요.
      </p>

      {/* 구매 폼 */}
      <form onSubmit={handlePurchase} className="space-y-6">
        <div>
          <label htmlFor="card" className="block text-sm font-medium text-gray-300 mb-2">
            💳 결제 수단 (Mock Test)
          </label>
          <input 
            type="text" 
            id="card" 
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:ring-red-500/50 focus:border-red-500" 
            placeholder="Visa ending in XXXX (테스트 카드 번호)" 
            required
          />
        </div>

        {/* 결제 버튼 - 로직 구현 */}
        <button
          type="submit"
          disabled={state.isLoading}
          className={`w-full py-4 text-xl font-bold rounded-lg transition duration-300 ${
            state.isLoading 
              ? 'bg-red-800/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-900/50'
          }`}
        >
          {state.isLoading ? '진단 중... 데이터 전송 대기...' : 'PayPal으로 $27 지불하고 진단 시작'}
        </button>

        {/* 상태 메시지 피드백 */}
        {state.errorMessage && (
          <p className="text-red-400 text-sm mt-4 p-3 bg-red-900/50 rounded">
            ⚠️ 오류: {state.errorMessage}
          </p>
        )}
        {state.isSuccess && (
          <p className="text-green-400 text-sm mt-4 p-3 bg-green-900/50 rounded font-semibold animate-pulse">
            ✨ 성공: 진단 체크리스트를 다운로드하고 다음 단계로 나아가세요!
          </p>
        )}
      </form>
    </div>
  );
};

export default PurchaseFormSection;