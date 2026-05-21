import React from 'react';
// 데이터 파일 임포트 (실제 JSON 구조와 맞추기 위해 타입을 정의)
import seiData from '../data/sei_time_series_data.json'; 

interface DataPoint {
    time: string;
    sei_score: number; // System Error Index Score
}

const ProblemGraphSection: React.FC = () => {
  // 데이터 구조를 기반으로 그래프 컴포넌트가 데이터를 사용하도록 로직을 잡습니다.
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16 text-white/90 border-b pb-3">
        당신의 시간 흐름은 정상입니까? <span className="text-red-500 ml-2">[근거: SEI 지표]</span>
      </h2>

      {/* 그래프 시각화 영역 */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-inner">
        <h3 className="text-2xl font-semibold mb-4 text-white/80">SEI (System Error Index) 분석: 통제력 상실의 순간</h3>
        {/* 그래프는 실제 D3.js나 Recharts 같은 라이브러리를 사용해야 하지만, 여기서는 구조만 잡습니다. */}
        <div className="h-64 flex items-end justify-around p-4 bg-gray-900 rounded-lg relative">
            {seiData.map((point: DataPoint, index: number) => (
                // 그래프 막대 (높이 = SEI 점수)
                <div key={index} className="flex flex-col items-center h-full justify-end w-1/5 relative">
                    <div 
                        className={`transition-all duration-700 ease-out ${point.sei_score > 80 ? 'bg-red-600 shadow-lg' : 'bg-yellow-500'} hover:scale-y-125`}
                        style={{ height: `${Math.min(point.sei_score, 100)}%` }} // 점수 기반 높이 설정 (최대 100%)
                    ></div>
                    <span className="absolute bottom-full text-sm mt-[-30px]">{point.time}</span>
                </div>
            ))}
        </div>
        <p className="text-center mt-6 text-red-400/80">[참고: SEI 임계값 90 초과 시, 시스템 구조적 오류(글리치) 발생 가능]</p>
      </div>
    </div>
  );
};

export default ProblemGraphSection;