import requests
import json

urls = ["http://100.65.192.93:1234/v1/chat/completions", "http://127.0.0.1:1234/v1/chat/completions"]

for url in urls:
    print(f"📡 {url} 연결 시도 중...")
    try:
        response = requests.post(
            url,
            json={
                "model": "qwen/qwen3.5-9b",
                "messages": [{"role": "user", "content": "Write a simple python calculator function. Just the code."}],
                "max_tokens": 300,
                "temperature": 0.5
            },
            timeout=60
        )
        response.raise_for_status()
        data = response.json()
        print("✅ 성공! LLM 응답:\n")
        print(data['choices'][0]['message']['content'])
        break
    except Exception as e:
        print(f"❌ 실패: {e}")
