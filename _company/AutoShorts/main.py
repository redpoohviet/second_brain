<!DOCTYPE html>
# AutoShorts Engine - Main Orchestrator (Pipeline Controller)
import os
import sys
from modules.script_gen import ScriptGenerator
from modules.img_batch import ImageBatchGenerator
from modules.i2v_converter import ImageToVideoConverter
from modules.tts_sync import TTSSyncCalculator
from modules.ffmpeg_mixer import FFmpegMixer
from config import OUTPUT_DIR, TEMP_DIR

def create_directories():
    """Create output and temp directories if they don't exist."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)

def main(topic):
    """
    Main function to orchestrate the 5-step AutoShorts pipeline.
    Input: topic (str), e.g., " 깨두부의 효능 "
    """
    print(f"🚀 Starting AutoShorts Engine for Topic: {topic}")
    
    # Initialize Pipeline Components
    script_gen = ScriptGenerator()
    img_batch = ImageBatchGenerator()
    i2v_converter = ImageToVideoConverter()
    tts_calc = TTSSyncCalculator()
    mixer = FFmpegMixer()
    
    # Ensure directories exist
    create_directories()
    
    # --- Step 1: Script Generation ---
    script_data = script_gen.generate_script(topic)
    
    # Extract prompts from script data (simplified extraction for MVP)
    prompts = script_data.get("image_prompts", [])
    
    # --- Step 2: Image Batch Generation ---
    image_paths = img_batch.generate_batch(prompts)
    
    # --- Step 3: Image-to-Video Conversion ---
    video_paths = i2v_converter.convert(image_paths)
    
    # --- Step 4: TTS & Sync Calculation ---
    script_lines = script_data.get("script_lines", [])
    audio_path = tts_calc.generate_narration(script_lines)
    subtitle_path = tts_calc.calculate_sync()
    
    # --- Step 5: Final Video Mixing ---
    final_video_path = mixer.mix_video(video_paths, audio_path, subtitle_path, "./fonts/GoogleSansKR.ttf")
    
    print(f"✅ AutoShorts Engine completed! Final video at: {final_video_path}")

if __name__ == "__main__":
    topic_input = input("Enter Video Topic (e.g., 깨두부 효능): ")
    main(topic_input)