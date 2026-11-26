import subprocess
import time
import json
import urllib.request
import websocket
import base64
import os

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 9335
OUT_DIR = r"C:\Users\Sakib\Desktop\wedding card\v2\test_screenshots"

proc = subprocess.Popen([
    EDGE_PATH, f"--remote-debugging-port={PORT}", "--headless", "--disable-gpu",
    "--window-size=412,915", "--no-first-run", "--no-default-browser-check", "about:blank"
])

time.sleep(1.5)

try:
    tabs = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read())
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws = websocket.create_connection(page_tab["webSocketDebuggerUrl"])

    mid = 0
    def send_cmd(method, params=None):
        global mid
        mid += 1
        payload = {"id": mid, "method": method, "params": params or {}}
        ws.send(json.dumps(payload))
        while True:
            res = json.loads(ws.recv())
            if res.get("id") == mid:
                return res.get("result", {})

    send_cmd("Page.enable")
    send_cmd("Runtime.enable")
    send_cmd("Page.navigate", {"url": "http://localhost:5173/v2/index.html?e=hwr&n=Dr.+Tariq&b=%E0%A6%A1%E0%A6%BE%E0%A6%83+%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%95&c=4"})
    time.sleep(2)

    # Open envelope
    send_cmd("Runtime.evaluate", {"expression": "document.getElementById('wax-seal-btn').click()"})
    time.sleep(1)

    # Scroll to scratch card
    send_cmd("Runtime.evaluate", {"expression": "document.getElementById('date-scratch').scrollIntoView({ behavior: 'instant' })"})
    time.sleep(0.5)

    res = send_cmd("Page.captureScreenshot", {"format": "png"})
    with open(f"{OUT_DIR}/scratch_before.png", "wb") as f:
        f.write(base64.b64decode(res["data"]))

    # Reveal card
    send_cmd("Runtime.evaluate", {"expression": "document.getElementById('scratch-reveal-btn').click()"})
    time.sleep(0.6)

    res = send_cmd("Page.captureScreenshot", {"format": "png"})
    with open(f"{OUT_DIR}/scratch_after.png", "wb") as f:
        f.write(base64.b64decode(res["data"]))

    print("SUCCESS: Captured scratch_before.png and scratch_after.png")
    ws.close()
finally:
    proc.terminate()
