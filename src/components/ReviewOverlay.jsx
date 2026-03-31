import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled, { keyframes, css } from 'styled-components'
import { TENSIONS, PERSONAS } from '../reviewData'

/* ── Toggle ── */

const ToggleBtn = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  background: ${p => p.$active ? '#0B3139' : '#fff'};
  color: ${p => p.$active ? '#fff' : '#0B3139'};
  border: 2px solid #0B3139;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  transition: all 200ms ease;
  &:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(0,0,0,0.2); }
`

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
    <circle cx="8" cy="8" r="2" />
  </svg>
)

/* ── Persona Bar ── */

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 220px;
  right: 0;
  z-index: 9998;
  background: #0B3139;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 40px;
  gap: 6px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
`

const BarLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-right: 6px;
`

const BarBtn = styled.button`
  background: ${p => p.$active ? 'rgba(255,255,255,0.2)' : 'transparent'};
  color: ${p => p.$active ? '#fff' : 'rgba(255,255,255,0.6)'};
  border: 1px solid ${p => p.$active ? 'rgba(255,255,255,0.3)' : 'transparent'};
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms;
  &:hover { background: rgba(255,255,255,0.12); color: #fff; }
`

const BarRight = styled.span`
  margin-left: auto;
  font-size: 11px;
  color: rgba(255,255,255,0.4);
`

/* ── Pins ── */

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(2); opacity: 0; }
`

const PinWrap = styled.div`
  position: absolute;
  z-index: 9997;
  pointer-events: auto;
`

const Pin = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${p => p.$open ? '#0B3139' : '#E84855'};
  color: #fff;
  border: 2px solid #fff;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px ${p => p.$open ? 'rgba(11,49,57,0.4)' : 'rgba(232,72,85,0.4)'};
  position: relative;
  transition: all 150ms;
  &:hover { transform: scale(1.1); }
  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 2px solid ${p => p.$open ? '#0B3139' : '#E84855'};
    animation: ${pulse} 2s ease-out infinite;
  }
`

/* ── Callout ── */

const Card = styled.div`
  position: fixed;
  bottom: 72px;
  right: 24px;
  width: 380px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05);
  z-index: 9999;
  overflow: hidden;
`

const CardTop = styled.div`
  padding: 16px 18px 12px;
`

const CardRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`

const CardGroup = styled.div`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #3C5A61;
  margin-bottom: 6px;
`

const CardNum = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #0B3139;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
`

const CardTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: #0B3139;
  margin: 0;
  flex: 1;
  line-height: 1.3;
`

const CardDesc = styled.p`
  font-size: 12.5px;
  color: #5F6874;
  line-height: 1.55;
  margin: 0 0 10px;
`

const CardQ = styled.div`
  font-size: 12.5px;
  font-weight: 600;
  color: #0B3139;
  background: #F0F5F6;
  border-radius: 6px;
  padding: 8px 12px;
  line-height: 1.5;
`

/* ── Persona rows inside card ── */

const PersonaWrap = styled.div`
  padding: 10px 18px 8px;
  background: #FAFAFA;
  border-top: 1px solid #ECF0F4;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const PRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 11.5px;
  line-height: 1.5;
  ${p => p.$dim && css`opacity: 0.35;`}
`

const PLabel = styled.span`
  font-weight: 700;
  flex-shrink: 0;
  min-width: 72px;
  color: ${p =>
    p.$p === 'compliance' ? '#7C3AED' :
    p.$p === 'ops' ? '#0891B2' :
    '#D97706'};
`

const PText = styled.span`
  color: #333;
`

/* ── Nav footer ── */

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px 10px;
  background: #FAFAFA;
  border-top: 1px solid #ECF0F4;
