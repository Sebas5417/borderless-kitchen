#!/usr/bin/env python3
"""
Set the schedule trigger of 'BK Daily Social Caption Generator v4' to fire at a
given set of hours each day. Default: 9 and 17 (two posts/day).

Backs up the nodes JSON to /tmp before writing. Restart n8n afterwards:
    docker restart n8n-main

Usage:
    python3 patch_caption_cadence.py            # 09:00 and 17:00
    HOURS=8,13,18 python3 patch_caption_cadence.py
No secrets involved (DB edit only).
"""
import os, json, time, sqlite3

DB = os.environ.get("N8N_DB", "/root/n8n/.n8n/database.sqlite")
WID = os.environ.get("WORKFLOW_ID", "Msr4MCRV01YLRtGx")
HOURS = [int(h) for h in os.environ.get("HOURS", "9,17").split(",")]

con = sqlite3.connect(DB)
nodes = json.loads(con.execute(
    "SELECT nodes FROM workflow_entity WHERE id=?", (WID,)).fetchone()[0])

bak = f"/tmp/nodes_backup_{int(time.time())}.json"
open(bak, "w").write(json.dumps(nodes))
print(f"Backup: {bak}\n")

patched = False
for n in nodes:
    if n.get("name") == "Daily 9AM Trigger" or n.get("type", "").endswith("scheduleTrigger"):
        print("BEFORE:", json.dumps(n.get("parameters", {})))
        n["parameters"] = {"rule": {"interval": [
            {"field": "days", "triggerAtHour": h} for h in HOURS]}}
        print("AFTER: ", json.dumps(n["parameters"]))
        patched = True

if not patched:
    raise SystemExit("ERROR: schedule trigger node not found")

con.execute("UPDATE workflow_entity SET nodes=?, updatedAt=? WHERE id=?",
            (json.dumps(nodes), time.strftime("%Y-%m-%d %H:%M:%S"), WID))
con.commit()
con.close()
print("\nPATCHED. Now run: docker restart n8n-main")
