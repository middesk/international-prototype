import React, { useState } from 'react'
import styled from 'styled-components'

const Page = styled.div`
  max-width: 1100px;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #0B3139;
`

const PageDesc = styled.p`
  font-size: 13px;
  color: #5F6874;
  margin-bottom: 28px;
  line-height: 1.6;
  max-width: 700px;
`

const Badge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  background: ${p =>
    p.$v === 'kyckr' ? '#EDE9FE' :
    p.$v === 'asiaverify' ? '#ECFDF5' :
    p.$v === 'reghub' ? '#FEF3C7' :
    p.$v === 'high' ? '#FEE2E2' :
    p.$v === 'medium' ? '#FEF3C7' :
    p.$v === 'low' ? '#ECFDF5' :
    '#ECF0F4'};
  color: ${p =>
    p.$v === 'kyckr' ? '#6D28D9' :
    p.$v === 'asiaverify' ? '#047857' :
    p.$v === 'reghub' ? '#92400E' :
    p.$v === 'high' ? '#991B1B' :
    p.$v === 'medium' ? '#92400E' :
    p.$v === 'low' ? '#047857' :
    '#5F6874'};
`

const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

const FilterBtn = styled.button`
  background: ${p => p.$active ? '#0B3139' : '#fff'};
  color: ${p => p.$active ? '#fff' : '#5F6874'};
  border: 1px solid ${p => p.$active ? '#0B3139' : '#D9E0E8'};
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms;
  &:hover { border-color: #0B3139; }
`

const TableCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  overflow: hidden;
  margin-bottom: 24px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 700;
  color: #5F6874;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #D9E0E8;
  background: #FAFAFA;
  white-space: nowrap;
`

const Tr = styled.tr`
  border-bottom: 1px solid #ECF0F4;
  cursor: pointer;
  transition: background 100ms;
  &:hover { background: #F9FAFB; }
  &:last-child { border-bottom: none; }
  ${p => p.$expanded && `background: #F0F5F6;`}
`

const Td = styled.td`
  padding: 14px 16px;
  font-size: 13px;
  color: #333;
  vertical-align: top;
  line-height: 1.5;
`

const TensionName = styled.div`
  font-weight: 700;
  color: #0B3139;
  margin-bottom: 2px;
`

const TensionDesc = styled.div`
  font-size: 12px;
  color: #5F6874;
  line-height: 1.5;
`

const VendorCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const VendorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
`

const VendorDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${p =>
    p.$v === 'kyckr' ? '#7C3AED' :
    p.$v === 'asiaverify' ? '#059669' :
    '#D97706'};
  flex-shrink: 0;
`

const ExpandRow = styled.tr`
  background: #F8FAFC;
`

const ExpandCell = styled.td`
  padding: 0 16px 16px;
`

const ExpandGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 4px;
`

const ExpandCard = styled.div`
  background: #fff;
  border: 1px solid #ECF0F4;
  border-radius: 8px;
  padding: 14px 16px;
`

const ExpandCardTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #9DADB0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`

const SurfaceItem = styled.div`
  font-size: 12px;
  color: #5F6874;
  padding: 3px 0;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  &::before {
    content: '›';
    color: #9DADB0;
    font-weight: 700;
    flex-shrink: 0;
  }
`

const VendorMatrix = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const MatrixRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
`

const MatrixLabel = styled.span`
  font-weight: 600;
  min-width: 80px;
  color: #0B3139;
`

const MatrixValue = styled.span`
  color: #5F6874;
`

const LegendBar = styled.div`
  display: flex;
  gap: 16px;
  padding: 10px 16px;
  background: #FAFAFA;
  border-bottom: 1px solid #ECF0F4;
  font-size: 11px;
  color: #5F6874;
  align-items: center;
`

const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`

const VENDOR_GAPS = [
  {
    id: 1,
    title: 'Sync vs. Async Resolution',
    category: 'latency',
    severity: 'high',
    tension: 'Kyckr and RegHub return data near-real-time. AsiaVerify can take minutes to hours — China is often batch-processed overnight.',
    gap: 'Single spinner UX with "a few seconds" messaging. No differentiation, no notifications, no callback.',
    vendors: {
      kyckr: 'Sync / near-real-time for most EU registries',
      asiaverify: 'Variable: seconds (SG, HK) to hours (CN, ID). Some batch-only.',
      reghub: 'Sync for most Canadian jurisdictions'
    },
    surfaces: [
      'Pending state spinner — misleading for slow jurisdictions',
      'Orders list — can\'t distinguish fast vs. slow processing',
      'API contract — no webhook/callback for async resolution',
      'Ops workflow — teams can\'t plan around variable turnaround'
    ]
  },
  {
    id: 2,
    title: 'Attribute Richness Varies by Vendor',
    category: 'data-quality',
    severity: 'high',
    tension: 'Kyckr returns rich data for Core Europe (legal form, share capital, activity, UBO). RegHub returns moderate data for Canada. AsiaVerify varies wildly. Extended Europe returns almost nothing.',
    gap: 'Fixed report layout. Rich results look great; sparse results look broken. No upfront coverage indicator.',
    vendors: {
      kyckr: 'Rich: name, status, legal form, share capital, activity, directors, shareholders, UBO, events. Sparse for Extended Europe.',
      asiaverify: 'Variable: SG/HK rich. CN moderate but local language. Some markets minimal.',
      reghub: 'Moderate: name, status, directors, address. No shareholders or share capital.'
    },
    surfaces: [
      'Order detail — conditional fields hide gaps but create inconsistency',
      'Order placement — no coverage indicator before user commits and pays',
      'Pricing — same price for Gibraltar (2 fields) vs. UK (15+ fields)',
      'Customer trust — sparse reports feel like product failure'
    ]
  },
  {
    id: 3,
    title: 'People/UBO Data Availability',
    category: 'data-quality',
    severity: 'high',
    tension: 'Kyckr provides directors + shareholders for Core Europe. RegHub provides directors only for Canada. AsiaVerify has people for select markets. Extended Europe has none.',
    gap: 'People tab silently disappears. User can\'t distinguish vendor gap vs. privacy exclusion vs. product roadmap.',
    vendors: {
      kyckr: 'Directors + shareholders/UBO for most Core Europe. None for Extended Europe.',
      asiaverify: 'Directors for SG, HK. Inconsistent elsewhere. Corporate shareholders not resolved.',
      reghub: 'Directors/officers only. No shareholders or UBO data.'
    },
    surfaces: [
      'People tab — hidden when empty, no explanation why',
      'Compliance workflows — UBO often a regulatory requirement',
      'Competitive gap — Trulioo claims UBO in their offering',
      'Corporate shareholders — Tencent owns 18.7% of Sea but UBO chain isn\'t traversed'
    ]
  },
  {
    id: 4,
    title: 'Schema Inconsistency Across Vendors',
    category: 'normalization',
    severity: 'medium',
    tension: 'Each vendor returns different schemas. Entity types, people roles, status values, and address formats all vary.',
    gap: 'Normalization layer maps values to standardized schema but mapping isn\'t transparent. No canonical taxonomy documented.',
    vendors: {
      kyckr: 'Entity type: "Private Limited Company". Roles: "Director", "Secretary". Status: "Active". Structured addresses.',
      asiaverify: 'Entity type: varies (Chinese: "有限责任公司"). Roles: "法定代表人". Status: local language. String addresses.',
      reghub: 'Entity type: "Corporation". Roles: "Director", "Officer". Status: "ACTIVE". Address format varies by province.'
    },
    surfaces: [
      'General Info card — standardized value hides original registry term',
      'Status badges — "Active" alongside "AKTIV", "存续", "DISSOUTE"',
      'People table — role badges show unstandardized vendor values',
      'API schema — customers need predictable, documented field values'
    ]
  },
  {
    id: 5,
    title: 'Registration Number Format Variation',
    category: 'input',
    severity: 'medium',
    tension: 'UK: 8 digits. Germany: HRB + court prefix. Canada: varies by province. Singapore: UEN. China: 18-char USCC. India: 21-char CIN.',
    gap: 'Freeform text input with warning boxes. No validation or masking. Wrong number type → silent vendor failure or wrong entity.',
    vendors: {
      kyckr: 'Accepts most formats. Returns empty or error for invalid numbers. Some format validation.',
      asiaverify: 'Flexible but may return unexpected results for malformed input. No pre-validation.',
      reghub: 'Strict on format per province. Returns error for invalid format.'
    },
    surfaces: [
      'Order form — freeform input, warning text only',
      'Business select — wrong number type returns unexpected matches',
      'Error handling — no structured "invalid format" error',
      'Support volume — users entering tax IDs (GST, VAT, ABN) instead of reg numbers'
    ]
  },
  {
    id: 6,
    title: 'Language and Character Set Handling',
    category: 'normalization',
    severity: 'medium',
    tension: 'AsiaVerify returns CJK characters. Kyckr returns data in registry language (German, French). RegHub returns French for Quebec.',
    gap: 'Language selector exists for APAC only. No language control for Canada/Europe. CJK output breaks layout. No unified strategy.',
    vendors: {
      kyckr: 'Returns in registry language. No translation option. German → German, French → French.',
      asiaverify: 'Supports EN/Original/Both toggle. Translation quality varies by market.',
      reghub: 'Returns in registry language. Quebec → French. No translation option.'
    },
    surfaces: [
      'Order form — language selector only for APAC',
      'Order detail — CJK characters break card layouts (see Tencent order)',
      'Quebec orders — French terms without language toggle (see "DISSOUTE")',
      'Layout — variable-width text, dual-language rendering doubles content'
    ]
  },
  {
    id: 7,
    title: 'Data Freshness and Caching',
    category: 'latency',
    severity: 'medium',
    tension: 'Kyckr pulls live per request (seconds-fresh, expensive). RegHub serves cached data (fast, potentially weeks stale). AsiaVerify varies.',
    gap: 'No freshness indicator. No "retrieved at" timestamp. No way to request a re-pull. User doesn\'t know if data is live or cached.',
    vendors: {
      kyckr: 'Live pull per request. Always current. Higher cost per call.',
      asiaverify: 'Mixed: some live, some batch-refreshed daily/weekly.',
      reghub: 'Cached datasets. Updated periodically. Fast but may be days/weeks stale.'
    },
    surfaces: [
      'Source box — shows registry name but not retrieval timestamp',
      'Compliance audits — regulators may require data recency documentation',
      'Monitoring (future) — stale cache defeats the purpose',
      'Pricing — live-pull costs more than cached lookup'
    ]
  },
  {
    id: 8,
    title: 'Multi-Vendor Overlap and Fallback',
    category: 'reliability',
    severity: 'medium',
    tension: 'Kyckr covers EU + some APAC. AsiaVerify covers APAC. For overlapping markets (Australia, Singapore), vendor choice affects data and cost. No automatic fallback.',
    gap: 'Single vendor per region. No failover. User doesn\'t know which vendor fulfills the request.',
    vendors: {
      kyckr: 'Core Europe, Extended Europe, some APAC/AU overlap',
      asiaverify: 'APAC primary. Overlaps with Kyckr on AU, SG, HK.',
      reghub: 'Canada only. No overlap.'
    },
    surfaces: [
      'Order placement — no visibility into which vendor is used',
      'Reliability — vendor outage = region outage',
      'Data quality — same entity, different vendors → different data',
      'Pricing — cheaper vendor may be available for overlapping markets'
    ]
  },
  {
    id: 9,
    title: 'Error Handling Differs by Vendor',
    category: 'reliability',
    severity: 'high',
    tension: 'Kyckr returns structured errors. AsiaVerify may return empty results without distinguishing "not found" from "error." RegHub has its own taxonomy.',
    gap: 'No unified error model. "No results" could mean: entity doesn\'t exist, wrong format, vendor error, rate limit, or unsupported jurisdiction.',
    vendors: {
      kyckr: 'Structured: entity not found, invalid jurisdiction, rate limit. Clear error codes.',
      asiaverify: 'Unstructured: empty results or generic errors. Hard to distinguish failure modes.',
      reghub: 'Own taxonomy: format errors, jurisdiction errors. Moderate structure.'
    },
    surfaces: [
      'Business select — "0 results" with no explanation',
      'Pending state — could hang indefinitely if vendor silently fails',
      'API responses — error codes are vendor-specific, not standardized',
      'Retry logic — rate limit (retryable) vs. not found (not retryable) look the same'
    ]
  },
  {
    id: 10,
    title: 'Pricing Granularity vs. UX Simplicity',
    category: 'pricing',
    severity: 'low',
    tension: 'Kyckr charges per-call with tiers. AsiaVerify per-market with varying rates. RegHub per-jurisdiction. Some offer light check vs. full report.',
    gap: 'Region-level multiples (1.5x, 2.5-3x) hide per-country cost variation. No lighter/cheaper search tier exposed. No cost preview.',
    vendors: {
      kyckr: 'Per-call pricing. Tiered: existence check < basic < full report. Cost varies by country.',
      asiaverify: 'Per-market pricing. Flat rate per country. Some markets significantly more expensive.',
      reghub: 'Per-jurisdiction. Federal vs. provincial may differ. Generally lower cost.'
    },
    surfaces: [
      'Region selection — abstract multiples, not actual prices',
      'Order form — no cost preview before "Place Order"',
      'Billing — surprise charges for low-value results',
      'Tiered offering — vendors support light/full but product doesn\'t expose it'
    ]
  }
]

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'data-quality', label: 'Data Quality' },
  { id: 'normalization', label: 'Normalization' },
  { id: 'latency', label: 'Latency' },
  { id: 'reliability', label: 'Reliability' },
  { id: 'input', label: 'Input' },
  { id: 'pricing', label: 'Pricing' },
]

