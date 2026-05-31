"""
Shared helpers for n8n maintenance scripts.

NO SECRETS IN SOURCE. The n8n encryption key is read at runtime from
(in order): $N8N_ENCRYPTION_KEY, then /root/n8n/.n8n/config ("encryptionKey").
OAuth client/refresh tokens are read from the encrypted n8n credentials table.

Requires: pycryptodome
  apt-get install -y python3-pycryptodome
  # or: pip install --break-system-packages pycryptodome
"""
import os, json, base64, hashlib, sqlite3, requests
from Crypto.Cipher import AES

DB = os.environ.get("N8N_DB", "/root/n8n/.n8n/database.sqlite")
CONFIG = os.environ.get("N8N_CONFIG", "/root/n8n/.n8n/config")


def encryption_key() -> str:
    k = os.environ.get("N8N_ENCRYPTION_KEY")
    if k:
        return k
    with open(CONFIG) as f:
        return json.load(f)["encryptionKey"]


def decrypt(enc_str: str, key: str | None = None) -> str:
    """Decrypt an n8n CipherGCM/CBC 'Salted__' blob (openssl EVP, MD5 KDF)."""
    key = key or encryption_key()
    raw = base64.b64decode(enc_str)
    assert raw[:8] == b"Salted__", f"bad magic: {raw[:8]!r}"
    salt, ct = raw[8:16], raw[16:]
    kb = key.encode()
    d = b""
    di = b""
    while len(d) < 48:
        di = hashlib.md5(di + kb + salt).digest()
        d += di
    plain = AES.new(d[:32], AES.MODE_CBC, d[32:48]).decrypt(ct)
    pad = plain[-1]
    if isinstance(pad, int) and 1 <= pad <= 16:
        plain = plain[:-pad]
    return plain.decode("utf-8", errors="replace")


def credential(cred_type: str) -> dict:
    """Return the decrypted credential dict for the first cred of a given type."""
    con = sqlite3.connect(DB)
    row = con.execute(
        "SELECT data FROM credentials_entity WHERE type=? LIMIT 1", (cred_type,)
    ).fetchone()
    con.close()
    if not row:
        raise LookupError(f"no credential of type {cred_type!r}")
    return json.loads(decrypt(row[0]))


def google_access_token(cred_type: str) -> str:
    """Refresh and return a Google OAuth2 access token for an n8n credential.

    Note: the standalone googleDriveOAuth2Api token is currently revoked; use
    'googleSheetsTriggerOAuth2Api' (full drive scope) for Drive operations.
    """
    c = credential(cred_type)
    td = c.get("oauthTokenData", {})
    if isinstance(td, str):
        td = json.loads(td)
    r = requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "client_id": c["clientId"],
            "client_secret": c["clientSecret"],
            "refresh_token": td["refresh_token"],
            "grant_type": "refresh_token",
        },
    )
    r.raise_for_status()
    return r.json()["access_token"]
