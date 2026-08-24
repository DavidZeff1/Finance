# Explainer log

Scope: chapters 3–6. 27 of 27 concept subsections done, 0 skipped.
Marker: `<aside class="explainer" data-explainer="<h3-id>">` — grep to resume.

Format per explainer: (1) the one question, plain, one sentence · (2) rule in
words before symbols, with the threshold · (3) why anyone cares · (4) two cases,
same subject, ONE variable flipped, opposite outcomes, variable named ·
(5) leftover jargon mapped back, one line each.

| # | id | status | core question | variable flipped in the contrast |
|---|---|---|---|---|
| 1 | s03-gdp | done | Did the country make more, or did it just get pricier? | the deflator |
| 2 | s03-growth | done | Is this a one-off, or does it repeat every year? | whether the gain repeats |
| 3 | s03-inflation | done | How much less will a fixed sum buy by the time I spend it? | the inflation that arrived |
| 4 | s03-unemployment | done | Of people who want a job, what share can't find one? | numerator vs denominator moved |
| 5 | s03-cycles | done | Is a downturn likelier than last month? | trigger vs preparation |
| 6 | s03-adas | done | Will the central bank be able to help? | prices fell with output or rose against it |
| 7 | s03-releases | done | Was the news better or worse than expected? | what consensus was |
| 8 | s04-what-it-is | done | When inflation and jobs conflict, which wins? | whether the rate-setter can be fired |
| 9 | s04-money-creation | done | Where does the money I borrow come from? | promise made before or after conditions turned |
| 10 | s04-policy-rate | done | What does safe overnight money earn right now? | whether a sweep policy existed |
| 11 | s04-transmission | done | How long until I feel a rate change? | which quarter the damage was assumed to land |
| 12 | s04-qe-qt | done | What can a central bank do at zero rates? | reserves vs spendable accounts |
| 13 | s04-reading-the-fed | done | What do rates do next, and is it already priced? | what was already priced |
| 14 | s05-fiscal | done | How much spending does a government dollar create? | spare capacity + central-bank offset |
| 15 | s05-deficit-debt | done | When the debt rises, should I care? | how fast GDP grew underneath |
| 16 | s05-broke | done | Can a government run out of money? | whether it can create what it owes |
| 17 | s05-r-vs-g | done | Is this debt shrinking on its own? | which of the two rates was larger |
| 18 | s05-trade | done | Why trade with a country that makes everything cheaper? | concentrated benefit vs diffuse cost |
| 19 | s05-bop | done | Where do the dollars go when a country buys more than it sells? | saved more than invested, or less |
| 20 | s05-fx | done | Why isn't the interest-rate gap free money? | the exchange rate on the way back |
| 21 | s06-plumbing | done | If the borrower doesn't pay, who takes the loss? | whether anyone stood in between |
| 22 | s06-cast | done | How does this firm get paid, and what does it then want? | what the fee is calculated on |
| 23 | s06-regulators | done | Who checks this firm can do what it promises? | the legal wrapper |
| 24 | s06-sides | done | Paid for being right, or for being useful? | fee on a stock of money vs on an event |
| 25 | s06-primary | done | When I buy a share, does the company get my money? | price negotiated vs discovered |
| 26 | s06-microstructure | done | What price do I actually get? | order size vs resting liquidity |
| 27 | s06-lifecycle | done | I sold Monday — when is the money mine? | size of unsettled positions |

## Sequence audit (run after all 27)

**Found and fixed**

- *Weak stems, 7 instances.* Seven opened "This section answers one question,"
  naming the container rather than the concept. Renamed to name the concept
  (Bank lending / Sovereign default / Settlement / Primary and secondary markets…).
- *Length creep.* Ch.3 averaged 247 words; ch.4 onward sat at ~268, drifting from
  the ~230 target. Compressed one paragraph in each of the nine longest.
  Now: mean 254, band 229–271.
- *Connective monotony.* "The reason anyone cares is that…" opened the
  consequence beat in all 27. Varied 10 of them ("This matters because",
  "It matters because", "This is what decides") while keeping the function.

**Checked, no problem found**

- *Repeated examples.* All 27 contrast variables are distinct (column above).
  No worked example is reused across explainers.
- *Domain spread.* Mortgages appear in 4, hiring/jobs in 8 — both because the
  source material is macro, and each use is a different mechanism, not a
  repeated example.

**Deliberately uniform**

- Every explainer opens "X answers one question: …" and names the flipped
  variable in a flat closing sentence. That is the requested structure, not
  drift. Easy to vary further if the repetition reads worse than the
  recognisability is worth.
