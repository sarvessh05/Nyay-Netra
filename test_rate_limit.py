import requests
import time

url = "http://127.0.0.1:8000/api/ask"
payload = {"query": "test query for rate limiting"}

print("Testing rate limiting (cap is 5/minute)...")
for i in range(1, 8):
    try:
        start_time = time.time()
        response = requests.post(url, json=payload)
        end_time = time.time()
        print(f"Request {i}: Status {response.status_code} ({end_time - start_time:.2f}s)")
        if response.status_code == 429:
            print(">>> Rate limit exceeded as expected.")
    except Exception as e:
        print(f"Request {i} failed: {e}")
