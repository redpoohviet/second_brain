import { renderHook, act } from '@testing-library/react-hooks';
import useTimeTrigger from './useTimeTrigger';

describe('useTimeTrigger Hook', () => {
  // 초기 상태 테스트
  it('should initialize to the starting state (INTRO)', () => {
    const { result } = renderHook(() => useTimeTrigger());
    expect(result.current.currentState).toBe('INTRO');
    expect(result.current.isTransitionActive).toBe(false);
  });

  // 시간 경과 기반 상태 전이 테스트 (Time Trigger)
  it('should transition state after simulated time interval', async () => {
    const { result } = renderHook(() => useTimeTrigger());
    
    // 1. 초기 상태 확인
    expect(result.current.currentState).toBe('INTRO');

    // 2. 시간 경과를 시뮬레이션하여 다음 단계로 강제 진입 (테스트 목적)
    await act(async () => {
        // 실제로는 setTimeout/setInterval을 mock 처리해야 하지만, 개념 증명을 위해 직접 함수 호출 가정
        result.current.simulateTimePassage('OBSERVE'); 
    });

    // 3. 상태가 업데이트되었는지 확인
    expect(result.current.currentState).toBe('OBSERVE');
    expect(result.current.isTransitionActive).toBe(true); // 전환 중임을 표시해야 함
  });

  // 사용자 액션 기반 상태 전이 테스트 (State Trigger) - 가장 중요!
  it('should transition state upon explicit user action trigger', async () => {
    const { result } = renderHook(() => useTimeTrigger());
    
    // 1. 초기화 후, 'OBSERVE' 단계에 도달했다고 가정합니다.
    await act(async () => {
        result.current.forceTransition('OBSERVE'); // Setup state for testing
    });

    // 2. 사용자가 핵심 데이터를 발견하고 다음 액션으로 전환한다고 가정 (Pain Point Trigger)
    await act(async () => {
        result.current.handleUserActionTrigger('EXTRACT'); 
    });

    // 3. 상태가 'EXTRACT'로 정확히 전환되었는지 확인
    expect(result.current.currentState).toBe('EXTRACT');
    expect(result.current.isTransitionActive).toBe(true); // 전환 중임을 다시 표시해야 함
  });
});