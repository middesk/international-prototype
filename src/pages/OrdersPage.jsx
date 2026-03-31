import React, { useState, useEffect } from 'react'
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
  color: #0B3139;
`

const PlaceOrderBtn = styled.button`
  background: #3C5A61;
  color: #fff;
  border: none;
  border-radius: 35px;
  padding: 9px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;
  &:hover { background: #6D8388; }
`

const TableCard = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
`

const TableToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #D9E0E8;
  font-size: 12px;
  color: #9DADB0;
`

const PageNav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #9DADB0;
`

const PageBtn = styled.button`
  background: none;
  border: 1px solid #D9E0E8;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #9DADB0;
  font-size: 14px;
  &:hover { background: #ECF0F4; }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Thead = styled.thead`
  border-bottom: 1px solid #D9E0E8;
`

const Th = styled.th`
  text-align: left;
  padding: 10px 20px;
  font-size: 11px;
  font-weight: 600;
  color: #5F6874;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const Tr = styled.tr`
  border-bottom: 1px solid #ECF0F4;
  cursor: pointer;
  transition: background 100ms;
  &:hover { background: #F9FAFB; }
  &:last-child { border-bottom: none; }
`

const Td = styled.td`
  padding: 12px 20px;
  font-size: 13.5px;
  color: #333;
  vertical-align: middle;
`

const BusinessName = styled.span`
  font-weight: 600;
  color: #0B3139;
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
  color: #5F6874;
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
  const [reviewStep, setReviewStep] = useState(null)

  // Listen for review overlay actions to open modal at specific steps
  useEffect(() => {
    function handleReviewAction(e) {
      const action = e.detail
      if (action?.startsWith('open-modal-step-')) {
        setReviewStep(action)
        setShowModal(true)
      }
    }
    window.addEventListener('review-action', handleReviewAction)
    return () => window.removeEventListener('review-action', handleReviewAction)
  }, [])

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
        <Table data-tension="15">
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
              const edgeCases = {
                ord_003: 'Async / Pending',
                ord_004: 'Empty Report',
                ord_005: 'CJK Characters',
                ord_007: 'French Registry',
                ord_008: 'Multi-Jurisdiction',
                ord_009: 'Corporate Shareholders',
                ord_010: 'No Address + Foreign Status',
                ord_011: 'Federal vs. Provincial',
              }
              const edgeLabel = edgeCases[order.id]
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
                    {edgeLabel && (
                      <span style={{ fontSize: 10, fontWeight: 600, color: '#92400E', background: '#FFF7ED', border: '1px solid #FDE68A', borderRadius: 10, padding: '1px 7px', marginLeft: 8 }}>
                        {edgeLabel}
                      </span>
                    )}
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
                        <span style={{ color: '#BDC2C9' }}>Pending</span>
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
          onClose={() => { setShowModal(false); setReviewStep(null) }}
          onSubmit={data => {
            setShowModal(false)
            setReviewStep(null)
            onNewOrder(data)
          }}
          internationalSearchEnabled={internationalSearchEnabled}
          reviewStep={reviewStep}
        />
      )}
    </div>
  )
}
