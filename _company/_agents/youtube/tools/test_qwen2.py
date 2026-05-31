import requests

url = "http://127.0.0.1:1234/v1/chat/completions"
try:
    response = requests.post(
        url,
        json={
            "model": "qwen/qwen3.5-9b",
            "messages": [{"role": "user", "content": "Write a python calculator"}],
            "stream": False
        },
        timeout=60
    )
    print(response.json()['choices'][0]['message']['content'])
except Exception as e:
    print(e)
