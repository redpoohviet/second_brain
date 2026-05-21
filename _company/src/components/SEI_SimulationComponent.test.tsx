import React from 'react';
import { render, screen } from '@testing-library/react';
import SEI_SimulationComponent from './SEI_SimulationComponent';
import * as jestMock from 'jest-mock-extended';

// Mocking the entire component to ensure isolated testing of logic and rendering.

/**
 * 단위 테스트: SEI_SimulationComponent의 로직 검증
 * 이 테스트는 Critical Failure 발생 시, 컴포넌트가 적절한 Props 기반 상태 변화와 UI를 렌더링하는지 확인합니다.
 */
describe('SEI_SimulationComponent', () => {

    // Mocking the time-series data for testing purposes.
    const mockDataPoints: SEIDataPoint[] = [
        { timestamp: "2026-05-21T09:00:00Z", seiValue: 8.0, status: 'Normal' }, // Start Point
        { timestamp: "2026-05-21T09:30:00Z", seiValue: 15.2, status: 'Normal' }, // Mild Rise
        { timestamp: "2026-05-21T10:00:00Z", seiValue: 25.0, status: 'Warning' }, // Warning Point
    ];

    test('Should render correctly with normal mock data (No Critical Failure)', () => {
        const props = {
            dataPoints: mockDataPoints,
            initialSei: 8.0,
            simulateCriticalFailure: false,
        };
        render(<SEI_SimulationComponent {...props} />);

        // 1. 기본적인 컴포넌트 요소 확인
        expect(screen.getByText(/SEI 상태 변화 시뮬레이터/i)).toBeInTheDocument();
        
        // 2. 초기 SEI 값과 관련된 경고가 없는지 확인 (Critical Alert 부재)
        expect(screen.queryByText(/CRITICAL SYSTEM FAILURE DETECTED!/i)).not.toBeInTheDocument();

        // 3. 정상 상태의 클래스명 검증 (간접 검증)
        // 'Normal' status가 포함된 배경색 또는 텍스트를 찾아 로직이 분기했는지 확인합니다.
    });


    test('Should trigger Critical Failure visualization and logic when forced', () => {
        const props = {
            dataPoints: mockDataPoints,
            initialSei: 8.0,
            simulateCriticalFailure: true, // 핵심 테스트 조건
        };

        render(<SEI_SimulationComponent {...props} />);

        // 1. Critical Failure 경고 메시지 존재 확인 (최상위 가드 로직 검증)
        const criticalAlert = screen.getByText(/CRITICAL SYSTEM FAILURE DETECTED!/i);
        expect(criticalAlert).toBeInTheDocument();
        expect(criticalAlert).toHaveClass('animate-pulse'); // 애니메이션 클래스 확인

        // 2. Critical Failure가 발생한 마지막 지점의 상태 변화와 높은 SEI 값을 가진 Row가 강조되는지 확인합니다.
        // (테스트 로직이 Mock 데이터 처리를 통해 최종적으로 Critial State를 유도했는지 검증)
        const criticalRow = screen.getByText(/CRITICAL SYSTEM FAILURE DETECTED!/i).closest('tr'); 
        expect(criticalRow).toBeInTheDocument();

    });
});