# UX Tensions from Vendor Data Flows

Where gaps between vendor capabilities surface as design problems in the product.

---

## 1. Sync vs. Async Resolution

- **Tension:** Kyckr (EU) and RegHub (Canada) generally return data synchronously or near-real-time. AsiaVerify (APAC) can take minutes to hours depending on the registry — China is often batch-processed overnight.
- **Gap:** The prototype shows a single spinner with "usually takes just a few seconds." No differentiation between fast and slow resolution. No notification or callback when async results arrive.
- **Where it surfaces:**
  - Order detail pending state — spinner UX doesn't set latency expectations
  - Orders list — no way to distinguish "processing (seconds)" from "processing (hours)"
  - API contract — sync response vs. webhook-based callback for slow markets
  - Ops workflow — teams can't plan around variable turnaround

---

## 2. Attribute Richness Varies by Vendor and Registry

- **Tension:** Kyckr returns rich data for Core Europe (legal form, share capital, company activity, shareholders, UBO where filed). RegHub returns a moderate set for Canada (name, status, directors, address). AsiaVerify varies wildly by country — Singapore is rich, China returns mostly in local language, some APAC markets return minimal data. Extended Europe (also Kyckr) returns almost nothing — name, jurisdiction, sometimes status.
- **Gap:** The product renders a fixed report layout. Rich results look great; sparse results look broken. No upfront signal to the user about what data depth to expect for a given jurisdiction.
- **Where it surfaces:**
  - Order detail page — conditional field rendering hides gaps but creates inconsistency
  - Order placement flow — no coverage indicator before the user commits
  - Pricing — user pays the same (or similar) for a Gibraltar result (2 fields) as a UK result (15+ fields)
  - Customer trust — sparse reports feel like a product failure, not a registry limitation

---

## 3. People/UBO Data Availability Is Jurisdiction-Dependent

- **Tension:** Kyckr provides directors, officers, and UBO/shareholder data for most Core Europe markets. RegHub provides directors for Canada but no shareholder data. AsiaVerify provides people data for select markets (Singapore, Hong Kong) but not consistently. Extended Europe has no people data at all.
- **Gap:** People data appears or disappears silently. The user doesn't know if it's a vendor gap, a registry gap, a compliance exclusion (GDPR/PIPL), or a product scope decision (UBO as fast-follow).
- **Where it surfaces:**
  - People tab — silently hidden when empty
  - Compliance workflows — UBO is often a regulatory requirement; gap needs to be documented
  - Competitive positioning — Trulioo claims UBO in their offering; silent absence looks like a gap
  - API schema — no structured way to communicate "why" data is missing

---

## 4. Schema Inconsistency Across Vendors

- **Tension:** Each vendor returns data in a different schema. Entity types: Kyckr returns "Private Limited Company," German registries return "Gesellschaft mit beschrankter Haftung," RegHub returns "Corporation." People roles: "Director" vs. "Managing Director" vs. "Administrateur" vs. "法定代表人". Addresses: some structured (street, city, postal), others a single concatenated string.
- **Gap:** The normalization layer maps vendor-specific values to a Middesk-standardized schema, but the mapping isn't transparent. Users see standardized values without knowing what the registry actually said. No canonical taxonomy is documented for entity types, role types, or status values.
- **Where it surfaces:**
  - General Info card — shows "Entity Type: Private Limited Company" but registry said "Gesellschaft mit beschrankter Haftung"
  - Status badges — "Active" (standardized) alongside "ACTIVE" / "AKTIV" / "存续" (registry)
  - People table — role badges show unstandardized vendor values
  - API docs — customers integrating need a predictable, documented schema

---

## 5. Registration Number Format Varies per Registry

- **Tension:** UK Companies House: 8 digits. German Handelsregister: court prefix + "HRB" + number. Canada: varies by province (7-digit for Ontario, "BC" prefix for BC, NEQ for Quebec). Singapore ACRA: UEN format. China USCC: 18-character alphanumeric. India CIN: 21-character with embedded metadata. Each vendor validates differently — or doesn't validate at all.
- **Gap:** The input form accepts freeform text. Warning boxes flag common mistakes (e.g., "GST numbers are not registration numbers"), but there's no input validation or format masking. If the wrong number type is entered, the failure mode depends on the vendor — some return an error, some return no results, some return the wrong entity.
- **Where it surfaces:**
  - Order form (step 3) — freeform input with warning text only
  - Business select page — wrong number type may return unexpected matches
  - Error handling — no structured error for "invalid registration number format"
  - Support volume — users entering tax IDs and getting confused results

