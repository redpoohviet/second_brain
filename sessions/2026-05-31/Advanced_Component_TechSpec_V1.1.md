# 💎 Jinny's Lab Advanced Component Technical Specification V1.1
(Global Design System Manual V1.0 및 Component Library V2.0 기반)

## 🎯 1. 목표 및 원칙 (Goal & Principles)

*   **목표:** 콘텐츠의 전환율을 높이는 핵심 요소(CTA, Data Viz)에 대한 명확한 기술 사양서를 제공하여, 디자인과 개발 간의 오차를 제로화한다.
*   **원칙:** 모든 컴포넌트는 **'상태 변화(State Change)'** 로직을 기반으로 정의되어야 하며, 색상 및 크기는 반드시 CSS 변수(`var(--...)`)를 사용해야 한다.

## 🎨 2. 핵심 인터랙티브 패턴: CTA (Call-to-Action) 시스템 컴포넌트

CTA는 단순 버튼이 아닌, 사용자 심리 변화에 반응하는 '시스템 트리거'로 작동한다.

### A. Primary CTA Button (`--cta-primary`)
*   **용도:** 콘텐츠의 핵심 구매/행동 유도 (예: "지금 무료 체험하기").
*   **기술 사양:**
    *   `background-color`: `var(--color-brand-accent)` (Primary Accent Color)
    *   `padding`: `1rem 2.5rem`
    *   `border-radius`: `0.375rem`
    *   **[Interaction: Hover State]**: 배경색이 어두워지고(`var(--color-brand-accent-dark)`), 그림자 효과가 미묘하게 커지며 (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);`), 텍스트에 `transform: translateY(-2px)`의 부드러운 이동 애니메이션을 적용한다.
    *   **[Interaction: Active State (Click)]**: 버튼이 눌리는 듯한 물리적 효과를 부여 (`box-shadow: none; transform: scale(0.98);`) 하며, 클릭 시 0.1초간 짧은 진동/반응 애니메이션을 준다.

### B. Secondary CTA Link Block (`--cta-secondary`)
*   **용도:** 보조적인 정보 제공 또는 다음 단계로의 유도 (예: "더 알아보기").
*   **기술 사양:**
    *   `display`: `inline-flex`, `align-items: center`.
    *   `color`: `var(--color-text-dark)`
    *   `border-bottom`: 2px solid transparent (기본 상태)
    *   **[Interaction: Hover State]**: 밑줄이 왼쪽에서 오른쪽으로 순차적으로 그려지는 애니메이션 (`border-image` 또는 CSS 애니메이션 키프레임 사용). 그리고 `margin-left: 1rem;`의 아이콘(➡️)이 페이드 인하며 함께 움직인다.

## 📊 3. 데이터 시각화 컴포넌트 패턴 (Data Visualization Patterns)

OEA 프로세스 및 학습 데이터를 시각화하는 데 필요한 표준 패턴을 정의한다. 모든 그래프는 '성장'과 '흐름'의 느낌을 강조해야 한다.

### A. 프로세스 흐름 다이어그램 (`--flow-diagram`)
*   **용도:** O→E→A처럼 단계별 과정을 보여줄 때 사용.
*   **기술 사양:**
    *   **[Structure]**: 세로 또는 가로 배열의 노드(Node)와 연결선(Connector)으로 구성된다.
    *   **[Node Component]**: 배경색: `var(--color-bg-secondary)` / 텍스트: `var(--color-text-dark)`. 각 단계는 간결한 아이콘과 짧은 키워드를 포함한다.
    *   **[Interaction: Active Step]**: 현재 진행 중인 단계(Focus State)의 노드는 배경색이 `var(--color-brand-accent)`로 채워지고, 테두리가 두꺼워지며 (`border-width: 3px`), 다른 요소들보다 미묘하게 전경으로 떠오르는 듯한 그림자 효과를 준다.
    *   **[Connector Animation]**: 노드와 노드를 연결하는 화살표(Arrow)는 단순히 선이 아니라, **'데이터가 흐르는 듯한 페이드 인 + 좌우 그라데이션 이동 애니메이션'**을 적용한다 (Duration: 0.6s).

### B. 진행률 막대 그래프 (`--progress-bar`)
*   **용도:** 학습 진척도나 특정 지표의 달성 정도를 보여줄 때 사용.
*   **기술 사양:**
    *   **[Structure]**: 전체 배경(`var(--color-bg-primary)`) 위에 목표치 길이의 막대와 현재 값 길이의 채워지는 막대로 구성된다.
    *   **[Animation: Loading/Filling]**: 값이 로드되는 과정은 단순히 퍼센트가 변하는 것이 아니라, **좌측에서 우측으로 데이터가 빠르게 '채워지며(Fill)'**, 동시에 미세한 빛의 잔상 효과(Glow Effect)를 동반해야 한다. (Transition-timing: `cubic-bezier(0.25, 1, 0.5, 1)`).
    *   **[Micro-interaction]**: 사용자가 마우스를 올리면(`hover`), 막대의 끝 부분이 살짝 튕기거나(`scale(1.03)`) 색상이 더 밝게 변하는 반응을 준다.

## ✨ 4. 공통 애니메이션 및 트랜지션 가이드라인 (Global Transition Rules)

*   **Transition 기본값:** 모든 주요 컴포넌트는 `transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);`를 기본으로 한다.
*   **Fade In/Out:** 화면에 새로운 콘텐츠가 등장하거나 사라질 때는 갑작스러운 변화 대신, 배경의 질감과 어우러진 부드러운 페이드 효과(`opacity: 0` -> `opacity: 1`)와 함께 나타나야 합니다.

***