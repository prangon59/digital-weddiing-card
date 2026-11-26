import json
import time
import subprocess
import urllib.request
import base64
import os
import websocket

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
USER_DATA_DIR = r"C:\Users\Sakib\Desktop\wedding card\final\test_story_edge_profile"
OUTPUT_DIR = r"C:\Users\Sakib\Desktop\wedding card\final\test_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Launch Edge with remote debugging
edge_proc = subprocess.Popen([
    EDGE_PATH,
    "--headless=new",
    "--remote-debugging-port=9337",
    f"--user-data-dir={USER_DATA_DIR}",
    "--no-first-run",
    "--window-size=430,932",
    "about:blank"
])

time.sleep(2)

def cdp_send(ws, method, params=None, msg_id=1):
    payload = {"id": msg_id, "method": method, "params": params or {}}
    ws.send(json.dumps(payload))
    while True:
        resp = json.loads(ws.recv())
        if resp.get("id") == msg_id:
            return resp

def evaluate_js(ws, expr, msg_id=100):
    res = cdp_send(ws, "Runtime.evaluate", {"expression": expr, "returnByValue": True}, msg_id=msg_id)
    return res.get("result", {}).get("result", {}).get("value")

def take_screenshot(ws, filename, msg_id=200):
    res = cdp_send(ws, "Page.captureScreenshot", {"format": "png"}, msg_id=msg_id)
    b64_data = res.get("result", {}).get("data")
    if b64_data:
        path = os.path.join(OUTPUT_DIR, filename)
        with open(path, "wb") as f:
            f.write(base64.b64decode(b64_data))
        print(f"Screenshot saved: {path}")

try:
    tabs = json.loads(urllib.request.urlopen("http://127.0.0.1:9337/json").read())
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]

    ws = websocket.create_connection(ws_url, timeout=10)
    cdp_send(ws, "Page.enable", msg_id=1)
    cdp_send(ws, "Runtime.enable", msg_id=2)

    url = "http://localhost:5173/final/index.html?e=all&n=Dr.+Tariq&b=ডাঃ+তারিক&c=4"
    print(f"Navigating to {url}...")
    cdp_send(ws, "Page.navigate", {"url": url}, msg_id=3)
    time.sleep(2)

    # 1. Open the doors
    print("Opening royal gates...")
    evaluate_js(ws, "document.getElementById('gate-wax-seal').click()", msg_id=10)
    time.sleep(2)

    # 2. Scroll to story section
    print("Scrolling to #story section...")
    evaluate_js(ws, "document.getElementById('story').scrollIntoView({ behavior: 'instant' })", msg_id=20)
    time.sleep(1)

    # Check story header
    heading = evaluate_js(ws, "document.getElementById('story-header-title').innerText", msg_id=21)
    badge = evaluate_js(ws, "document.getElementById('story-header-badge').innerText", msg_id=22)
    sub = evaluate_js(ws, "document.getElementById('story-header-sub').innerText", msg_id=23)
    print(f"Header: badge='{badge}', heading='{heading}', sub='{sub}'")

    # Check carousel slides count
    slide_count = evaluate_js(ws, "document.querySelectorAll('.story-carousel-slide').length", msg_id=30)
    dot_count = evaluate_js(ws, "document.querySelectorAll('.story-carousel-dot').length", msg_id=31)
    print(f"Carousel slides: {slide_count}, dots: {dot_count}")

    # Check first slide info
    s0_tag = evaluate_js(ws, "document.querySelector('.story-carousel-slide:nth-child(1) span').innerText", msg_id=32)
    s0_title = evaluate_js(ws, "document.querySelector('.story-carousel-slide:nth-child(1) h3').innerText", msg_id=33)
    print(f"Slide 0: tag='{s0_tag}', title='{s0_title}'")
    take_screenshot(ws, "story_slide_0.png", msg_id=40)

    # Advance to next slides
    for i in range(1, 5):
        evaluate_js(ws, "document.getElementById('story-carousel-next').click()", msg_id=50 + i)
        time.sleep(0.5)
        cur_title = evaluate_js(ws, f"document.querySelector('.story-carousel-slide:nth-child({i+1}) h3').innerText", msg_id=60 + i)
        cur_tag = evaluate_js(ws, f"document.querySelector('.story-carousel-slide:nth-child({i+1}) span').innerText", msg_id=70 + i)
        print(f"Slide {i}: tag='{cur_tag}', title='{cur_title}'")

    take_screenshot(ws, "story_slide_4_together.png", msg_id=80)

    # Switch to Story Stage view
    print("Switching to Story Stage view...")
    evaluate_js(ws, "document.getElementById('story-toggle-stage').click()", msg_id=90)
    time.sleep(1)

    stage_tabs = evaluate_js(ws, "document.querySelectorAll('.story-stage-tab-btn').length", msg_id=91)
    stage_desc = evaluate_js(ws, "document.getElementById('story-stage-desc').innerText", msg_id=92)
    print(f"Stage tabs: {stage_tabs}, Stage description: '{stage_desc}'")
    take_screenshot(ws, "story_stage_view.png", msg_id=93)

    # Switch language to English
    print("Switching language to English...")
    evaluate_js(ws, "document.getElementById('lang-btn-en').click()", msg_id=100)
    time.sleep(1)

    en_heading = evaluate_js(ws, "document.getElementById('story-header-title').innerText", msg_id=101)
    en_badge = evaluate_js(ws, "document.getElementById('story-header-badge').innerText", msg_id=102)
    en_sub = evaluate_js(ws, "document.getElementById('story-header-sub').innerText", msg_id=103)
    print(f"English Header: badge='{en_badge}', heading='{en_heading}', sub='{en_sub}'")
    take_screenshot(ws, "story_stage_english.png", msg_id=104)

    # Switch back to carousel view in English
    evaluate_js(ws, "document.getElementById('story-toggle-carousel').click()", msg_id=105)
    time.sleep(1)
    take_screenshot(ws, "story_carousel_english.png", msg_id=106)

    ws.close()
    print("SUCCESS: Story section tests completed!")
finally:
    try:
        edge_proc.terminate()
    except:
        pass
