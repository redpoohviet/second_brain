"""
🎬 영상 제작 툴: KnowledgeCheckpoint 상태 변화 시 YouTube Shorts 형식 영상 자동 생성
- 상태 전이(State Change) 데이터 → JSON 포맷 입력 → MP4 출력 (1280x720, 30 초)
- Dependencies: moviepy (이미 프로젝트에 포함됨), ffmpeg
"""

import json
from moviepy.editor import *
from pathlib import Path
import subprocess

def generate_video_from_state_change(state_data, output_path):
    """
    상태 변화(State Change) 데이터 기반 영상 생성
    Args:
        state_data: {"quiz_id": "Q001", "question": "...", "answer": "...", "feedback": "..."}
        output_path: 결과 경로 (ex: sessions/videos/Q001_20260530.mp4)
    """
    try:
        # 1. 배경 생성 (검정색 1280x720, 3 초)
        bg = ColorClip((1280, 720), color=(0, 0, 0)).set_duration(3)
        
        # 2. 질문 텍스트 (5 초)
        q_text = TextClip(state_data['question'], fontsize=40).set_position(('center', 'bottom')).set_duration(5)
        clip1 = CompositeVideoClip([bg.set_duration(5), q_text])
        
        # 3. 정답 및 피드백 (10 초)
        a_text = TextClip(f"정답: {state_data['answer']}", fontsize=30).set_position(('center', 'top')).set_duration(10)
        clip2 = CompositeVideoClip([clip1, a_text])
        
        # 4. 피드백 메시지 (15 초)
        f_text = TextClip(state_data['feedback'], fontsize=28).set_position(('center', 'bottom')).set_duration(15)
        clip3 = CompositeVideoClip([clip2, f_text])
        
        # 5. 최종 영상 합성 (총 30 초)
        video = concatenate_videoclips([clip1, clip2, clip3])
        
        # 6. 파일 저장 (sessions/videos/ 디렉토리 자동 생성)
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        video.write_videofile(output_path, fps=24, codec='libx264', audio=False)
        
        return True
    except Exception as e:
        print(f"❌ 영상 생성 실패: {e}")
        return False

# 🔁 자동화 파이프라인 연동 함수 (KnowledgeCheckpoint 상태 변화 시 호출됨)
def on_state_change(state_data):
    output_path = f"sessions/videos/quiz_{state_data.get('quiz_id', 'unknown')}.mp4"
    success = generate_video_from_state_change(state_data, output_path)
    
    if success:
        print(f"✅ 영상 생성 완료: {output_path}")
        # 📤 CTA 배너 자동 추가 (선택사항)
        subprocess.run(['j:\\workspace\\_company\\_agents\\developer\\tools\\add_cta_banner.py', output_path])
    else:
        print("⚠️ 영상 생성 실패 — 재시도 시도 중...")

if __name__ == "__main__":
    # 🔍 테스트용 데이터 (실제 상태 변화 시동)
    test_data = {
        "quiz_id": "Q001",
        "question": "한국어와 베트남어의 발음 차이점은 무엇인가요?",
        "answer": "한국어는 받침이 없고, 베트남어는 3 가지 모음이 있습니다.",
        "feedback": "정답입니다! 다음 학습 단계를 확인하세요."
    }
    
    success = generate_video_from_state_change(test_data, "sessions/videos/Q001_test.mp4")
    if success:
        print("✅ 테스트 영상 생성 완료!")
        <reveal_in_explorer path="j:/workspace/_company/sessions/videos/">
    else:
        print("❌ 테스트 실패 — 의존성 확인 필요 (moviepy/ffmpeg 설치)")