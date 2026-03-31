import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Sidebar from './components/Sidebar'
import OrdersPage from './pages/OrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import SettingsPage from './pages/SettingsPage'
import BusinessSelectPage from './pages/BusinessSelectPage'
import { INITIAL_ORDERS, MOCK_RESULTS } from './mockData'
import { light, dark } from './theme'

const GlobalStyle = createGlobalStyle`
  body, #root {
    background: ${p => p.theme.pageBg};
    color: ${p => p.theme.text};
  }
`

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${p => p.theme.pageBg};
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
    const fd = data.formData
    const biz = selectedBusiness || {}
    const newOrder = {
      id,
      businessName: biz.name || biz.businessName || fd.businessName || fd.keyword || fd.registrationNumber || 'Pending...',
      region: data.region.label,
      regionId: data.region.id,
      isoCode: fd.isoCode || 'CA',
      registrationNumber: biz.registrationNumber || fd.registrationNumber || fd.keyword || '—',
      entityType: biz.entityType || fd.entityType || '',
      addressLine1: fd.addressLine1 || '', city: fd.city || '',
      stateProvince: fd.stateProvince || '', postalCode: fd.postalCode || '',
      country: fd.country || '',
      officers: fd.officers || '', dba: fd.dba || '',
      companyActivity: fd.companyActivity || '',
      incorporationDate: fd.incorporationDate || '',
      registeredAgent: fd.registeredAgent || '',
      shareCapital: fd.shareCapital || '',
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      result: null
    }
    setOrders(prev => [newOrder, ...prev])
    navigate(`/orders/${id}`)

    setTimeout(() => {
      const mockResult = MOCK_RESULTS[data.region.id] || MOCK_RESULTS['canada']
      const result = selectedBusiness
        ? { ...mockResult, name: selectedBusiness.name || selectedBusiness.businessName, registrationNumber: selectedBusiness.registrationNumber }
        : mockResult
      setOrders(prev =>
        prev.map(o => o.id === id ? { ...o, status: 'active', result } : o)
      )
    }, 2000)
  }

  function handleNewOrder(data) {
    if (data.formData.confirmedBusiness) {
      // Reg# was resolved — skip BusinessSelectPage
      createOrder(data, data.formData.confirmedBusiness)
    } else {
      navigate('/select-business', { state: data })
    }
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
  const [isDark, setIsDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = e => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const theme = isDark ? dark : light

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <Layout>
        <Sidebar isDark={isDark} onToggleDark={() => setIsDark(d => !d)} />
        <Main>
          <AppRoutes />
        </Main>
      </Layout>
    </ThemeProvider>
  )
}
