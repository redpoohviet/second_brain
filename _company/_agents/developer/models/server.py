"""
🌐 AutoShorts Engine — Flux1 AI 연동 서버 (MVP)
- 스크립트 및 비주얼 스펙을 받아 AI 로 이미지/썸네일 생성
- 로컬 캐싱 및 API 비용 최적화 하이브리드 구조
"""

import os
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import json
import hashlib
from pathlib import Path

# TODO: 실제 모델 로딩 (Flux.1 또는 LoRA) 은 추후 연동 시 여기에 삽입 예정
# 현재는 가상의 AI 생성 함수를 정의하여 구조만 구현합니다.
def generate_thumbnail(script_content: str, visual_spec: dict):
    """
    [가상] Flux1 엔진을 통해 썸네일 이미지 생성 로직
    실제 모델은 추후 `from flux import FluxModel` 등으로 교체 가능
    """
    # TODO: 실제 AI 호출 코드 위치
    # 예시: image = model.generate(prompt=script_content + json.dumps(visual_spec))
    print(f"🤖 [AI] 스크립트 분석 중... (길이: {len(script_content)})")
    return f"https://via.placeholder.com/1080x1920/3A3530/00FFFF?text=Generated+by+Flux1"

def get_cache_key(prompt: str, spec_json: str):
    """캐시 키 생성 (동일 콘텐츠면 기존 이미지 반환)"""
    combined_str = f"{prompt}{spec_json}"
    return hashlib.md5(combined_str.encode()).hexdigest()

# API 설정
app = FastAPI(title="AutoShorts Engine Server", version="1.0.0")

# 환경 변수 로드 (실제 실행 시 .env 로더 사용 권장, 여기선 간단히)
CACHE_DIR = Path("j:\\workspace\\_company\\assets\\cache\\images").expanduser()
OUTPUT_DIR = Path("j:\\workspace\\_company\\assets\\output\\shorts_v1").expanduser()

# 디렉토리 생성 (권한 에러 방지용)
def ensure_dirs():
    for d in [CACHE_DIR, OUTPUT_DIR]:
        d.mkdir(parents=True, exist_ok=True)
        
@app.on_event("startup")
async def startup_event():
    print("🔧 AutoShorts Server Starting...")
    ensure_dirs()

# 요청 모델 정의
class ContentRequest(BaseModel):
    script_content: str
    visual_spec: dict  # 썸네일 스펙, 컬러 등
    is_preview: bool = False  # 실제 생성 vs 가상의 미리보기 모드

@app.get("/")
async def root():
    return {"message": "AutoShorts Engine API v1.0 — Flux1 AI 연동 서버"}

@app.post("/generate/shorts")
async def generate_shorts(request: ContentRequest):
    """
    🎬 유튜브 쇼츠 썸네일 및 본편 이미지 생성 엔드포인트
    - 로컬 캐시 우선 (비용 절감)
    - 실패 시 API 재시도 또는 에러 반환
    """
    try:
        # 1. 스크립트 요약 추출 (프롬프트 최적화용)
        summary = f"Video Topic: {request.script_content[:50]}..."
        
        # 2. 캐시 키 생성 및 확인
        spec_json = json.dumps(request.visual_spec, sort_keys=True)
        cache_key = get_cache_key(summary, spec_json)
        cache_path = CACHE_DIR / f"{cache_key}.png"
        output_path = OUTPUT_DIR / f"shorts_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"

        # 3. 로컬 캐시 확인 (이미 있으면 반환)
        if cache_path.exists():
            print(f"✅ [Cache Hit] 이미 생성된 이미지 반환: {cache_path}")
            return {"status": "cached", "image_url": f"file:///{str(cache_path)}"}

        # 4. AI 엔진 호출 (실제 로직은 TODO 에 구현)
        print(f"🚀 [AI Generation] Flux1 엔진 호출 시작...")
        
        # TODO: 실제 모델 실행 코드 위치
        # image_url = generate_thumbnail(request.script_content, request.visual_spec)
        
        # 여기선 테스트용 이미지 URL 로직
        image_url = f"https://via.placeholder.com/1080x1920/DDC2B9/3A3530?text=Flux1+Generated+Thumbnail"

        # 5. 생성된 결과 저장 (캐시)
        import requests
        try:
            response = requests.get(image_url)
            if response.status_code == 200:
                with open(cache_path, "wb") as f:
                    f.write(response.content)
                print(f"💾 [Saved] 캐시에 저장됨: {cache_path}")
            else:
                raise HTTPException(status_code=400, detail="AI Image Generation Failed")
        except Exception as e:
            print(f"❌ [Error] 이미지 다운로드 실패 (테스트 모드): {e}")
            # 테스트용 파일 생성 (실제 서비스에서는 에러 처리 로직 필요)
            cache_path.write_text("Error_Simulation") 

        return {"status": "success", "image_url": f"file:///{str(cache_path)}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # 로컬 테스트 서버 (포트 8000)
    uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)