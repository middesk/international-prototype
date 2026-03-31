import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TENSIONS } from '../reviewData'

const Page = styled.div`
  background: #0B3139;
  border-radius: 12px;
  padding: 32px;
  min-height: calc(100vh - 64px);
`

const Title = styled.h2`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
`

const Subtitle = styled.p`
  color: rgba(255,255,255,0.5);
  font-size: 13px;
  margin-bottom: 32px;
`

const Flow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  min-width: max-content;
  padding-bottom: 40px;
`

const Arrow = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255,255,255,0.25);
  font-size: 24px;
  padding-top: 20px;
  flex-shrink: 0;
`

const StageCard = styled.div`
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 20px;
  min-width: 220px;
  max-width: 260px;
  flex-shrink: 0;
`

const StageLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 6px;
`

const StageName = styled.h3`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
`

const TensionPill = styled.div`
  background: ${p => p.$active ? '#E84855' : 'rgba(232, 72, 85, 0.2)'};
  color: ${p => p.$active ? '#fff' : 'rgba(255,255,255,0.8)'};
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  &:hover { background: rgba(232, 72, 85, 0.4); color: #fff; }
`

const PillNum = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
`

const PillText = styled.span`
  line-height: 1.4;
  padding-top: 1px;
`

const DetailPanel = styled.div`
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
  max-width: 700px;
`

const DetailTitle = styled.h4`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`

const DetailDesc = styled.p`
  color: rgba(255,255,255,0.7);
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 12px;
`

const DetailQ = styled.div`
  background: rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 10px 14px;
  color: rgba(255,255,255,0.9);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 16px;
`

const PersonaRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 12px;
  margin-bottom: 4px;
`

const PersonaLabel = styled.span`
  font-weight: 700;
  min-width: 80px;
  color: ${p =>
    p.$p === 'compliance' ? '#A78BFA' :
    p.$p === 'ops' ? '#67E8F9' :
    '#FCD34D'};
`

const PersonaText = styled.span`
  color: rgba(255,255,255,0.6);
`

const ViewBtn = styled.button`
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  cursor: pointer;
  margin-top: 14px;
  transition: all 150ms;
  &:hover { background: rgba(255,255,255,0.25); }
`

const EdgeCaseSection = styled.div`
  margin-top: 32px;
  max-width: 900px;
`

const EdgeCaseTitle = styled.h4`
  color: rgba(255,255,255,0.5);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 12px;
`

const EdgeCaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
`

const EdgeCaseCard = styled.div`
  background: rgba(255, 247, 237, 0.1);
  border: 1px solid rgba(253, 230, 138, 0.2);
  border-radius: 8px;
  padding: 12px 14px;
  cursor: pointer;
  transition: all 150ms;
  &:hover { background: rgba(255, 247, 237, 0.18); border-color: rgba(253, 230, 138, 0.4); }
`

const EdgeCaseName = styled.div`
  color: #FDE68A;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 2px;
`

const EdgeCaseDesc = styled.div`
  color: rgba(255,255,255,0.5);
  font-size: 11px;
  line-height: 1.4;
  margin-bottom: 6px;
`

const EdgeCaseViewLink = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  &:hover { color: rgba(255,255,255,0.7); }
`

const STAGES = [
  { label: 'Dashboard', name: 'Orders List', tensionIds: [15] },
  { label: 'Configuration', name: 'Settings', tensionIds: [13] },
  { label: 'Step 1', name: 'Select Package', tensionIds: [], note: 'Domestic vs. International' },
  { label: 'Step 2', name: 'Select Geography', tensionIds: [1] },
  { label: 'Step 3', name: 'Business Information', tensionIds: [2, 3, 12] },
  { label: 'Resolution', name: 'Business Select', tensionIds: [7] },
  { label: 'Processing', name: 'Pending State', tensionIds: [11] },
  { label: 'Result', name: 'Order Detail', tensionIds: [4, 14, 6, 8, 10, 5] },
]

const EDGE_CASES = [
  { name: 'Empty Report', desc: 'Gibraltar — almost no data returned', route: '/orders/ord_004' },
  { name: 'CJK Characters', desc: 'China — all fields in Chinese script', route: '/orders/ord_005' },
  { name: 'French Registry', desc: 'Quebec — French status and roles', route: '/orders/ord_007' },
  { name: 'Multi-Jurisdiction (Cross-Country)', desc: 'Revolut — UK, Lithuania, Australia subsidiaries', route: '/orders/ord_008' },
  { name: 'Multi-Jurisdiction (Same Country)', desc: 'Canada — federal + Ontario provincial incorporation', route: '/orders/ord_011' },
  { name: 'Corporate Shareholders', desc: 'Tencent & SoftBank as owners — UBO chain', route: '/orders/ord_009' },
  { name: 'No Address + Foreign Status', desc: 'Norway — "Under avvikling" (liquidation)', route: '/orders/ord_010' },
  { name: 'Async / Pending', desc: 'Processing — variable latency by region', route: '/orders/ord_003' },
]

export default function FlowDiagram() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = selectedId !== null ? TENSIONS.find(t => t.id === selectedId) : null
  const navigate = useNavigate()

  function handleViewTension(tensionId) {
    const t = TENSIONS.find(t => t.id === tensionId)
    if (!t) return
    if (t.route) navigate(t.route)
    if (t.action) {
      setTimeout(() => window.dispatchEvent(new CustomEvent('review-action', { detail: t.action })), 100)
    }
    if (t.tab) {
      setTimeout(() => window.dispatchEvent(new CustomEvent('review-tab', { detail: t.tab })), 150)
    }
  }

  function handleViewEdgeCase(route) {
    navigate(route)
  }

  return (
    <Page>
      <Title>UX Tension Flow Map</Title>
      <Subtitle>14 design tension points mapped across the International KYB product flow. Click any item to view it in the prototype.</Subtitle>

      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <Flow>
          {STAGES.map((stage, si) => (
            <React.Fragment key={si}>
              {si > 0 && <Arrow>&rarr;</Arrow>}
              <StageCard>
                <StageLabel>{stage.label}</StageLabel>
                <StageName>{stage.name}</StageName>
                {stage.note && (
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 10, marginTop: -6 }}>{stage.note}</div>
                )}
                {stage.tensionIds.map(tid => {
                  const idx = TENSIONS.findIndex(t => t.id === tid)
                  const t = TENSIONS[idx]
                  if (!t) return null
                  return (
                    <TensionPill key={tid} $active={selectedId === tid} onClick={() => setSelectedId(selectedId === tid ? null : tid)}>
                      <PillNum>{idx + 1}</PillNum>
                      <PillText>{t.title}</PillText>
                    </TensionPill>
                  )
                })}
                {stage.tensionIds.length === 0 && (
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>No tensions identified</div>
                )}
              </StageCard>
            </React.Fragment>
          ))}
        </Flow>
      </div>

      {selected && (
        <DetailPanel>
          <DetailTitle>{selected.title}</DetailTitle>
          <DetailDesc>{selected.description}</DetailDesc>
          <DetailQ>{selected.question}</DetailQ>
          <PersonaRow>
            <PersonaLabel $p="compliance">Compliance</PersonaLabel>
            <PersonaText>{selected.personas.compliance}</PersonaText>
          </PersonaRow>
          <PersonaRow>
            <PersonaLabel $p="ops">Ops</PersonaLabel>
            <PersonaText>{selected.personas.ops}</PersonaText>
          </PersonaRow>
          <PersonaRow>
            <PersonaLabel $p="pm">PM</PersonaLabel>
            <PersonaText>{selected.personas.pm}</PersonaText>
          </PersonaRow>
          <ViewBtn onClick={() => handleViewTension(selected.id)}>
            View in prototype &rarr;
          </ViewBtn>
        </DetailPanel>
      )}

      <EdgeCaseSection>
        <EdgeCaseTitle>Edge-Case Sample Orders</EdgeCaseTitle>
        <EdgeCaseGrid>
          {EDGE_CASES.map((ec, i) => (
            <EdgeCaseCard key={i} onClick={() => handleViewEdgeCase(ec.route)}>
              <EdgeCaseName>{ec.name}</EdgeCaseName>
              <EdgeCaseDesc>{ec.desc}</EdgeCaseDesc>
              <EdgeCaseViewLink>View in prototype &rarr;</EdgeCaseViewLink>
            </EdgeCaseCard>
          ))}
        </EdgeCaseGrid>
      </EdgeCaseSection>
    </Page>
  )
}
