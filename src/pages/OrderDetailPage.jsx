import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const BackBtn = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.accent};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { color: ${p => p.theme.textPrimary}; }
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
  color: ${p => p.theme.textPrimary};
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
  color: ${p => p.theme.textFaint};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

const Card = styled.div`
  background: ${p => p.theme.surface};
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
`

const FullCard = styled(Card)`
  grid-column: 1 / -1;
`

const CardTitle = styled.h3`
  font-size: 11px;
  font-weight: 600;
  color: ${p => p.theme.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.borderLight};
`

const AttrRow = styled.div`
  margin-bottom: 14px;
  &:last-child { margin-bottom: 0; }
`

const AttrLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${p => p.theme.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  margin-bottom: 3px;
`

const AttrValue = styled.div`
  font-size: 14px;
  color: ${p => p.theme.textPrimary};
  font-weight: 500;
  line-height: 1.4;
  &:empty::before { content: '—'; color: ${p => p.theme.textFaintest}; }
`

const TabBar = styled.div`
  display: flex;
  border-bottom: 2px solid ${p => p.theme.border};
  margin-bottom: 24px;
`

const Tab = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid ${p => p.$active ? p.theme.accent : 'transparent'};
  margin-bottom: -2px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: ${p => p.$active ? 600 : 500};
  color: ${p => p.$active ? p.theme.accent : p.theme.textMuted};
  cursor: pointer;
  transition: color 150ms;
  &:hover { color: ${p => p.theme.textPrimary}; }
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
  color: ${p => p.theme.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-bottom: 1px solid ${p => p.theme.borderLight};
`

const PTd = styled.td`
  padding: 12px 0;
  font-size: 13.5px;
  color: ${p => p.theme.text};
  border-bottom: 1px solid ${p => p.theme.borderLight};
  vertical-align: middle;
  &:last-child { border-bottom: none; }
`

const PersonName = styled.div`
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
`

const ShareRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${p => p.theme.borderLight};
  &:last-child { border-bottom: none; }
`

const SourceBox = styled.div`
  background: ${p => p.theme.surface2};
  border: 1px solid ${p => p.theme.border};
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 12px;
  color: ${p => p.theme.textMuted};
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
  border: 3px solid ${p => p.theme.borderLight};
  border-top-color: ${p => p.theme.accent};
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 20px;
  @keyframes spin { to { transform: rotate(360deg); } }
`

const PendingTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
  margin-bottom: 8px;
`

const PendingDesc = styled.p`
  font-size: 13px;
  color: ${p => p.theme.textMuted};
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

  const order = orders?.find(o => o.id === id)

  if (!order) {
    return (
      <div>
        <BackBtn onClick={() => navigate('/')}>&lsaquo; Businesses</BackBtn>
        <p style={{ color: '#5E7E87' }}>Order not found.</p>
      </div>
    )
  }

  const r = order.result
  const hasPeople = r && (r.parties?.length > 0 || r.shareholders?.length > 0)
  const hasEvents = r && r.events?.length > 0

  return (
    <div>
      <BackBtn onClick={() => navigate('/')}>&lsaquo; Businesses</BackBtn>

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
        <PendingCard>
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
              <Tab $active={activeTab === 'people'} onClick={() => setActiveTab('people')}>
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
                <Card>
                  <CardTitle>General Information</CardTitle>
                  <Attr label="Legal Name" value={r.name} />
                  <Attr label="Registration Number" value={r.registrationNumber} />
                  <Attr label="Entity Type" value={r.registryType || r.legalForm} />
                  <Attr label="Registration Status">
                    <Badge $v={r.standardizedStatus?.toLowerCase() === 'active' ? 'active' : 'pending'}>
                      {r.standardizedStatus}
                    </Badge>
                  </Attr>
                  <Attr label="Registry Status" value={r.registryStatus} />
                </Card>
                <Card>
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
              <SourceBox>
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
                          <PTd style={{ color: '#5E7E87' }}>{p.effectiveDate}</PTd>
                          {p.dob && <PTd style={{ color: '#5E7E87' }}>{p.dob}</PTd>}
                          {p.address && <PTd style={{ color: '#5E7E87' }}>{p.address}</PTd>}
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
                          <div style={{ fontSize: 11, color: '#3D5D66', marginTop: 2 }}>{s.shareCount} shares</div>
                        )}
                      </div>
                      <div style={{ fontWeight: 700, color: '#4A7A84', fontSize: 14 }}>{s.sharePercentage}</div>
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
                      <PTd style={{ color: '#5E7E87', whiteSpace: 'nowrap' }}>{e.date}</PTd>
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
