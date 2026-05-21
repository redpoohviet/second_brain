import React, { useMemo } from 'react';

/**
 * @typedef {object} SEIDataPoint
 * @property {string} timestamp - ISO 8601 format time string.
 * @property {number} seiValue - System Error Index value (e.g., 15.2).
 * @property {'Normal' | 'Warning' | 'Critical'} status - Current system state status.
 */

/**
 * @typedef {object} SEIProps
 * @property {SEIDataPoint[]} dataPoints - Mocked time-series data array for simulation.
 * @property {number} initialSei - Initial SEI value (e.g., 10.0).
 * @property {boolean} simulateCriticalFailure - Whether to force the critical failure state in mock data logic.
 */

/**
 * 코다리: 시스템 구조 오류 지표(SEI) 시뮬레이션 인터랙티브 컴포넌트 프로토타입.
 * <p>Props 기반 Mock Data를 사용하여 상태 전이 로직과 Critical Failure 애니메이션을 테스트합니다.</p>
 * @param {SEIProps} props
 */
const SEI_SimulationComponent = ({ 
    dataPoints, 
    initialSei, 
    simulateCriticalFailure 
}) => {
    // --- [로직 검증: Critical Failure 로직] ---
    /**
     * Mock 데이터를 기반으로 상태 전이와 애니메이션을 제어하는 핵심 로직.
     * 실제로는 API 호출 결과가 이 배열의 원천이 되어야 합니다.
     */
    const processDataPoints = useMemo(() => {
        let currentSei = initialSei;
        let processed = [];

        // Critical Failure 시나리오 모방: 특정 지점에서 급격한 수직 상승을 강제합니다.
        if (simulateCriticalFailure && dataPoints.length > 2) {
            const criticalIndex = Math.floor(dataPoints.length / 2); // 중간 지점
            
            // Critical Failure 시작 시점을 임의로 정의하고, 그 이후 데이터 포인트를 조작합니다.
            for (let i = 0; i < dataPoints.length; i++) {
                let point = {...dataPoints[i]};

                if (i === criticalIndex) {
                    // Critical Failure 발생: SEI를 급격히 폭증시킵니다.
                    point.seiValue = Math.max(100, point.seiValue * 5 + (Math.random() * 20)); // 수직 상승 로직
                    point.status = 'Critical';
                } else if (i > criticalIndex) {
                     // Failure 이후에도 높은 불안정성을 유지하도록 가중치를 부여합니다.
                    point.seiValue = point.seiValue * 1.1 + (Math.random() * 5);
                    point.status = 'Warning';
                } else {
                    // 정상 구간의 SEI는 부드럽게 상승하거나 안정화됩니다.
                    point.seiValue = point.seiValue + (i === 0 ? 0 : Math.min(1, dataPoints[i].seiValue / 2));
                    if (point.seiValue > 40) {
                        point.status = 'Warning';
                    } else if (point.seiValue < 5) {
                         point.status = 'Normal';
                    } else {
                         point.status = 'Normal';
                    }
                }

                processed.push({ ...point, seiValue: parseFloat(point.seiValue.toFixed(2)), status: point.status });
            }
        } else {
            // 일반 데이터 처리 (단순 매핑)
             processed = dataPoints.map(p => ({ 
                 ...p, 
                 seiValue: parseFloat(p.seiValue.toFixed(2)) 
             }));
        }

        return processed;
    }, [dataPoints, initialSei, simulateCriticalFailure]);


    // --- [렌더링 로직] ---

    const getStatusColor = (status) => {
        switch (status) {
            case 'Normal': return 'text-green-600';
            case 'Warning': return 'text-yellow-500';
            case 'Critical': return 'text-red-700 font-bold animate-pulse'; // Critical 강조
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-800">📈 SEI 상태 변화 시뮬레이터 (Mock Data)</h2>
            <p className="mb-8 text-sm text-gray-500">[기술 증명: 이 컴포넌트는 Props 기반 로직으로, 실제 API 데이터를 받아 State Transition을 관리합니다.]</p>

            {/* 메인 그래프/시각화 영역 */}
            <div className="relative h-64 bg-white p-4 rounded-lg border flex items-end justify-between overflow-hidden">
                {/* 가상의 시간 축 (Time Axis) */}
                <div className="absolute left-0 right-0 h-px bg-gray-200 z-10 top-[calc(100%-1px)]"></div>

                {processDataPoints.map((point, index) => {
                    // SEI 값에 비례한 높이 계산 (최대 100을 가정하여 비율 적용)
                    const heightPercent = Math.min(100, point.seiValue * 2); // 시각적 과장 효과

                    return (
                        <div key={index} className="flex flex-col items-center mx-[1%] z-20 transition-all duration-700 ease-out transform hover:scale-y-105">
                            {/* SEI 그래프 막대 */}
                            <div 
                                style={{ height: `${heightPercent}%` }} 
                                className={`w-8 rounded-t-lg transition-all duration-700 shadow-lg ${getStatusColor(point.status)}`}
                                title={`SEI: ${point.seiValue} (${point.status})`}
                            ></div>
                            {/* 데이터 레이블 */}
                            <span className="text-xs mt-2 text-gray-600">T+{index * 15}min</span>
                        </div>
                    );
                })}

                 {/* 최종 경고 메시지 (Critical Failure 시에만 활성화) */}
                {processDataPoints[processDataPoints.length - 1]?.status === 'Critical' && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-800 px-6 py-3 rounded-full shadow-2xl animate-pulse z-30 border-4 border-yellow-300">
                        🚨 CRITICAL SYSTEM FAILURE DETECTED! 🚨
                    </div>
                )}

            </div>


            {/* 상세 데이터 표 */}
             <div className="mt-8">
                 <h3 className="text-xl font-semibold mb-4 text-gray-700">📊 시뮬레이션 로그 (Mock Data)</h3>
                 <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-inner">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEI Value</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {processDataPoints.map((point, index) => (
                                <tr key={index} className={`hover:bg-yellow-50 ${index === processDataPoints.length - 1 && point.status === 'Critical' ? 'bg-red-100 border-l-4 border-red-600' : ''}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{point.timestamp}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"><strong>{point.seiValue}</strong></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(point.status)}`}>
                                            {point.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </div>

        </div>
    );
};

export default SEI_SimulationComponent;