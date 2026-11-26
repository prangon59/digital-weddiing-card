import json
import time
import subprocess
import urllib.request
import base64
import os
import websocket
import re

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
USER_DATA_DIR = r"C:\Users\Sakib\Desktop\wedding card\final\test_lang_edge_profile"
OUTPUT_DIR = r"C:\Users\Sakib\Desktop\wedding card\final\test_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

edge_proc = subprocess.Popen([
    EDGE_PATH,
    "--headless=new",
    "--remote-debugging-port=9338",
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
    tabs = json.loads(urllib.request.urlopen("http://127.0.0.1:9338/json").read())
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]

    ws = websocket.create_connection(ws_url, timeout=10)
    cdp_send(ws, "Page.enable", msg_id=1)
    cdp_send(ws, "Runtime.enable", msg_id=2)

    url = "http://localhost:5173/final/index.html?e=all&n=Tanvir&b=তানভীর&c=2"
    print(f"Navigating to {url}...")
    cdp_send(ws, "Page.navigate", {"url": url}, msg_id=3)
    time.sleep(2)

    # 1. Open the doors
    evaluate_js(ws, "document.getElementById('gate-wax-seal').click()", msg_id=10)
    time.sleep(2)

    # 2. Switch to English
    print("Switching to English...")
    evaluate_js(ws, "document.getElementById('lang-btn-en').click()", msg_id=20)
    time.sleep(1)

    # Check connectors
    hero_connector = evaluate_js(ws, "document.querySelector('#hero [data-i18n=coupleConnector]').innerText", msg_id=30)
    formal_connector = evaluate_js(ws, "document.querySelector('#invitation [data-i18n=coupleConnector]').innerText", msg_id=31)
    print(f"English Connectors -> Hero: '{hero_connector}', Formal: '{formal_connector}'")
    assert "ও" not in hero_connector, f"Found Bengali 'ও' in English hero connector: {hero_connector}"
    assert "ও" not in formal_connector, f"Found Bengali 'ও' in English formal connector: {formal_connector}"

    # Check Moments section
    moments_badge = evaluate_js(ws, "document.querySelector('#moments [data-i18n=momentsBadge]').innerText", msg_id=32)
    moments_heading = evaluate_js(ws, "document.querySelector('#moments [data-i18n=momentsHeading]').innerText", msg_id=33)
    print(f"English Moments -> Badge: '{moments_badge}', Heading: '{moments_heading}'")
    assert moments_badge != moments_heading, f"Moments badge and heading are repeated: '{moments_badge}'"

    # Check Timeline section
    timeline_badge = evaluate_js(ws, "document.querySelector('#schedule [data-i18n=timelineBadge]').innerText", msg_id=34)
    timeline_heading = evaluate_js(ws, "document.querySelector('#schedule [data-i18n=timelineHeading]').innerText", msg_id=35)
    print(f"English Timeline -> Badge: '{timeline_badge}', Heading: '{timeline_heading}'")
    assert timeline_badge != timeline_heading, f"Timeline badge and heading are repeated: '{timeline_badge}'"

    # Check Travel Guide section
    travel_badge = evaluate_js(ws, "document.querySelector('#travel [data-i18n=travelGuideBadge]').innerText", msg_id=36)
    travel_heading = evaluate_js(ws, "document.querySelector('#travel [data-i18n=travelGuideHeading]').innerText", msg_id=37)
    print(f"English Travel -> Badge: '{travel_badge}', Heading: '{travel_heading}'")
    assert travel_badge != travel_heading, f"Travel badge and heading are repeated: '{travel_badge}'"

    # Check Story carousel slide 0
    story_slide_0_title = evaluate_js(ws, "document.querySelector('.story-carousel-slide:nth-child(1) h3').innerText", msg_id=39)
    print(f"English Story Slide 0 Title: '{story_slide_0_title}'")
    assert not re.search(r'[\u0980-\u09FF]', story_slide_0_title), f"Found Bengali in English slide title: {story_slide_0_title}"

    # Scan the whole phone frame for any untranslated Bengali characters in English mode (excluding Arabic Bismillah)
    page_text = evaluate_js(ws, "document.querySelector('.phone-frame').innerText", msg_id=40)
    # Remove Arabic
    cleaned_text = re.sub(r'[\u0600-\u06FF]', '', page_text)
    # Check for Bengali characters
    bengali_matches = re.findall(r'[\u0980-\u09FF]+', cleaned_text)
    print(f"Bengali words found in English mode: {bengali_matches}")
    assert len(bengali_matches) == 0, f"Found untranslated Bengali words in English mode: {bengali_matches}"

    # Take screenshot in English
    evaluate_js(ws, "document.getElementById('invitation').scrollIntoView({ behavior: 'instant' })", msg_id=45)
    time.sleep(0.5)
    take_screenshot(ws, "verified_english_invitation.png", msg_id=46)

    evaluate_js(ws, "document.getElementById('moments').scrollIntoView({ behavior: 'instant' })", msg_id=47)
    time.sleep(0.5)
    take_screenshot(ws, "verified_english_moments.png", msg_id=48)

    # 3. Switch back to Bengali
    print("\nSwitching back to Bengali...")
    evaluate_js(ws, "document.getElementById('lang-btn-bn').click()", msg_id=50)
    time.sleep(1)

    bn_hero_connector = evaluate_js(ws, "document.querySelector('#hero [data-i18n=coupleConnector]').innerText", msg_id=51)
    bn_formal_connector = evaluate_js(ws, "document.querySelector('#invitation [data-i18n=coupleConnector]').innerText", msg_id=52)
    print(f"Bengali Connectors -> Hero: '{bn_hero_connector}', Formal: '{bn_formal_connector}'")
    assert "ও" in bn_hero_connector, f"Missing Bengali 'ও' in Bengali hero connector: {bn_hero_connector}"
    assert "ও" in bn_formal_connector, f"Missing Bengali 'ও' in Bengali formal connector: {bn_formal_connector}"

    bn_moments_badge = evaluate_js(ws, "document.querySelector('#moments [data-i18n=momentsBadge]').innerText", msg_id=53)
    bn_moments_heading = evaluate_js(ws, "document.querySelector('#moments [data-i18n=momentsHeading]').innerText", msg_id=54)
    print(f"Bengali Moments -> Badge: '{bn_moments_badge}', Heading: '{bn_moments_heading}'")
    assert bn_moments_badge != bn_moments_heading, f"Bengali Moments badge and heading repeated: '{bn_moments_badge}'"

    evaluate_js(ws, "document.getElementById('moments').scrollIntoView({ behavior: 'instant' })", msg_id=55)
    time.sleep(0.5)
    take_screenshot(ws, "verified_bengali_moments.png", msg_id=56)

    ws.close()
    print("\nALL LANGUAGE ISOLATION & DEDUPLICATION CHECKS PASSED PERFECTLY!")
finally:
    try:
        edge_proc.terminate()
    except:
        pass