export default function VendorGapsPage() {
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = filter === 'all' ? VENDOR_GAPS : VENDOR_GAPS.filter(g => g.category === filter)

  return (
    <Page>
      <TopBar>
        <PageTitle>Vendor Data Flow Tensions</PageTitle>
      </TopBar>
      <PageDesc>
        Where gaps between vendor capabilities (Kyckr, AsiaVerify, RegHub) surface as design problems in the product.
        Each row maps a UX tension to the vendor behavior that causes it and where it shows up.
      </PageDesc>

      <FilterBar>
        {CATEGORIES.map(c => (
          <FilterBtn key={c.id} $active={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.label}
          </FilterBtn>
        ))}
      </FilterBar>

      <TableCard>
        <LegendBar>
          <span style={{ fontWeight: 700, color: '#0B3139' }}>Vendors:</span>
          <LegendItem><VendorDot $v="kyckr" /> Kyckr (EU, Extended EU)</LegendItem>
          <LegendItem><VendorDot $v="asiaverify" /> AsiaVerify (APAC)</LegendItem>
          <LegendItem><VendorDot $v="reghub" /> RegHub (Canada)</LegendItem>
          <span style={{ marginLeft: 'auto' }}>
            <Badge $v="high" style={{ marginRight: 4 }}>High</Badge>
            <Badge $v="medium" style={{ marginRight: 4 }}>Medium</Badge>
            <Badge $v="low">Low</Badge>
            &nbsp;severity
          </span>
        </LegendBar>
        <Table>
          <thead>
            <tr>
              <Th style={{ width: 40 }}>#</Th>
              <Th style={{ width: '28%' }}>Tension</Th>
              <Th style={{ width: '30%' }}>Product Gap</Th>
              <Th>Vendor Behavior</Th>
              <Th style={{ width: 70 }}>Severity</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(gap => (
              <React.Fragment key={gap.id}>
                <Tr $expanded={expandedId === gap.id} onClick={() => setExpandedId(expandedId === gap.id ? null : gap.id)}>
                  <Td style={{ fontWeight: 700, color: '#9DADB0' }}>{gap.id}</Td>
                  <Td>
                    <TensionName>{gap.title}</TensionName>
                    <TensionDesc>{gap.tension}</TensionDesc>
                  </Td>
                  <Td style={{ fontSize: 12.5, color: '#5F6874' }}>{gap.gap}</Td>
                  <Td>
                    <VendorCell>
                      <VendorRow><VendorDot $v="kyckr" /> <span style={{ color: '#5F6874', fontSize: 12 }}>{gap.vendors.kyckr.split('.')[0]}</span></VendorRow>
                      <VendorRow><VendorDot $v="asiaverify" /> <span style={{ color: '#5F6874', fontSize: 12 }}>{gap.vendors.asiaverify.split('.')[0]}</span></VendorRow>
                      <VendorRow><VendorDot $v="reghub" /> <span style={{ color: '#5F6874', fontSize: 12 }}>{gap.vendors.reghub.split('.')[0]}</span></VendorRow>
                    </VendorCell>
                  </Td>
                  <Td><Badge $v={gap.severity}>{gap.severity}</Badge></Td>
                </Tr>
                {expandedId === gap.id && (
                  <ExpandRow>
                    <ExpandCell colSpan={5}>
                      <ExpandGrid>
                        <ExpandCard>
                          <ExpandCardTitle>Where it surfaces in the product</ExpandCardTitle>
                          {gap.surfaces.map((s, i) => (
                            <SurfaceItem key={i}>{s}</SurfaceItem>
                          ))}
                        </ExpandCard>
                        <ExpandCard>
                          <ExpandCardTitle>Vendor detail</ExpandCardTitle>
                          <VendorMatrix>
                            <MatrixRow>
                              <MatrixLabel><VendorDot $v="kyckr" /> Kyckr</MatrixLabel>
                              <MatrixValue>{gap.vendors.kyckr}</MatrixValue>
                            </MatrixRow>
                            <MatrixRow>
                              <MatrixLabel><VendorDot $v="asiaverify" /> AsiaVerify</MatrixLabel>
                              <MatrixValue>{gap.vendors.asiaverify}</MatrixValue>
                            </MatrixRow>
                            <MatrixRow>
                              <MatrixLabel><VendorDot $v="reghub" /> RegHub</MatrixLabel>
                              <MatrixValue>{gap.vendors.reghub}</MatrixValue>
                            </MatrixRow>
                          </VendorMatrix>
                        </ExpandCard>
                      </ExpandGrid>
                    </ExpandCell>
                  </ExpandRow>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </TableCard>
    </Page>
  )
}
