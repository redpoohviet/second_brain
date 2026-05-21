<!DOCTYPE html>
# AutoShorts Engine Configuration & Cost Optimization Settings
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# --- Global Configurations (System Parameters) ---
PROJECT_NAME = "AutoShorts Engine"
OUTPUT_DIR = "./output"  # Final video and intermediate files will be saved here
TEMP_DIR = "./temp"      # Temporary processing directory
FONT_PATHS = [
    "./fonts/GoogleSansKR.ttf",   # Add popular Korean fonts in this path
    "./fonts/MJ.kr.ttf",
]

# --- Cost Optimization Strategy (API Selection) ---
def get_api_provider(service_type):
    """
    Select API provider based on cost efficiency and feature availability.
    Returns: dict containing 'provider', 'url', 'is_free' flags.
    """
    
    # Step 1: Script Generation
    if service_type == "script":
        return {
            "provider": "Gemini", 
            "url": f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={os.getenv('GEMINI_API_KEY')}",
            "is_free": True,  # Free credits available on new accounts
            "prompt_template": """You are a YouTube Shorts expert. Create a viral script about '{topic}'.
            Structure: Aggressive Hook (0-3s) -> Core Content (4-25s) -> Call to Action (26-45s).
            Output JSON format:
            {{
                "script": ["line1", "line2"],
                "prompts": ["Cinematic HD image prompt for line1", ...],
                "duration": 45
            }}"""
        }

    # Step 2: Image Generation
    elif service_type == "image":
        return {
            "provider": "Pollinations AI", 
            "url": os.getenv("POLLINATIONS_BASE_URL"),
            "is_free": True,
            "style_prefix": "Cinematic HD, Neon Glitch Style,"  # Consistent style injection
        }

    # Step 3: Video Conversion (Image-to-Video)
    elif service_type == "i2v":
        return {
            "provider": "Grok (via Browser Automation)", 
            "url": os.getenv("GROK_IMG2VID_URL"),
            "is_free": True, # Currently free tier available
            "automation_script": "Playwright script to upload and download"
        }

    # Step 4: TTS & Subtitles
    elif service_type == "tts":
        # Default to Google TTS for cost efficiency (Free Tier)
        return {
            "provider": "Google TTS", 
            "url": os.getenv("GOOGLE_TTS_API_URL"),
            "is_free": True,
            "voice_id": "en-US-Standard-A" # Default neutral voice
        }

    # Fallback for high quality paid APIs if needed later
    elif service_type == "tts_premium":
        return {
            "provider": "ElevenLabs", 
            "url": f"https://api.elevenlabs.io/v1/text-to-speech/{os.getenv('ELEVENLABS_API_KEY')}",
            "is_free": False, # Paid service
            "voice_id": "Adam" # Example voice
        }

    return None

# --- System Paths & FFmpeg Setup ---
def get_ffmpeg_command(args):
    """
    Build FFmpeg command string based on input arguments.
    Used in Step 5 (Mixer) to merge video, audio, and subtitles.
    """
    base_cmd = f"ffmpeg -y {args}" if os.path.exists("ffmpeg.exe") else "echo 'FFmpeg not found. Install from https://ffmpeg.org'"
    return base_cmd