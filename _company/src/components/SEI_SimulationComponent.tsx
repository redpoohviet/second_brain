// SEI_SimulationComponent.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { SEIDataPoint, SimulationState } from '../types/simulationTypes'; // 가정된 타입 파일

/**
 * @description Critical Event Timeline Component의 핵심 로직을 담는 스켈레톤 컴포넌트.
 * 이 컴포넌트는 외부에서 주입되는 JSON 데이터셋(SEI 값)을 기반으로 UI 상태와 애니메이션 루프를 트리거하는 역할을 합니다.
 * 
 * [TODO] 현재 단계: Props 정의 및 기본 구조 완성. 실제 애니메이션/데이터 가공은 Designer가 담당할 부분입니다.
 */

// Mocking the type definitions for immediate testing
type SEIDataPoint = { time: number; seiValue: number; eventType: 'Observe' | 'Extract' | 'Automate'; };
type SimulationState = 'Idle' | 'Observing' | 'Extracting' | 'SystemFailure' | 'Resolved';

interface SEISimulationProps {
    /** 시간 코드별 SEI 데이터 배열. 필수 입력입니다. */
    seiData: SEIDataPoint[];
    /** 초기 시스템 상태 (ex: 시작 시점). */
    initialState: SimulationState;
    /** 컴포넌트가 마운트될 때 실행할 최초 이벤트 트리거. */
    triggerInitialEvent?: () => void;
}

const SEI_SimulationComponent: React.FC<SEISimulationProps> = ({ seiData, initialState, triggerInitialEvent }) => {
    // 1. 상태 관리 (State Management Skeleton)
    const [currentState, setCurrentState] = useState<SimulationState>(initialState);
    const [isLoading, setIsLoading] = useState(false);

    /**
     * @description 데이터셋을 순회하며 현재 시점의 UI 상태와 애니메이션 트리거를 계산하는 핵심 로직.
     * 이 함수는 외부 API 호출이나 비동기 데이터 처리를 모방합니다.
     * @param data - 전체 SEI 데이터 배열.
     */
    const processTimelineData = useCallback((data: SEIDataPoint[]): { currentSEI: number; nextState: SimulationState | null; isCritical?: boolean } => {
        if (!data || data.length === 0) {
            return { currentSEI: 0, nextState: null };
        }

        // 마지막 데이터 포인트를 기준으로 현재 상태를 파악합니다.
        const lastPoint = data[data.length - 1];
        let newState: SimulationState | null = null;
        let isCriticalEvent = false;

        // 가드 로직: SEI 값이 임계점(예: 0.2)을 넘었는지 확인하여 상태 전이 유도
        if (lastPoint.seiValue > 0.8 && currentState !== 'SystemFailure') {
            newState = 'SystemFailure'; // Critical Failure Trigger!
            isCriticalEvent = true;
        } else if (lastPoint.eventType === 'Automate' && currentState !== 'Resolved') {
            // 자동화 단계에 도달하면 정상 완료로 간주할 수 있습니다.
             newState = 'Resolved';
        } else {
            // 그렇지 않으면, 이전 이벤트 타입으로 상태를 추적합니다.
            if (lastPoint.eventType === 'Observe') newState = 'Observing';
            else if (lastPoint.eventType === 'Extract') newState = 'Extracting';
            else newState = null;
        }

        return { 
            currentSEI: lastPoint.seiValue, 
            nextState: newState,
            isCritical: isCriticalEvent
        };
    }, [currentState]);


    // 2. 사이드 이펙트 처리 (Lifecycle/Effect Hook)
    useEffect(() => {
        if (triggerInitialEvent) {
             // 초기 마운트 시 이벤트 트리거를 실행합니다. (예: 첫 관찰 단계 시작)
            triggerInitialEvent();
        }

        // 1초 간격으로 데이터 변화에 따른 상태 업데이트를 시뮬레이션하여 애니메이션 루프 테스트 환경을 조성합니다.
        const interval = setInterval(() => {
            setIsLoading(true);
            setCurrentState(prev => {
                // 실제로는 API 콜이나 사용자 액션에 의해 currentState가 바뀝니다.
                // 여기서는 로직 검증을 위해 간단한 상태 전이 시뮬레이션을 합니다.
                if (currentState === 'Observing' && seiData[seiData.length - 1].eventType === 'Extract') {
                    return 'Extracting';
                } else if (currentState === 'Extracting' && seiData[seiData.length - 1].seiValue > 0.9) {
                    // 임계값 초과 시, 강제로 실패 상태로 전환합니다.
                    return 'SystemFailure';
                }
                return currentState; // 변화 없으면 유지
            });
            setIsLoading(false);

        }, 1000);

        return () => clearInterval(interval);
    }, [seiData, triggerInitialEvent]);


    // 3. 렌더링 로직 (Render Skeleton)
    const { currentSEI, nextState, isCritical } = processTimelineData(seiData);

    let statusClass = '';
    if (isCritical) {
        statusClass = 'text-red-600 animate-pulse'; // Critical State Styling Hook
    } else if (nextState === 'SystemFailure') {
        statusClass = 'text-yellow-500 border-l-4 border-yellow-500';
    }

    return (
        <div className={`p-6 bg-gray-800 rounded-xl shadow-2xl ${isCritical ? 'border-red-700' : ''}`}>
            <h3 className="text-2xl font-bold text-white mb-4">OEA Flow Simulator: SEI Index Tracking</h3>
            
            {/* 디버깅/상태 표시 영역 */}
            <div className={`p-4 rounded-lg border-l-8 ${statusClass} bg-gray-700 transition-all duration-500`}>
                <p className="text-sm text-gray-300">현재 프로세스 상태: <span className="font-bold uppercase">{currentState}</span></p>
                {isCritical && (
                    <p className="mt-2 text-red-400 font-semibold">🚨 CRITICAL ALERT! 시스템 통제력 상실 감지. SEI 임계점 초과!</p>
                )}
            </div>

            {/* 핵심 지표 표시 영역 */}
            <div className="mt-6 space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-400">현재 SEI 값 (Systemic Efficiency Index)</label>
                    <p className={`text-5xl font-extrabold transition-all duration-700 ${isCritical ? 'text-red-500' : 'text-cyan-400'}`}>
                        {currentSEI.toFixed(3)} 
                        <span className="text-lg ml-2 text-gray-500">({Math.round(currentSEI * 100) / 100})</span>
                    </p>
                </div>

                 {/* 애니메이션 트리거를 위한 가상의 그래프 컴포넌트 위치 */}
                 <div className="h-64 bg-gray-700 flex items-center justify-center rounded-lg p-4 mt-8 shadow-inner">
                     <span className='text-gray-400'>[Placeholder] 애니메이션 루프 및 데이터 그래프 시각화 영역 (Lottie/SVG)</span>
                 </div>

            </div>

             {/* 디버깅용 로그 */}
            <div className="mt-6 p-3 bg-black text-xs rounded">
                <p className='text-green-400'>[DEBUG] State: {currentState} | SEI: {currentSEI.toFixed(3)} | Critical: {isCritical ? 'True' : 'False'} </p>
            </div>
        </div>
    );
};

export default SEI_SimulationComponent;