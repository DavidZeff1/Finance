export const meta = {
  name: 'finance-econ-textbook',
  description: 'Sequentially author the remaining sections (no verify)',
  phases: [
    { title: 'Author', detail: 'one writer agent per section, strictly sequential' },
  ],
}

const SCRATCH = '/private/tmp/claude-501/-Users-davidzeff-Desktop-Personal-Finance/f0d593ae-352f-4675-beef-188955e91091/scratchpad'
const SPEC = SCRATCH + '/spec.md'
const OUT = SCRATCH + '/sections'

const XREF = [
  's01 Money & the Time Value of Money', 's02 Microeconomics', 's03 Macroeconomics',
  's04 Central Banks & Monetary Policy', 's05 Fiscal Policy, Debt & Trade',
  's06 The Financial System', 's07 Equities', 's08 Fixed Income', 's09 Derivatives',
  's10 FX, Commodities & Alternatives', 's11 Financial Statements', 's12 Ratio Analysis',
  's13 Valuation', 's14 Corporate Finance', 's15 Portfolio Theory', 's16 Risk Management',
  's17 Market Efficiency, Behavioral & Crises', 's18 Quant Finance & Data Analytics',
  's19 FinTech', 's20 Career Roadmap',
].join('; ')

const SECTIONS = [
  {
    num: '01', slug: 'money-tvm', title: 'Money and the Time Value of Money',
    eyebrow: 'Part I · Economic Foundations',
    topics: [
      'What money actually is: the three functions (medium of exchange, store of value, unit of account); very brief history from commodity money to fiat; what fiat means and why it works',
      'Interest: why money has a time price (opportunity cost, inflation, default risk); simple vs compound interest',
      'The compounding formula and its power: FV = PV(1+r)^n; rule of 72; compounding frequency; APR vs APY/EAR with a worked example',
      'Discounting and present value — the single most important idea in finance: PV = FV/(1+r)^n; what a discount rate encodes',
      'Streams of cash flows: annuities and perpetuities (mortgage payment and pension intuition; the formulas, derived lightly)',
      'Nominal vs real: inflation adjustment, the Fisher relation, real return examples',
    ],
    widgets: [
      'MAIN "Compound interest lab": sliders for principal ($1k-$100k), annual rate (0-15%), years (1-50), monthly contribution ($0-$2,000), and a Simple-vs-Compound toggle -> SVG line chart of balance over time (compound vs simple or vs contributions-only), plus stats: final value, total contributed, interest earned. Verify math: $10,000 at 7% for 30 years with no contributions = $76,123.',
      'SMALL "Present value flipper": inputs future amount, years, discount rate -> present value readout with one-sentence interpretation.',
    ],
    figures: 'timeline diagram with PV/FV arrows; simple-vs-compound divergence curves; purchasing-power erosion at 2%/5%/8% inflation; APR vs effective yield comparison bars',
    notes: 'This is the opening section — set the tone for the whole course and briefly orient the reader on the journey (Parts I-V). Cross-link forward to s08 (bond pricing IS discounting) and s13 (valuation IS discounting).',
  },
  {
    num: '02', slug: 'micro', title: 'Microeconomics: How Markets Work',
    eyebrow: 'Part I · Economic Foundations',
    topics: [
      'Scarcity, choice, opportunity cost; marginal thinking (decisions at the margin) with concrete examples',
      'Demand: willingness to pay, why demand curves slope down, movement along vs shift of the curve (list the shifters)',
      'Supply: marginal cost, why supply slopes up, its shifters',
      'Equilibrium: price discovery, what happens in surplus/shortage, why price controls create queues and black markets',
      'Elasticity: price elasticity of demand and supply, determinants, the revenue test (elastic vs inelastic) with a worked calculation',
      'Market structures spectrum: perfect competition, monopolistic competition, oligopoly, monopoly; market power and pricing; a taste of game theory (prisoners dilemma pricing)',
      'When markets fail: externalities, public goods, information asymmetry (the lemons problem) — and why financial regulation exists',
    ],
    widgets: [
      'MAIN "Supply & demand simulator": SVG chart with demand and supply lines; sliders shift each curve; equilibrium point, P* and Q* readouts update live; preset scenario buttons ("Incomes rise", "Production costs jump", "A substitute gets cheaper", "Tax on sellers") each with a one-line explanation of what moved and why. Use linear curves, e.g. D: P = 100 - 0.5Q, S: P = 20 + 0.3Q shifted by sliders; verify the equilibrium algebra.',
    ],
    figures: 'production possibilities frontier with opportunity cost; steep vs flat demand curves (elasticity); market-structure spectrum diagram; lemons-market adverse selection flow',
    notes: 'Finance framing throughout: markets for stocks/bonds are just supply and demand for pieces of paper; liquidity is elasticity in disguise.',
  },
  {
    num: '03', slug: 'macro', title: 'Macroeconomics: The Big Picture',
    eyebrow: 'Part I · Economic Foundations',
    topics: [
      'GDP: what it measures, the expenditure approach C+I+G+NX with realistic proportions, real vs nominal, per-capita; what GDP misses',
      'Growth: why small growth-rate differences compound into different worlds (tie to s01 compounding); productivity as the long-run driver',
      'Inflation: how CPI is built (basket, weights), demand-pull vs cost-push vs monetary causes, why central banks target ~2%, the deflation trap, hyperinflation (Weimar/Zimbabwe, one paragraph)',
      'Unemployment: the rate definition and its traps (labor-force participation, discouraged workers), frictional/structural/cyclical, why some unemployment is healthy',
      'Business cycles: expansion/peak/recession/trough, NBER dating, leading vs coincident vs lagging indicators, the inverted yield curve signal (cross-link s08)',
      'The AD-AS mental model: one framework to reason about shocks (oil spike, stimulus, pandemic) and what they do to output and prices',
    ],
    widgets: [
      'MAIN "Inflation time machine": inputs amount (default $100), years (1-50), average inflation slider (0-15%) plus preset buttons ("2% target", "1970s US ~7%", "Argentina-style 50%") -> SVG decay curve of purchasing power + readout "In N years, $100 buys what $X buys today" + the flip side "you would need $Y to match todays $100". Verify: $100 at 7% for 30 years -> purchasing power ~$13.14 (100/1.07^30).',
    ],
    figures: 'GDP expenditure components stacked bar; business-cycle wave with phases and indicator timing annotated; AD-AS diagram with a shock shift; inflation vs unemployment scatter intuition (Phillips curve and its 1970s breakdown)',
    notes: 'Emphasize reading macro data like an analyst: which releases move markets (CPI, jobs report, GDP) and why.',
  },
  {
    num: '04', slug: 'central-banks', title: 'Central Banks and Monetary Policy',
    eyebrow: 'Part I · Economic Foundations',
    topics: [
      'What a central bank is and is not; the Fed structure and the dual mandate; independence and why it matters; ECB/BoE/BoJ equivalents in one paragraph',
      'How commercial banks create money: loans create deposits, fractional reserves, the money multiplier idea and its modern caveats; bank runs and deposit insurance (SVB cross-link s16)',
      'The policy rate: what the federal funds rate actually is, and how the Fed steers it today (interest on reserves, ON RRP, open market operations — simplified but modern)',
      'Transmission: policy rate -> mortgages, credit cards, business investment, the dollar, asset prices; the 12-18 month lag problem',
      'QE and QT: balance-sheet policy in plain English; why it was used in 2008 and 2020, what it does to bond yields (cross-link s08)',
      'Reading the Fed like a market participant: FOMC meetings, dot plot, hawks vs doves, forward guidance, why markets move on a single word',
    ],
    widgets: [
      'MAIN "Monetary policy simulator": one policy-rate slider (0-8%) -> live panel: monthly payment on a $400k 30-year mortgage (rate = policy + 2.5% spread, standard amortization formula — verify: 6.5% on $400k = $2,528/mo), savings yield on $10k, corporate borrowing cost, USD strength gauge (qualitative arrow), inflation and employment direction arrows with a "works with a lag" note. Preset buttons: "2008: cut to zero", "2022: fastest hikes in 40 years", "Neutral ~3%". Each preset swaps in a two-sentence historical note.',
    ],
    figures: 'money-creation cascade (deposit -> loan -> new deposit, 3 rounds with numbers); policy transmission map (rate at center, channels radiating); illustrative Fed balance sheet area chart 2007-2024 shape (QE waves labeled)',
    notes: 'This section should make the reader able to follow financial news about the Fed. Define every acronym.',
  },
  {
    num: '05', slug: 'fiscal-trade', title: 'Fiscal Policy, Government Debt and Global Trade',
    eyebrow: 'Part I · Economic Foundations',
    topics: [
      'Fiscal policy: government taxing and spending; automatic stabilizers vs discretionary stimulus; the multiplier intuition and why estimates disagree',
      'Deficit vs debt (flow vs stock — a CS-friendly distinction); debt-to-GDP as the right scale; who actually holds government debt',
      'Can a government go broke? Own-currency vs foreign-currency debt; inflation as the escape valve and its costs; crowding out',
      'Debt sustainability: the r vs g logic with a worked trajectory; why post-WW2 US "grew out" of 100%+ debt/GDP',
      'Trade: comparative advantage with a two-country two-goods worked example; why trade is not zero-sum; who wins, who loses, what tariffs actually do (incidence)',
      'Balance of payments in plain English: current account and capital account must mirror; what a trade deficit really means',
      'Exchange rates: floating vs pegged; what moves currencies (rate differentials, inflation, trade flows, risk appetite); purchasing-power parity and the Big Mac index idea',
    ],
    widgets: [
      'MAIN "Debt dynamics simulator": sliders for primary deficit (% of GDP, -3 to +8), nominal GDP growth g (0-8%), average interest rate r (0-8%), starting debt ratio (30-150%) -> SVG line chart of 30-year debt/GDP path using debt_{t+1} = debt_t * (1+r)/(1+g) + deficit. Presets: "Post-WW2 US: g > r", "Austerity", "Doom loop: r > g with deficits". Readout: debt ratio in year 30 + one-sentence verdict. Verify one path by hand.',
    ],
    figures: 'comparative advantage worked table as a figure; balance-of-payments mirror diagram; tariff incidence (who pays) diagram; r-vs-g quadrant chart',
    notes: 'Close Part I by tying the four macro levers together: monetary (s04) + fiscal (s05) and how markets watch both.',
  },
  {
    num: '06', slug: 'financial-system', title: 'The Financial System: A Guided Tour',
    eyebrow: 'Part II · Financial Markets &amp; Instruments',
    topics: [
      'The core job: routing money from savers to users of capital; direct finance (markets) vs indirect finance (banks); why intermediaries exist (information, maturity transformation, diversification)',
      'The cast, mapped: commercial banks, investment banks, asset managers, hedge funds, PE/VC, pension funds, insurers, sovereign wealth funds, exchanges, brokers, market makers, custodians, rating agencies, data vendors',
      'Regulators and what each covers: SEC, Fed, FDIC, FINRA, CFTC in the US; FCA/ESMA abroad — one line each, why they exist (tie to s02 market failures)',
      'Buy side vs sell side: what each does, how they make money, and what jobs live where — career-relevant detail',
      'Primary vs secondary markets: how an IPO/bond issuance works vs daily trading; underwriting in brief',
      'Market microstructure: the order book, bid/ask spread, limit vs market orders, liquidity and depth, market makers, a first look at HFT',
      'A trade, end to end: what happens in the seconds and days after you tap Buy (broker -> execution venue -> clearing -> T+1 settlement -> custody)',
    ],
    widgets: [
      'MAIN "Order book simulator": pre-seeded bid/ask ladder (5 levels each side around $100, e.g. bids 99.95x300, 99.90x500... asks 100.05x200, 100.10x400...); user picks side, order type (market/limit), size slider, limit price -> orders match against the book with correct price-time priority, fills listed, book redraws, readouts for last price, spread, and average fill price. Big market orders should visibly walk the book (price impact). A Reset button restores the seed book. Verify matching logic carefully — e.g. a 600-share market buy against asks 200@100.05 + 400@100.10 fills at average $100.0833.',
    ],
    figures: 'financial-system map (savers -> intermediaries/markets -> users); buy-side vs sell-side landscape with role examples; trade lifecycle timeline (execution to settlement); order book anatomy diagram',
    notes: 'This is the orientation section for the whole of Part II — heavy cross-linking forward to s07-s10.',
  },
  {
    num: '07', slug: 'equities', title: 'Equities: The Stock Market',
    eyebrow: 'Part II · Financial Markets &amp; Instruments',
    topics: [
      'What a share actually is: fractional ownership, claim on residual profits and assets, limited liability; why companies sell shares',
      'Market cap and share classes; dilution; public vs private companies and why fewer companies go public',
      'Where returns come from: price appreciation + dividends = total return; the long-run equity premium (~7% real historically) and the brutal volatility along the way; why time horizon matters',
      'Indices: S&P 500, Nasdaq-100, Dow (price-weighted oddity), Russell 2000, MSCI World; cap weighting math; index funds and ETFs as the practical vehicle',
      'Valuation shorthand: EPS, P/E, earnings yield; growth vs value framing; P/E pitfalls (cyclical earnings, negative E) — full valuation in s13',
      'Corporate actions: dividends, buybacks, splits (why splits do not matter, mostly); IPOs, direct listings, SPACs in one paragraph each',
      'Reading a stock screen like an analyst: OHLC, volume, 52-week range, beta, market cap, float',
    ],
    widgets: [
      'MAIN "Total return machine": inputs starting investment ($10k default), years (1-40), price return slider (-2 to 12%), dividend yield slider (0-5%), reinvest-dividends toggle -> SVG chart comparing price-only growth vs total return with reinvestment; stats: final values, the gap, share count growth when reinvesting. Verify: $10k, 5% price return, 3% yield reinvested, 30 years -> total-return path compounds at ~8.15% (1.05*1.03) = $104,919 vs price-only $43,219.',
      'SMALL "P/E explorer": price and EPS sliders for two example firms (a fast grower vs a steady utility) -> P/E and earnings yield readouts + one-line interpretation that a high P/E is a claim about future growth.',
    ],
    figures: 'the capital stack (who gets paid first — preview of s08); cap-weight vs price-weight index math comparison; long-run equity growth on log scale with major drawdowns labeled (illustrative); anatomy of a stock quote',
    notes: 'Kill the common myths explicitly: a $500 stock is not "more expensive" than a $50 one; past return is not a promise.',
  },
  {
    num: '08', slug: 'fixed-income', title: 'Fixed Income: Bonds and Interest Rates',
    eyebrow: 'Part II · Financial Markets &amp; Instruments',
    topics: [
      'Bond anatomy: face value, coupon, maturity; issuers (Treasuries, corporates, munis, agencies); why the bond market is bigger than the stock market',
      'Pricing: a bond is just discounted cash flows (direct callback to s01) — worked example pricing a 3-year 5% coupon bond at different yields',
      'THE seesaw: why price and yield move inversely — make this unforgettable; par/premium/discount; YTM vs coupon vs current yield',
      'The yield curve: what it plots, normal/flat/inverted shapes, term premium, and the inversion-before-recession track record (cross-link s03)',
      'Duration and convexity: price sensitivity intuition, the Delta-P ≈ -D × Delta-y rule of thumb with a worked example; why 2022 was the worst bond year in decades; SVB as duration risk (cross-link s16)',
      'Credit: ratings ladder AAA to D, investment grade vs high yield, credit spreads as a fear gauge, defaults and recovery',
      'Money markets: T-bills, repo, commercial paper, money-market funds — the plumbing where cash lives',
    ],
    widgets: [
      'MAIN "Bond seesaw": sliders coupon rate (0-10%), years to maturity (1-30), market yield (0-12%) on $1,000 face -> live price via exact PV formula (annual coupons), premium/par/discount badge, modified-duration estimate, and an SVG price-vs-yield curve with the current point marked. Verify: 5% coupon, 10 years, 7% yield -> price $859.53; at 3% yield -> $1,170.60.',
      'SMALL "Yield curve explorer": three preset buttons (Normal / Flat / Inverted, illustrative data) -> SVG curve redraws + two-sentence interpretation swaps (what the market is saying about the future).',
    ],
    figures: 'bond cash-flow timeline with PV arrows; the price-yield inverse curve with convexity visible; ratings ladder with typical spreads; duration illustrated as balance point of cash flows',
    notes: 'This section carries the heaviest math in Part II — lean on s01 rather than re-deriving. Make the seesaw and duration truly intuitive.',
  },
  {
    num: '09', slug: 'derivatives', title: 'Derivatives: Futures, Options and Swaps',
    eyebrow: 'Part II · Financial Markets &amp; Instruments',
    topics: [
      'What a derivative is: a contract whose value derives from something else; hedgers vs speculators (both are necessary); leverage cuts both ways; zero-sum before costs',
      'Forwards and futures: locking a price today for delivery later; the farmer/airline hedging story with numbers; margin and daily mark-to-market; futures vs forwards',
      'Options: calls and puts, strike, expiry, premium; buyer vs writer; intrinsic vs time value; moneyness (ITM/ATM/OTM); reading an option chain',
      'What drives option value: the Greeks gently — delta (slope), theta (decay), vega (volatility); volatility is the market variable; Black-Scholes exists and a CS person can implement it in 10 lines (no derivation)',
      'Strategies with payoff logic: covered call, protective put, straddle; why selling options is not free money (picking up pennies in front of a steamroller)',
      'Swaps: interest-rate swap fixed-vs-floating with a worked cash-flow example; notional vs actual exposure; credit default swaps and their 2008 starring role (cross-link s17)',
    ],
    widgets: [
      'MAIN "Option payoff builder": strategy select (long call, long put, covered call, protective put, long straddle, cash-secured short put), sliders for strike (80-120), premium (1-15), and where relevant second-leg strike; stock owned at $100 where applicable -> SVG payoff-at-expiry line vs stock-only baseline across price range 50-150, breakeven point(s), max gain, max loss readouts. Verify each strategy payoff formula (e.g. long call P&L at expiry = max(S-K,0) - premium).',
    ],
    figures: 'futures mark-to-market day-by-day table-figure; call and put payoff hockey sticks (the four basic positions); time-value decay curve; interest-rate swap flow diagram with numbered cash flows',
    notes: 'Repeat the risk warning naturally: most retail option buyers lose; these are professional hedging tools first.',
  },
  {
    num: '10', slug: 'alternatives', title: 'FX, Commodities and Alternative Investments',
    eyebrow: 'Part II · Financial Markets &amp; Instruments',
    topics: [
      'The FX market: largest market on earth ($7.5T/day); pairs and quote conventions (EUR/USD = dollars per euro), pips, spot vs forward; what moves currencies (recap s05: rate differentials, inflation, flows); the carry trade and its unwind risk',
      'How companies live with FX: transaction vs translation exposure, hedging with forwards (worked example: EU exporter hedging dollar revenue)',
      'Commodities: why you access them via futures; contango and backwardation and what they do to returns; oil market basics; golds strange role as the anti-currency',
      'Real estate and REITs: leverage as the defining feature, cap rate arithmetic (NOI / price) with worked example, REITs as the liquid wrapper',
      'Private equity and venture capital: the LBO in one worked paragraph, VC power-law math, fund mechanics (GP/LP, 2-and-20, J-curve); why "private" returns look smoother than they are',
      'Hedge funds: the strategy taxonomy (long/short, macro, arb, quant), what 2-and-20 does to net returns, survivorship bias in the marketing',
      'Crypto as an asset class only (tech in s19): extreme volatility, custody risk, no cash flows to discount — how an analyst frames it honestly',
      'Why alternatives at all: the correlation/diversification argument (bridge to s15)',
    ],
    widgets: [
      'MAIN "Currency moves: who wins?": EUR/USD slider from 0.90 to 1.40 (start 1.10) -> live panel computing four situations with numbers: US importer paying a EUR 1M invoice, US exporter with EUR 1M of sales, US tourist with a EUR 3,000 hotel bill, and a US investor holding EUR 100k of European stocks (flat in EUR). Each row shows the dollar amount and a gain/loss vs the 1.10 baseline colored with --up/--down. Verify arithmetic at 1.20 and 1.00.',
      'SMALL "Cap rate calculator": property price, annual rent, operating costs -> NOI, cap rate, and a comparison line vs a 10-year Treasury yield input.',
    ],
    figures: 'FX quote anatomy; futures curve in contango vs backwardation; PE fund J-curve; hedge fund fee drag (gross vs net over 10 years) bars',
    notes: 'Close Part II with a half-page recap table of ALL instruments from s07-s10: what it is, who uses it, risk level, where you meet it in a job.',
  },
  {
    num: '11', slug: 'statements', title: 'Financial Statements: The Language of Business',
    eyebrow: 'Part III · Corporate Finance &amp; Accounting',
    topics: [
      'Why statements exist and who they are for; GAAP vs IFRS in one paragraph; audits; where to find them (10-K, 10-Q, EDGAR)',
      'The accrual revolution: revenue when EARNED, expenses when INCURRED — the single biggest aha; a vivid example where accrual and cash tell opposite stories',
      'Income statement line by line with a running example company: revenue -> COGS -> gross profit -> opex (S&M, R&D, G&A) -> EBITDA -> D&A -> EBIT -> interest -> tax -> net income; margins at each level',
      'Balance sheet: Assets = Liabilities + Equity and WHY it always balances (double-entry, in CS terms: an invariant); current vs non-current; working capital; goodwill; book value',
      'Cash flow statement: CFO (indirect method: start from net income, add back non-cash, adjust working capital), CFI, CFF; free cash flow defined; "profit is an opinion, cash is a fact"',
      'The linkage: exactly how the three connect (net income -> retained earnings and CFO start; capex -> PP&E and CFI; borrowing -> cash and CFF; depreciation touching all three) — walk one transaction through all statements',
      'Reading a real 10-K efficiently: the 15-minute triage (MD&A, segments, footnotes, risk factors); red flags preview (full treatment in s12)',
    ],
    widgets: [
      'MAIN "Three-statement flow-through": a simple model company (base: revenue 1000, COGS 400, opex 300, D&A 50, interest 20, tax 21%, capex 80, dividend 30) with sliders for revenue growth %, gross margin %, capex, and new debt raised -> three side-by-side mini statements recompute live with changed lines highlighted; a "Trace $100 of extra revenue" preset button that flashes the path through all three statements step by step (can be a numbered highlight sequence, not animation). Verify the model balances: assets change = liabilities + equity change every time.',
    ],
    figures: 'the three-statement linkage map (the classic diagram, done well); income statement waterfall from revenue to net income; profit vs cash divergence line chart for a fast-growing company; balance sheet as two balanced towers',
    notes: 'This is the most job-critical section of the course for analyst roles — say so. Keep the running example company consistent through all subsections.',
  },
  {
    num: '12', slug: 'ratios', title: 'Ratio Analysis: Reading a Company Like a Pro',
    eyebrow: 'Part III · Corporate Finance &amp; Accounting',
    topics: [
      'Why ratios: normalize away size so you can compare across companies and time; the two golden rules (always vs peers, always vs history); ratios generate questions, not answers',
      'Profitability: gross/operating/net margin, ROA, ROE, ROIC — definitions, worked numbers, and why ROIC vs cost of capital is THE value-creation test (bridge to s13/s14)',
      'DuPont decomposition: ROE = net margin × asset turnover × leverage; the supermarket (thin margin, high turnover) vs luxury brand (fat margin, low turnover) example with real-ish numbers',
      'Liquidity and solvency: current ratio, quick ratio, debt/equity, net debt/EBITDA, interest coverage — with the thresholds lenders actually use',
      'Efficiency: inventory turnover, DSO, DPO, the cash conversion cycle with a worked timeline (and why negative CCC — Amazon-style — is a superpower)',
      'Market ratios: P/E, P/B, EV/EBITDA, FCF yield, dividend yield; when each is the right tool (bridge to s13)',
      'Earnings quality and red flags: net income growing while CFO shrinks, receivables outrunning revenue, serial "one-time" charges, aggressive capitalization — a forensic mini-checklist',
    ],
    widgets: [
      'MAIN "Two-company ratio lab": two preset companies with full consistent mini-financials — "SteadyMart" (grocery: revenue 50,000, net income 1,250, assets 20,000, equity 8,000, inventory-heavy) vs "CloudNine" (SaaS: revenue 2,000, net income 300, assets 3,000, equity 2,400, high margin) — button group picks ratio family (Profitability / DuPont / Liquidity / Efficiency / Market) -> side-by-side horizontal bars per ratio with computed values and a one-line interpretation under each view. The DuPont view must show both companies reaching similar ROE through totally different levers. All ratios must be internally consistent with the stated financials — verify every number.',
    ],
    figures: 'DuPont tree diagram; cash conversion cycle timeline; margin-by-industry comparison bars (illustrative); red-flag checklist as a styled figure',
    notes: 'Include one .co-you callout: this is exactly the kind of feature engineering the reader already knows — ratios are features derived from raw financial data.',
  },
  {
    num: '13', slug: 'valuation', title: 'Valuation: What Is a Company Worth?',
    eyebrow: 'Part III · Corporate Finance &amp; Accounting',
    topics: [
      'Price vs value; intrinsic vs relative valuation; valuation as structured estimation under uncertainty — an estimate with error bars, not a fact',
      'DCF end to end with one worked company: project free cash flows 5 years, terminal value via Gordon growth TV = FCF×(1+g)/(WACC−g), discount everything, enterprise value -> subtract net debt -> equity value -> per share. Show every number.',
      'WACC: cost of equity via CAPM (rf + beta×ERP — full CAPM story in s15), after-tax cost of debt, weighting; why riskier cash flows deserve higher discount rates',
      'Sensitivity: the embarrassing truth — ±1% on WACC or g swings value massively; sensitivity tables and football-field charts as the honest presentation',
      'Relative valuation: comps method step by step, choosing the peer set, EV/EBITDA vs P/E (when each), precedent transactions and the control premium',
      'Where each method breaks: DCF for pre-revenue startups, P/E for cyclicals, book value for asset-light; banks are valued differently (one paragraph); the analyst habit of triangulating',
    ],
    widgets: [
      'MAIN "Mini DCF model": fixed base (FCF this year $100M, net debt $200M, 50M shares); sliders: FCF growth years 1-5 (0-25%), terminal growth (0-4%), WACC (6-14%) -> readouts EV, equity value, per-share value, upside/downside vs a fixed illustrative market price of $28; PLUS a 3×3 sensitivity grid (WACC ±1% × terminal g ±1%) of per-share values that recomputes live, colored cells. Guard WACC > g always (clamp). Verify one full scenario by hand: g1-5=10%, tg=2%, WACC=10% -> per-share ≈ $34.65 (5-yr FCFs 110,121,133.1,146.41,161.05; TV=2053.42; PVs -> EV≈1932.6; equity 1732.6/50 — recompute exactly and make the widget match).',
    ],
    figures: 'DCF timeline (explicit period + terminal value as the big blob — show TV is often 60-80% of value); football field chart; value-driver tree (what moves per-share value)',
    notes: 'The interview classic "walk me through a DCF" should be answerable verbatim after this section — structure one subsection literally as that answer.',
  },
  {
    num: '14', slug: 'corp-finance', title: 'Corporate Finance: Decisions Inside the Firm',
    eyebrow: 'Part III · Corporate Finance &amp; Accounting',
    topics: [
      'The CFO worldview — three questions: what to invest in (capital budgeting), how to fund it (capital structure), what to return (payout policy); every headline (buybacks, M&A, debt raises) maps to one',
      'Capital budgeting: the NPV rule as the gold standard (it IS s01 discounting applied); IRR and its traps (multiple IRRs, reinvestment assumption, scale-blindness); payback period as the quick-and-dirty; a worked project comparison',
      'The hurdle rate: WACC as opportunity cost of capital; value creation = ROIC > WACC (converging thread from s12/s13)',
      'Capital structure: debt vs equity trade-off — tax shield vs financial distress; how leverage amplifies ROE both directions with a worked two-scenario example; Modigliani-Miller as the "frictionless baseline" in one paragraph',
      'Payout: dividends vs buybacks — mechanics, tax angle, signaling; when buybacks create value (stock below intrinsic) vs destroy it (buying high with debt)',
      'M&A: strategic vs financial buyers, synergies and why they usually disappoint, accretion/dilution intuition, the winners curse; one famous failed deal and one great deal as mini-cases',
    ],
    widgets: [
      'MAIN "Project duel — NPV vs IRR": two preset projects (A "Steady": -1000 then +300×5yrs; B "Moonshot": -1000 then 0,0,0,0,+2100), discount-rate slider 0-25% -> SVG chart of NPV vs discount rate for both (two curves crossing), current-rate markers, NPV readouts, IRR values labeled on the x-axis (A: ~15.24%, B: ~16.01% — verify by computing), and a verdict line that flips as the rate crosses the crossover (~13.2% — verify): "At r=X%, take A / take B / take neither". This demonstrates why NPV and IRR can disagree.',
      'SMALL "Leverage amplifier": asset return slider (-10 to +20%) and leverage slider (1x-5x), debt cost 5% -> ROE readout = leverage×ROA − (leverage−1)×5%, colored up/down, with a one-liner "leverage multiplies both directions".',
    ],
    figures: 'the three CFO decisions map; tax-shield vs distress-cost trade-off (value vs leverage humped curve); accretion/dilution worked mini-table; NPV profile anatomy',
    notes: 'Lots of convergence here — explicitly celebrate that s01+s11+s12+s13 assemble into this section.',
  },
  {
    num: '15', slug: 'portfolio', title: 'Portfolio Theory: Diversification, CAPM and Factors',
    eyebrow: 'Part IV · Investing &amp; Risk',
    topics: [
      'Measuring risk and return: expected return, volatility as standard deviation, why annualized; normal-distribution convenience and its fat-tail limits (honest caveat, full story in s16)',
      'Diversification — the only free lunch: correlation does the work; the two-asset portfolio variance formula and what happens as ρ drops from +1 to −1; systematic vs idiosyncratic risk; how many stocks kill idiosyncratic risk (the classic decay curve)',
      'The efficient frontier: the feasible set, the min-variance portfolio, why rational investors live on the frontier',
      'Adding the risk-free asset: the capital market line, the tangency portfolio, the Sharpe ratio as the slope; leverage along the line',
      'CAPM: beta as regression slope (the reader knows regression!), E[r] = rf + β×ERP, security market line; what CAPM gets right (priced risk is systematic) and where it empirically struggles; CAPM as the cost-of-equity engine in s13',
      'Factors: value, size, momentum, quality, low-vol — return sources beyond beta; factor investing / smart beta; a data persons natural playground',
      'Passive vs active: Sharpes arithmetic of active management, fee drag compounding (tie to s19 widget), what percentage of active funds beat their index over 15 years',
    ],
    widgets: [
      'MAIN "Diversification lab": two assets — A (stocks-like: E[r] slider 4-12% default 8, vol slider 10-30% default 18) and B (bonds-like: E[r] 2-6% default 3.5, vol 3-12% default 6) — correlation slider −1 to +1 (default 0.1), weight-in-A slider 0-100% -> SVG risk/return scatter: the full frontier curve traced by sweeping weights, the current portfolio point, min-variance point marked, risk-free rate 2% and the Sharpe of current mix. Formulas: σp² = w²σA² + (1−w)²σB² + 2w(1−w)ρσAσB. Verify: w=60%, defaults, ρ=0.1 -> E[r]=6.2%, σ≈11.4% (compute exactly and match).',
    ],
    figures: 'idiosyncratic-risk decay vs number of holdings; efficient frontier + CML diagram; security market line with an undervalued/overvalued asset plotted; factor premia illustrative bars with error-bar honesty',
    notes: 'Speak to the data scientist directly: beta is OLS, diversification is covariance math, factors are engineered features — this section should feel like home turf.',
  },
  {
    num: '16', slug: 'risk', title: 'Risk Management: Measuring and Taming Uncertainty',
    eyebrow: 'Part IV · Investing &amp; Risk',
    topics: [
      'The risk taxonomy with one vivid real example each: market, credit, liquidity, operational, counterparty, model risk',
      'Volatility vs drawdown: why max drawdown is what actually breaks investors (and firms); the recovery math (a −50% needs +100%)',
      'VaR: reading "1-day 99% VaR = $1M" correctly; the three methods (historical, parametric, Monte Carlo) with honest pros/cons; CVaR/expected shortfall as the better tail measure',
      'Why VaR failed in 2008: fat tails, correlations going to 1 in crises, the map is not the territory; model risk as a category',
      'Stress testing and scenario analysis: how banks actually do it; regulatory capital and Basel in two paragraphs (why banks hold buffers)',
      'Hedging in practice: airline fuel hedge, exporter FX hedge, portfolio put — each with numbers (tie s09/s10); hedging costs return, thats the deal',
      'Blowup case files, each with the one-line lesson: LTCM (leverage + model hubris), Barings (operational), London Whale (position size + oversight), SVB 2023 (duration mismatch, tie s08)',
    ],
    widgets: [
      'MAIN "VaR simulator": inputs portfolio value ($1M default), expected annual return slider (0-12%), annual volatility slider (5-40%), horizon buttons (1 day / 1 month / 1 year), confidence buttons (90/95/99%) -> Monte Carlo simulation (2,000 draws, Box-Muller from Math.random, Re-run button) -> SVG histogram of P&L with the VaR cutoff line and CVaR shaded tail; readouts: VaR, CVaR, and a plain-English sentence "With 95% confidence you will not lose more than $X over 1 month; when you do breach it, the average loss is $Y". Scale μ and σ by horizon (μ×t, σ×√t). Sanity-check parametric VaR ≈ z×σ√t×V − μtV against the simulated number.',
    ],
    figures: 'risk taxonomy map; VaR and CVaR on a return distribution with the tail shaded; drawdown-and-recovery asymmetry chart (loss % vs required gain %); SVB balance-sheet duration mismatch diagram',
    notes: 'Risk analyst is one of the most realistic entry roles for this reader — flag it and describe the day-to-day briefly.',
  },
  {
    num: '17', slug: 'behavioral', title: 'Market Efficiency, Behavioral Finance and Crises',
    eyebrow: 'Part IV · Investing &amp; Risk',
    topics: [
      'EMH properly stated: weak/semi-strong/strong forms; what efficiency does NOT claim (prices always right); the Grossman-Stiglitz paradox — someone must be paid to do the homework',
      'The evidence both ways: index funds beating most active managers vs persistent anomalies (momentum, post-earnings-announcement drift); joint-hypothesis problem in one paragraph',
      'The bias catalog with one market consequence each: loss aversion, anchoring, overconfidence, herding, recency, confirmation bias, disposition effect; prospect theory in plain terms',
      'Anatomy of a bubble (Kindleberger/Minsky): displacement -> boom -> euphoria -> profit-taking -> panic; run tulips, dot-com, and meme stocks through the template briefly',
      '2008 as the full case study: the securitization chain (mortgage -> MBS -> CDO), leverage everywhere, the run on repo, contagion, and the policy response — tying together s04, s08, s09, s16',
      'Practical defenses: rules and checklists, base rates, pre-mortems; how quants industrialize the exploitation of others biases (bridge to s18)',
    ],
    widgets: [
      'MAIN "Bias lab" with three tab buttons: (1) Anchoring — page shows a clearly irrelevant number (last two digits of a "spun" wheel via button), then asks the user to estimate a quantity by slider, then reveals the classic experimental finding and explains; (2) Loss aversion — two rounds of A/B choices between a sure amount and a gamble (framed as gains, then as losses), reveals the reflection effect and maps it to prospect theory; (3) The disposition test — shows two positions (one up 40%, one down 40%) and asks which to sell to raise cash, then explains why most people sell the winner and why thats usually backwards (tax + momentum). Each tab is self-contained with a "lesson" reveal.',
    ],
    figures: 'bubble phases annotated curve with the five stages; 2008 contagion chain diagram (households -> mortgages -> MBS/CDO -> banks -> repo -> everything); prospect theory value function (steeper for losses); EMH forms as nested sets',
    notes: 'Tone check: this section can be the most fun — stories and experiments — without losing rigor.',
  },
  {
    num: '18', slug: 'quant', title: 'Quantitative Finance and Data Analytics: Your Home Turf',
    eyebrow: 'Part V · Your Edge: Data Meets Finance',
    topics: [
      'The role landscape up close: quant researcher, quant developer, risk quant, data scientist at a bank/asset manager/fintech, financial data analyst — what each actually does all day, and which fit this readers profile',
      'Financial data: market data (OHLCV, tick, order book), fundamental, macro, alternative data; vendors (Bloomberg, Refinitiv, FactSet) vs free (yfinance, FRED, EDGAR, SEC filings); the data-quality horror list: survivorship bias, look-ahead bias, corporate-action adjustments, point-in-time data',
      'Returns math for data people: simple vs log returns and when each, annualization conventions (×252, ×√252), why prices are non-stationary but returns are workable; stylized facts (volatility clustering, fat tails, near-zero autocorrelation)',
      'Backtesting done honestly: the full workflow (hypothesis -> data -> signal -> portfolio rules -> costs -> out-of-sample); transaction costs and slippage; the cardinal sin of overfitting — connect directly to train/test discipline the reader already has; multiple-testing problem (try 100 strategies, 5 look great by luck)',
      'ML in finance honestly: where it genuinely works (fraud detection, credit scoring, execution optimization, NLP on filings/news) vs where it struggles (point forecasts of prices — brutal signal-to-noise); feature leakage examples specific to finance',
      'The starter stack and projects: pandas/numpy/matplotlib/statsmodels/scikit-learn, a 5-project ladder from "download and chart SPY" to "factor backtest with honest out-of-sample report" (full career packaging in s20)',
    ],
    widgets: [
      'MAIN "Backtest sandbox": generates a synthetic daily price series (750 days: geometric random walk, drift 6%/yr, vol 18%/yr, plus two hidden regime shifts; Regenerate button) -> sliders fast MA (5-50) and slow MA (20-200, keep fast < slow by clamping), toggle "0.1% cost per trade" -> SVG top panel: price with both MAs and buy/sell markers; bottom panel: equity curves strategy vs buy-and-hold; stats row: CAGR both, max drawdown both, number of trades. THE POINT (say it in the widget copy): tune the sliders until the strategy wins, hit Regenerate, watch it lose — you just experienced overfitting. Long/flat strategy: long when fast MA > slow MA, else cash.',
    ],
    figures: 'the quant research pipeline; in-sample win vs out-of-sample loss illustration; simple vs log returns divergence for big moves; "where ML works in finance" signal-to-noise ladder',
    notes: 'This is the readers bridge section — from what they know to where it applies. Highest density of .co-you callouts (3-4).',
  },
  {
    num: '19', slug: 'fintech', title: 'FinTech: How Technology Is Rewiring Finance',
    eyebrow: 'Part V · Your Edge: Data Meets Finance',
    topics: [
      'Card payments end to end: the four-party model (cardholder, merchant, issuer, acquirer + network), what happens in the 2 seconds after a tap, interchange economics (who pays the ~2%), auth vs clearing vs settlement',
      'Bank-to-bank rails: ACH (slow, cheap, batch) vs wires (fast, expensive) vs real-time rails (RTP, FedNow); cross-border pain and why (correspondent banking) and the fixers (Wise-style netting)',
      'The fintech stack: Stripe/Adyen as the developer layer, banking-as-a-service, neobanks — the business models and why deposits/regulation still anchor everything (tie s04)',
      'Lending tech: credit scoring then and now, alternative-data underwriting, BNPL mechanics and where the risk hides',
      'Blockchain for a CS reader: hash-linked blocks, proof-of-work vs proof-of-stake in one paragraph each, what a smart contract really is; stablecoins and their reserve question; DeFi primitives — especially the AMM constant-product formula x·y=k; tokenization of real assets; an honest scorecard of solved vs hyped',
      'Wealth tech and trading tech: robo-advisors (what the algorithm actually does), payment-for-order-flow in one paragraph, algo/HFT recap from s06',
      'Where the jobs are: the roles across payments/lending/crypto/wealth for a data person; RegTech as the quiet giant',
    ],
    widgets: [
      'MAIN "Fee drag calculator": inputs starting portfolio ($100k), years (10-40, default 30), gross return slider (4-10%, default 7%) -> three wealth paths computed and charted (1.00% advisor, 0.25% robo, 0.03% index DIY), final values and "lifetime cost of fees vs DIY" readouts. Verify: $100k, 7% gross, 30 years -> DIY at 6.97% ≈ $753k, advisor at 6% ≈ $574k — compute exactly in the widget.',
      'SMALL "AMM playground": a constant-product pool (100 ETH × 200,000 USDC, k = 20,000,000); slider: buy 1-50 ETH -> computes USDC paid via pool math, effective price, price impact % vs spot 2,000, and redraws the x·y=k curve with the trade arc. Verify: buying 10 ETH costs 22,222.22 USDC (pool moves to 90 ETH × 222,222.22), effective price 2,222.22, impact ~11.1%.',
    ],
    figures: 'four-party card payment flow with the fee split annotated; rails comparison table-figure (speed × cost × reversibility); hash-linked blocks diagram; AMM curve with slippage zone',
    notes: 'Neutral, engineering-minded tone on crypto: explain the mechanism precisely, flag the risks factually, no cheerleading or dunking.',
  },
  {
    num: '20', slug: 'career', title: 'Career Roadmap: Landing the Job',
    eyebrow: 'Part V · Your Edge: Data Meets Finance',
    topics: [
      'The role map for THIS reader (BSc CS + data science/analysis certificates): data analyst at a bank/asset manager, financial data analyst, risk analyst, quant analyst, fintech analytics engineer, business/product analyst at a fintech — for each: day-to-day, required knowledge from this course (link the sections), typical entry path, and honestly framed compensation notes (varies by region — speak in relative terms)',
      'Certifications with a straight face: CFA (structure, cost, time, when it pays off and when its overkill), FRM (the risk route), CQF and masters options; the honest rule — for data-heavy roles, a portfolio of projects beats certificates; cheap first steps (CFA Investment Foundations, Bloomberg BMC)',
      'The portfolio strategy — four concrete project specs, each with data source, tools, deliverable, and which interview line it powers: (1) equity screener + ratio dashboard (EDGAR/yfinance), (2) credit-default model on LendingClub-style public data with honest evaluation, (3) macro dashboard from FRED with recession-indicator tracking, (4) a factor backtest with out-of-sample report and a written "what would make me distrust this" section',
      'Interview prep: the ~15 finance questions this reader will actually face, grouped (markets, accounting, valuation, risk, brain teasers) — each with a 2-3 sentence model answer and a link to the section that teaches it',
      'Getting in the door: translating a CS resume to finance-speak (two before/after bullet examples), where these jobs post, informational interviews without cringe, why fintech and asset-management data teams are the easiest beachheads vs front-office IB',
      'The 12-month plan, month by month: combining this course (Parts I-V), the four projects, one certification decision point at month 4, and an application cadence from month 6',
    ],
    widgets: [
      'MAIN "Role matcher": 6 preference sliders/toggles (daily coding love 1-5, math depth 1-5, markets obsession 1-5, people-facing 1-5, startup vs institution, risk appetite) -> scores 6 predefined roles via a transparent weight matrix, shows top-3 ranked cards with "why it fits" and "start with project #N"; include a "show the scoring math" details toggle — transparency IS the lesson.',
      'MAIN "12-month roadmap": interactive checklist grouped by quarter (Q1 foundations, Q2 projects+cert decision, Q3 applications begin, Q4 interviews), each item checkable, saved to localStorage under key "fe-roadmap" (NOT the site progress key), with its own mini progress bar per quarter.',
    ],
    figures: 'role landscape 2×2 map (coding intensity × finance depth) with the 6 roles plotted; certification decision flowchart; interview-question-to-section map as a styled table-figure',
    notes: 'Voice: candid mentor. This section converts the course into outcomes — it may run slightly longer than others (up to 4,000 words). Cross-link generously to earlier sections. Quiz still required but can be 4 lighter questions (e.g. "which project best demonstrates X").',
  },
]

