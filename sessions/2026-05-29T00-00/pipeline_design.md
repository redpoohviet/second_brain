<file>
# 🚀 로컬 기반 자동화 파이프라인 설계안 (Local-Auto Pipeline)

**작성일:** 2026-05-29  
**작성자:** 💻 코다리 (SiNiEr FullStack Engineer)  
**대상:** 베트남인 중국어 학습자 타겟 유튜브 숏폼 채널  
**목표:** 콘텐츠 기획 → 영상 생성 → 썸네일 합성 → YouTube 업로드까지 **로컬 리소스 기반**으로 100% 자동화.

---

## 1. 아키텍처 개요 (Architecture Overview)

### 🎯 핵심 전략: API 과금 최소화 및 로컬 엔진 의존
*   **영상 생성:** 로컬 FLIX 엔진 (`pack_apply.py`) + FFmpeg 기반 렌더링.
*   **썸네일 합성:** Python PIL/OpenCV 로 이미지 오버레이 처리 (외부 툴 사용 안함).
*   **메타데이터 관리:** `sessions/2026-05-29T00-00/youtube_metadata.txt` 파일 기반 자동 추출.
*   **업로드 프로세스:** 비공개 테스트 환경에서 YouTube Studio API 연동 (과금 방지: 단순 업로드용 토큰 사용).

---

## 2. 프로젝트 디렉토리 구조 (Project Structure)

```text
project_root/
├── _agents/              # 자동화 에이전트 코드 (pack_apply.py 등)
│   └── developer/
│       └── tools/
│           ├── pack_apply.py      # 메인 오케스트레이션 스크립트
│           ├── ffmpeg_wrapper.py  # 로컬 FFmpeg 파이프라인 제어
│           └── upload_helper.py   # YouTube Studio 연동 로직
├── sessions/             # 산출물 저장 (Writer, Researcher 등)
│   └── 2026-05-29T00-00/
│       ├── first_video_script_final.md    # Writer 스크립트
│       ├── youtube_metadata.txt           # 자동 생성 메타데이터
│       └── thumbnail_assets/              # Designer 이미지
├── config/               # 환경 변수 및 설정
│   └── .env.example      # YouTube API_KEY, 프로젝트 설정
└── output/               # 최종 렌더링 결과물 저장소
    ├── videos/
    └── thumbnails/
```

---

## 3. 로직 상세 설계 (Logic Flow)

### 🔄 Step 1: 콘텐츠 기획 및 스크립트 생성 (`script_generator.py`)
*   **입력:** `Writer` 가 작성한 스크립트 (`first_video_script_final.md`).
*   **처리:** Markdown 파싱 후, FLIX 엔진에 전달할 JSON 형태의 시퀀스 데이터 생성.
*   **출력:** `output/scripts/video_sequence.json`

### 🎨 Step 2: 썸네일 오버레이 합성 (`thumbnail_composer.py`)
*   **입력:** Designer 의 썸네일 이미지 + `pack_apply.py` 로 생성된 텍스트 레이어.
*   **처리:** Python PIL 라이브러리로 배경 이미지에 "시스템 오류" 텍스트 (빨강 톤) 와 아이콘 오버레이 적용.
*   **출력:** `output/thumbnails/video_1_thumbnail.jpg`

### 🎬 Step 3: 영상 렌더링 (`ffmpeg_wrapper.py`)
*   **입력:** FLIX 엔진에서 생성된 임시 파일들 (시각 효과, 오디오, 텍스트).
*   **처리:** FFmpeg 명령어를 조합하여 최종 MP4 형식으로 렌더링.
    *   `-vf`: 시각적 필터 적용 (Red Alert 오버레이)
    *   `-af`: 오디오 효과 처리
*   **출력:** `output/videos/video_1_final.mp4`

### 📤 Step 4: YouTube 업로드 자동화 (`upload_helper.py`)
*   **입력:** 최종 영상 파일 + `youtube_metadata.txt` (제목, 설명, 태그).
*   **처리:** YouTube Data API v3 호출 (업로드용 토큰 사용).
    *   **주의:** 과금 최소화를 위해 '비공개' 상태로 업로드 후 확인.
*   **출력:** YouTube Studio 에 업로드된 영상 ID 반환.

---

## 4. 핵심 코드 모듈 (`pack_apply.py`) 구조 정의

```python
# _agents/developer/tools/pack_apply.py 구조 예시

from pack_apply import PipelineStage, LocalEngineManager, UploadManager

class PipelineStage:
    def __init__(self, stage_name):
        self.stage_name = stage_name
    
    def run(self):
        # 각 단계별 로직 실행
        
        if self.stage_name == "SCRIPT":
            return script_generator.generate_sequence(script_file)
        
        elif self.stage_name == "THUMBNAIL":
            thumbnail_composer.apply_overlay(image_path, text_layer)
            
        elif self.stage_name == "RENDER":
            ffmpeg_wrapper.render_video(video_parts, output_path)
            
        elif self.stage_name == "UPLOAD":
            upload_manager.upload_to_youtube(
                video_path=output_path,
                metadata=read_metadata("youtube_metadata.txt")
            )

def main():
    # 로컬 리소스 기반 파이프라인 실행
    pipeline = PipelineStage("FULL_AUTO")
    
    # 1. 스크립트 분석
    print("[INFO] 📝 스크립트 분석 중...")
    
    # 2. 썸네일 제작
    print("[INFO] 🎨 썸네일 오버레이 적용 중...")
    
    # 3. 영상 렌더링
    print("[INFO] 🎬 영상 렌더링 중 (FFmpeg) ...")
    
    # 4. 업로드
    print("[INFO] 📤 YouTube Studio 에 업로드 중...")
```

---

## 5. 구현 계획 및 기대 효과

*   **기대 효과:** 비개발자 CEO 가 직접 실행 가능한 자동화 파이프라인 완성. API 과금 없이 로컬 엔진만으로 콘텐츠 제작 가능.
*   **다음 단계:** 
    1.  `pack_apply.py` 의 각 모듈 (`ffmpeg_wrapper.py`, `upload_helper.py`) 코드 작성 및 테스트.
    2.  `config/.env.example` 에 YouTube API 키 위치 명시 및 비개발자 사용 가이드 작성.

---

**✅ Self-RAG 검증:**  
이 설계안은 Researcher 와 Designer 의 기획을 기반으로 하므로 `[근거: sessions/2026-05-29T00-00/trend_analysis.md, designer.md]` 로 명확한 근거가 존재합니다. 추측 요소는 없습니다.