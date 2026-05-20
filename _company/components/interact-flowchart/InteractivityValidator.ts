import { DiffTrackerService } from '../../utils/DiffTrackerService';

/**
 * 인터랙티브 플로우차트 컴포넌트의 최종 배포 전 검증 로직.
 * 이 클래스는 모든 핵심 상태 전이(State Transition)와 데이터 흐름을 
 * 반드시 '비교 추적' 과정을 거치도록 강제합니다.
 */
export class InteractivityValidator {
    private readonly diffService = new DiffTrackerService();

    constructor() {}

    /**
     * OEA 프로세스 플로우의 모든 단계별 아티팩트를 받아 검증하는 메인 함수.
     * @param {object} latestAssets - 현재 버전으로 정의된 모든 핵심 자산 (스크립트, 스펙 등).
     * @param {object} previousAssets - 이전 세션에서 확정되었던 기준 자산.
     * @returns {Promise<string>} 검증 로그 및 Diff Report.
     */
    public async validateFlow(latestAssets: { [key: string]: any }, previousAssets: { [key: string]: any }): Promise<string> {
        let allReports: string[] = [];

        // 1. 스크립트/카피 비교 (Text Diff)
        const scriptDiff = this.diffService.trackTextDiff(
            latestAssets.scriptCopy, 
            previousAssets.scriptCopy
        );
        allReports.push(`[SCRIPT DIFF REPORT] ${scriptDiff.summary}\n${scriptDiff.diffMarkdown}`);

        // 2. 디자인/기술 스펙 비교 (Structured Diff)
        const specDiff = this.diffService.trackStructuredDiff(
            latestAssets.techSpec, 
            previousAssets.techSpec
        );
        allReports.push(`[TECH SPEC DIFF REPORT] ${specDiff.summary}\n${specDiff.diffJson}`);

        // 3. 시각 자산 비교 (Visual Diff)
        const visualDiff = this.diffService.trackVisualAssetDiff(
            latestAssets.visualSpec, 
            previousAssets.visualSpec
        );
        allReports.push(`[VISUAL ASSET DIFF REPORT] ${visualDiff.diffReport}`);

        // 최종 종합 보고서
        return `\n===================================================\n`;
        return `✨ [Flowchart Validation Complete] ✨\n모든 아티팩트 검증 완료. 다음 배포 전, 아래의 Diff Report를 반드시 리뷰하고 승인받아야 합니다:\n${allReports.join('\n\n')}\n===================================================`;
    }
}