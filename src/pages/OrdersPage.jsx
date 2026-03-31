import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import NewOrderModal from '../components/NewOrderModal'

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
`

const PlaceOrderBtn = styled.button`
  background: ${p => p.theme.accent};
  color: #fff;
  border: none;
  border-radius: 35px;
  padding: 9px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;
  &:hover { background: ${p => p.theme.accentHover}; }
`

const TableCard = styled.div`
  background: ${p => p.theme.surface};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
`

const TableToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid ${p => p.theme.border};
  font-size: 12px;
  color: ${p => p.theme.textFaint};
`

const PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${p => p.theme.textFaint};
`

const PageBtn = styled.button`
  background: none;
  border: 1px solid ${p => p.theme.border};
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${p => p.theme.textFaint};
  font-size: 14px;
  &:hover { background: ${p => p.theme.surface2}; }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Thead = styled.thead`
  border-bottom: 1px solid ${p => p.theme.border};
`

const Th = styled.th`
  text-align: left;
  padding: 10px 20px;
  font-size: 11px;
  font-weight: 600;
  color: ${p => p.theme.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Tr = styled.tr`
  border-bottom: 1px solid ${p => p.theme.borderLight};
  cursor: pointer;
  transition: background 100ms;
  &:hover { background: ${p => p.theme.surface2}; }
  &:last-child { border-bottom: none; }
`

const Td = styled.td`
  padding: 12px 20px;
  font-size: 13.5px;
  color: ${p => p.theme.text};
  vertical-align: middle;
`

const BusinessName = styled.span`
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 3px 12px;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 600;
  background: ${p =>
    p.$status === 'active' ? '#FCF1E4' :
    p.$status === 'pending' ? '#ECF0F4' : '#ECF0F4'};
  color: ${p =>
    p.$status === 'active' ? '#C4440E' :
    p.$status === 'pending' ? '#5F6874' : '#5F6874'};
`

const InsightsCell = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: ${p => p.theme.textMuted};
`

const InsightDot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 4px;
  background: ${p => p.$color};
`

function getInsights(order) {
  if (order.status === 'pending') return null
  const r = order.result
  if (!r) return null
  const success = (r.parties?.length || 0) + (r.shareholders?.length || 0) + (r.address ? 1 : 0)
  const warnings = r.events?.length > 2 ? 1 : 0
  return { success, warnings, failures: 0 }
}

export default function OrdersPage({ orders, onNewOrder, internationalSearchEnabled }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <TopBar>
        <PageTitle>Businesses</PageTitle>
        <PlaceOrderBtn onClick={() => setShowModal(true)}>Place order</PlaceOrderBtn>
      </TopBar>

      <TableCard>
        <TableToolbar>
          <span></span>
          <PageNav>
            Page 1
            <PageBtn>&lsaquo;</PageBtn>
            <PageBtn>&rsaquo;</PageBtn>
          </PageNav>
        </TableToolbar>
        <Table>
          <Thead>
            <tr>
              <Th>Status</Th>
              <Th>Business Name</Th>
              <Th>Insights</Th>
            </tr>
          </Thead>
          <tbody>
            {orders.map(order => {
              const insights = getInsights(order)
              return (
                <Tr key={order.id} onClick={() => navigate(`/orders/${order.id}`)}>
                  <Td>
                    <StatusBadge $status={order.status}>
                      {order.status === 'active' ? 'Needs Review' :
                       order.status === 'pending' ? 'Pending' : order.status}
                    </StatusBadge>
                  </Td>
                  <Td>
                    <BusinessName>{order.businessName}</BusinessName>
                  </Td>
                  <Td>
                    {insights ? (
                      <InsightsCell>
                        <span><InsightDot $color="#097F3D" />{insights.success} Success</span>
                        <span><InsightDot $color="#C4440E" />{insights.warnings} Warning</span>
                        <span><InsightDot $color="#CD2523" />{insights.failures} Failure</span>
                      </InsightsCell>
                    ) : (
                      <InsightsCell>
                        <span style={{ color: '#3D5D66' }}>Pending</span>
                      </InsightsCell>
                    )}
                  </Td>
                </Tr>
              )
            })}
          </tbody>
        </Table>
      </TableCard>

      {showModal && (
        <NewOrderModal
          onClose={() => setShowModal(false)}
          onSubmit={data => {
            setShowModal(false)
            onNewOrder(data)
          }}
          internationalSearchEnabled={internationalSearchEnabled}
        />
      )}
    </div>
  )
}
