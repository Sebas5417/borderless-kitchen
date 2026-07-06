---
title: MASTER SCALP PRO — TOS Script Suite v2.0 (full bug-fix audit)
created: 2026-07-06
type: tos-scripts-ready-to-paste
tags: [trading, thinkscript, tos, master, verified, v2]
status: paper-trade-first
supersedes: MASTER_SCALP_PRO_TOS.md (v1.0 file — stale, do not paste from it)
related: [[Ross-Cameron-Momentum-TOS-Scripts]], [[TOS-Master-Trading-Suite]], [[feedback_thinkscript_compiler]]
---

# MASTER SCALP PRO — TOS Script Suite v2.0

> **Round-2 audit (2026-07-06):** Full re-audit of every script referenced by the load
> order. 17 additional bugs found and fixed — including 5 classes of compile failures
> and 5 logic bugs that silently corrupted backtest results.
>
> **This file is now fully self-contained.** The RSI zones, BB Squeeze, Volume Surge,
> and the 3 short strategies that previously had to be pasted from the two superseded
> reference files are included here in fixed form. Do NOT paste anything from
> `Ross-Cameron-Momentum-TOS-Scripts.md` or `TOS-Master-Trading-Suite.md` anymore —
> the copies there still contain the bugs.
>
> **PAPER MONEY ONLY** until you have 50+ logged trades with positive Profit Factor.
> No script here auto-trades — strategies only execute inside the Strategy Tester.

---

## ROUND-2 AUDIT — WHAT WAS STILL BROKEN (2026-07-06)

### Compile failures (script rejected by TOS)

