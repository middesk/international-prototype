import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Sidebar from './components/Sidebar'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import SettingsPage from './pages/SettingsPage'
import BusinessSelectPage from './pages/BusinessSelectPage'
import VendorGapsPage from './pages/VendorGapsPage'
import StatePatternsPage from './pages/StatePatternsPage'
import FlowDiagram from './components/FlowDiagram'
import { INITIAL_ORDERS, MOCK_RESULTS } from './mockData'
import ReviewOverlay from './components/ReviewOverlay'

const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: #FAFAFA;
`

const Main = styled.main`
  flex: 1;
  padding: 32px 40px;
  overflow-y: auto;
  max-width: calc(100vw - 220px);
`

function AppRoutes() {
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [settings, setSettings] = useState({
    internationalSearchEnabled: true,
    autoSelectThreshold: 0
  })
  const navigate = useNavigate()

  function createOrder(data, selectedBusiness) {
    const id = `ord_${String(orders.length + 1).padStart(3, '0')}`
    const newOrder = {
      id,
      businessName: selectedBusiness?.name || data.formData.businessName || data.formData.keyword || data.formData.registrationNumber || 'Pending...',
      region: data.region.label,
      regionId: data.region.id,
      isoCode: data.formData.isoCode || 'CA',
      registrationNumber: selectedBusiness?.registrationNumber || data.formData.registrationNumber || data.formData.keyword || '—',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      result: null
    }
    setOrders(prev => [newOrder, ...prev])
    navigate(`/orders/${id}`)

    setTimeout(() => {
      const mockResult = MOCK_RESULTS[data.region.id] || MOCK_RESULTS['canada']
      const result = selectedBusiness
        ? { ...mockResult, name: selectedBusiness.name, registrationNumber: selectedBusiness.registrationNumber }
        : mockResult
      setOrders(prev =>
        prev.map(o => o.id === id ? { ...o, status: 'active', result } : o)
      )
    }, 2000)
  }

  function handleNewOrder(data) {
    navigate('/select-business', { state: data })
  }

  function handleSelectBusiness({ searchData, selectedBusiness }) {
    createOrder(searchData, selectedBusiness)
  }

  function updateOrder(id, patch) {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o))
  }

  return (
    <Routes>
      <Route path="/" element={
        <OrdersPage
          orders={orders}
          onNewOrder={handleNewOrder}
          internationalSearchEnabled={settings.internationalSearchEnabled}
        />
      } />
      <Route path="/orders/:id" element={<OrderDetailPage orders={orders} onUpdate={updateOrder} />} />
      <Route path="/settings" element={<SettingsPage settings={settings} onUpdateSettings={setSettings} />} />
      <Route path="/flow-map" element={<FlowDiagram />} />
      <Route path="/vendor-gaps" element={<VendorGapsPage />} />
      <Route path="/state-patterns" element={<StatePatternsPage />} />
      <Route path="/select-business" element={
        <BusinessSelectPage
          onSelectBusiness={handleSelectBusiness}
          settings={settings}
        />
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <Layout>
      <Sidebar />
      <Main>
        <AppRoutes />
      </Main>
      <ReviewOverlay />
    </Layout>
  )
}
