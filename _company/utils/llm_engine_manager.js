/**
 * @module LLM Engine Manager
 * @description 여러 로컬/원격 LLM 엔진에 대한 추상화된 인터페이스를 제공합니다.
 * 다양한 연결 방식 (직접 포트, REST API 등)을 단일 통일된 함수로 처리하여 시스템 안정성을 높입니다.
 */

// --- 1. Engine Configuration Definitions ---
/**
 * 각 엔진의 접속 정보를 정의하는 타입입니다.
 * @typedef {object} EngineConfig
 * @property {string} id - 고유 식별자 (e.g., 'ollama', 'vllm')
 * @property {string} name - 사용자 표시 이름
 * @property {'port'|'rest'} connectionType - 연결 방식: 포트 기반(Socket) 또는 REST API 호출
 * @property {object} connectionDetails - 접속 세부 정보 (host, port, authKey 등)
 */

const ENGINE_CONFIGS = [
    // 🟢 기존 엔진들
    {
        id: 'ollama',
        name: 'Ollama Local Server',
        connectionType: 'rest',
        connectionDetails: { baseUrl: 'http://localhost:11434/api' }, // 기본 Ollama REST endpoint 가정
    },
    {
        id: 'lmstudio',
        name: 'LM Studio Endpoint',
        connectionType: 'rest',
        connectionDetails: { baseUrl: 'http://localhost:5000/v1' }, // LM Studio API 포트 예시
    },

    // 🔴 새롭게 추가되는 엔진들 (Llama.cpp, vLLM)
    // Llama.cpp는 두 개의 독립적인 포트를 가정하고 구현합니다.
    {
        id: 'llama_cpp_p1',
        name: 'Llama.cpp Engine (Port 1)',
        connectionType: 'port', // 소켓 기반 연결을 가정
        connectionDetails: { host: 'localhost', port: 8080, protocol: 'tcp' },
    },
    {
        id: 'llama_cpp_p2',
        name: 'Llama.cpp Engine (Port 2)',
        connectionType: 'port', // 소켓 기반 연결을 가정
        connectionDetails: { host: 'localhost', port: 8081, protocol: 'tcp' },
    },

    // vLLM은 일반적으로 강력한 REST API를 제공합니다.
    {
        id: 'vllm_server',
        name: 'vLLM Inference Server',
        connectionType: 'rest',
        connectionDetails: { baseUrl: 'http://localhost:8000/generate' }, // vLLM의 일반적인 엔드포인트 가정
    }
];

// --- 2. Core Manager Class ---

/**
 * LLM 엔진 연결 및 추론 요청을 관리하는 핵심 클래스입니다.
 */
class EngineManager {
    constructor() {
        this.engines = ENGINE_CONFIGS;
        console.log("⚙️ [EngineManager] 초기화 완료. 다음 엔진들을 테스트할 수 있습니다:", this.engines.map(e => e.name).join(', '));
    }

    /**
     * 모든 연결 가능한 LLM 엔진을 순회하며, 요청된 프롬프트에 대해 추론 결과를 시도합니다.
     * 가장 먼저 성공적으로 응답하는 엔진의 결과를 반환하고 해당 엔진 ID를 반환합니다.
     * @param {string} prompt - API로 전송할 사용자 질문 (Prompt).
     * @returns {{result: string, engineId: string}|null} - 성공 시 결과와 사용된 엔진 ID, 실패 시 null.
     */
    async connectAndInfer(prompt) {
        console.log(`\n[Manager] ✨ 새로운 요청 감지: "${prompt}" 처리 시작.`);

        // 1. 모든 엔진을 순회하며 테스트 (Fallback 메커니즘)
        for (const engine of this.engines) {
            try {
                let result = null;
                console.log(`   -> [테스트] ${engine.name} (${engine.id})에 연결 시도...`);

                // 2. 엔진 타입별 연결 및 추론 실행
                if (engine.connectionType === 'rest') {
                    result = await this._callRestApi(engine, prompt);
                } else if (engine.connectionType === 'port') {
                    // 소켓 기반 포트 통신은 브라우저 환경에서는 어려우므로, 백엔드 호출을 가정합니다.
                    result = await this._callPortSocket(engine, prompt);
                }

                if (result) {
                    console.log(`   ✅ [성공] ${engine.name}에서 추론 성공!`);
                    return { result: result, engineId: engine.id };
                } else {
                    throw new Error("API 호출은 시도되었으나 응답을 받지 못했습니다.");
                }

            } catch (error) {
                console.warn(`   ⚠️ [경고] ${engine.name} (${engine.id}) 연결 실패: ${error.message}`);
                // 예외 처리를 통해 다음 엔진으로 자연스럽게 넘어갑니다.
                continue; 
            }
        }

        // 모든 엔진이 실패했을 경우
        console.error("❌ [실패] 모든 로컬 LLM 엔진에 대한 연결 및 추론 시도가 실패했습니다. 설정을 확인해주세요.");
        return null;
    }

    /**
     * REST API를 호출하는 내부 함수 (Ollama, vLLM 등)
     * @param {EngineConfig} engine - 현재 엔진 설정 객체.
     * @param {string} prompt - 사용자 프롬프트.
     * @returns {Promise<string>|null} 추론 결과 문자열 또는 null.
     */
    async _callRestApi(engine, prompt) {
        // 실제 구현에서는 fetch API 등을 사용하여 POST 요청을 보냅니다.
        // 여기서는 시뮬레이션합니다.
        await new Promise(resolve => setTimeout(resolve, 500)); // 네트워크 지연 시간 시뮬레이션

        if (engine.id === 'vllm_server' && Math.random() > 0.8) {
            // vLLM이 가끔 실패하는 상황을 가정하여 강제로 에러 발생시킴
            throw new Error("vLLM 서버 과부하: 요청 처리 불가.");
        }

        if (engine.id === 'ollama') {
             return `[Ollama 응답]: "시간 낭비는 시스템의 오류입니다. OEA를 통해 해결하세요."`;
        }
        // 나머지 REST 엔진은 성공했다고 가정하고 더미 결과를 반환합니다.
        return `[${engine.name} API 응답]: "${prompt}에 대한 구조적 답변을 제공합니다."`;
    }

    /**
     * 소켓 기반 포트 통신을 시뮬레이션하는 내부 함수 (Llama.cpp Port 1/2)
     * @param {EngineConfig} engine - 현재 엔진 설정 객체.
     * @param {string} prompt - 사용자 프롬프트.
     * @returns {Promise<string>|null} 추론 결과 문자열 또는 null.
     */
    async _callPortSocket(engine, prompt) {
        // 실제 구현에서는 WebSocket이나 TCP 소켓 클라이언트를 사용해야 합니다.
        await new Promise(resolve => setTimeout(resolve, 300)); // 포트 통신은 보통 빠르다는 가정

        if (Math.random() > 0.9) {
             throw new Error(`[Socket Timeout]: ${engine.connectionDetails.port} 포트에 연결할 수 없습니다.`);
        }

        return `[${engine.name} Socket 응답]: "${prompt}에 대한 실시간 소켓 기반 답변입니다."`;
    }
}

// --- 3. Export Initialization ---
const engineManagerInstance = new EngineManager();
export default engineManagerInstance;