import React from 'react';

// Hero Section은 가장 강력한 Hook과 CTA를 담아야 합니다.
const HeroSection: React.FC = () => {
  return (
    <div>
      {/* Headline & Value Prop */}
      <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 animate-glitch">
        당신의 시간 낭비는 '노력' 부족이 아닙니다. <span className="block text-xl mt-2 text-gray-300">시스템 구조 오류(SEI)입니다.</span>
      </h1>
      <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-400">
        '관찰 $\rightarrow$ 추출 $\rightarrow$ 자동화'의 프로세스를 기술적으로 증명하고, 본질적인 통제력을 되찾으세요.
      </p>

      {/* Sticky CTA 역할을 하는 고정된 버튼 (실제 구현에서는 sticky-top 적용 필요) */}
      <div className="mt-12 p-8 bg-gray-900 shadow-2xl border-t-4 border-red-600/50">
        <h2 className="text-3xl font-bold mb-4 text-white">🔥 시스템 오류 진단 체크리스트 $27</h2>
        <p className="text-lg mb-8 text-gray-400">지금 바로 1단계의 근본 원인을 파악하고 시간을 되찾으세요.</p>
        {/* 실제 구매 버튼은 PurchaseFormSection에서 재사용될 예정 */}
      </div>
    </div>
  );
};

export default HeroSection;