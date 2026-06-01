#!/usr/bin/env python3
"""
Verify the LIVE Claude caption prompt produces the correct per-book vol block.

Side-effect-free: reads the live jsonBody from the n8n DB, resolves it for a
sample SMMC recipe, calls the Anthropic API directly, and checks the output
contains the Vol. 2 (Seoul Meets Mexico City) block and NOT the wrong
"inside Tokyo Meets Tuscany" line. Does not touch the sheet, Telegram, or IG.

Secrets at runtime via n8n_lib (no secrets in source).
"""
import os, sqlite3, json, re, requests
from n8n_lib import credential, DB

api = credential("anthropicApi")
api_key = api.get("apiKey") or api.get("api_key")

con = sqlite3.connect(DB)
nodes = json.loads(con.execute(
    "SELECT nodes FROM workflow_entity WHERE id=?",
    (os.environ.get("WORKFLOW_ID", "Msr4MCRV01YLRtGx"),)).fetchone()[0])
con.close()

jb = None
for n in nodes:
    if n.get("name") == "HTTP Request" and "Tuscany" in json.dumps(n):
        jb = n["parameters"]["jsonBody"]
if jb and jb.startswith("="):
    jb = jb[1:]

SAMPLE_TOPIC = os.environ.get("SAMPLE_TOPIC", "Kimchi Quesadillas with Oaxaca Cheese")
SMMC_BLOCK = ("This recipe is from Seoul Meets Mexico City — Vol. 2 of Borderless Kitchen, "
              "where Korean fire meets Mexican soul. Coming soon. \U0001f336️ "
              "Vol. 1, Tokyo Meets Tuscany, is out now. \U0001f4d7")

unknown = []
def resolve(m):
    e = m.group(1)
    if "({TMT:" in e: return SMMC_BLOCK
    if ".topic" in e: return SAMPLE_TOPIC
    if ".book" in e: return "SMMC"
    if ".platform" in e: return "instagram"
    if ".caption_tone" in e: return "warm, conversational, a little playful"
    unknown.append(e.strip()[:60]); return ""

body = json.loads(re.sub(r"\{\{(.*?)\}\}", resolve, jb))
if unknown:
    print("Unmapped expressions:", unknown)

r = requests.post("https://api.anthropic.com/v1/messages",
    headers={"x-api-key": api_key, "anthropic-version": "2023-06-01",
             "content-type": "application/json"},
    json=body, timeout=90)
r.raise_for_status()
txt = r.json()["content"][0]["text"]
print(txt)
print("\n" + "=" * 60)
ok = "Seoul Meets Mexico City" in txt and "Vol. 2" in txt
bad = "inside Tokyo Meets Tuscany" in txt
print(f"Vol.2 SMMC block present: {ok}")
print(f"WRONG 'inside Tokyo Meets Tuscany' present: {bad}")
print("RESULT:", "PASS" if (ok and not bad) else "FAIL")
