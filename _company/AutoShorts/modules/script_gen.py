<!DOCTYPE html>
# Module 1: Script & Prompt Generator (Step 1)
import json
from google_generativeai import GenerativeModel
from config import get_api_provider, PROJECT_NAME

class ScriptGenerator:
    def __init__(self):
        self.config = get_api_provider("script")
        self.model = None # Initialized later with API Key
        
    def generate_script(self, topic):
        """
        Generate viral script and image prompts based on user topic.
        Output: JSON file 'script.json' in output dir.
        """
        print(f"[Step 1] Generating Script & Prompts for: {topic}")
        
        # TODO: Initialize Google GenAI client with API Key
        # from google import genai
        # client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))
        # model = client.models.create_model("gemini-1.5-flash")
        
        # Simulated Output Structure (Actual implementation uses real API call)
        script_data = {
            "topic": topic,
            "script_lines": [
                "대본: 시스템 오류가 시간 낭비를 만든다!",
                "대본: 당신의 학습법은 이미 깨져 있습니다.",
                "대본: 지금 바로 해결책을 확인하세요.",
                "대본: $27 에 모든 것이 준비되어 있습니다."
            ],
            "image_prompts": [
                "Cinematic HD, neon glitch style, confused asian man looking at broken clock",
                "Cinematic HD, neon glitch style, chaotic data streams and error symbols",
                "Cinematic HD, neon glitch style, solution appearing as glowing blue path",
                "Cinematic HD, neon glitch style, purchasing button and checkmark overlay"
            ],
            "duration_seconds": 45
        }
        
        # Save to JSON
        with open("./output/script.json", "w", encoding="utf-8") as f:
            json.dump(script_data, f, ensure_ascii=False, indent=2)
            
        print(f"[Step 1] Script saved to ./output/script.json")
        return script_data