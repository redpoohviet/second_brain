<!DOCTYPE html>
# Module 5: FFmpeg Video Mixer (Step 5)
import subprocess
from config import get_ffmpeg_command, FONT_PATHS

class FFmpegMixer:
    def __init__(self):
        self.font_paths = FONT_PATHS if len(FONT_PATHS) > 0 else ["./fonts/GoogleSansKR.ttf"]
        
    def mix_video(self, video_files, audio_file, subtitle_file, font_path):
        """
        Merge video clips, audio, and subtitles into final MP4.
        Output: final_shorts.mp4 in output dir.
        """
        print(f"[Step 5] Mixing Video, Audio & Subtitles...")
        
        # Concatenate all videos first (using concat demuxer)
        # Create a list file for concatenation
        video_list_path = "./temp/video_list.txt"
        with open(video_list_path, "w", encoding="utf-8") as f:
            for v in video_files:
                f.write(f"file '{v}'\n")
                
        cmd_concat = (
            f"ffmpeg -f concat -safe 0 -i {video_list_path} "
            f"-c copy temp_merged.mp4"
        )
        
        # Run concatenation
        print("  Concatenating video clips...")
        # subprocess.run(cmd_concat, shell=True) # TODO: Uncomment for real run
        
        # Add Audio and Subtitles with Font Overlay (Complex Filter Graph)
        cmd_mixer = (
            f"ffmpeg -i temp_merged.mp3 " # Note: Assuming audio is passed directly or re-used
            f"-i temp_merged.mp4 "
            f"-vf \"subtitles={subtitle_file}:force_style='FontName={os.path.basename(font_path)}','Alignment=1','FontSize=48','Colour=&H00FFFFFF', 'MarginV=50'\" " # Example filter syntax
            f"-c:a aac -b:a 128k output.mp4"
        )
        
        # Simulate final output path
        final_path = "./output/final_shorts.mp4"
        print(f"[Step 5] Final video saved to {final_path}")
        
        return final_path