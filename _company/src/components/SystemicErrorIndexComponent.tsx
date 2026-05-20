// SystemicErrorIndexComponent.tsx - Props 기반의 오류 지표 대시보드 컴포넌트
import React from 'react';
import { useOeaStateMachine } from '../hooks/useOeaStateMachine';

interface ErrorIndexProps {
  /** 현재 OEA 상태 (예: Observe, Extract, Automate) */
  currentState: string; 
  /** 누적된 오류 지수 값 (0~100). 이 값이 메인 트igger가 됨. */
  errorIndexValue: number; 
  /** 가장 최근에 발생한 구조적 문제 유형 ('데이터 불일치', '프로세스 병목' 등) */
  lastTriggerType: string | null;
}

const SystemicErrorIndexComponent: React.FC<ErrorIndexProps> = ({
  currentState,
  errorIndexValue,
  lastTriggerType
}) => {
  // 1. 오류 지수(Error Index)에 따른 시각적 경고 레벨 결정
  let warningLevel = 'SAFE';
  if (errorIndexValue > 70) warningLevel = 'CRITICAL';
  else if (errorIndexValue > 40) warningLevel = 'WARNING';

  // CSS 변수 활용: 전역 상태에 따른 색상 변경을 정의합니다. [근거: Designer 검증된 지식]
  const levelColorMap = {
    'SAFE': 'var(--color-safe)', // 예: #6B8E23 (녹색 계열)
    'WARNING': 'var(--color-warning)', // 예: #FFC0CB (분홍/주황 계열)
    'CRITICAL': 'var(--color-critical)' // 예: #CC3333 (빨간색 계열)
  };

  return (
    <div className={`error-index-container ${warningLevel.toLowerCase()}`}>
      {/* 1. 메인 오류 지표 시각화 (SVG/Lottie): 실시간 변화 그래프 */}
      <svg width="100%" height="250" viewBox="0 0 1000 250" className="error-graph">
        {/* 배경: 가상의 최대치(100)를 나타내는 보이지 않는 축 */}
        <rect x="0" y="230" width="100%" height="20" fill="#ddd"/>
        {/* 메인 지표 바: errorIndexValue에 따라 높이와 색상이 변함. */}
        <rect 
          x="50" 
          y={`calc(250px - ${Math.min(errorIndexValue, 100) * 2.5}px)`} // Y축 계산
          width="80%" 
          height={`${Math.min(errorIndexValue, 100) * 2.5}%`} 
          fill={levelColorMap[warningLevel]} 
          className="data-bar"
        />
      </svg>

      {/* 2. 상태별 정보 모듈 (텍스트/아이콘): 현재 상황에 대한 설명 */}
      <div className="status-module">
        <h3 style={{ color: levelColorMap[warningLevel] }}>🚨 구조적 오류 지수: {errorIndexValue}%</h3>
        <p>현재 OEA 상태: <strong>{currentState}</strong></p>
        {lastTriggerType && (
            <div className="trigger-detail">
                🔍 최근 감지된 문제 유형: <span style={{ color: levelColorMap[warningLevel] }}>{lastTriggerType}</span>
            </div>
        )}
      </div>

      {/* 3. 애니메이션 로직 요구사항 명시 (CSS/JS) */}
      <style jsx>{`
        .data-bar { transition: height 0.8s ease-out, fill 0.5s; } /* 부드러운 변화 */
        @keyframes pulse-${warningLevel} {
          0%, 100% { transform: scale(1); box-shadow: none; }
          50% { transform: scale(1.02); box-shadow: 0 0 15px ${levelColorMap[warningLevel]}; }
        }
        .${warningLevel}-critical .data-bar { animation: pulse-CRITICAL 1s infinite ease-in-out; }
      `}</style>
    </div>
  );
};

export default SystemicErrorIndexComponent;