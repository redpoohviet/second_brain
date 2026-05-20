// TimePassageSimulationGraphComponent.tsx - 시간 흐름에 따른 불안감 증폭 시뮬레이터
import React from 'react';

interface GraphProps {
  /** 경과된 총 시간 (초) */
  elapsedTimeSeconds: number; 
  /** 시스템 오류 발생 임계점 (예: 90초) */
  errorThreshold: number; 
}

const TimePassageSimulationGraphComponent: React.FC<GraphProps> = ({
  elapsedTimeSeconds,
  errorThreshold
}) => {
  // 애니메이션 로직 정의: 시간이 흐름에 따라 '위험 구역'이 점진적으로 확대되는 원형 또는 그래프 형태가 필요합니다.
  const dangerRatio = Math.min(1, elapsedTimeSeconds / errorThreshold);

  return (
    <div className="time-simulation-graph">
      <h4>⏳ 시간 경과에 따른 시스템 안정성 예측</h4>
      {/* Lottie/SVG를 대체하는 개념적 컴포넌트 */}
      <svg width="300" height="300" viewBox="0 0 100 100" className="circular-graph">
        {/* 배경 원 (안정성) */}
        <circle cx="50" cy="50" r="48" fill="#eee" stroke="#ccc" strokeWidth="2"/>

        {/* 위험 구역: dangerRatio에 따라 채워지는 영역 */}
        <circle 
          cx="50" cy="50" r="48" 
          fill="none" 
          stroke="var(--color-critical)" 
          strokeWidth="12" 
          strokeDasharray={`${Math.max(0, dangerRatio * 360)} ${360}`} // 다이내믹한 대시 배열 사용
          style={{ transformOrigin: '50% 50%' }}
        />

        {/* 경과 시간 포인터 (현재 시점) */}
        <line 
            x1="50" y1="50" x2={`calc(50 + ${dangerRatio * 360}px)`} y2="50" 
            stroke="#3A3530" strokeWidth="2" transformOrigin="50% 50%"
        />

        {/* 중앙 정보 표시 */}
        <text x="50" y="50" textAnchor="middle" className="time-label">
          T: {Math.floor(elapsedTimeSeconds)}s / 임계점: {errorThreshold}s
        </text>
      </svg>
    </div>
  );
};

export default TimePassageSimulationGraphComponent;