`

const NavBtn = styled.button`
  background: none;
  border: 1px solid #D9E0E8;
  border-radius: 6px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 600;
  color: #5F6874;
  cursor: pointer;
  &:hover { background: #fff; color: #0B3139; }
  &:disabled { opacity: 0.25; cursor: default; &:hover { background: none; color: #5F6874; } }
`

const NavCount = styled.span`
  font-size: 11px;
  color: #9DADB0;
`

/* ── Highlight style ── */

const HighlightCSS = `
  [data-tension].review-active {
    outline: 2px dashed rgba(232, 72, 85, 0.3);
    outline-offset: 4px;
    border-radius: 4px;
  }
`

/* ── Component ── */

export default function ReviewOverlay() {
  const params = new URLSearchParams(window.location.search)
  const navigate = useNavigate()
  const location = useLocation()

  const [active, setActive] = useState(params.get('review') === 'true')
  const [persona, setPersona] = useState('all')
  const [currentIdx, setCurrentIdx] = useState(-1) // index into TENSIONS array
  const [pins, setPins] = useState([])

  const tension = currentIdx >= 0 ? TENSIONS[currentIdx] : null

  // Scan DOM for data-tension elements and position pins
  const updatePins = useCallback(() => {
    if (!active) return
    const found = []
    document.querySelectorAll('[data-tension]').forEach(el => {
      const ids = el.dataset.tension.split(',').map(Number)
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return
      ids.forEach(id => {
        if (found.some(f => f.id === id)) return
        found.push({ id, top: rect.top + window.scrollY - 12, left: rect.right + window.scrollX - 12 })
      })
    })
    setPins(found)
  }, [active])

  useEffect(() => {
    if (!active) {
      setPins([])
      document.querySelectorAll('.review-active').forEach(el => el.classList.remove('review-active'))
      return
    }
    document.querySelectorAll('[data-tension]').forEach(el => el.classList.add('review-active'))
    updatePins()

    const obs = new MutationObserver(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('[data-tension]').forEach(el => el.classList.add('review-active'))
        updatePins()
      })
    })
    obs.observe(document.body, { childList: true, subtree: true, attributes: true })
    window.addEventListener('scroll', updatePins, true)
    window.addEventListener('resize', updatePins)
    return () => { obs.disconnect(); window.removeEventListener('scroll', updatePins, true); window.removeEventListener('resize', updatePins) }
  }, [active, updatePins])

  // Escape to close
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') { if (currentIdx >= 0) setCurrentIdx(-1); else setActive(false) } }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [active, currentIdx])

  // Navigate to a tension's page/view
  function goTo(idx) {
    const t = TENSIONS[idx]
    if (!t) return
    setCurrentIdx(idx)

    // Handle route navigation
    if (t.route && t.route !== location.pathname) {
      // For select-business, we need search state — just navigate if possible
      if (t.route === '/select-business') {
        // Can't navigate without state, skip to next
        navigate(t.route, { state: { region: { id: 'core-europe', label: 'Core Europe' }, formData: { isoCode: 'GB', businessName: 'Revolut' }, orderType: 'international' } })
      } else {
        navigate(t.route)
      }
    }

    // Handle modal actions
    if (t.action) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('review-action', { detail: t.action }))
      }, 100)
    }

    // Handle tab changes on detail page
    if (t.tab) {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('review-tab', { detail: t.tab }))
      }, 150)
    }

    // Scroll to the element after navigation settles
    setTimeout(() => {
      const el = document.querySelector(`[data-tension*="${t.id}"]`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      updatePins()
    }, 300)
  }

  return (
    <>
      <style>{HighlightCSS}</style>

      <ToggleBtn $active={active} onClick={() => { setActive(a => !a); setCurrentIdx(-1) }}>
        <EyeIcon />
        {active ? 'Hide Review' : 'Design Review'}
      </ToggleBtn>

      {active && (
        <Bar>
          <BarLabel>Lens</BarLabel>
          <BarBtn $active={persona === 'all'} onClick={() => setPersona('all')}>All</BarBtn>
          {PERSONAS.map(p => (
            <BarBtn key={p.id} $active={persona === p.id} onClick={() => setPersona(p.id)}>{p.label}</BarBtn>
          ))}
          <BarRight style={{ marginLeft: 'auto' }}>{pins.length} visible on this view</BarRight>
        </Bar>
      )}

      {active && pins.map(pin => {
        const idx = TENSIONS.findIndex(t => t.id === pin.id)
        return (
          <PinWrap key={pin.id} style={{ top: pin.top, left: pin.left }}>
            <Pin $open={tension?.id === pin.id} onClick={() => setCurrentIdx(currentIdx === idx ? -1 : idx)}>
              {pin.id}
            </Pin>
          </PinWrap>
        )
      })}

      {active && tension && (
        <Card>
          <CardTop>
            {tension.group && <CardGroup>{tension.group}</CardGroup>}
            <CardRow>
              <CardNum>{currentIdx + 1}</CardNum>
              <CardTitle>{tension.title}</CardTitle>
            </CardRow>
            <CardDesc>{tension.description}</CardDesc>
            <CardQ>{tension.question}</CardQ>
          </CardTop>

          <PersonaWrap>
            {PERSONAS.map(p => (
              <PRow key={p.id} $dim={persona !== 'all' && persona !== p.id}>
                <PLabel $p={p.id}>{p.label}</PLabel>
                <PText>{tension.personas[p.id]}</PText>
              </PRow>
            ))}
          </PersonaWrap>

          <Nav>
            <NavBtn disabled={currentIdx <= 0} onClick={() => goTo(currentIdx - 1)}>&larr; Prev</NavBtn>
            <NavCount>{currentIdx + 1} / {TENSIONS.length}</NavCount>
            <NavBtn disabled={currentIdx >= TENSIONS.length - 1} onClick={() => goTo(currentIdx + 1)}>Next &rarr;</NavBtn>
          </Nav>
        </Card>
      )}
    </>
  )
}
