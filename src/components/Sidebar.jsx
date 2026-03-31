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

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 20px;
  background: none;
  border: none;
  color: #9DADB0;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: color 150ms;
  font-family: inherit;
  text-align: left;
  margin-bottom: 4px;

  &:hover { color: #CED6D7; }
`

export default function Sidebar({ isDark, onToggleDark }) {
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

      <SectionLabel>Settings</SectionLabel>
      <StyledNavLink to="/settings">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="2"/>
          <path d="M13.2 9.8a1.1 1.1 0 0 0 .2 1.2l.04.04a1.33 1.33 0 1 1-1.88 1.88l-.04-.04a1.1 1.1 0 0 0-1.2-.2 1.1 1.1 0 0 0-.67 1v.13a1.33 1.33 0 1 1-2.67 0v-.07a1.1 1.1 0 0 0-.72-1 1.1 1.1 0 0 0-1.2.2l-.04.04a1.33 1.33 0 1 1-1.88-1.88l.04-.04a1.1 1.1 0 0 0 .2-1.2 1.1 1.1 0 0 0-1-.67H3a1.33 1.33 0 0 1 0-2.67h.07a1.1 1.1 0 0 0 1-.72 1.1 1.1 0 0 0-.2-1.2l-.04-.04A1.33 1.33 0 1 1 5.71 3.3l.04.04a1.1 1.1 0 0 0 1.2.2h.05a1.1 1.1 0 0 0 .67-1V2.4a1.33 1.33 0 0 1 2.67 0v.07a1.1 1.1 0 0 0 .67 1 1.1 1.1 0 0 0 1.2-.2l.04-.04a1.33 1.33 0 1 1 1.88 1.88l-.04.04a1.1 1.1 0 0 0-.2 1.2v.05a1.1 1.1 0 0 0 1 .67h.13a1.33 1.33 0 0 1 0 2.67h-.07a1.1 1.1 0 0 0-1 .67z"/>
        </svg>
        Account
      </StyledNavLink>

      <Spacer />
      <ThemeToggle onClick={onToggleDark}>
        {isDark ? (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="3.5"/>
              <line x1="8" y1="1" x2="8" y2="2.5"/>
              <line x1="8" y1="13.5" x2="8" y2="15"/>
              <line x1="1" y1="8" x2="2.5" y2="8"/>
              <line x1="13.5" y1="8" x2="15" y2="8"/>
              <line x1="3.1" y1="3.1" x2="4.2" y2="4.2"/>
              <line x1="11.8" y1="11.8" x2="12.9" y2="12.9"/>
              <line x1="12.9" y1="3.1" x2="11.8" y2="4.2"/>
              <line x1="4.2" y1="11.8" x2="3.1" y2="12.9"/>
            </svg>
            Light mode
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.5 10A6 6 0 0 1 6 2.5a6 6 0 1 0 7.5 7.5z"/>
            </svg>
            Dark mode
          </>
        )}
      </ThemeToggle>
      <Footer>&copy; 2026 Middesk, Inc.</Footer>
    </Nav>
  )
}