const META_SCHEMA = {
  type: 'object',
  required: ['file', 'id', 'title', 'subsections', 'widgets', 'wordCount'],
  properties: {
    file: { type: 'string', description: 'absolute path of the file written' },
    id: { type: 'string', description: 'section root id, e.g. s07' },
    title: { type: 'string' },
    subsections: {
      type: 'array',
      items: {
        type: 'object', required: ['id', 'title'],
        properties: { id: { type: 'string' }, title: { type: 'string' } },
      },
    },
    widgets: { type: 'array', items: { type: 'string' } },
    wordCount: { type: 'number' },
  },
}

const VERIFY_SCHEMA = {
  type: 'object',
  required: ['ok', 'fixed', 'concerns'],
  properties: {
    ok: { type: 'boolean', description: 'true if the file now fully passes the checklist' },
    fixed: { type: 'array', items: { type: 'string' }, description: 'issues found and fixed' },
    concerns: { type: 'array', items: { type: 'string' }, description: 'anything left unresolved' },
  },
}

function writerPrompt(s) {
  const sid = 's' + s.num
  return [
    'You are an expert finance educator AND meticulous front-end developer authoring ONE section of an interactive HTML textbook called "Finance & Economics: Zero to Master".',
    '',
    'STEP 1 — Read the authoring spec at ' + SPEC + ' and follow it EXACTLY: skeleton, class names, design tokens, id rules, tone, length targets. The spec is the contract; do not invent classes or hardcode colors.',
    '',
    'YOUR SECTION',
    '- Section number: ' + s.num + ' — root id "' + sid + '", every inner id prefixed "' + sid + '-"',
    '- Title: "' + s.title + '" (h2 text: "' + String(parseInt(s.num, 10)) + '. ' + s.title + '")',
    '- Eyebrow: "' + s.eyebrow + '"',
    '- data-num="' + s.num + '" data-title="' + s.title + '"',
    '',
    'TOPICS to cover as h3 subsections (order them for the best teaching flow; merge or split sensibly):',
    s.topics.map(function (t) { return '  - ' + t }).join('\n'),
    '',
    'REQUIRED INTERACTIVE WIDGET(S) — follow the spec widget rules (IIFE, root-scoped queries, clamped inputs, tested math):',
    s.widgets.map(function (w) { return '  - ' + w }).join('\n'),
    '',
    'FIGURES (3-5 static SVGs, adapt freely): ' + s.figures,
    '',
    'SPECIAL NOTES: ' + (s.notes || 'none'),
    '',
    'CROSS-REFERENCE ANCHORS available for internal links (use <a href="#sNN">…</a>): ' + XREF,
    '',
    'STEP 2 — Write the finished HTML to exactly this file: ' + OUT + '/' + sid + '-' + s.slug + '.html',
    'The file contains ONLY the <section> element plus its trailing <script> tag(s). No markdown fences, no comments, no doctype.',
    '',
    'STEP 3 — Return metadata: file path, id, title, the list of h3 subsections (id + plain-text title), widget names, and approximate body word count.',
    '',
    'Craft matters: verify every worked example numerically, hand-check your widget math against the test values given, keep SVG coordinates collision-free, and make the prose genuinely enjoyable to read.',
  ].join('\n')
}

