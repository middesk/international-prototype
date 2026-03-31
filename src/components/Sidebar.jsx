import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  width: 220px;
  min-height: 100vh;
  background: #243636;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`

const Logo = styled.div`
  padding: 0 20px 28px;
  font-size: 18px;
  font-weight: 700;
  color: #BFFF6E;
  letter-spacing: -0.5px;
`

const SectionLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: #9DADB0;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 16px 20px 6px;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 20px;
  color: #CED6D7;
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 500;
  transition: background 150ms, color 150ms;

  &:hover {
    background: rgba(255,255,255,0.07);
    color: #fff;
  }

  &.active {
    background: rgba(191, 255, 110, 0.12);
    color: #BFFF6E;
    border-left: 3px solid #BFFF6E;
    padding-left: 17px;
  }

  svg { opacity: 0.6; }
  &.active svg { opacity: 1; }
`

const DisabledLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 20px;
  color: #5F6874;
  font-size: 13.5px;
  font-weight: 500;
  cursor: default;

  svg { opacity: 0.35; }
`

const Spacer = styled.div`
  flex: 1;
`

const Footer = styled.div`
  padding: 16px 20px 4px;
  font-size: 10px;
  color: #5F6874;
`

export default function Sidebar() {
  return (
    <Nav>
      <Logo>middesk</Logo>

      <SectionLabel>Verification</SectionLabel>
      <StyledNavLink to="/" end>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="12" height="11" rx="1.5"/>
          <line x1="2" y1="6.5" x2="14" y2="6.5"/>
          <line x1="6" y1="6.5" x2="6" y2="14"/>
        </svg>
        Businesses
      </StyledNavLink>

      <SectionLabel>Coming Soon</SectionLabel>
      <DisabledLink>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12.5L8 3.5l5 9H3z"/>
        </svg>
        Signal
      </DisabledLink>
      <DisabledLink>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="5.5"/>
          <path d="M8 5v3.5l2.5 1.5"/>
        </svg>
        Monitoring
      </DisabledLink>

      <SectionLabel>Design Review</SectionLabel>
      <StyledNavLink to="/flow-map">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="4" height="3" rx="0.5"/>
          <rect x="6" y="3" width="4" height="3" rx="0.5"/>
          <rect x="11" y="3" width="4" height="3" rx="0.5"/>
          <path d="M3 6v2.5h10V6M8 8.5V11"/>
          <rect x="6" y="11" width="4" height="3" rx="0.5"/>
        </svg>
        Flow Map
      </StyledNavLink>
      <StyledNavLink to="/vendor-gaps">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4h12M2 8h8M2 12h10"/>
        </svg>
        Vendor Gaps
      </StyledNavLink>
      <StyledNavLink to="/state-patterns">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="5" height="5" rx="1"/>
          <rect x="9" y="2" width="5" height="5" rx="1"/>
          <rect x="2" y="9" width="5" height="5" rx="1"/>
          <rect x="9" y="9" width="5" height="5" rx="1"/>
        </svg>
        State Patterns
      </StyledNavLink>

      <SectionLabel>Settings</SectionLabel>
      <StyledNavLink to="/settings">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="2"/>
          <path d="M13.2 9.8a1.1 1.1 0 0 0 .2 1.2l.04.04a1.33 1.33 0 1 1-1.88 1.88l-.04-.04a1.1 1.1 0 0 0-1.2-.2 1.1 1.1 0 0 0-.67 1v.13a1.33 1.33 0 1 1-2.67 0v-.07a1.1 1.1 0 0 0-.72-1 1.1 1.1 0 0 0-1.2.2l-.04.04a1.33 1.33 0 1 1-1.88-1.88l.04-.04a1.1 1.1 0 0 0 .2-1.2 1.1 1.1 0 0 0-1-.67H3a1.33 1.33 0 0 1 0-2.67h.07a1.1 1.1 0 0 0 1-.72 1.1 1.1 0 0 0-.2-1.2l-.04-.04A1.33 1.33 0 1 1 5.71 3.3l.04.04a1.1 1.1 0 0 0 1.2.2h.05a1.1 1.1 0 0 0 .67-1V2.4a1.33 1.33 0 0 1 2.67 0v.07a1.1 1.1 0 0 0 .67 1 1.1 1.1 0 0 0 1.2-.2l.04-.04a1.33 1.33 0 1 1 1.88 1.88l-.04.04a1.1 1.1 0 0 0-.2 1.2v.05a1.1 1.1 0 0 0 1 .67h.13a1.33 1.33 0 0 1 0 2.67h-.07a1.1 1.1 0 0 0-1 .67z"/>
        </svg>
        Account
      </StyledNavLink>

      <Spacer />
      <Footer>&copy; 2026 Middesk, Inc.</Footer>
    </Nav>
  )
}
