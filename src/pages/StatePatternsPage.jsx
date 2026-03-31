import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Page = styled.div`
  max-width: 1100px;
`

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #0B3139;
  margin-bottom: 4px;
`

const PageDesc = styled.p`
  font-size: 13px;
  color: #5F6874;
  margin-bottom: 28px;
  line-height: 1.6;
  max-width: 720px;
`

const Section = styled.div`
  margin-bottom: 20px;
`

const SectionHeader = styled.button`
  width: 100%;
  background: #fff;
  border: 1px solid #D9E0E8;
  border-radius: ${p => p.$open ? '10px 10px 0 0' : '10px'};
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 150ms;
  &:hover { background: #F9FAFB; }
`

const SectionTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0B3139;
  display: flex;
  align-items: center;
  gap: 10px;
`

const SectionCount = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #9DADB0;
  background: #ECF0F4;
  border-radius: 10px;
  padding: 2px 8px;
`

const Chevron = styled.span`
  font-size: 18px;
  color: #9DADB0;
  transition: transform 200ms;
  ${p => p.$open && 'transform: rotate(180deg);'}
`

const SectionBody = styled.div`
  background: #fff;
  border: 1px solid #D9E0E8;
  border-top: none;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`

const StateRow = styled.div`
  display: grid;
  grid-template-columns: 8px 1fr 1.2fr 0.8fr auto;
  gap: 16px;
  align-items: start;
  padding: 14px 20px;
  border-bottom: 1px solid #ECF0F4;
  &:last-child { border-bottom: none; }
  &:hover { background: #FAFAFA; }
`

const StateIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 5px;
  background: ${p =>
    p.$type === 'happy' ? '#059669' :
    p.$type === 'partial' ? '#D97706' :
    p.$type === 'empty' ? '#DC2626' :
    '#2563EB'};
`

const StateName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0B3139;
  line-height: 1.4;
`

const StateDesc = styled.div`
  font-size: 12px;
  color: #5F6874;
  margin-top: 2px;
  line-height: 1.5;
`

const TriggerText = styled.div`
  font-size: 12px;
  color: #5F6874;
  line-height: 1.5;
`

const VendorTag = styled.span`
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  margin-right: 4px;
  background: ${p =>
    p.$v === 'kyckr' ? '#EDE9FE' :
    p.$v === 'asiaverify' ? '#ECFDF5' :
    p.$v === 'reghub' ? '#FEF3C7' :
    '#ECF0F4'};
  color: ${p =>
    p.$v === 'kyckr' ? '#6D28D9' :
    p.$v === 'asiaverify' ? '#047857' :
    p.$v === 'reghub' ? '#92400E' :
    '#5F6874'};
`

const ViewLink = styled.button`
  background: none;
  border: 1px solid #D9E0E8;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #3C5A61;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #F0F5F6; }
`

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 8px 1fr 1.2fr 0.8fr auto;
  gap: 16px;
  padding: 10px 20px;
  border-bottom: 1px solid #D9E0E8;
  background: #FAFAFA;
`

const HeaderLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: #9DADB0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Legend = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #5F6874;
  align-items: center;
`

const LegendItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`

const LegendDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$color};
`

const SECTIONS = [
  {
    title: 'Order Detail — General Info',
    states: [
      { name: 'All fields populated', desc: 'Legal form, company activity, share capital, registration authority all present', trigger: 'Rich registry data', vendors: ['kyckr'], type: 'happy', link: '/orders/ord_002', linkLabel: 'N26 (DE)' },
      { name: 'Partial fields', desc: 'No legal form, no company activity, no share capital — just core attributes', trigger: 'Moderate registry (Canada)', vendors: ['reghub'], type: 'partial', link: '/orders/ord_001', linkLabel: 'Shopify (ON)' },
      { name: 'Minimal — name + status only', desc: 'Almost empty report. No legal form, no activity, no people, no events', trigger: 'Sparse registry (Extended Europe)', vendors: ['kyckr'], type: 'empty', link: '/orders/ord_004', linkLabel: 'Gibraltar' },
      { name: 'CJK characters in all fields', desc: 'Name, entity type, role, activity, address all in Chinese/Japanese/Korean script', trigger: 'Chinese/CJK registry via AsiaVerify', vendors: ['asiaverify'], type: 'special', link: '/orders/ord_005', linkLabel: 'Tencent (CN)' },
      { name: 'French registry terms', desc: 'Entity type, status, and event descriptions in French. Status "DISSOUTE" not "Dissolved"', trigger: 'Quebec registry', vendors: ['reghub'], type: 'special', link: '/orders/ord_007', linkLabel: 'Wealthsimple (QC)' },
      { name: 'Standardized vs. raw status diverge', desc: 'Standardized says "Liquidation" but raw says "Under avvikling" — different languages, different terms', trigger: 'Non-English registry status', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'partial', link: '/orders/ord_010', linkLabel: 'Nordic (NO)' },
      { name: 'No address returned', desc: 'Registered Address card has nothing to display', trigger: 'Registry doesn\'t include address data', vendors: ['kyckr'], type: 'empty', link: '/orders/ord_010', linkLabel: 'Nordic (NO)' },
    ]
  },
  {
    title: 'Order Detail — People Tab',
    states: [
      { name: 'Directors + shareholders with DOB/address', desc: 'Full people data including date of birth and home address', trigger: 'Rich EU registry (UK, DE)', vendors: ['kyckr'], type: 'happy', link: '/orders/ord_008', linkLabel: 'Revolut (UK)' },
      { name: 'Directors only, no shareholders', desc: 'People tab shows officers/directors but no ownership data', trigger: 'Canada (no shareholder data from RegHub)', vendors: ['reghub'], type: 'partial', link: '/orders/ord_001', linkLabel: 'Shopify (ON)' },
      { name: 'Corporate shareholders (not individuals)', desc: 'Shareholders are Tencent Holdings, SoftBank — corporate entities. UBO requires traversing the ownership chain', trigger: 'Institutional/corporate ownership', vendors: ['kyckr', 'asiaverify'], type: 'special', link: '/orders/ord_009', linkLabel: 'SolarTech (SG)' },
      { name: 'People data in local script', desc: 'Officer name "马化腾" and role "法定代表人" in Chinese characters', trigger: 'CJK registry data', vendors: ['asiaverify'], type: 'special', link: '/orders/ord_005', linkLabel: 'Tencent (CN)' },
      { name: 'People data in French', desc: 'Role shows "Administrateur" instead of "Director"', trigger: 'Quebec registry', vendors: ['reghub'], type: 'special', link: '/orders/ord_007', linkLabel: 'Wealthsimple (QC)' },
      { name: 'Tab hidden entirely', desc: 'No People tab rendered — user doesn\'t know if data is missing, excluded (GDPR), or not yet built', trigger: 'Extended Europe, some APAC markets', vendors: ['kyckr', 'asiaverify'], type: 'empty', link: '/orders/ord_004', linkLabel: 'Gibraltar' },
    ]
  },
  {
    title: 'Order Detail — Status & Badges',
    states: [
      { name: 'Active (green badge)', desc: 'Entity is in good standing. Most common state', trigger: 'Active registration', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'happy', link: '/orders/ord_002', linkLabel: 'N26 (DE)' },
      { name: 'Dissolved (shows as pending/amber)', desc: 'Entity no longer active. Current badge styling may not clearly signal this as a negative status', trigger: 'Dissolved/struck-off entity', vendors: ['kyckr', 'reghub'], type: 'empty', link: '/orders/ord_007', linkLabel: 'Wealthsimple (QC)' },
      { name: 'Non-English raw status', desc: 'Registry status in foreign language alongside standardized English. "Under avvikling" = Liquidation', trigger: 'Non-English registry', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'special', link: '/orders/ord_010', linkLabel: 'Nordic (NO)' },
      { name: 'Processing spinner', desc: 'Order submitted, awaiting vendor response. Duration unpredictable', trigger: 'Async vendor resolution', vendors: ['asiaverify'], type: 'partial', link: '/orders/ord_003', linkLabel: 'Sea Limited (SG)' },
    ]
  },
  {
    title: 'Order Detail — Related Entities',
    states: [
      { name: 'Cross-country subsidiaries', desc: 'Entity has registrations in multiple countries. Shows parent, subsidiaries, and licensed entities', trigger: 'Multi-national corporate structure', vendors: ['kyckr'], type: 'special', link: '/orders/ord_008', linkLabel: 'Revolut (UK)' },
      { name: 'Federal + provincial (same country)', desc: 'Same entity incorporated federally and registered provincially. Two reg numbers, one business', trigger: 'Canadian federal + provincial registration', vendors: ['reghub'], type: 'special', link: '/orders/ord_011', linkLabel: 'Shopify (FED)' },
      { name: 'No related entities', desc: 'Single registration, no known related entities. Section not shown', trigger: 'Most single-jurisdiction entities', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'happy', link: '/orders/ord_006', linkLabel: 'Stripe (IE)' },
    ]
  },
  {
    title: 'Business Select — Match Results',
    states: [
      { name: 'High confidence match (>90%)', desc: 'Registration number lookup returns a near-exact match. Clear top result', trigger: 'Search by registration number', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'happy' },
      { name: 'Multiple close matches', desc: 'Name search returns several similar entities. User must manually disambiguate', trigger: 'Common business name across jurisdictions', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'partial' },
      { name: 'Federal + provincial in same results', desc: 'Same entity appears twice — once as federal, once as provincial registration. Confusing disambiguation', trigger: 'Canadian dual registration', vendors: ['reghub'], type: 'special' },
      { name: 'Auto-selected (threshold met)', desc: 'Top result score exceeds configured threshold — automatically selected, skipping manual step', trigger: 'Auto-select threshold enabled in settings', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'happy' },
      { name: 'Zero results', desc: 'No matches found. Could be: entity doesn\'t exist, wrong number format, vendor error, unsupported jurisdiction', trigger: 'Invalid input or vendor failure — ambiguous cause', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'empty' },
    ]
  },
  {
    title: 'Pending / Processing',
    states: [
      { name: 'Fast resolution (seconds)', desc: 'Vendor returns data near-instantly. Spinner barely visible', trigger: 'Kyckr (EU), RegHub (Canada) — sync/live pull', vendors: ['kyckr', 'reghub'], type: 'happy' },
      { name: 'Slow resolution (minutes to hours)', desc: 'User sees spinner for extended period. No progress indicator. No ETA. No notification when done', trigger: 'AsiaVerify for China, Indonesia — batch processing', vendors: ['asiaverify'], type: 'partial', link: '/orders/ord_003', linkLabel: 'Sea Limited (SG)' },
      { name: 'Indefinite hang / silent failure', desc: 'Vendor never returns a response. Order stuck in pending state permanently. No timeout, no error', trigger: 'Vendor outage or silent error — no failover', vendors: ['kyckr', 'asiaverify', 'reghub'], type: 'empty' },
    ]
  },
  {
    title: 'Orders Dashboard',
    states: [
      { name: 'Mixed domestic + international orders', desc: 'Both product types in the same list. No visual distinction, no filter, no column for product type or region', trigger: 'Customer uses both products', vendors: [], type: 'partial', link: '/', linkLabel: 'Dashboard' },
      { name: 'All international orders', desc: 'Dashboard shows only international orders — region and jurisdiction become primary navigation needs', trigger: 'International-only customer', vendors: [], type: 'special' },
      { name: 'International disabled', desc: 'Order modal shows greyed-out international option. Only domestic available', trigger: 'Feature toggle off in settings', vendors: [], type: 'partial', link: '/settings', linkLabel: 'Settings' },
    ]
  },
]

export default function StatePatternsPage() {
  const [openSections, setOpenSections] = useState(SECTIONS.map((_, i) => i))
  const navigate = useNavigate()

  function toggleSection(idx) {
    setOpenSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  return (
    <Page>
      <PageTitle>State Patterns</PageTitle>
      <PageDesc>
        UI states a designer should account for given vendor data variability.
        Each row shows what the component looks like, what triggers that state, which vendor causes it,
        and a link to a sample order that demonstrates it.
      </PageDesc>

      <Legend>
        <span style={{ fontWeight: 700, color: '#0B3139' }}>State type:</span>
        <LegendItem><LegendDot $color="#059669" /> Happy path</LegendItem>
        <LegendItem><LegendDot $color="#D97706" /> Partial / degraded</LegendItem>
        <LegendItem><LegendDot $color="#DC2626" /> Empty / error</LegendItem>
        <LegendItem><LegendDot $color="#2563EB" /> Special handling</LegendItem>
      </Legend>

      {SECTIONS.map((section, si) => {
        const isOpen = openSections.includes(si)
        return (
          <Section key={si}>
            <SectionHeader $open={isOpen} onClick={() => toggleSection(si)}>
              <SectionTitle>
                {section.title}
                <SectionCount>{section.states.length} states</SectionCount>
              </SectionTitle>
              <Chevron $open={isOpen}>&#9662;</Chevron>
            </SectionHeader>
            {isOpen && (
              <SectionBody>
                <HeaderRow>
                  <div />
                  <HeaderLabel>State</HeaderLabel>
                  <HeaderLabel>Trigger</HeaderLabel>
                  <HeaderLabel>Vendor</HeaderLabel>
                  <HeaderLabel>Example</HeaderLabel>
                </HeaderRow>
                {section.states.map((state, sti) => (
                  <StateRow key={sti}>
                    <StateIndicator $type={state.type} />
                    <div>
                      <StateName>{state.name}</StateName>
                      <StateDesc>{state.desc}</StateDesc>
                    </div>
                    <TriggerText>{state.trigger}</TriggerText>
                    <div>
                      {state.vendors.map(v => (
                        <VendorTag key={v} $v={v}>{v === 'asiaverify' ? 'AsiaVerify' : v === 'kyckr' ? 'Kyckr' : 'RegHub'}</VendorTag>
                      ))}
                      {state.vendors.length === 0 && <span style={{ fontSize: 11, color: '#9DADB0' }}>All / N/A</span>}
                    </div>
                    <div>
                      {state.link ? (
                        <ViewLink onClick={() => navigate(state.link)}>
                          {state.linkLabel} &rarr;
                        </ViewLink>
                      ) : (
                        <span style={{ fontSize: 11, color: '#BDC2C9' }}>—</span>
                      )}
                    </div>
                  </StateRow>
                ))}
              </SectionBody>
            )}
          </Section>
        )
      })}
    </Page>
  )
}
