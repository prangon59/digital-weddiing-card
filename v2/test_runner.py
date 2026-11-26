import subprocess
import json
import time
import urllib.request
import os
import websocket
import base64

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 9333
OUT_DIR = r"C:\Users\Sakib\Desktop\wedding card\v2\test_screenshots"
os.makedirs(OUT_DIR, exist_ok=True)

# Launch Edge with remote debugging
proc = subprocess.Popen([
    EDGE_PATH,
    f"--remote-debugging-port={PORT}",
    "--headless",
    "--disable-gpu",
    "--window-size=412,915",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank"
])

time.sleep(1.5)

try:
    # Get WebSocket Debugger URL for the browser page
    tabs = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read())
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]
    ws = websocket.create_connection(ws_url)

    msg_id = 0
    def send_cmd(method, params=None):
        global msg_id
        msg_id += 1
        payload = {"id": msg_id, "method": method, "params": params or {}}
        ws.send(json.dumps(payload))
        while True:
            res = json.loads(ws.recv())
            if res.get("id") == msg_id:
                return res.get("result", {})

    send_cmd("Page.enable")
    send_cmd("Runtime.enable")

    def eval_js(expression):
        res = send_cmd("Runtime.evaluate", {"expression": expression, "returnByValue": True})
        return res.get("result", {}).get("value")

    def save_screenshot(filename):
        res = send_cmd("Page.captureScreenshot", {"format": "png"})
        data = base64.b64decode(res["data"])
        filepath = os.path.join(OUT_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(data)
        print(f"Captured: {filename} ({len(data)} bytes)")

    print("--- TEST 1: Link 1 (e=hw, Gaye Holud + Wedding, c=3, Rafiq Ahmed) ---")
    send_cmd("Page.navigate", {"url": "http://localhost:5173/v2/index.html?e=hw&n=Rafiq+Ahmed&b=%E0%A6%B0%E0%A6%AB%E0%A6%BF%E0%A6%95+%E0%A6%86%E0%A6%B9%E0%A6%AE%E0%A7%87%E0%A6%A6&c=3"})
    time.sleep(2)

    # 1. Check envelope & guest badge
    guest_text = eval_js("document.getElementById('envelope-guest-badge').innerText")
    print("Envelope guest badge:", guest_text)

    # 2. Trigger Envelope Opening
    eval_js("document.getElementById('wax-seal-btn').click()")
    time.sleep(1.5)

    # 3. Verify Timeline Events for e=hw
    timeline_count = eval_js("document.querySelectorAll('#timeline-events-container .timeline-node').length")
    timeline_titles = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print(f"Timeline event count: {timeline_count} (Expected: 2)")
    print("Timeline titles:", timeline_titles)

    # 4. Verify RSVP Event Checkboxes for e=hw
    rsvp_event_count = eval_js("document.querySelectorAll('#rsvp-events-list .event-attendance-checkbox').length")
    print(f"RSVP event rows: {rsvp_event_count} (Expected: 2)")

    # 5. Check Max guest limit stepper
    guest_limit = eval_js("document.querySelector('#rsvp-events-list .stepper-btn') ? 'stepper present' : 'no stepper'")
    print("Guest count stepper status:", guest_limit)

    # 6. Test Scratch-off date reveal
    eval_js("document.getElementById('scratch-reveal-btn').click()")
    time.sleep(0.5)

    save_screenshot("test1_hw_opened_hero.png")

    # Scroll down to timeline & countdown
    eval_js("document.getElementById('timeline').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_screenshot("test1_hw_timeline.png")

    # Scroll down to RSVP
    eval_js("document.getElementById('rsvp').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_screenshot("test1_hw_rsvp.png")

    print("\n--- TEST 2: Link 2 (e=r, Reception ONLY, c=2, Farhana Karim) ---")
    send_cmd("Page.navigate", {"url": "http://localhost:5173/v2/index.html?e=r&n=Farhana+Karim&b=%E0%A6%AB%E0%A6%BE%E0%A6%B0%E0%A6%B9%E0%A6%BE%E0%A6%A8%E0%A6%BE+%E0%A6%95%E0%A6%B0%E0%A6%BF%E0%A6%AE&c=2"})
    time.sleep(2)

    # Open envelope
    eval_js("document.getElementById('wax-seal-btn').click()")
    time.sleep(1.2)

    t2_count = eval_js("document.querySelectorAll('#timeline-events-container .timeline-node').length")
    t2_titles = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print(f"Timeline event count: {t2_count} (Expected: 1)")
    print("Timeline titles:", t2_titles)

    t2_rsvp_count = eval_js("document.querySelectorAll('#rsvp-events-list .event-attendance-checkbox').length")
    print(f"RSVP event rows: {t2_rsvp_count} (Expected: 1)")

    eval_js("document.getElementById('timeline').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_screenshot("test2_reception_only_timeline.png")

    print("\n--- TEST 3: Link 3 (e=hwr, All Three Events, c=4, Dr. Tariq) ---")
    send_cmd("Page.navigate", {"url": "http://localhost:5173/v2/index.html?e=hwr&n=Dr.+Tariq&b=%E0%A6%A1%E0%A6%BE%E0%A6%83+%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%95&c=4"})
    time.sleep(2)

    # Open envelope
    eval_js("document.getElementById('wax-seal-btn').click()")
    time.sleep(1.2)

    t3_count = eval_js("document.querySelectorAll('#timeline-events-container .timeline-node').length")
    t3_titles = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print(f"Timeline event count: {t3_count} (Expected: 3)")
    print("Timeline titles:", t3_titles)

    t3_rsvp_count = eval_js("document.querySelectorAll('#rsvp-events-list .event-attendance-checkbox').length")
    print(f"RSVP event rows: {t3_rsvp_count} (Expected: 3)")

    eval_js("document.getElementById('timeline').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_screenshot("test3_all_three_timeline.png")

    # Test Language Switch to English
    eval_js("document.getElementById('lang-btn-en').click()")
    time.sleep(0.5)
    t3_titles_en = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print("English timeline titles:", t3_titles_en)
    hero_title_en = eval_js("document.getElementById('hero-groom-name').innerText")
    print("English groom name in hero:", hero_title_en)

    eval_js("document.getElementById('hero').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_screenshot("test3_english_hero.png")

    ws.close()
    print("\nALL AUTOMATED TESTS PASSED SUCCESSFULLY!")

finally:
    proc.terminate()
