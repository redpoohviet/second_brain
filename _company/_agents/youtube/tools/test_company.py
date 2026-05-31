import requests
import os

print(f"HTTP_PROXY: {os.environ.get('HTTP_PROXY')}")
print(f"HTTPS_PROXY: {os.environ.get('HTTPS_PROXY')}")

url = "http://100.65.192.93:1234/v1/chat/completions"
print(f"📡 {url} (회사 컴퓨터) 연결 시도 중 (프록시 강제 우회)...")
try:
    response = requests.post(
        url,
        json={
            "model": "qwen/qwen3.5-9b",
            "messages": [{"role": "user", "content": "Write a python calculator. Just code."}],
            "stream": False
        },
        proxies={"http": None, "https": None},
        timeout=20
    )
    print("✅ 성공! 회사 컴퓨터 LLM 응답:\n")
    print(response.json()['choices'][0]['message']['content'])
except Exception as e:
    print(f"❌ 실패: {e}")
