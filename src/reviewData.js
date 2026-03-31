export const PERSONAS = [
  { id: 'compliance', label: 'Compliance' },
  { id: 'ops', label: 'Ops' },
  { id: 'pm', label: 'PM' }
]

// Tensions are ordered as a walkthrough, grouped by page so Next/Prev
// don't jump between screens unnecessarily.
//
// Flow: Settings -> Order Modal (step 2, then step 3) -> Business Select -> Order Detail

export const TENSIONS = [
  // ── Dashboard ──
  {
    id: 15,
    title: 'Distinguishing International Orders on the Dashboard',
    route: '/',
    group: 'Dashboard',
    description: 'The orders list treats domestic and international orders identically — same columns, same status badges, same insights. But international orders differ in product type, data coverage, latency, and pricing. There\'s no way to filter, sort, or visually distinguish them. As volume grows, ops teams need to triage international orders differently.',
    question: 'Should international orders have a distinct visual treatment, separate filters, or their own view? How do you signal product type, region, and coverage depth at the list level?',
    personas: {
      compliance: 'Needs to audit international verifications separately. Wants to filter by region/jurisdiction and see which orders are pending compliance review.',
      ops: 'Processing international orders requires different workflows (longer latency, manual follow-up for sparse results). Needs to filter and prioritize by product type and region.',
      pm: 'Customers using the API need to distinguish international orders in their own dashboards. Wants clear product-type metadata in the API response and list views.'
    }
  },

  // ── Settings ──
  {
    id: 13,
    title: 'Feature Gating & Activation',
    route: '/settings',
    group: 'Settings',
    description: 'Simple on/off toggle. But: self-serve or sales-gated? All-or-nothing or per-region? Who has permission? The disabled modal state says "Enable in Settings" — dead end if you can\'t.',
    question: 'Self-serve or sales-gated? Per-region? What\'s the discovery experience?',
    personas: {
      compliance: 'Wants role-based access — not everyone should place international orders',
      ops: 'Wants to activate quickly without waiting for sales',
      pm: 'Needs programmatic activation and clear feature flags per region'
    }
  },

  // ── Order Modal — Region Selection (Step 2) ──
  {
    id: 1,
    title: 'Region Selection, Pricing & User Intent',
    route: '/',
    action: 'open-modal-step-2',
    group: 'Order Flow',
    description: 'The user\'s job is "verify this business." Instead, they\'re asked to pick a region, then see abstract price multiples ("3-4x") relative to an unknown base. They don\'t know what 1x is, what a verification will actually cost, or whether the region they chose will return enough data to be useful. The region grid conflates three separate decisions: geography, pricing tier, and data coverage — none of which are transparent.',
    question: 'How does the user understand what they\'re paying for and what they\'ll get back? Should pricing be per-order, per-region, or hidden until checkout? Should the user even pick a region, or just enter the business?',
    personas: {
      compliance: 'Doesn\'t care about price — cares about coverage. "Does this region include Switzerland?" Needs clarity on what jurisdictions are actually covered vs. implied by the label.',
      ops: 'Managing verification budgets across regions. Needs predictable per-order cost, not abstract multiples. Extra region-selection step slows throughput — would prefer one search box.',
      pm: 'Modeling unit economics for their own product. Abstract multiples are unusable — needs flat per-country pricing to build their own pricing model. Also needs to route orders via API without manual region selection.'
    }
  },

  // ── Order Modal — Business Information (Step 3) ──
  {
    id: 2,
    title: 'Inconsistent Input Models',
    route: '/',
    action: 'open-modal-step-3',
    group: 'Order Flow',
    description: 'Canada, Europe, and APAC each have different form layouts. APAC merges name and number into one "keyword" field.',
    question: 'Can we unify the input model across regions?',
    personas: {
      compliance: 'Different forms = different audit trails per region',
      ops: 'Three patterns = more training, more errors',
      pm: 'Different input schemas = more API integration work'
    }
  },
  {
    id: 3,
    title: 'Registration Number Ambiguity',
    route: '/',
    action: 'open-modal-step-3',
    group: 'Order Flow',
    description: 'Formats vary wildly across jurisdictions. Users confuse tax IDs (GST, VAT, ABN) with registration numbers.',
    question: 'Is a warning box enough, or do we need per-jurisdiction validation?',
    personas: {
      compliance: 'Wrong number = wrong entity verified = compliance failure',
      ops: 'Wrong numbers waste verifications and money',
      pm: 'Needs clear format docs and meaningful error codes in the API'
    }
  },
  {
    id: 12,
    title: 'Language as Input and Output',
    route: '/',
    action: 'open-modal-step-3-apac',
    group: 'Order Flow',
    description: 'APAC has a language toggle; Canada and Europe don\'t — but Quebec returns French and Germany returns German. Output in CJK characters affects layout.',
    question: 'Is language per-order, per-account, or both? Should originals always be included?',
    personas: {
      compliance: 'Original-language value is the source of truth for audit',
      ops: 'English-only preferred for processing speed',
      pm: 'API should return both values for downstream flexibility'
    }
  },

  // ── Business Select ──
  {
    id: 7,
    title: 'Match Confidence & Entity Resolution',
    route: '/select-business',
    action: 'ensure-search-results',
    group: 'Business Select',
    description: 'No entity resolution at launch — users manually disambiguate. For common names across jurisdictions, the signals shown may not be enough.',
    question: 'What signals help pick the right entity? What\'s the cost of picking wrong?',
    personas: {
      compliance: 'Wrong entity = compliance failure. Needs high-confidence signals',
      ops: 'Wants auto-select when confidence is high, clear disambiguation when not',
      pm: 'Needs confidence scores and metadata for programmatic resolution'
    }
  },

  // ── Order Detail — Pending State ──
  {
    id: 11,
    title: 'Async Resolution & Variable Latency',
    route: '/orders/ord_003',
    group: 'Order Detail',
    description: 'Real latency varies: UK may be seconds, China could be hours. The spinner says "a few seconds" — misleading for slow jurisdictions. No notification model.',
    question: 'Set expectations per jurisdiction? Notify on completion? Distinguish fast vs. slow processing?',
    personas: {
      compliance: 'Latency affects time-to-decision on onboarding',
      ops: 'Needs to know which orders resolve fast vs. which sit for hours',
      pm: 'Needs webhooks, clear status transitions, and SLAs per region'
    }
  },

  // ── Order Detail — Rich Result (N26 Germany) ──
  {
    id: 4,
    title: 'Attribute Sparsity by Jurisdiction',
    route: '/orders/ord_002',
    tab: 'overview',
    group: 'Order Detail',
    description: 'UK/Germany results are rich (legal form, share capital, shareholders). Canada is moderate. Extended Europe returns almost nothing. Reports look inconsistent.',
    question: 'Show dashes for missing fields, hide them, or set expectations upfront?',
    personas: {
      compliance: '"Not available" vs. "not retrieved" — need to know the difference',
      ops: 'Sparse reports mean manual follow-up. Wants to know upfront',
      pm: 'Needs a coverage matrix: which fields per jurisdiction'
    }
  },
  {
    id: 14,
    title: 'Schema Normalization',
    route: '/orders/ord_002',
    tab: 'overview',
    group: 'Order Detail',
    description: 'Three vendors return different schemas. "Private Limited Company" vs. "GmbH" vs. "Corporation." People roles aren\'t standardized. Addresses vary between structured and blobs.',
    question: 'Show standardized only, both raw + standardized, or standardized with "view original"?',
    personas: {
      compliance: 'Normalization that hides the source creates audit risk',
      ops: 'Wants consistent, comparable data. Standardized only is fine',
      pm: 'Needs a canonical taxonomy in the API with raw values as metadata'
    }
  },
  {
    id: 6,
    title: 'Standardized vs. Raw Registry Data',
    route: '/orders/ord_002',
    tab: 'overview',
    group: 'Order Detail',
    description: 'Shows both "Active" (standardized) and "ACTIVE" (registry). For German companies, registry might say "eingetragen." Two values without explanation.',
    question: 'Who\'s the primary consumer — compliance (show both) or ops (standardized only)?',
    personas: {
      compliance: 'Raw value is source of truth. Needs both, clearly labeled',
      ops: 'Two status fields = confusion. Just show if it\'s active or not',
      pm: 'Wants single canonical status in API, raw available as metadata'
    }
  },
  {
    id: 8,
    title: 'Data Freshness & Provenance',
    route: '/orders/ord_002',
    tab: 'overview',
    group: 'Order Detail',
    description: 'Shows "Data retrieved from Companies House (UK)" but not when. Kyckr pulls live; RegHub may serve cached data. No timestamp, no freshness indicator.',
    question: 'Show "retrieved at" timestamp? Indicate live-pull vs. cached?',
    personas: {
      compliance: 'Data freshness is critical for regulatory reporting',
      ops: 'Needs to know if a re-pull is possible and what it costs',
      pm: 'Building SLAs around freshness — needs per-region guarantees'
    }
  },

  // ── Order Detail — Sparse Result (Gibraltar) ──
  {
    id: 10,
    title: 'The "Empty Report" Problem',
    route: '/orders/ord_004',
    tab: 'overview',
    group: 'Order Detail',
    description: 'Extended Europe may return just a name and jurisdiction. User placed an order, was charged, and got back almost nothing. Compare this with the N26 result.',
    question: 'Warn about limited coverage before the order? Gate low-coverage jurisdictions differently?',
    personas: {
      compliance: 'Near-empty report doesn\'t satisfy due diligence',
      ops: 'Wasted orders erode trust. Wants coverage indicators before ordering',
      pm: 'Empty reports damage credibility. Needs to set expectations or gate access'
    }
  },

  // ── Order Detail — People Tab ──
  {
    id: 5,
    title: 'People Tab: Present, Absent, or Excluded?',
    route: '/orders/ord_001',
    tab: 'people',
    group: 'Order Detail',
    description: 'The People tab disappears silently when no data exists. But the reason varies: vendor limitation, privacy compliance (GDPR/PIPL), or not yet built (UBO fast-follow).',
    question: 'Should the tab always appear with an explanation of why data isn\'t shown?',
    personas: {
      compliance: 'UBO is often a regulatory requirement. Needs to document the gap',
      ops: 'Missing people = manual sourcing. Wants a clear signal',
      pm: 'Competitors claim UBO already. Silent absence looks like a gap'
    }
  }
]
