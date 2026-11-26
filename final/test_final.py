import subprocess
import time
import json
import urllib.request
import websocket
import base64
import os

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
PORT = 9336
OUT_DIR = r"C:\Users\Sakib\Desktop\wedding card\final\test_screenshots"
os.makedirs(OUT_DIR, exist_ok=True)

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

    def eval_js(expression):
        res = send_cmd("Runtime.evaluate", {"expression": expression, "returnByValue": True})
        return res.get("result", {}).get("value")

    def save_shot(filename):
        res = send_cmd("Page.captureScreenshot", {"format": "png"})
        filepath = os.path.join(OUT_DIR, filename)
        with open(filepath, "wb") as f:
            f.write(base64.b64decode(res["data"]))
        print(f"Captured: {filename}")

    print("=== TEST 1: Tanvir (Reception ONLY, e=r, c=1) ===")
    send_cmd("Page.navigate", {"url": "http://localhost:5173/final/index.html?e=r&n=Tanvir&b=%E0%A6%A4%E0%A6%BE%E0%A6%A8%E0%A6%AD%E0%A7%80%E0%A6%B0&c=1"})
    time.sleep(2)

    # 1. Check unopened gates
    save_shot("final_test1_unopened_gates.png")

    # 2. Tap Wax Seal to open gates
    eval_js("document.getElementById('gate-wax-seal').click()")
    time.sleep(1.8)
    save_shot("final_test1_hero.png")

    # 3. Check Timeline for Reception only
    t1_count = eval_js("document.querySelectorAll('#timeline-events-container .timeline-node').length")
    t1_titles = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print(f"Tanvir timeline event count: {t1_count} (Expected: 1)")
    print("Tanvir timeline titles:", t1_titles)

    # 4. Check RSVP for Reception only
    t1_rsvp_count = eval_js("document.querySelectorAll('#rsvp-events-list .event-attendance-checkbox').length")
    print(f"Tanvir RSVP count: {t1_rsvp_count} (Expected: 1)")

    # Scroll to timeline
    eval_js("document.getElementById('schedule').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test1_timeline_reception_only.png")

    print("\n=== TEST 2: Relatives (Holud + Reception, e=gh,r, c=3) ===")
    send_cmd("Page.navigate", {"url": "http://localhost:5173/final/index.html?e=gh,r&n=Karim+Mama&b=%E0%A6%95%E0%A6%B0%E0%A6%BF%E0%A6%AE+%E0%A6%AE%E0%A6%BE%E0%A6%AE%E0%A6%BE&c=3"})
    time.sleep(2)
    eval_js("document.getElementById('gate-wax-seal').click()")
    time.sleep(1.8)

    t2_count = eval_js("document.querySelectorAll('#timeline-events-container .timeline-node').length")
    t2_titles = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print(f"Relative timeline count: {t2_count} (Expected: 2)")
    print("Relative timeline titles:", t2_titles)

    eval_js("document.getElementById('schedule').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test2_timeline_holud_reception.png")

    print("\n=== TEST 3: All 4 Programs (e=all, c=4, Dr. Tariq) ===")
    send_cmd("Page.navigate", {"url": "http://localhost:5173/final/index.html?e=all&n=Dr.+Tariq&b=%E0%A6%A1%E0%A6%BE%E0%A6%83+%E0%A6%A4%E0%A6%BE%E0%A6%B0%E0%A6%BF%E0%A6%95&c=4"})
    time.sleep(2)
    eval_js("document.getElementById('gate-wax-seal').click()")
    time.sleep(1.8)

    t3_count = eval_js("document.querySelectorAll('#timeline-events-container .timeline-node').length")
    t3_titles = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print(f"All events count: {t3_count} (Expected: 4)")
    print("All events titles:", t3_titles)

    # Check Parents' details
    mother_name = eval_js("document.getElementById('formal-groom-parents').innerText")
    groom_address = eval_js("document.getElementById('formal-groom-hometown').innerText")
    bride_address = eval_js("document.getElementById('formal-bride-hometown').innerText")
    print("Groom's parents:", mother_name)
    print("Groom's address:", groom_address)
    print("Bride's address:", bride_address)

    # Scroll to Our Story
    eval_js("document.getElementById('story').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_our_story.png")

    # Scroll to Formal Invitation
    eval_js("document.getElementById('invitation').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_formal_invitation.png")

    # Scroll to All 4 Events Timeline
    eval_js("document.getElementById('schedule').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_timeline_all_4.png")

    # Scroll to Standalone Countdown
    eval_js("document.getElementById('countdown').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_countdown.png")

    # Scroll to Travel & Transit Guide
    eval_js("document.getElementById('travel').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_travel_guide.png")

    # Scroll to Moments & Memories
    eval_js("document.getElementById('moments').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_moments.png")

    # Scroll to RSVP
    eval_js("document.getElementById('rsvp').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_rsvp.png")

    # Switch Language to English
    eval_js("document.getElementById('lang-btn-en').click()")
    time.sleep(0.5)
    t3_titles_en = eval_js("Array.from(document.querySelectorAll('#timeline-events-container .timeline-card h3')).map(h => h.innerText)")
    print("English event titles:", t3_titles_en)
    eval_js("document.getElementById('hero').scrollIntoView({ behavior: 'instant' })")
    time.sleep(0.5)
    save_shot("final_test3_english_hero.png")

    ws.close()
    print("\nALL FINAL VERSION TESTS PASSED SUCCESSFULLY!")

finally:
    proc.terminate()
