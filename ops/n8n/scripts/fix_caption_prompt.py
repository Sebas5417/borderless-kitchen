#!/usr/bin/env python3
"""
Re-apply the per-book "vol block" to the Claude caption prompt.

PROBLEM THIS FIXES: the HTTP Request (Claude) node's jsonBody hardcodes a
"copy verbatim" Tokyo Meets Tuscany / Vol. 1 block, so EVERY caption — even
SMMC recipes — claims the recipe is in Vol. 1 TMT. This swaps that hardcoded
block for an n8n expression that picks the right blurb from the row's `book`.

IMPORTANT — make it stick: n8n keeps active workflows in memory and can flush
its in-memory copy back over a direct DB edit. ALWAYS stop n8n first:
    docker stop n8n-main
    python3 fix_caption_prompt.py
    docker start n8n-main

No secrets in source (DB edit only). Idempotent: re-running is a no-op once the
hardcoded "Stay tuned." block is gone.
"""
import os, sqlite3, json, re, time

DB = os.environ.get("N8N_DB", "/root/n8n/.n8n/database.sqlite")
WID = os.environ.get("WORKFLOW_ID", "Msr4MCRV01YLRtGx")

# Per-book vol block. Single line each (no internal newlines — keeps the
# surrounding JSON body valid when the expression result is interpolated).
NEW = ("{{ ({TMT:'This recipe is inside Tokyo Meets Tuscany — Vol. 1 of Borderless Kitchen, "
       "where Japanese precision meets Italian soul. Out now. 📗',"
       "SMMC:'This recipe is from Seoul Meets Mexico City — Vol. 2 of Borderless Kitchen, "
       "where Korean fire meets Mexican soul. Coming soon. 🌶️ Vol. 1, Tokyo Meets Tuscany, is out now. 📗',"
       "MMM:'This recipe is from Mumbai Meets Marrakech — an upcoming volume of Borderless Kitchen, "
       "currently in development. Vol. 1, Tokyo Meets Tuscany, is out now. 📗',"
       "BBB:'This recipe is from Bangkok Meets Barcelona — an upcoming volume of Borderless Kitchen, "
       "currently in development. Vol. 1, Tokyo Meets Tuscany, is out now. 📗'})"
       "[({SMSM:'SMMC',SMMC:'SMMC',TMT:'TMT',MMM:'MMM',BBB:'BBB',"
       "'SEOUL MEETS MEXICO CITY':'SMMC','TOKYO MEETS TUSCANY':'TMT',"
       "'MUMBAI MEETS MARRAKECH':'MMM','BANGKOK MEETS BARCELONA':'BBB'})"
       "[String($('Read Next PENDING Row').item.json.book||'').trim().toUpperCase()]||'TMT'] }}")

con = sqlite3.connect(DB)
nodes = json.loads(con.execute("SELECT nodes FROM workflow_entity WHERE id=?", (WID,)).fetchone()[0])
open(f"/tmp/nodes_backup_{int(time.time())}.json", "w").write(json.dumps(nodes))

pat = re.compile(r"This recipe is inside Tokyo Meets Tuscany.*?Stay tuned\.")
done = False
for n in nodes:
    if n.get("name") == "HTTP Request":
        p = n.get("parameters", {})
        jb = p.get("jsonBody", "")
        if "Stay tuned" in jb and pat.search(jb):
            newjb = pat.sub(lambda m: NEW, jb, count=1)
            p["jsonBody"] = newjb
            print(f"jsonBody: {len(jb)} -> {len(newjb)} chars; per-book expr present: {'({TMT:' in newjb}")
            done = True

if not done:
    print("No hardcoded block found — already patched or structure changed.")
    raise SystemExit(0)

con.execute("UPDATE workflow_entity SET nodes=?, updatedAt=? WHERE id=?",
            (json.dumps(nodes, ensure_ascii=False), time.strftime("%Y-%m-%d %H:%M:%S"), WID))
con.commit()
con.close()
print("PATCHED DB. Now: docker start n8n-main")