---

## 6. Language and Character Set Handling

- **Tension:** AsiaVerify returns data in local script for CJK markets (Chinese, Japanese, Korean). Kyckr returns data in the registry's language (German for DE, French for FR). RegHub returns bilingual data for Quebec (French primary). The prototype has a language selector for APAC only.
- **Gap:** No unified language strategy. APAC has EN/Original/Both toggle. Canada and Europe have no language control — French and German data appears without option. CJK output impacts layout (character width, line wrapping, font rendering). "Both" doubles text length in every field.
- **Where it surfaces:**
  - Order form — language selector only for APAC, absent for Canada/Europe
  - Order detail — CJK characters in name, address, officer roles (see ord_005 Tencent example)
  - Quebec orders — French registry terms (see ord_007 "DISSOUTE", "Administrateur")
  - Layout — cards and tables break with variable-width multilingual text

---

## 7. Data Freshness and Caching Differences

- **Tension:** Kyckr pulls live from registries per request — data is seconds-fresh but slower and more expensive. RegHub maintains cached datasets — faster but potentially days or weeks stale. AsiaVerify varies by market — some live, some batch-refreshed.
- **Gap:** No freshness indicator in the report. Users don't know if data was pulled live or served from cache. No "retrieved at" timestamp. No way to request a re-pull.
- **Where it surfaces:**
  - Source box on order detail — shows "Companies House (UK)" but not when
  - Compliance audits — regulators may require data recency documentation
  - Monitoring use case (future) — stale cached data defeats the purpose of ongoing monitoring
  - Pricing — live-pull has different cost structure than cached lookup

---

## 8. Multi-Vendor Overlap and Fallback

- **Tension:** Kyckr covers both Core Europe and Extended Europe, plus some APAC markets. AsiaVerify covers APAC. RegHub covers Canada. For overlapping markets (e.g., Australia, Singapore), the vendor choice affects data richness, latency, and cost. If a primary vendor is down, there's no automatic fallback.
- **Gap:** The product routes to a single vendor per region. No vendor selection logic for overlapping coverage. No failover. The user doesn't know which vendor is being used or that alternatives exist.
- **Where it surfaces:**
  - Order placement — no visibility into which vendor fulfills the request
  - Reliability — vendor outage = region outage, no graceful degradation
  - Data quality — same entity through different vendors may return different data
  - Pricing optimization — cheaper vendor might be available for the same market

---

## 9. Error Handling Differs by Vendor

- **Tension:** Kyckr returns structured errors (entity not found, invalid jurisdiction, rate limit). AsiaVerify may return empty results without distinguishing "not found" from "error." RegHub has its own error taxonomy. There's no unified error model.
- **Gap:** The product can't tell the user why a lookup failed in a consistent way. "No results found" could mean: entity doesn't exist, wrong registration number format, vendor error, rate limit hit, or jurisdiction not supported.
- **Where it surfaces:**
  - Business select page — "0 results" with no explanation
  - Order detail — could show a pending state indefinitely if vendor silently fails
  - API responses — error codes are vendor-specific, not Middesk-standardized
  - Retry logic — some failures are retryable (rate limit), others aren't (entity not found)

---

## 10. Pricing Granularity vs. UX Simplicity

- **Tension:** Vendors charge differently: Kyckr per-call with tiered pricing, AsiaVerify per-market with varying rates, RegHub per-jurisdiction. Some vendors offer cheaper "existence check" vs. full report tiers. The product currently exposes price multiples (1.5x, 2.5-3x, 3-4x) at the region level.
- **Gap:** Region-level pricing hides per-country cost variation. A UK lookup may cost differently from a Latvia lookup, but both show "2.5-3x." No way to offer a lighter/cheaper search option. Users can't predict cost before placing an order.
- **Where it surfaces:**
  - Region selection — price multiples are abstract and imprecise
  - Order form — no cost preview before "Place Order"
  - Billing — customers may be surprised by per-order charges for low-value results
  - Tiered offering — no UX for "light check" vs. "full report" even if vendors support it
