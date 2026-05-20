import React, { useState } from 'react';
import { useOeaStateMachine, OeaState, TransitionData } from '../hooks/useOeaStateMachine'; // Assume this hook is in the correct relative path

// 타입 정의: 초기 데이터 입력 인터페이스 (최소 기능 단위)
interface InitialFormData {
  observationInput: string; // 관찰된 문제점(Pain Point)
  sourceSystem: string;     // 데이터 출처 시스템 (예: CRM, Spreadsheet)
}

/**
 * OEA 프로세스 흐름 시뮬레이터 MVP 컴포넌트.
 * 상태 전이 로직을 테스트하고 초기 데이터를 입력받는 인터페이스를 제공합니다.
 */
const OEA_FlowSimulator: React.FC = () => {
  // 1. 상태 관리 시스템 통합 (훅 사용)
  const [state, setState] = useState<OeaState>({ state: 'OBSERVATION', currentStep: null });
  const { stateMachine, transition } = useOeaStateMachine();

  // 2. 초기 데이터 입력 핸들러 (테스트 인터페이스 역할)
  const handleInitialSubmit = async (formData: InitialFormData) => {
    console.log("--- [Simulator] Observing initial data:", formData);
    
    // 상태 전이를 트리거하는 핵심 로직 호출 (가장 첫 단계 Transition)
    try {
      await transition('OBSERVATION', formData);
    } catch (error) {
      console.error("Transition failed during observation phase.", error);
    }
  };

  // 3. UI 렌더링 및 상호작용 로직
  return (
    <div className="mea-flow-simulator p-6 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">OEA Flow Simulator MVP</h2>
      <p className="mb-6 text-sm text-gray-600">
        *현재 상태 전이 로직(State Transition Logic)만 구현된 최소 단위입니다. 실제 디자인 에셋은 이후 적용됩니다.*
      </p>

      {/* ⭐️ A. 초기 데이터 입력 인터페이스 (Testing Input Form) */}
      <section className="mb-8 p-4 border border-indigo-200 bg-white rounded-md">
        <h3 className="text-xl font-semibold mb-3 text-indigo-700">Step 1: 관찰 (Observation) 데이터 입력</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleInitialSubmit({ observationInput: e.target.observationInput?.value || '', sourceSystem: e.target.sourceSystem?.value || 'Unknown' }); }}>
          <div className="mb-4">
            <label htmlFor="obsInput" className="block text-sm font-medium text-gray-700">관찰된 비효율성/Pain Point (필수)</label>
            <input 
              type="text" 
              id="obsInput" 
              name="observationInput" 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
              placeholder="예: 데이터 수동 취합 과정에서 시간 지연 발생" 
              required 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="sourceSystem" className="block text-sm font-medium text-gray-700">데이터 출처 시스템</label>
            <select 
              id="sourceSystem" 
              name="sourceSystem" 
              className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="CRM">CRM 시스템</option>
                <option value="Spreadsheet">스프레드시트 (Sheet)</option>
                <option value="Manual">수동 입력/기타</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            관찰 데이터 전송 및 다음 단계로 이동 (Transition Trigger)
          </button>
        </form>
      </section>

      {/* ⭐️ B. 상태 시각화 영역 (State Visualization - MVU) */}
      <section className="mt-10 p-6 bg-white border rounded-md">
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">현재 시스템 상태: {stateMachine ? stateMachine.name : '대기'}</h3>
        {/* 실제 컴포넌트가 들어갈 자리 */}
        <div className="p-6 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">
            [여기에 현재 상태 ({stateMachine?.name})를 시각화하는 인터랙티브 컴포넌트가 렌더링됩니다.]
        </div>

        {/* 디버깅용 메시지 */}
        <p className="mt-4 text-sm text-red-600">
          [DEBUG] 상태 전이 로직: {JSON.stringify(stateMachine)}
        </p>
      </section>
    </div>
  );
};

export default OEA_FlowSimulator;