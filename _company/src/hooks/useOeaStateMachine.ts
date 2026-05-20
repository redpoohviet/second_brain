// useOeaStateMachine.ts
import { useState, useCallback } from 'react';

/**
 * OEA 프로세스의 모든 유효한 상태와 그 정의를 담는 타입 정의
 */
export type FlowState = 'INITIAL' | 'OBSERVATION_ACTIVE' | 'DATA_EXTRACTION_PENDING' | 'SYSTEM_ERROR_DETECTED' | 'AUTOMATION_SUCCESS';

/**
 * OEA 흐름의 핵심 로직을 관리하는 상태 머신 훅.
 * 외부 UI 컴포넌트와 비즈니스 로직(상태 전이)을 분리하여 테스트 용이성을 극대화합니다.
 */
export const useOeaStateMachine = () => {
    const [state, setState] = useState<FlowState>('INITIAL');

    // 초기 상태 설정 및 유효성 검사 (가드 로직 1)
    if (state === 'INITIAL') {
        console.log("✅ State Machine Initialized: Waiting for Pain Point Trigger.");
    }

    /**
     * [트리거 함수] 관찰(Observe) 단계 시작 시 호출됨.
     */
    const triggerObservation = useCallback(() => {
        if (state !== 'INITIAL') {
            console.error("⚠️ Error: Observation can only start from INITIAL state.");
            return false;
        }
        setState('OBSERVATION_ACTIVE');
        console.log("🚀 State Transition: Initial -> OBSERVATION_ACTIVE");
        return true;
    }, [state]);

    /**
     * [트리거 함수] 데이터 추출(Extract) 과정 중 시스템 오류가 감지되었을 때 호출됨.
     */
    const triggerSystemError = useCallback(() => {
        if (state !== 'OBSERVATION_ACTIVE' && state !== 'DATA_EXTRACTION_PENDING') {
            console.error("⚠️ Error: System Error detected only during Observation or Extraction phase.");
            return false;
        }
        setState('SYSTEM_ERROR_DETECTED');
        console.log("🚨 State Transition: [Current] -> SYSTEM_ERROR_DETECTED");
        // 실제 로직에서는 여기서 '시스템적 구조 오류 지표'를 계산하는 API 호출이 발생해야 합니다.
        return true;
    }, [state]);

    /**
     * [트리거 함수] 추출 및 자동화 과정이 성공적으로 완료되었을 때 호출됨.
     */
    const triggerAutomationSuccess = useCallback(() => {
        if (state !== 'DATA_EXTRACTION_PENDING') {
            console.error("⚠️ Error: Automation Success can only be called from DATA_EXTRACTION_PENDING state.");
            return false;
        }
        setState('AUTOMATION_SUCCESS');
        console.log("✅ State Transition: DATA_EXTRACTION_PENDING -> AUTOMATION_SUCCESS");
        // 성공 시, 다음 단계(예: 구매 유도 CTA)로의 스크롤 또는 컴포넌트 활성화 로직을 여기에 추가합니다.
        return true;
    }, [state]);

    // 현재 상태와 전이 함수들을 외부에서 사용할 수 있도록 반환
    return { state, triggerObservation, triggerSystemError, triggerAutomationSuccess };
};