// 💻 코다리 — 시니어 풀스택 엔지니어
// 🎯 목표: OEA 프로세스 시뮬레이션 및 SEI 데이터 시각화 로직 구현

import { registerSW } from 'workbox-window';

const canvas = document.getElementById('sei-visualizer');
const ctx = canvas.getContext('2d');
const warningOverlay = document.getElementById('warning-overlay');
const seiValueDisp = document.getElementById('sei-value-disp');
const subtitleText = document.getElementById('subtitle');
const btnStart = document.getElementById('btn-start');
const statusDisplay = document.getElementById('status-display');

// 📊 상태 관리 (State Management)
let state = {
    sei: 0, // System Error Index (0 - 100%)
    isRunning: false,
    phase: 'IDLE', // IDLE, FRUSTRATION, SYSTEM_ERROR, RESOLUTION
    animationFrameId: null
};

// 🎨 비주얼 설정 (Designer Spec 반영)
const config = {
    seiCriticalThreshold: 90,
    colors: {
        idle: '#ffffff',
        frustration: '#ffaa00', // 노란색 경고
        error: '#ff3e3e',       // 글리치 레드
        resolution: '#00f2ff'   // 블루 성공
    }
};

// 🧠 시나리오 데이터 (Writer Spec)
const scenarioScript = [
    { time: 0, text: "안녕하세요. 시스템 오류로 인해 당신의 시간이 사라지는 경험을 해보셨나요?" },
    { time: 4, text: "단순한 귀결이 아닌, 구조적 오류입니다." },
    { time: 8, text: "PAIN POINT: 시간의 낭비와 통제력 상실" },
    { time: 12, text: "SEI (System Error Index) 임계치 도달..." },
    { time: 16, text: "SYSTEM FAILURE DETECTED. CONTROL LOST." }, // 글리치 효과 시작
    { time: 20, text: "해결책은 명확합니다. $27 Diagnostic Checklist" },
    { time: 24, text: "지금 바로 클릭하여 시스템을 재설정하세요." }
];

// 🎞️ 캔버스 크기 조정 (반응형)
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ⚙️ 초기화 함수
function init() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 그리드 배경 그리기 (Tech Spec)
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    const gridSize = 50;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // 초기화면 메시지
    drawText("OEA SIMULATOR READY", canvas.width/2, canvas.height/3, '#555', 40);
}

// 🎬 애니메이션 루프
function animate() {
    if (!state.isRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 상태에 따른 그리드 색상 변경 (Tech Spec 반영)
    let gridColor = '#111';
    if (state.phase === 'FRUSTRATION') gridColor = config.colors.frustration;
    if (state.phase === 'SYSTEM_ERROR') gridColor = config.colors.error;

    // 📊 SEI 데이터 시각화 (Growing Data Burst)
    drawSEIVisualizer(gridColor);
    
    requestAnimationFrame(animate);
}

// 📊 SEI 그래프 그리기 로직
function drawSEIVisualizer(color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;

    // 원형 그래프 그리기 (SEI 비율에 따른 호)
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (state.sei * Math.PI / 180); // 0~360도 매핑
    
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();

    // 데이터 파동 효과 (시각적 증명)
    if (state.phase === 'SYSTEM_ERROR' || state.sei > 80) {
        drawGlitchEffect(ctx, color);
    }
}

// ⚡ 글리치 노이즈 효과 (Critical SEI 시)
function drawGlitchEffect(context, color) {
    const width = context.canvas.width;
    const height = context.canvas.height;
    
    // 랜덤으로 작은 네온 사각형 그리기
    for(let i=0; i<5; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const w = Math.random() * 100;
        context.fillStyle = color;
        context.fillRect(x, y, w, 2);
    }
}

// 📝 자막 렌더링
function renderSubtitle(text) {
    subtitleText.innerText = text;
    
    // 상태 전이에 따른 폰트/색 변경
    if (state.phase === 'SYSTEM_ERROR') {
        subtitleText.style.color = config.colors.error;
        subtitleText.style.fontWeight = '900';
        subtitleText.style.textShadow = `4px 4px 0px ${config.colors.error}`;
    } else if (state.phase === 'FRUSTRATION') {
        subtitleText.style.color = config.colors.frustration;
        subtitleText.style.fontWeight = '700';
    } else {
        subtitleText.style.color = '#fff';
        subtitleText.style.textShadow = 'none';
    }
}

// 🧠 시나리오 실행 로직
function runSimulation() {
    state.isRunning = true;
    state.phase = 'FRUSTRATION'; // 초기 단계: 불편함 인지
    
    let currentTime = 0;
    
    const loop = () => {
        if (!state.isRunning) return;

        // 📊 SEI 증가 로직 (시스템 오류 심화)
        // 상태 전이에 따라 증가 속도가 다르게 설정됨 (Technical Proof)
        let incrementSpeed = 0.5; 
        if (state.phase === 'FRUSTRATION') incrementSpeed = 0.3;
        if (state.phase === 'SYSTEM_ERROR') incrementSpeed = 2.0; // 폭발적 상승
        
        state.sei += incrementSpeed;

        // 🔄 상태 전이 로직 (State Transition)
        if (state.phase === 'FRUSTRATION' && state.sei >= 30) {
            state.phase = 'SYSTEM_ERROR'; // 임계치 도달
            warningOverlay.style.display = 'block'; // 경고 오버레이 표시
        }

        // 🎬 자막 타이밍 처리
        const currentScript = scenarioScript.find(s => s.time === currentTime);
        if (currentScript) {
            renderSubtitle(currentScript.text);
        } else if (state.sei >= config.seiCriticalThreshold) {
            renderSubtitle("CRITICAL: SYSTEM ERROR DETECTED");
        }

        // ⏱️ 시간 증량
        currentTime += 0.1; 
        requestAnimationFrame(animate);
    };

    loop();
}

// 🎛️ UI 이벤트 리스너
btnStart.addEventListener('click', () => {
    if (state.isRunning) return;
    
    // 초기화
    state.sei = 0;
    state.phase = 'IDLE';
    warningOverlay.style.display = 'none';
    renderSubtitle("OEA Simulator Start");
    
    // 시뮬레이션 시작
    runSimulation();
});

// 🛡️ 자동 초기화 (브라우저 복귀)
window.addEventListener('beforeunload', () => {
    if (state.isRunning) state.isRunning = false;
});

init();