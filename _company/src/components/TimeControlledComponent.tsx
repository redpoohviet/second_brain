import React, { useState, useEffect, useCallback } from 'react';
import useTimeTrigger from '../hooks/useTimeTrigger';

// State machine definition (Tech Spec v2.0 기반)
type FlowState = 'INTRO' | 'OBSERVE' | 'EXTRACT' | 'AUTOMATE' | 'FINISHED';

interface ComponentProps {
  state: FlowState;
}

/**
 * @description TimeCode와 State Trigger에 따라 렌더링되는 핵심 컴포넌트 컨테이너.
 * 이 컴포넌트는 useTimeTrigger 훅을 통해 상태 변화를 감지하고, 적절한 자식 컴포넌트를 렌더링해야 합니다.
 */
const TimeControlledComponent: React.FC<ComponentProps> = ({ state }) => {
  // 1. Hook 사용 및 현재 시간/상태 파악
  const { isTransitionActive, currentState } = useTimeTrigger();

  // 강제 상태 전환 시뮬레이션을 위한 핸들러 (예: 버튼 클릭)
  const handleManualTransition = useCallback((nextState: FlowState) => {
    if (currentState !== nextState && ['OBSERVE', 'EXTRACT'].includes(nextState)) {
        console.log(`[SYSTEM TRIGGER]: 강제 상태 전환 시도 -> ${nextState}`);
        // 실제 환경에서는 여기에 Context/Redux Dispatch를 통해 전역 상태 변경을 유발해야 함.
        // 여기서는 Hook의 내부 로직을 직접 호출한다고 가정합니다.
        // useTimeTrigger().forceTransition(nextState); // 가상 함수 호출
    }
  }, [currentState]);

  let ComponentToRender;
  
  switch (state) {
    case 'INTRO':
      ComponentToRender = <div className="section-intro">안녕하세요! 시스템의 비효율성을 발견하는 여정입니다.</div>;
      break;
    case 'OBSERVE':
      // 관찰 단계 컴포넌트 (스크롤 또는 시간 경과로 진입)
      ComponentToRender = <div className="section-observe">관찰(Observation): 현재 시스템의 비효율적 프로세스를 파악합니다.</div>;
      break;
    case 'EXTRACT':
      // 추출 단계 컴포넌트 (사용자 액션/클릭 트리거)
      ComponentToRender = <div className="section-extract">추출(Extraction): 핵심 가치와 데이터 변수([VAR])를 뽑아냅니다.</div>;
      break;
    case 'AUTOMATE':
      // 자동화 단계 컴포넌트 (최종 목표/구매 유도)
      ComponentToRender = (
        <div className="section-automate">
          자동화(Automation): 시스템 재설계가 필요한 순간입니다. 🚀 <button onClick={() => handleManualTransition('FINISHED')}>다음</button>
        </div>
      );
      break;
    case 'FINISHED':
      ComponentToRender = <h2 className="completed">✅ 프로세스 완료! 이제 행동할 시간입니다.</h2>;
      break;
  }

  return (
    <section className={`flow-section ${isTransitionActive ? 'transitioning' : ''}`}>
      {/* State Transition Debugging Area */}
      <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '20px' }}>
        <strong>[DEBUG] 현재 상태: {currentState}</strong> | 
        상태 변화 감지 중: {isTransitionActive ? '🟢 Active' : '🔴 Idle'}
      </div>

      {/* 실제 콘텐츠 */}
      <div className="content-container">
        {ComponentToRender}
      </div>

      {/* 수동 전환 버튼 (테스트 용) */}
       <div style={{ marginTop: '30px', textAlign: 'center' }}>
         <button onClick={() => handleManualTransition('OBSERVE')} disabled={currentState !== 'INTRO'}>Observe로 강제 이동</button>
         <button onClick={() => handleManualTransition('EXTRACT')} disabled={currentState !== 'OBSERVE'}>Extract로 강제 이동</button>
       </div>
    </section>
  );
};

export default TimeControlledComponent;