function verifierPrompt(s) {
  const sid = 's' + s.num
  const file = OUT + '/' + sid + '-' + s.slug + '.html'
  return [
    'You are a rigorous technical editor verifying one section of an interactive HTML textbook. Fix problems DIRECTLY in the file with Edit — do not just report.',
    '',
    'Read the spec: ' + SPEC,
    'Read the section file: ' + file,
    '',
    'CHECKLIST — verify each, fix violations:',
    '1. Structure: exactly one top-level <section class="lesson" id="' + sid + '" data-num="' + s.num + '" data-title="...">, plus trailing <script> tag(s) after </section>. Eyebrow, h2 ("' + String(parseInt(s.num, 10)) + '. ..."), lede present. Every h3 has an id.',
    '2. IDs: every id starts with "' + sid + '" (root is exactly "' + sid + '"); no duplicate ids within the file. Check SVG defs/gradient/marker ids too.',
    '3. Tag balance: run this and fix any reported imbalance or parse error:',
    '   python3 -c "import html.parser,sys; ...". Simplest reliable check: python3 - <<EOF with html.parser.HTMLParser subclass tracking a tag stack over the file, printing unmatched tags. Buttons must never nest inside buttons or links.',
    '4. Colors: NO hardcoded colors anywhere (hex, rgb(, rgba(, hsl(, named colors like "red"/"steelblue" in styles or JS). Everything via var(--token). Search the file for "#" followed by hex digits inside style/fill/stroke contexts and for rgb/hsl. Exceptions: none. fill="none" and currentColor are fine.',
    '5. External resources: no <img>, <iframe>, <link>, no http(s) URLs in src/href (internal #anchors and plain-text mentions are fine). No <style> tags.',
    '6. Spec components used correctly: callout variants (co-key/co-ex/co-warn/co-real/co-analogy/co-you) each with .co-label; .term elements have tabindex="0" and data-def under 160 chars with no double quotes inside; .formula blocks; .fig figures with viewBox 720 wide, figcaption "Figure ' + String(parseInt(s.num, 10)) + '.k — ..."; tables wrapped in .tbl-wrap; quiz: 4-5 .quiz-item, each with exactly one data-correct button and a .quiz-explain; one .kt box at the end with 5-8 bullets.',
    '7. Widget JS: extract each <script> block mentally (or to a temp file) and check: wrapped in IIFE, no global leaks, queries scoped to the widget root, no document.write, all referenced element ids actually exist in the markup, event listeners on existing elements, division-by-zero and NaN guards, numbers formatted with toLocaleString. If node is available (try node --version), syntax-check each script block by writing it to a temp file and running node --check on it; fix any syntax errors.',
    '8. MATH AUDIT (most important): recompute the worked examples in the prose and the widget formulas by hand (or with python3). The brief for this section included these test values — verify the implementation matches them: ' + s.widgets.join(' | '),
    '9. SVG sanity: viewBox present, coordinates within bounds, text labels 13-16px, unlikely to overlap (check x/y math on adjacent labels), all colors via style="...var(--...)".',
    '10. Prose: every finance jargon term defined at first use (dfn.term or inline); tone matches spec; no lorem, no TODOs, no markdown syntax leaking into HTML; word count within 2,600-3,600 (s20 may reach 4,200).',
    '',
    'Make all fixes with Edit. Re-run the tag-balance check after editing. Then return: ok (true only if everything passes), fixed (list what you changed), concerns (anything you could not fully resolve).',
  ].join('\n')
}

phase('Author')

const DONE = (args && args.done) || ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15']
const todo = SECTIONS.filter(function (s) { return DONE.indexOf(s.num) < 0 })
log('Authoring ' + todo.length + ' sections one at a time: ' + todo.map(function (s) { return 's' + s.num }).join(', '))

const authored = []
for (const s of todo) {
  const meta = await agent(writerPrompt(s), { label: 'write:s' + s.num + '-' + s.slug, phase: 'Author', schema: META_SCHEMA, effort: 'high' })
  if (!meta) {
    log('s' + s.num + ' writer died (likely session limit) — stopping cleanly. Completed this run: ' + (authored.map(function (m) { return m.id }).join(', ') || 'none'))
    break
  }
  authored.push(meta)
  log('s' + s.num + ' done (~' + meta.wordCount + ' words) — ' + authored.length + '/' + todo.length)
}
return { authored: authored.map(function (m) { return { id: m.id, title: m.title, wordCount: m.wordCount } }) }
