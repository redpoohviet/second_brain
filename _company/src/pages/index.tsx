import React, { useState } from 'react';
import Head from 'next/head';
// 🎨 컴포넌트 임포트
import HeroSection from '../components/HeroSection';
import ProblemGraphSection from '../components/ProblemGraphSection';
import PurchaseFormSection from '../components/PurchaseFormSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Global 스타일링 및 CSS 임포트 */}
      <Head>
        <title>System Error Diagnosis | Jinny's Lab</title>
        <link rel="stylesheet" href="/src/styles/GlitchEffects.css" /> {/* Glitch 효과 적용 */}
      </Head>

      {/* 📌 Global Layout Container (Mobile First Focus) */}
      <main className="container mx-auto px-4 py-12">
        
        {/* 🚀 1. Hero Section: 후킹과 가치 정의 (Sticky CTA 포함 구조) */}
        <section id="hero" className="py-20 text-center border-b border-red-800/30">
          <HeroSection /> {/* 컴포넌트 호출 */}
        </section>

        {/* 📉 2. Problem Graph Section: 공감 및 불안 자극 (데이터 기반) */}
        <section id="problem" className="py-24 bg-gray-800/50">
          <ProblemGraphSection /> {/* 컴포넌트 호출, SEI 데이터 사용 예정 */}
        </section>

        {/* 💰 3. Purchase Form Section: 구매 및 전환 유도 (핵심 로직) */}
        <section id="purchase" className="py-24 text-center border-t pt-16">
          <PurchaseFormSection /> {/* 컴포넌트 호출, API Mocking 포함 */}
        </section>

      </main>
    </div>
  );
};

export default LandingPage;