| # | Bug | Where | Fix |
|---|-----|-------|-----|
| 1 | Drive master file still contained Strategy **v1.0** — the `exitNow` forward reference and `SELL_SHORT`/`BUY_TO_COVER` bugs that v1.1–v1.3 fixed were never synced from Desktop back to Drive | Script 2 | Script 2 rebuilt below as v2.0 using the proven v1.3 pattern (pos first, exit logic inlined) |
| 2 | `Sound.Chime` does not exist — the enum is `Sound.Chimes` | Scripts 3, 7 | Corrected |
| 3 | `Alert()` message text must be a compile-time **constant** — concatenating def values (`longScore`, `Round(high[1],2)`, `Round(H3,2)`, …) into alert text fails with "Constant expected: text" | Scripts 1, 4, 7 | Alert text made static; dynamic values moved to labels/bubbles (which allow them) |
| 4 | `LinearRegValue()` is not a thinkScript function (it's from other platforms) | Script 11 (BB Squeeze) | Replaced with `Inertia()` |
| 5 | `fast crosses above sig and hist > 0` — precedence ambiguity between `crosses` and `and` | Script 3 | Parenthesized: `(fast crosses above sig) and hist > 0` |
| 6 | STRAT_GAP_AND_CRAP, STRAT_ABCD, STRAT_GRITTANI_CH11 in the old suite file all still have the `exitNow` forward reference + `SELL_SHORT`/`BUY_TO_COVER` bugs | Scripts 13–15 | Rebuilt below using the `EntryPrice()` pattern (no state-machine forward references possible) |

### Logic bugs (compiled, but produced wrong numbers)

| # | Bug | Where | Fix |
|---|-----|-------|-----|
| 7 | Opening range and premarket high used `HighestAll()`/`LowestAll()` — those scan **every bar on the chart including future bars**, so on any multi-day chart (i.e., every backtest) the OR/PM levels were the extreme across ALL days, and they repaint | Scripts 1, 2 | Rebuilt as per-day `CompoundValue` accumulators that reset each morning |
| 8 | `VWAP(period = AggregationPeriod.DAY)` resolves to the daily-aggregation `vwap` fundamental — on historical intraday bars it returns the day's **final** VWAP (lookahead bias in every backtest). Also, naming the def `vwap` collides with the built-in function name | Scripts 1, 2, 4, 13 | Replaced with `reference VWAP` (true running intraday VWAP, resets daily) and renamed the variable `dayVWAP` |
| 9 | BB Squeeze momentum: `Average(Highest(high,n) + Lowest(low,n), 2)` is a 2-bar SMA of the SUM (≈ 2× price), not the midpoint — the histogram was permanently negative | Script 11 | Correct Carter construction: `(donchian mid + SMA) / 2` |
| 10 | STRAT_GRITTANI_CH11 gap-down test used `close(period = DAY)` — the day's final close (lookahead), and not a gap test at all | Script 15 | Gap measured as prior close vs today's **open** (matches the study version, which was already correct) |
| 11 | Exit `AddOrder`s re-computed `dynShares` on the exit bar — if ATR moved, the exit size ≠ entry size | Scripts 2, 13–15 | Entry share count latched at entry and used for the exit order |

### Sizing / realism fixes

| # | Bug | Fix |
|---|-----|-----|
| 12 | `Round(shares, 0)` rounds half-up → could size risk slightly ABOVE max risk | `Floor()` — always at or under max risk |
| 13 | NaN ATR on the first bars of a chart → NaN share count could poison an order | Guarded: `dynShares = 0` until ATR is valid, and entries require `dynShares > 0` |
| 14 | Fills at signal-bar `close` are not achievable (that print is already gone when the signal completes). NOTE: this reverses the June-17 audit decision — `open[-1]` (next-bar open) is the honest fill, and it's also TOS's own default | All strategy orders fill at `open[-1]` |

### Minor

- Script 1 dashboard label showed ATR distances labeled like prices — now labeled as distances.
- Script 4: unused `prevDayOpen` removed.
- Script 2 time-stop counts bars since the last entry *signal* (the compile-safe pattern can't count bars-in-position without referencing `pos` before it exists). The trailing stop and VWAP exits still bound risk. The three `EntryPrice()`-based strategies (13–15) count true bars held.

### Honest status

These fixes are desk-checked against the thinkScript language reference and every rule
in `feedback_thinkscript_compiler.md`. They have **not yet been compiled inside TOS**
(that has to happen on your machine) — run the VERIFY CHECKLIST at the bottom and log
any error message verbatim.

---

## SCRIPT 1 — MASTER SCALP PRO (Study + Alert version) — v2.0

**Load as:** Chart Study → Upper Panel
**Chart:** 1-minute, Extended Hours ON (needed for premarket high)
**Time:** 9:30am–11:00am ET

```thinkscript
# ============================================================
# MASTER_SCALP_PRO v2.0 (study / alert version)
# Combines: VWAP reclaim + Bull flag + ABCD + ORB (long)
#           Gap-and-Crap fade (short)
# Confirmations: VWAP position + EMA 9/20 + Raschke 3/10 SMA
#                + RSI(7) + Relative Volume
# v2.0: per-day opening range (no HighestAll repaint),
#       true intraday VWAP (reference VWAP), constant alert text
# ============================================================
declare upper;

# --- INPUTS ---
input minScore = 4;      # min confirmations needed (out of 5)
input tradeStart = 0930;
input tradeEnd = 1100;

# --- CORE INDICATORS ---
def dayVWAP = reference VWAP;  # running intraday VWAP, resets daily — no lookahead
def ema9 = ExpAverage(close, 9);
def ema20 = ExpAverage(close, 20);
def avgVol = Average(volume, 20);
def atr14 = Average(TrueRange(high, close, low), 14);

# Raschke 3/10 SMA Oscillator (SMAs only — not EMAs)
def sma3 = Average(close, 3);
def sma10 = Average(close, 10);
def fast310 = sma3 - sma10;
def sig310 = Average(fast310, 16);
def hist310 = fast310 - sig310;

# RSI(7) — fast enough for 1-min scalping
def rsi7 = RSI(length = 7);

# Relative volume
def relVol = volume / avgVol;

# Trade window
def windowOK = SecondsFromTime(tradeStart) >= 0 and SecondsTillTime(tradeEnd) > 0;

# --- OPENING RANGE (first 5 min, computed PER DAY) ---
def inOR = SecondsFromTime(0930) >= 0 and SecondsFromTime(0930) < 300;
def orDone = SecondsFromTime(0930) >= 300;
def orHigh = CompoundValue(1,
    if inOR and !inOR[1] then high
    else if inOR then Max(high, orHigh[1])
    else orHigh[1], high);
def orLow = CompoundValue(1,
    if inOR and !inOR[1] then low
    else if inOR then Min(low, orLow[1])
    else orLow[1], low);

# --- PREMARKET HIGH (per day — requires Extended Hours ON) ---
def isPM = SecondsTillTime(0930) > 0;
def pmHigh = CompoundValue(1,
    if isPM and !isPM[1] then high
    else if isPM then Max(high, pmHigh[1])
    else pmHigh[1], high);

# --- LONG CONFIRMATION SCORE (0-5) ---
def c1 = if close > dayVWAP then 1 else 0;
def c2 = if close > ema9 and ema9 > ema20 then 1 else 0;
def c3 = if hist310 > 0 then 1 else 0;
def c4 = if rsi7 >= 40 and rsi7 < 75 then 1 else 0;
def c5 = if relVol >= 1.5 then 1 else 0;
def longScore = c1 + c2 + c3 + c4 + c5;

# --- SHORT CONFIRMATION SCORE (0-5) ---
def s1 = if close < dayVWAP then 1 else 0;
def s2 = if close < ema9 and ema9 < ema20 then 1 else 0;
def s3 = if hist310 < 0 then 1 else 0;
def s4 = if rsi7 <= 60 and rsi7 > 25 then 1 else 0;
def s5 = if relVol >= 1.5 then 1 else 0;
def shortScore = s1 + s2 + s3 + s4 + s5;

# --- LONG PATTERN TRIGGERS (any one = valid entry) ---
def t_vwapReclaim = close[1] < dayVWAP[1] and close > dayVWAP and close > open;
def t_flagBreak = close > Highest(high, 5)[1] and close > ema9 and relVol >= 1.3;
def bPt = Highest(high, 10)[1];
def cPt = Lowest(low, 5)[1];
def aPt = Lowest(low, 15)[1];
def t_abcd = cPt > aPt and close > bPt and close[1] <= bPt[1] and relVol >= 1.3;
def t_orb = orDone and close > orHigh and close[1] <= orHigh[1] and close > dayVWAP;
def anyLong = t_vwapReclaim or t_flagBreak or t_abcd or t_orb;

# --- SHORT PATTERN TRIGGER ---
def t_fade = close < dayVWAP and close[1] >= dayVWAP[1] and close < ema9
    and relVol >= 1.5 and close < open;

# --- FINAL ENTRY SIGNALS ---
def longEntry = windowOK and longScore >= minScore and anyLong;
def shortEntry = windowOK and shortScore >= minScore and t_fade;

# --- SIGNAL ARROWS ---
plot LongSignal = longEntry;
plot ShortSignal = shortEntry;

LongSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
LongSignal.SetDefaultColor(Color.GREEN);
LongSignal.SetLineWeight(4);

ShortSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
ShortSignal.SetDefaultColor(Color.RED);
ShortSignal.SetLineWeight(4);

# --- KEY LEVEL PLOTS ---
plot VWAPLine = dayVWAP;
VWAPLine.SetDefaultColor(Color.MAGENTA); VWAPLine.SetLineWeight(3);
plot EMA9Line = ema9;
EMA9Line.SetDefaultColor(Color.YELLOW); EMA9Line.SetLineWeight(2);
plot EMA20Line = ema20;
EMA20Line.SetDefaultColor(Color.CYAN); EMA20Line.SetLineWeight(2);
plot ORHighLine = if SecondsFromTime(0930) >= 0 then orHigh else Double.NaN;
plot ORLowLine = if SecondsFromTime(0930) >= 0 then orLow else Double.NaN;
plot PMHighLine = pmHigh;
PMHighLine.SetDefaultColor(Color.GREEN); PMHighLine.SetStyle(Curve.SHORT_DASH);
ORHighLine.SetDefaultColor(Color.LIME); ORHighLine.SetStyle(Curve.SHORT_DASH);
ORLowLine.SetDefaultColor(Color.ORANGE); ORLowLine.SetStyle(Curve.SHORT_DASH);

# Candle coloring: green above VWAP, red below
AssignPriceColor(if close > dayVWAP then Color.GREEN else Color.RED);

# --- ATR TARGET / STOP BUBBLES (dynamic text is allowed here) ---
def atrTgt = close + atr14 * 1.0;
def atrStp = close - atr14 * 0.5;
AddChartBubble(longEntry, low, "GO LONG\nTgt: " + AsDollars(atrTgt) + "\nStp: " + AsDollars(atrStp), Color.GREEN, no);
AddChartBubble(shortEntry, high, "GO SHORT\nTgt: " + AsDollars(close - atr14) + "\nStp: " + AsDollars(close + atr14 * 0.5), Color.RED, yes);

# --- DASHBOARD LABELS ---
AddLabel(yes, "SCORE: " + longScore + "/5",
    if longScore == 5 then Color.GREEN
    else if longScore >= minScore then Color.YELLOW
    else Color.RED);

AddLabel(yes,
    if longScore == 5 then "LONG: GO"
    else if longScore >= minScore then "LONG: WAIT " + longScore + "/5"
    else "LONG: NO",
    if longScore == 5 then Color.GREEN
    else if longScore >= minScore then Color.YELLOW
    else Color.RED);

AddLabel(shortScore >= minScore, "SHORT: " + shortScore + "/5", Color.RED);

AddLabel(yes, "ATR: $" + Round(atr14, 3)
    + " | Tgt dist: $" + Round(atr14, 3)
    + " | Stop dist: $" + Round(atr14 * 0.5, 3), Color.GRAY);
AddLabel(yes, if windowOK then "WINDOW: OPEN" else "WINDOW: CLOSED",
    if windowOK then Color.GREEN else Color.GRAY);

# What triggered the signal
AddLabel(longEntry and t_vwapReclaim, "VWAP RECLAIM", Color.CYAN);
AddLabel(longEntry and t_flagBreak, "FLAG BREAK", Color.LIME);
AddLabel(longEntry and t_abcd, "ABCD D-BREAK", Color.GREEN);
AddLabel(longEntry and t_orb, "ORB BREAK", Color.YELLOW);
AddLabel(shortEntry, "FADE SIGNAL", Color.RED);

# --- ALERTS (text must be CONSTANT — score shown in labels instead) ---
Alert(longEntry, "MASTER SCALP PRO: LONG signal", Alert.BAR, Sound.Ring);
Alert(shortEntry, "MASTER SCALP PRO: SHORT signal", Alert.BAR, Sound.Bell);
```

---

## SCRIPT 2 — MASTER SCALP PRO (Strategy / Backtest version) — v2.0

**Load as:** Chart Study → **Strategies** tab (NOT Studies tab)
**Chart:** 1-minute
**After loading:** right-click chart → **Strategy Report**
**Mode:** LONG ONLY (shorts are covered by Scripts 13 and 15)

```thinkscript
# ============================================================
# MASTER_SCALP_PRO_STRAT v2.0 (strategy / backtest version)
# Long-only. Exit spec (from v1.3):
#   trailing stop (3-bar high - 0.5*ATR)  OR  close < VWAP
#   OR time stop  OR  trade-window close
# Compile-safe ordering (feedback_thinkscript_compiler rules):
#   exit building blocks -> pos (exit inlined) -> orders
# Fills at next bar's open (open[-1]) — honest execution.
# ============================================================

# --- INPUTS ---
input accountSize = 25000;
input riskPercent = 1.0;
input atrPeriod = 14;
input stopMult = 0.5;
input trailBars = 3;
input timeStopBars = 8;
input tradeStart = 0930;
input tradeEnd = 1100;
input minScore = 4;

# --- INDICATORS ---
def atrVal = Average(TrueRange(high, close, low), atrPeriod);
def dayVWAP = reference VWAP;  # running intraday VWAP — no daily-agg lookahead
def ema9 = ExpAverage(close, 9);
def ema20 = ExpAverage(close, 20);
def avgVol = Average(volume, 20);
def relVol = volume / avgVol;

# Raschke 3/10 SMA (SMAs — not EMAs)
def sma3 = Average(close, 3);
def sma10 = Average(close, 10);
def fast310 = sma3 - sma10;
def sig310 = Average(fast310, 16);
def hist310 = fast310 - sig310;

def rsi7 = RSI(length = 7);

# Trade window
def windowOK = SecondsFromTime(tradeStart) >= 0 and SecondsTillTime(tradeEnd) > 0;

# --- OPENING RANGE (first 5 min, computed PER DAY) ---
def inOR = SecondsFromTime(0930) >= 0 and SecondsFromTime(0930) < 300;
def orDone = SecondsFromTime(0930) >= 300;
def orHigh = CompoundValue(1,
    if inOR and !inOR[1] then high
    else if inOR then Max(high, orHigh[1])
    else orHigh[1], high);

# --- POSITION SIZING (Floor, NaN-guarded) ---
def maxRisk = accountSize * (riskPercent / 100);
def stopDist = atrVal * stopMult;
def dynShares = if !IsNaN(stopDist) and stopDist > 0
    then Max(1, Floor(maxRisk / stopDist)) else 0;

# --- LONG SCORE ---
def c1 = if close > dayVWAP then 1 else 0;
def c2 = if close > ema9 and ema9 > ema20 then 1 else 0;
def c3 = if hist310 > 0 then 1 else 0;
def c4 = if rsi7 >= 40 and rsi7 < 75 then 1 else 0;
def c5 = if relVol >= 1.5 then 1 else 0;
def longScore = c1 + c2 + c3 + c4 + c5;

# --- PATTERN TRIGGERS ---
def t_vwapR = close[1] < dayVWAP[1] and close > dayVWAP and close > open;
def t_flag = close > Highest(high, 5)[1] and close > ema9 and relVol >= 1.3;
def bPt = Highest(high, 10)[1];
def cPt = Lowest(low, 5)[1];
def aPt = Lowest(low, 15)[1];
def t_abcd = cPt > aPt and close > bPt and close[1] <= bPt[1] and relVol >= 1.3;
def t_orb = orDone and close > orHigh and close[1] <= orHigh[1] and close > dayVWAP;

def longEntry = windowOK and longScore >= minScore and dynShares > 0
    and (t_vwapR or t_flag or t_abcd or t_orb);

# --- EXIT BUILDING BLOCKS (defined BEFORE pos, no pos references) ---
def trailStop = Highest(high, trailBars) - atrVal * stopMult;
def barsSinceSig = CompoundValue(1, if longEntry then 0 else barsSinceSig[1] + 1, 0);

# --- STATE MACHINE: pos FIRST, exit logic inlined (Rule 1 + Rule 3) ---
def pos = CompoundValue(1,
    if pos[1] == 0 and longEntry then 1
    else if pos[1] == 1 and (low <= trailStop[1]
        or close < dayVWAP
        or barsSinceSig[1] >= timeStopBars
        or SecondsTillTime(tradeEnd) <= 0) then 0
    else pos[1], 0);

def entrySig = pos == 1 and pos[1] == 0;
def exitSig = pos == 0 and pos[1] == 1;

# Latch entry share count so the exit closes exactly what was opened
def heldShares = CompoundValue(1, if entrySig then dynShares else heldShares[1], 0);

# --- ORDERS (fill at next bar's open) ---
AddOrder(OrderType.BUY_TO_OPEN, entrySig, open[-1], dynShares, Color.GREEN, Color.GREEN, "MSP_long");
AddOrder(OrderType.SELL_TO_CLOSE, exitSig, open[-1], heldShares, Color.RED, Color.RED, "MSP_long_exit");

AddLabel(yes, "Risk/trade: $" + Round(maxRisk, 0)
    + " | Shares: " + dynShares
    + " | ATR: $" + Round(atrVal, 3), Color.CYAN);
```

---

## SCRIPT 3 — RASCHKE 3/10 SMA OSCILLATOR (lower panel) — v2.0

```thinkscript
# ============================================================
# RASCHKE_3_10_OSCILLATOR (verified SMA construction)
# Fast: SMA(3) - SMA(10)   Signal: SMA(16) of fast line
# v2.0: Sound.Chimes (Chime doesn't exist), crosses parenthesized
# ============================================================
declare lower;
def fast = Average(close, 3) - Average(close, 10);
def sig = Average(fast, 16);
def hist = fast - sig;

plot FastLine = fast;
FastLine.SetDefaultColor(Color.CYAN); FastLine.SetLineWeight(2);
plot Signal = sig;
Signal.SetDefaultColor(Color.ORANGE);
plot Hist = hist;
Hist.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Hist.AssignValueColor(
    if hist > 0 and hist > hist[1] then Color.GREEN
    else if hist > 0 then Color.DARK_GREEN
    else if hist < 0 and hist < hist[1] then Color.RED
    else Color.DARK_RED);
plot Zero = 0;
Zero.SetDefaultColor(Color.GRAY); Zero.SetStyle(Curve.SHORT_DASH);

Alert((fast crosses above sig) and hist > 0, "3/10 CROSS UP - momentum building", Alert.BAR, Sound.Chimes);
Alert(fast crosses below sig, "3/10 CROSS DOWN - momentum fading", Alert.BAR, Sound.Bell);
AddLabel(yes,
    if fast > sig and hist > 0 then "3/10: BULL"
    else if fast < sig then "3/10: BEAR"
    else "3/10: FLAT",
    if fast > sig and hist > 0 then Color.GREEN
    else if fast < sig then Color.RED else Color.GRAY);
```

---

## SCRIPT 4 — GRITTANI SHORT SETUPS (upper panel) — v2.0

```thinkscript
# ============================================================
# GRITTANI_SHORT_SETUPS
# CH9: short lower-high spike
# CH10: short daily resistance fail
# CH11: short gap-down morning push (stop = prior close)
# CH12: short bounce into prior resistance on red day
# v2.0: reference VWAP (no lookahead), constant alert text,
#       dynamic stop values moved to labels
# ============================================================
declare upper;
def dayVWAP = reference VWAP;
def ema9 = ExpAverage(close, 9);
def avgVol = Average(volume, 20);
def prevDayHigh = high(period = AggregationPeriod.DAY)[1];
def prevDayClose = close(period = AggregationPeriod.DAY)[1];
def sessionHigh = Highest(high, 30)[1];
def windowOK = SecondsFromTime(0930) >= 0 and SecondsTillTime(1100) >= 0;

# CH9: lower high after spike
def ch9 = high < high[1] and high[1] > high[2] and close < open
    and close < dayVWAP and volume > avgVol * 1.3 and windowOK;

# CH10: daily resistance fail
def ch10 = high >= prevDayHigh * 0.99 and close < prevDayHigh
    and close < open and volume > avgVol * 1.2 and windowOK;

# CH11: gap-down morning push (gap measured vs today's OPEN)
def trueGapDown = prevDayClose > open(period = AggregationPeriod.DAY);
def ch11 = trueGapDown and close > open and close < prevDayClose
    and close < ema9 and volume > avgVol * 1.5 and windowOK;

# CH12: bounce into prior session resistance
def ch12 = close >= sessionHigh * 0.98 and close < dayVWAP
    and close < open and windowOK;

plot S9 = ch9;
S9.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN); S9.SetDefaultColor(Color.RED);
plot S10 = ch10;
S10.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN); S10.SetDefaultColor(Color.ORANGE);
plot S11 = ch11;
S11.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN); S11.SetDefaultColor(Color.MAGENTA);
plot S12 = ch12;
S12.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN); S12.SetDefaultColor(Color.DARK_RED);

# Stop levels
plot Stop9 = if ch9 then high[1] else Double.NaN;
plot Stop10 = if ch10 then prevDayHigh * 1.005 else Double.NaN;
plot Stop11 = if ch11 then prevDayClose else Double.NaN;
plot Stop12 = if ch12 then sessionHigh * 1.01 else Double.NaN;
Stop9.SetDefaultColor(Color.RED); Stop9.SetPaintingStrategy(PaintingStrategy.DASHES);
Stop10.SetDefaultColor(Color.RED); Stop10.SetPaintingStrategy(PaintingStrategy.DASHES);
Stop11.SetDefaultColor(Color.RED); Stop11.SetPaintingStrategy(PaintingStrategy.DASHES);
Stop12.SetDefaultColor(Color.RED); Stop12.SetPaintingStrategy(PaintingStrategy.DASHES);

# Dynamic stop values shown as labels (allowed) — alert text stays constant
AddLabel(ch9, "CH9 stop: $" + Round(high[1], 2), Color.RED);
AddLabel(ch10, "CH10 stop: $" + Round(prevDayHigh * 1.005, 2), Color.ORANGE);
AddLabel(ch11, "CH11 stop: $" + Round(prevDayClose, 2), Color.MAGENTA);
AddLabel(ch12, "CH12 stop: $" + Round(sessionHigh * 1.01, 2), Color.DARK_RED);

Alert(ch9, "GRIT CH9: short lower-high spike - stop above prior high", Alert.BAR, Sound.Bell);
Alert(ch10, "GRIT CH10: short daily resistance fail", Alert.BAR, Sound.Bell);
Alert(ch11, "GRIT CH11: short gap-down push - stop at prior close", Alert.BAR, Sound.Bell);
Alert(ch12, "GRIT CH12: short bounce into resistance", Alert.BAR, Sound.Bell);
```

---

## SCRIPT 5 — DAILY GAPPER SCANNER (Stock Hacker) — unchanged, verified

**Setup:** Stock Hacker, aggregation **1 day**, "Include Extended-Hours" checked.
Run premarket 4:00am–9:25am.

```thinkscript
# ============================================================
# MASTER_GAPPER_SCAN v3 (research-verified RV1 parameters)
# ============================================================
def priceOK = close >= 0.50 and close <= 15.00;
def prevClose = close(period = AggregationPeriod.DAY)[1];
def gapOK = (close - prevClose) / prevClose * 100 >= 10.0;
def todayVol = volume(period = AggregationPeriod.DAY);
def rawVolOK = todayVol >= 500000;
def avgVol60 = Average(volume(period = AggregationPeriod.DAY), 60);
def unusualVol = todayVol >= avgVol60 * 1.40;
def todayOpen = open(period = AggregationPeriod.DAY);
def momentumOK = close >= todayOpen * 1.04;
def ema50d = ExpAverage(close(period = AggregationPeriod.DAY), 50);
def notExt = close < ema50d * 2.5;
plot Scan = priceOK and gapOK and rawVolOK and unusualVol and momentumOK and notExt;
```

---

## SCRIPT 6 — WATCHLIST COLUMNS — unchanged, verified

**Setup:** right-click watchlist header → Customize → add thinkScript column, aggregation **D**.

Setup Score (0–6), sort descending:

```thinkscript
# ============================================================
# SETUP_SCORE (0-6) — sort descending: highest = trade first
# ============================================================
def prevClose = close(period = AggregationPeriod.DAY)[1];
def prevHigh = high(period = AggregationPeriod.DAY)[1];
def gapPct = (close - prevClose) / prevClose * 100;
def avgVol50 = Average(volume(period = AggregationPeriod.DAY), 50);
def todayVol = volume(period = AggregationPeriod.DAY);
def relVol = todayVol / avgVol50;
def high4wk = Highest(high(period = AggregationPeriod.DAY), 20);

def s1 = if gapPct >= 20 then 1 else 0;
def s2 = if relVol >= 10 then 1 else 0;
def s3 = if close >= 2.00 and close <= 10.00 then 1 else 0;
def s4 = if todayVol >= 1000000 then 1 else 0;
def s5 = if close > prevHigh then 1 else 0;
def s6 = if close >= high4wk * 0.99 then 1 else 0;

def score = s1 + s2 + s3 + s4 + s5 + s6;
plot Score = score;
Score.AssignValueColor(if score >= 5 then Color.GREEN else if score >= 3 then Color.YELLOW else Color.RED);
```

Gap % column:

```thinkscript
def prevClose = close(period = AggregationPeriod.DAY)[1];
def gap = (close - prevClose) / prevClose * 100;
plot GapPct = gap;
GapPct.AssignValueColor(if gap >= 20 then Color.GREEN else if gap >= 10 then Color.YELLOW else Color.RED);
```

Relative Volume column:

```thinkscript
def v50 = Average(volume(period = AggregationPeriod.DAY), 50);
def rv = volume(period = AggregationPeriod.DAY) / v50;
plot RelVol = rv;
RelVol.AssignValueColor(if rv >= 10 then Color.GREEN else if rv >= 5 then Color.YELLOW else Color.RED);
```

---

## SCRIPT 7 — CAMARILLA PIVOTS (upper panel) — v2.0

```thinkscript
# ============================================================
# CAMARILLA_PIVOTS
# v2.0: Sound.Chimes fix, constant alert text (levels shown in label)
# ============================================================
declare upper;
def pH = high(period = AggregationPeriod.DAY)[1];
def pL = low(period = AggregationPeriod.DAY)[1];
def pC = close(period = AggregationPeriod.DAY)[1];
def r = pH - pL;
def H4 = pC + r * 1.1 / 2;
def H3 = pC + r * 1.1 / 4;
def L3 = pC - r * 1.1 / 4;
def L4 = pC - r * 1.1 / 2;

plot CH4 = H4; CH4.SetDefaultColor(Color.RED); CH4.SetLineWeight(2); CH4.SetStyle(Curve.SHORT_DASH);
plot CH3 = H3; CH3.SetDefaultColor(Color.ORANGE); CH3.SetLineWeight(1); CH3.SetStyle(Curve.SHORT_DASH);
plot CL3 = L3; CL3.SetDefaultColor(Color.CYAN); CL3.SetLineWeight(1); CL3.SetStyle(Curve.SHORT_DASH);
plot CL4 = L4; CL4.SetDefaultColor(Color.GREEN); CL4.SetLineWeight(2); CL4.SetStyle(Curve.SHORT_DASH);

Alert(close > H4 and close[1] <= H4, "CAMARILLA H4 BREAKOUT - strong long", Alert.BAR, Sound.Ring);
Alert(close < L4 and close[1] >= L4, "CAMARILLA L4 BREAKDOWN - exit longs NOW", Alert.BAR, Sound.Bell);
Alert(close > L3 and close[1] <= L3, "CAMARILLA L3 bounce - scalp toward H3", Alert.BAR, Sound.Chimes);
AddLabel(yes, "H4:" + AsDollars(H4) + " H3:" + AsDollars(H3) + " L3:" + AsDollars(L3) + " L4:" + AsDollars(L4), Color.WHITE);
```

---

## SCRIPT 8 — FIRST GREEN DAY SCAN (run 3:45pm) — unchanged, verified

```thinkscript
# ============================================================
# FIRST_GREEN_DAY_SCAN (checks 3 prior red days)
# Stock Hacker, aggregation 1 day, run at 3:45pm ET
# ============================================================
def todayClose = close(period = AggregationPeriod.DAY);
def todayOpen = open(period = AggregationPeriod.DAY);
def d1c = close(period = AggregationPeriod.DAY)[1];
def d1o = open(period = AggregationPeriod.DAY)[1];
def d2c = close(period = AggregationPeriod.DAY)[2];
def d2o = open(period = AggregationPeriod.DAY)[2];
def d3c = close(period = AggregationPeriod.DAY)[3];
def d3o = open(period = AggregationPeriod.DAY)[3];

def priceOK = todayClose >= 0.50 and todayClose <= 10.00;
def todayGreen = todayClose > todayOpen;
def prior3Red = d1c < d1o and d2c < d2o and d3c < d3o;
def todayVol = volume(period = AggregationPeriod.DAY);
def avgVol5d = Average(volume(period = AggregationPeriod.DAY), 5);
def volAccum = todayVol > avgVol5d * 1.2;
def low20d = Lowest(low(period = AggregationPeriod.DAY), 20);
def nearLow = todayClose <= low20d * 1.20;

plot Scan = priceOK and todayGreen and prior3Red and volAccum and nearLow;
```

---

## SCRIPT 9 — POSITION SIZE CALCULATOR (upper panel) — unchanged, verified

```thinkscript
# ============================================================
# POSITION_SIZE_CALCULATOR
# Shares = maxRisk / stopDistance
# ============================================================
declare upper;
input accountSize = 25000;
input riskPercent = 1.0;
input stopDistance = 0.25;

def maxRisk = accountSize * (riskPercent / 100);
def sharesCalc = maxRisk / stopDistance;
def atr14 = Average(TrueRange(high, close, low), 14);
def atrStop = atr14 * 0.5;
def atrShares = maxRisk / atrStop;

AddLabel(yes, "Max risk: $" + Round(maxRisk, 0), Color.WHITE);
AddLabel(yes, "Manual stop $" + stopDistance + ": " + Round(sharesCalc, 0) + " shares", Color.CYAN);
AddLabel(yes, "ATR stop $" + Round(atrStop, 3) + ": " + Round(atrShares, 0) + " shares", Color.YELLOW);
AddLabel(Round(atrShares * close / accountSize * 100, 1) > 30,
    "WARNING: Exposure >" + Round(atrShares * close / accountSize * 100, 0) + "% of account", Color.RED);
```

---

## SCRIPT 10 — RSI SCALP ZONES (lower panel) — imported, verified

```thinkscript
# ============================================================
# RSI_SCALP_ZONES — RSI(7) for 1-min scalps
# 40-60 neutral / >70 overbought / >75 NO ENTRY / <30 oversold
# ============================================================
declare lower;
input rsiPeriod = 7;
input overbought = 70;
input oversold = 30;
input hotZone = 75;

def rsiVal = RSI(length = rsiPeriod);

plot RSILine = rsiVal;
RSILine.AssignValueColor(
    if rsiVal >= hotZone then Color.RED
    else if rsiVal >= overbought then Color.ORANGE
    else if rsiVal <= oversold then Color.CYAN
    else Color.GREEN);
RSILine.SetLineWeight(2);

plot OBLine = overbought; OBLine.SetDefaultColor(Color.ORANGE); OBLine.SetStyle(Curve.SHORT_DASH);
plot OSLine = oversold; OSLine.SetDefaultColor(Color.CYAN); OSLine.SetStyle(Curve.SHORT_DASH);
plot HotLine = hotZone; HotLine.SetDefaultColor(Color.RED); HotLine.SetStyle(Curve.LONG_DASH);

def exitSignal = rsiVal crosses below overbought;
Alert(exitSignal, "RSI EXIT signal - price likely topping short-term", Alert.BAR, Sound.Ring);

AddLabel(yes,
    if rsiVal >= hotZone then "RSI HOT - NO ENTRY"
    else if rsiVal >= overbought then "RSI: EXIT ZONE"
    else if rsiVal <= oversold then "RSI: BOUNCE WATCH"
    else "RSI: ENTRY OK",
    if rsiVal >= hotZone then Color.RED
    else if rsiVal >= overbought then Color.ORANGE
    else if rsiVal <= oversold then Color.CYAN
    else Color.GREEN);
```

---

## SCRIPT 11 — BB SQUEEZE DETECTOR (lower panel) — v2.0

```thinkscript
# ============================================================
# BB_SQUEEZE_DETECTOR (TTM Squeeze concept, standard TOS)
# v2.0 fixes:
#   - LinearRegValue() is not a thinkScript function -> Inertia()
#   - momentum midpoint was Average(H+L, 2) = 2-bar SMA of the SUM
#     (about 2x price, histogram always negative) -> true midpoint
# ============================================================
declare lower;
input bbLength = 20;
input bbMult = 2.0;
input kcMult = 1.5;
input kcLength = 20;

def bbBasis = Average(close, bbLength);
def bbDev = bbMult * StdDev(close, bbLength);
def bbUpper = bbBasis + bbDev;
def bbLower = bbBasis - bbDev;

def kcBasis = Average(close, kcLength);
def trVal = TrueRange(high, close, low);
def kcRange = kcMult * Average(trVal, kcLength);
def kcUpper = kcBasis + kcRange;
def kcLower = kcBasis - kcRange;

# Squeeze = BB inside Keltner Channel
def squeeze = bbLower > kcLower and bbUpper < kcUpper;
def squeezeRelease = !squeeze and squeeze[1];

# Momentum oscillator (Carter construction)
def donchianMid = (Highest(high, kcLength) + Lowest(low, kcLength)) / 2;
def delta = close - (donchianMid + Average(close, kcLength)) / 2;
def val = Inertia(delta, kcLength);

plot Momentum = val;
Momentum.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
Momentum.AssignValueColor(
    if val >= 0 and val > val[1] then Color.GREEN
    else if val >= 0 and val <= val[1] then Color.DARK_GREEN
    else if val < 0 and val < val[1] then Color.RED
    else Color.DARK_RED);

plot SqueezeDot = 0;
SqueezeDot.SetPaintingStrategy(PaintingStrategy.POINTS);
SqueezeDot.SetLineWeight(4);
SqueezeDot.AssignValueColor(if squeeze then Color.RED else Color.GREEN);

Alert(squeezeRelease and val > 0, "BB SQUEEZE FIRED LONG - long scalp setup", Alert.BAR, Sound.Ring);
Alert(squeezeRelease and val < 0, "BB SQUEEZE FIRED SHORT - caution on longs", Alert.BAR, Sound.Bell);

AddLabel(squeeze, "SQUEEZE IN PROGRESS - watch for breakout", Color.ORANGE);
AddLabel(squeezeRelease, "SQUEEZE FIRED!", if val > 0 then Color.GREEN else Color.RED);
```

---

## SCRIPT 12 — VOLUME SURGE (lower panel) — imported, verified

```thinkscript
# ============================================================
# VOLUME_SURGE — color-coded vol bars + power-candle alert
# ============================================================
declare lower;
def avgVol = Average(volume, 20);
def rv = volume / avgVol;
def isSurge = rv >= 3.0;
def isHigh = rv >= 1.5;
def isGreen = close > open;

plot VolBar = volume;
VolBar.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
VolBar.AssignValueColor(
    if isSurge and isGreen then Color.GREEN
    else if isSurge and !isGreen then Color.RED
    else if isHigh and isGreen then Color.DARK_GREEN
    else if isHigh and !isGreen then Color.DARK_RED
    else Color.GRAY);

plot AvgVolLine = avgVol;
AvgVolLine.SetDefaultColor(Color.WHITE); AvgVolLine.SetStyle(Curve.SHORT_DASH);
plot SurgeLine = avgVol * 3;
SurgeLine.SetDefaultColor(Color.GREEN); SurgeLine.SetStyle(Curve.LONG_DASH);

def powerCandle = isSurge and isGreen and (close - open) / open * 100 > 0.5;
Alert(powerCandle, "POWER CANDLE", Alert.BAR, Sound.Ring);
```

---

## SCRIPT 13 — STRAT_GAP_AND_CRAP (Strategies tab) — v2.0 rebuild

Short the failed gap-up. Requires margin/short approval to trade live; fine in
Strategy Tester and paperMoney regardless.

```thinkscript
# ============================================================
# STRAT_GAP_AND_CRAP v2.0 — short the failed gap-up
# Rebuilt with the EntryPrice() pattern:
#   no pos state machine -> no forward references possible.
# EntryPrice() is NaN when flat, so exit conditions are inert
# between trades.
# Stop: VWAP reclaim + 0.5*ATR. Target: prior close (gap fill).
# ============================================================
input accountSize = 25000;
input riskPercent = 1.0;
input timeStopBars = 15;
input tradeStart = 0935;
input tradeEnd = 1100;

def dayVWAP = reference VWAP;
def ema9 = ExpAverage(close, 9);
def avgVol = Average(volume, 20);
def atr14 = Average(TrueRange(high, close, low), 14);
def prevClose = close(period = AggregationPeriod.DAY)[1];
def windowOK = SecondsFromTime(tradeStart) >= 0 and SecondsTillTime(tradeEnd) > 0;

def maxRisk = accountSize * (riskPercent / 100);
def dynShares = if !IsNaN(atr14) and atr14 > 0
    then Max(1, Floor(maxRisk / (atr14 * 0.5))) else 0;

# Position state straight from the strategy engine
def ep = EntryPrice();
def inPos = !IsNaN(ep);

def shortTrigger = windowOK and !inPos and dynShares > 0
    and close < dayVWAP and close[1] >= dayVWAP[1]
    and close < ema9
    and volume > avgVol * 1.5
    and close < open;

def entryShares = CompoundValue(1, if shortTrigger then dynShares else entryShares[1], 0);
def held = CompoundValue(1, if inPos then held[1] + 1 else 0, 0);

def stopLevel = dayVWAP + atr14 * 0.5;
def exitCond = inPos and (low <= prevClose or high >= stopLevel
    or held >= timeStopBars or SecondsTillTime(tradeEnd) <= 0);

AddOrder(OrderType.SELL_TO_OPEN, shortTrigger, open[-1], dynShares, Color.RED, Color.RED, "fade_short");
AddOrder(OrderType.BUY_TO_CLOSE, exitCond, open[-1], entryShares, Color.GREEN, Color.GREEN, "fade_cover");

AddLabel(yes, "Gap-fill target: $" + Round(prevClose, 2) + " | Shares: " + dynShares, Color.CYAN);
```

---

## SCRIPT 14 — STRAT_ABCD (Strategies tab) — v2.0 rebuild

```thinkscript
# ============================================================
# STRAT_ABCD v2.0 — long on D breakout, stop below C, 2R target
# Rebuilt with the EntryPrice() pattern. Stop (C point) and
# entry share count are latched on the trigger bar.
# ============================================================
input accountSize = 25000;
input riskPercent = 1.0;
input rewardMult = 2.0;
input timeStopBars = 12;
input tradeStart = 0930;
input tradeEnd = 1130;

def ema9 = ExpAverage(close, 9);
def avgVol = Average(volume, 20);
def bPoint = Highest(high, 10)[1];
def cPoint = Lowest(low, 5)[1];
def aPoint = Lowest(low, 15)[1];
def windowOK = SecondsFromTime(tradeStart) >= 0 and SecondsTillTime(tradeEnd) > 0;

def maxRisk = accountSize * (riskPercent / 100);
def stopDistNow = close - cPoint;
def dynShares = if stopDistNow > 0 then Max(1, Floor(maxRisk / stopDistNow)) else 0;

def ep = EntryPrice();
def inPos = !IsNaN(ep);

def trigger = windowOK and !inPos and dynShares > 0
    and cPoint > aPoint
    and close > bPoint and close[1] <= bPoint[1]
    and volume > avgVol * 1.3
    and close > ema9;

def stopRef = CompoundValue(1, if trigger then cPoint else stopRef[1], cPoint);
def entryShares = CompoundValue(1, if trigger then dynShares else entryShares[1], 0);
def held = CompoundValue(1, if inPos then held[1] + 1 else 0, 0);

def tgt = ep + (ep - stopRef) * rewardMult;
def exitCond = inPos and (high >= tgt or low <= stopRef
    or held >= timeStopBars or SecondsTillTime(tradeEnd) <= 0);

AddOrder(OrderType.BUY_TO_OPEN, trigger, open[-1], dynShares, Color.LIME, Color.LIME, "abcd_in");
AddOrder(OrderType.SELL_TO_CLOSE, exitCond, open[-1], entryShares, Color.RED, Color.RED, "abcd_out");

AddLabel(yes, "C stop: $" + Round(cPoint, 2) + " | Shares: " + dynShares, Color.CYAN);
```

---

## SCRIPT 15 — STRAT_GRITTANI_CH11 (Strategies tab) — v2.0 rebuild

```thinkscript
# ============================================================
# STRAT_GRITTANI_CH11 v2.0 — gap-down morning push short
# Stop: prior day's close. Target: prior day's low.
# v2.0 fixes: gap measured vs today's OPEN (old version compared
# against the day's FINAL close = lookahead), EntryPrice() pattern,
# correct order types, latched exit size.
# ============================================================
input accountSize = 25000;
input riskPercent = 1.0;
input timeStopBars = 15;
input tradeStart = 0930;
input tradeEnd = 1100;

def ema9 = ExpAverage(close, 9);
def avgVol = Average(volume, 20);
def prevClose = close(period = AggregationPeriod.DAY)[1];
def prevLow = low(period = AggregationPeriod.DAY)[1];
def todayOpen = open(period = AggregationPeriod.DAY);
def gappedDown = prevClose > todayOpen;
def windowOK = SecondsFromTime(tradeStart) >= 0 and SecondsTillTime(tradeEnd) > 0;

def maxRisk = accountSize * (riskPercent / 100);
def stopDistNow = prevClose - close;
def dynShares = if stopDistNow > 0 then Max(1, Floor(maxRisk / stopDistNow)) else 0;

def ep = EntryPrice();
def inPos = !IsNaN(ep);

def trigger = windowOK and !inPos and dynShares > 0 and gappedDown
    and close > open and close < prevClose
    and close < ema9
    and volume > avgVol * 1.5;

def entryShares = CompoundValue(1, if trigger then dynShares else entryShares[1], 0);
def held = CompoundValue(1, if inPos then held[1] + 1 else 0, 0);

def exitCond = inPos and (low <= prevLow or high >= prevClose
    or held >= timeStopBars or SecondsTillTime(tradeEnd) <= 0);

AddOrder(OrderType.SELL_TO_OPEN, trigger, open[-1], dynShares, Color.RED, Color.RED, "grit_short");
AddOrder(OrderType.BUY_TO_CLOSE, exitCond, open[-1], entryShares, Color.GREEN, Color.GREEN, "grit_cover");

AddLabel(yes, "Stop: $" + Round(prevClose, 2) + " | Target: $" + Round(prevLow, 2), Color.CYAN);
```

---

## COMPLETE TOS LOAD ORDER (self-contained — everything is in THIS file)

```
STOCK HACKER SCANS (run before market open):
  Scan A: "GAPPER SCAN"       -> Script 5  (premarket, extended hours ON)
  Scan B: "FIRST GREEN DAY"   -> Script 8  (run at 3:45pm daily)

WATCHLIST COLUMNS (aggregation D):
  Col 1: "Score 0-6" -> Script 6a (sort descending)
  Col 2: "Gap%"      -> Script 6b
  Col 3: "Rel Vol"   -> Script 6c

CHART LAYOUT — 1-MINUTE CHART:
  Upper panel:
    1. MASTER_SCALP_PRO (Study)     -> Script 1   <- MOST IMPORTANT
    2. GRITTANI_SHORT_SETUPS        -> Script 4
    3. CAMARILLA_PIVOTS             -> Script 7
    4. POSITION_SIZE_CALCULATOR     -> Script 9

  Lower panel 1 (Momentum):
    5. RASCHKE_3_10_OSCILLATOR      -> Script 3

  Lower panel 2 (Confirmation):
    6. RSI_SCALP_ZONES              -> Script 10
    7. BB_SQUEEZE_DETECTOR          -> Script 11
    8. VOLUME_SURGE                 -> Script 12

STRATEGIES (Strategy Tester ONLY — not live):
    9. MASTER_SCALP_PRO_STRAT       -> Script 2   <- run this first
   10. STRAT_GAP_AND_CRAP           -> Script 13
   11. STRAT_ABCD                   -> Script 14
   12. STRAT_GRITTANI_CH11          -> Script 15

ORDER TO BACKTEST:
  Step 1: Load Script 2 on a 1-min chart of a recent low-float gapper
  Step 2: Right-click chart -> Strategy Report
  Step 3: Record Profit Factor, # trades, win rate, max drawdown
  Step 4: Test on 5+ different gapper days
  Step 5: Compare with Scripts 13 and 14 results
  Step 6: Highest Profit Factor across most tests = primary strategy
```

---

## VERIFY CHECKLIST (do this in TOS before trusting anything)

```
0. Top-left account selector -> switch to Paper Money FIRST.
1. Paste each STUDY (1, 3, 4, 7, 9, 10, 11, 12) into Edit Studies -> Create.
   Each must save with no red error bar. If an error appears, note the
   exact message + script number.
2. Paste each STRATEGY (2, 13, 14, 15) into Edit Studies -> Strategies tab.
   Same rule: must save clean.
3. Load Script 2 on a 1-min chart of a known gapper day.
   - Confirm entry arrows appear only 9:30-11:00.
   - Confirm every entry has a matching exit (no dangling positions).
   - Right-click -> Strategy Report: trades should show SHARE COUNTS
     that vary with ATR (not a constant 100).
4. Check the ORB level: the lime dashed line must RESET each morning —
   if it's one flat line across multiple days, report it.
5. VWAP line (magenta) must reset to price at 9:30/premarket open each
   day and curve through the session — not a flat daily line.
6. Run Strategy Report on 5+ gapper days; log PF / win rate / drawdown.
7. Gate to live: 50+ paper trades, PF > 1.5, win rate > 45%.
```

---

## PAPER MONEY SETUP IN TOS

```
To ensure NO live trading:
  1. Open TOS -> top-left corner: click your account name
  2. Switch to "Paper Money" account (labeled "PAPER" or "DEMO")
  3. Confirm the balance shows paper money, not real dollars
  4. Strategy scripts with AddOrder() only ever execute inside:
     (a) Strategy Tester (historical backtest — never places real orders)
     (b) OnDemand (replay mode — never places real orders)
  5. The study scripts ONLY draw arrows and fire alerts — they never trade.
```

---

## NEW COMPILER / API RULES LEARNED (2026-07-06 — merge into feedback_thinkscript_compiler.md)

7. **`Alert()` text must be a compile-time constant.** No def values in alert
   messages — `Alert(cond, "price: " + close, ...)` fails with "Constant
   expected". Inputs and literals are fine. Put dynamic values in
   `AddLabel`/`AddChartBubble` instead.
8. **`Sound.Chimes`, not `Sound.Chime`.** Valid sounds: Bell, Chimes, Ding,
   Ring, NoSound.
9. **`LinearRegValue()` does not exist** in thinkScript — use `Inertia(data, length)`.
10. **`HighestAll`/`LowestAll` scan the whole chart including future bars** —
    never use them for session levels (opening range, premarket high). Use a
    per-day `CompoundValue` accumulator that resets on the first bar of the
    session.
11. **`VWAP(period = AggregationPeriod.DAY)` is the daily-aggregation vwap
    fundamental** — on historical intraday bars it returns the day's FINAL
    vwap (lookahead). Use `reference VWAP` for the true running intraday VWAP.
    Also never name a def `vwap` — it collides with the built-in.
12. **Any `(period = AggregationPeriod.DAY)` value for the CURRENT day is the
    day's final value on historical bars** — fine for prior-day levels (`[1]`),
    a lookahead bug for same-day closes/highs inside a backtest.
13. **`EntryPrice()` pattern beats the pos state machine** for strategies with
    entry-anchored exits: it is NaN when flat, set by the engine when filled —
    no forward references are possible and it can never desync from the
    Strategy Report. Keep the pos machine only where already proven (Script 2).
14. **Latch entry share count** (`CompoundValue` on the trigger bar) and use it
    for the exit `AddOrder` — recomputing `dynShares` at exit closes the wrong
    size when ATR has moved.
15. **Parenthesize `crosses` expressions** when combined with `and`/`or`.
16. **Fill at `open[-1]`** (next bar's open) in `AddOrder` — signal-bar `close`
    fills are not achievable in reality and inflate backtest results.
