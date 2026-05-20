import { useState, useEffect } from 'react';

/**
 * @description 특정 시간 간격(Pacing)에 따라 상태 변화를 강제하는 훅 (Shorts Adaption Layer).
 * @param intervalMs - 상태가 변경될 주기 (밀리초 단위).
 * @param initialPhase - 초기 상태.
 * @param maxPhases - 최대 도달 가능한 페이즈 수.
 * @returns 현재 활성화된 '페이즈'와 이를 관리하는 함수들.
 */
export const useTimeTrigger = (intervalMs: number, initialPhase: string, maxPhases: number) => {
  const [currentPhase, setCurrentPhase] = useState(initialPhase);

  useEffect(() => {
    if (!intervalMs || intervalMs <= 0) return;

    let timerId: NodeJS.Timeout | null = null;
    let currentCount = 1; // 시작 시점을 카운트하여 페이즈 증가를 유도

    const phaseTimer = setInterval(() => {
      setCurrentPhase(prevPhase => {
        if (currentCount < maxPhases) {
          // 상태 전환 로직: 이전 페이즈 -> 다음 페이즈
          const nextPhase = `phase_${currentCount + 1}`;
          console.log(`[TimeTrigger]: ${prevPhase} -> ${nextPhase}`);

          // 여기서 실제 비즈니스 로직(예: API 호출 시뮬레이션, 데이터 업데이트)을 실행할 수 있습니다.
          // 예: runOeaCheck(data);

          currentCount++;
          return nextPhase;
        } else {
          clearInterval(phaseTimer!);
          console.log("[TimeTrigger]: Max Phases reached. Ending sequence.");
          return 'completed';
        }
      });
    }, intervalMs);

    timerId = phaseTimer;

    // 클린업 함수: 컴포넌트 언마운트 시 타이머 제거
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [intervalMs, maxPhases]); // 의존성 배열에 intervalMs와 maxPhases를 넣어주어야 정확함

  return { currentPhase, setPhase: setCurrentPhase };
};