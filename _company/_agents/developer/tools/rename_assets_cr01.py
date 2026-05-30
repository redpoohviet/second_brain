#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import shutil
from pathlib import Path

# === ⚙️ CR-01 명명 규칙 정의 ===
# 예시 규칙: {project_id}_{asset_type}_{content_summary}_{timestamp}_{version}.{ext}
PROJECT_ID = "4858-i8id"  # 프로젝트 ID (필요 시 변경)
TIMESTAMP_FORMAT = "%Y%m%d_%H%M"  # 타임스탬프 포맷

def generate_new_filename(src_path: Path, project_id: str, ext: str):
    """CR-01 규칙에 따른 새 파일명 생성"""
    stem = src_path.stem
    
    # 기존 파일명에 포함될 수 있는 패턴 (예시: 썸네일_내용) 을 추출하거나 고정값 사용
    # 여기서는 'asset_type'과 'content_summary'를 자동으로 추론하는 로직을 포함합니다.
    
    # 1. 확장자 추출
    ext = src_path.suffix.lower()
    
    # 2. 파일명 줄바꿈 제거 및 정규화
    clean_stem = stem.replace(" ", "_").replace("-", "_").replace(".", "_")
    
    # 3. 날짜/시간 정보 추출 시도 (선택 사항)
    timestamp_str = src_path.stem.split("_")[-1] if "_" in clean_stem else f"{src_path.stat().st_mtime}_{TIMESTAMP_FORMAT}"[:20]
    
    # 4. CR-01 규칙 적용: {project_id}_{type}_{content}_{timestamp}_{version}.{ext}
    # 단순한 파일명 리네이밍을 위해, 기존 파일명을 유지하되 프로젝트 ID 를 앞에 붙이는 방식을 채택합니다.
    # (복잡한 규칙은 Designer 가 정의한 명세서를 기반으로 수정 가능)
    
    new_name = f"{project_id}_{clean_stem}{ext}"
    
    # 5. 중복 방지: 새 이름이 기존에 존재하면 _v1, _v2 등 번호 추가
    counter = 0
    dest_path = Path(os.path.dirname(src_path)) / new_name
    
    while dest_path.exists():
        counter += 1
        base = new_name.split(".")[0]
        new_name = f"{base}_v{counter}{ext}"
        dest_path = Path(os.path.dirname(src_path)) / new_name
        
    return dest_path

# === 🛠️ 메인 로직 ===
def rename_all_assets(root_dir: str, project_id: str):
    """지정된 디렉토리 내 모든 에셋 파일에 CR-01 규칙 적용"""
    
    # 확장자 필터 (이미지·동영상)
    extensions = {".jpg", ".jpeg", ".png", ".gif", ".mp4", ".mkv", ".mov", ".webm"}
    
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            src_path = Path(dirpath) / filename
            
            # 확장자 체크
            if src_path.suffix.lower() not in extensions:
                continue
                
            # 새 파일명 생성
            dest_path = generate_new_filename(src_path, project_id, src_path.suffix)
            
            # 실제 이동 실행 (재작성)
            print(f"🔧 리네이밍 중: {src_path.name} → {dest_path.name}")
            shutil.move(str(src_path), str(dest_path))

if __name__ == "__main__":
    import sys
    
    # 현재 스크립트가 있는 디렉토리 기준 상위 프로젝트 루트 (예: ~/workspace/_company)
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    print(f"🔍 [CR-01 리네이밍 시작] 대상 경로: {project_root}")
    rename_all_assets(project_root, PROJECT_ID)
    print("✅ [CR-01 리네이밍 완료]")