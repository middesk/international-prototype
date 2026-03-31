import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const BackBtn = styled.button`
  background: none;
  border: none;
  color: #3C5A61;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { color: #0B3139; }
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
`

const BusinessTitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: #0B3139;
  margin-bottom: 8px;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

const Badge = styled.span`
  display: inline-block;
  padding: 3px 12px;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 600;
  background: ${p =>
    p.$v === 'active' ? '#E2F7E6' :
    p.$v === 'pending' ? '#FCF1E4' :
    p.$v === 'region' ? '#ECF0F4' :
    p.$v === 'source' ? '#ECF0F4' :
    '#DDE4FF'};
  color: ${p =>
    p.$v === 'active' ? '#097F3D' :
    p.$v === 'pending' ? '#C4440E' :
    p.$v === 'region' ? '#3C5A61' :
    p.$v === 'source' ? '#3C5A61' :
    '#0637FF'};
`

const OrderIdText = styled.span`
  font-size: 12px;
  color: #9DADB0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
`

const FullCard = styled(Card)`
  grid-column: 1 / -1;
`

const CardTitle = styled.h3`
  font-size: 11px;
  font-weight: 600;
  color: #9DADB0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ECF0F4;
`

const AttrRow = styled.div`
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`

const AttrLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #9DADB0;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 3px;
`

const AttrValue = styled.div`
  font-size: 14px;
  color: #0B3139;
  font-weight: 500;
  line-height: 1.4;
  &:empty::before { content: '—'; color: #BDC2C9; }
`

const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid #D9E0E8;
  margin-bottom: 24px;
`

const Tab = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid ${p => p.$active ? '#3C5A61' : 'transparent'};
  margin-bottom: -2px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: ${p => p.$active ? 600 : 500};
  color: ${p => p.$active ? '#3C5A61' : '#5F6874'};
  cursor: pointer;
  transition: color 150ms;
  &:hover { color: #0B3139; }
`

const TableEl = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const PTh = styled.th`
  text-align: left;
  padding: 8px 0 10px;
  font-size: 11px;
  font-weight: 600;
  color: #9DADB0;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-bottom: 1px solid #ECF0F4;
`

const PTd = styled.td`
  padding: 12px 0;
  font-size: 13.5px;
  color: #333;
  border-bottom: 1px solid #ECF0F4;
  vertical-align: middle;
  &:last-child { border-bottom: none; }
`

const PersonName = styled.div`
  font-weight: 600;
  color: #0B3139;
`

const ShareRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ECF0F4;
  &:last-child { border-bottom: none; }
`

const SourceBox = styled.div`
  background: #ECF0F4;
  border: 1px solid #D9E0E8;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 12px;
  color: #5F6874;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`

const PendingCard = styled(Card)`
  text-align: center;
  padding: 80px 40px;
`

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #ECF0F4;
  border-top-color: #3C5A61;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 20px;
  @keyframes spin { to { transform: rotate(360deg); } }
`

const PendingTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0B3139;
  margin-bottom: 8px;
`

const PendingDesc = styled.p`
  font-size: 13px;
  color: #5F6874;
  max-width: 420px;
  margin: 0 auto;
  line-height: 1.6;
`

function Attr({ label, value, children }) {
  return (
    <AttrRow>
      <AttrLabel>{label}</AttrLabel>
      <AttrValue>{children || value || ''}</AttrValue>
    </AttrRow>
  )
}

export default function OrderDetailPage({ orders }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  // Listen for review overlay tab changes
  useEffect(() => {
    function handleTab(e) { if (e.detail) setActiveTab(e.detail) }
    window.addEventListener('review-tab', handleTab)
    return () => window.removeEventListener('review-tab', handleTab)
  }, [])

  const order = orders?.find(o => o.id === id)

  if (!order) {
    return (
      <div>
        <BackBtn onClick={() => navigate('/')}>&lsaquo; Businesses</BackBtn>
        <p style={{ color: '#5F6874' }}>Order not found.</p>
      </div>
    )
  }

  const r = order.result
  const hasPeople = r && (r.parties?.length > 0 || r.shareholders?.length > 0)
  const hasEvents = r && r.events?.length > 0

  const EDGE_CASES = {
    ord_003: { label: 'Edge case: Async / Pending', desc: 'Order is processing. In production, APAC (especially China) can take hours. No notification model exists.' },
    ord_004: { label: 'Edge case: Empty Report', desc: 'Extended Europe — minimal data returned (name, jurisdiction, status only). No people, no events, no legal form.' },
    ord_005: { label: 'Edge case: CJK Characters', desc: 'Chinese registry data — name, entity type, role, and address all in local script. Tests layout and character rendering.' },
    ord_007: { label: 'Edge case: French Registry', desc: 'Quebec — status "DISSOUTE", role "Administrateur", events in French. Tests language handling outside APAC.' },
    ord_008: { label: 'Edge case: Multi-Jurisdiction Entity', desc: 'Revolut is registered in UK, Lithuania, and Australia. Current model forces one order per jurisdiction — no way to see the full corporate structure.' },
    ord_009: { label: 'Edge case: Corporate Shareholders', desc: 'Shareholders include Tencent Holdings and SoftBank — corporate entities, not individuals. UBO requires traversing the ownership chain, which isn\'t supported.' },
    ord_010: { label: 'Edge case: No Address + Foreign-Language Status', desc: 'Norwegian registry returns no address and status "Under avvikling" (liquidation). Standardization mapped it, but raw value is in Norwegian.' },
    ord_011: { label: 'Edge case: Federal vs. Provincial (Same Country)', desc: 'Shopify is incorporated federally (CBCA) and registered provincially in Ontario. Same business, two jurisdictions, two registration numbers. Which one do you verify? The current model treats these as separate orders.' },
  }
  const edgeCase = EDGE_CASES[order.id]

  return (
    <div>
      <BackBtn onClick={() => navigate('/')}>&lsaquo; Businesses</BackBtn>

      {edgeCase && (
        <div style={{
          background: '#FFF7ED', border: '1px solid #FDE68A', borderRadius: 8,
          padding: '10px 16px', marginBottom: 16, fontSize: 13, lineHeight: 1.5
        }}>
          <strong style={{ color: '#92400E' }}>{edgeCase.label}</strong>
          <span style={{ color: '#78716C', marginLeft: 8 }}>{edgeCase.desc}</span>
        </div>
      )}

      <Header>
        <div>
          <BusinessTitle>{r?.name || order.businessName}</BusinessTitle>
          <MetaRow>
            <Badge $v={order.status}>
              {order.status === 'active' ? 'Needs Review' : order.status === 'pending' ? 'Processing...' : order.status}
            </Badge>
            <Badge $v="region">
              {order.region}{order.isoCode ? ` · ${order.isoCode}` : ''}
            </Badge>
            <Badge $v="type">International Verify</Badge>
            <OrderIdText>{order.id}</OrderIdText>
          </MetaRow>
        </div>
      </Header>

      {!r ? (
        <PendingCard data-tension="11">
          <Spinner />
          <PendingTitle>Retrieving Business Data</PendingTitle>
          <PendingDesc>
            We're pulling the latest registration data from the registry.
            This usually takes just a few seconds.
          </PendingDesc>
        </PendingCard>
      ) : (
        <>
          <TabBar>
            <Tab $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview</Tab>
            {hasPeople && (
              <Tab data-tension="5" $active={activeTab === 'people'} onClick={() => setActiveTab('people')}>
                People {r.parties?.length ? `(${(r.parties?.length || 0) + (r.shareholders?.length || 0)})` : ''}
              </Tab>
            )}
            {hasEvents && (
              <Tab $active={activeTab === 'events'} onClick={() => setActiveTab('events')}>
                Events ({r.events.length})
              </Tab>
            )}
          </TabBar>

          {activeTab === 'overview' && (
            <>
              <Grid>
                <Card data-tension="4,14">
                  <CardTitle>General Information</CardTitle>
                  <Attr label="Legal Name" value={r.name} />
                  <Attr label="Registration Number" value={r.registrationNumber} />
                  <Attr label="Entity Type" value={r.registryType || r.legalForm} />
                  <Attr label="Registration Status">
                    <span data-tension="6">
                      <Badge $v={r.standardizedStatus?.toLowerCase() === 'active' ? 'active' : 'pending'}>
                        {r.standardizedStatus}
                      </Badge>
                    </span>
                  </Attr>
                  <Attr label="Registry Status" value={r.registryStatus} />
                </Card>
                <Card data-tension="10">
                  <CardTitle>Registration Details</CardTitle>
                  <Attr label="Registered Jurisdiction" value={r.registeredJurisdiction} />
                  <Attr label="Registered Date" value={r.registeredDate} />
                  <Attr label="Status Updated" value={r.statusUpdatedDate} />
                  {r.legalForm && <Attr label="Legal Form" value={r.legalForm} />}
                  {r.companyActivity && <Attr label="Company Activity" value={r.companyActivity} />}
                  {r.shareCapital && <Attr label="Share Capital" value={r.shareCapital} />}
                </Card>
                <Card>
                  <CardTitle>Registered Address</CardTitle>
                  <Attr label="Address" value={r.address?.registered} />
                  {r.address?.mail && r.address.mail !== r.address.registered && (
                    <Attr label="Mailing Address" value={r.address.mail} />
                  )}
                </Card>
                <Card>
                  <CardTitle>Data Source</CardTitle>
                  <Attr label="Registry" value={r.registrationAuthority || r.source} />
                  {r.registrationAuthority && <Attr label="Source" value={r.source} />}
                </Card>
              </Grid>
              {r.relatedEntities?.length > 0 && (
                <Card style={{ marginBottom: 16 }}>
                  <CardTitle>Related Entities (Other Jurisdictions)</CardTitle>
                  {r.relatedEntities.map((re, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < r.relatedEntities.length - 1 ? '1px solid #ECF0F4' : 'none' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: '#0B3139', fontSize: 14 }}>{re.name}</div>
                        <div style={{ fontSize: 12, color: '#5F6874', marginTop: 2 }}>{re.jurisdiction} &middot; {re.regNumber}</div>
                      </div>
                      <Badge $v="type" style={{ fontSize: 11 }}>{re.relationship}</Badge>
                    </div>
                  ))}
                </Card>
              )}
              <SourceBox data-tension="8">
                Data retrieved from <strong style={{ marginLeft: 4 }}>{r.source}</strong>
              </SourceBox>
            </>
          )}

          {activeTab === 'people' && (
            <Grid>
              {r.parties?.length > 0 && (
                <FullCard>
                  <CardTitle>Officers &amp; Directors</CardTitle>
                  <TableEl>
                    <thead>
                      <tr>
                        <PTh>Name</PTh>
                        <PTh>Role</PTh>
                        <PTh>Effective Date</PTh>
                        {r.parties[0]?.dob && <PTh>Date of Birth</PTh>}
                        {r.parties[0]?.address && <PTh>Address</PTh>}
                      </tr>
                    </thead>
                    <tbody>
                      {r.parties.map((p, i) => (
                        <tr key={i}>
                          <PTd><PersonName>{p.name}</PersonName></PTd>
                          <PTd><Badge $v="type" style={{ fontSize: 11 }}>{p.type}</Badge></PTd>
                          <PTd style={{ color: '#5F6874' }}>{p.effectiveDate}</PTd>
                          {p.dob && <PTd style={{ color: '#5F6874' }}>{p.dob}</PTd>}
                          {p.address && <PTd style={{ color: '#5F6874' }}>{p.address}</PTd>}
                        </tr>
                      ))}
                    </tbody>
                  </TableEl>
                </FullCard>
              )}
              {r.shareholders?.length > 0 && (
                <FullCard>
                  <CardTitle>Shareholders</CardTitle>
                  {r.shareholders.map((s, i) => (
                    <ShareRow key={i}>
                      <div>
                        <PersonName>{s.name}</PersonName>
                        {s.shareCount && (
                          <div style={{ fontSize: 11, color: '#9DADB0', marginTop: 2 }}>{s.shareCount} shares</div>
                        )}
                      </div>
                      <div style={{ fontWeight: 700, color: '#3C5A61', fontSize: 14 }}>{s.sharePercentage}</div>
                    </ShareRow>
                  ))}
                </FullCard>
              )}
            </Grid>
          )}

          {activeTab === 'events' && (
            <Card>
              <CardTitle>Registry Events</CardTitle>
              <TableEl>
                <thead>
                  <tr>
                    <PTh>Event</PTh>
                    <PTh>Date</PTh>
                    <PTh>Description</PTh>
                  </tr>
                </thead>
                <tbody>
                  {r.events.map((e, i) => (
                    <tr key={i}>
                      <PTd><Badge $v="type" style={{ fontSize: 11 }}>{e.type}</Badge></PTd>
                      <PTd style={{ color: '#5F6874', whiteSpace: 'nowrap' }}>{e.date}</PTd>
                      <PTd>{e.description}</PTd>
                    </tr>
                  ))}
                </tbody>
              </TableEl>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
