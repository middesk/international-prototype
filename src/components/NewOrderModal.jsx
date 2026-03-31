import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { REGIONS } from '../mockData'

/* ─────────────────────────────────────────────
   Autocomplete mock data
   Shaped to match the real Identity::AutocompleteSerializer response:
   { identities: [{ names, addresses, people, entity_type }] }
───────────────────────────────────────────── */

const AUTOCOMPLETE_DATA = [
  // Canada
  { names: [{ name: 'Shopify Inc.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '151 O\'Connor St, Ottawa, ON K2P 2L8' }], people: [{ name: 'Tobias Lütke', titles: ['CEO'] }], regions: ['canada'] },
  { names: [{ name: 'Shopify Payments (Canada) Inc.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '126 York St, Ottawa, ON K1N 5T5' }], people: [], regions: ['canada'] },
  { names: [{ name: 'Shopify Commerce Inc.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '150 Elgin St Suite 800, Ottawa, ON K2P 1L4' }], people: [], regions: ['canada'] },
  { names: [{ name: 'Wealthsimple Technologies Inc.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '860 W Broadway, Vancouver, BC V5Z 1J8' }], people: [{ name: 'Michael Katchen', titles: ['CEO'] }], regions: ['canada'] },
  { names: [{ name: 'Wealthsimple Financial Corp.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '860 W Broadway, Vancouver, BC V5Z 1J8' }], people: [], regions: ['canada'] },
  { names: [{ name: 'Lightspeed Commerce Inc.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '700 Rue Saint-Antoine O, Montréal, QC H3C 3R4' }], people: [{ name: 'Dax Dasilva', titles: ['CEO'] }], regions: ['canada'] },
  { names: [{ name: 'Hootsuite Inc.', type: 'legal' }, { name: 'Hootsuite Media Inc.', type: 'dba' }], entity_type: 'corporation', addresses: [{ full_address: '5 E 8th Ave, Vancouver, BC V5T 1R6' }], people: [], regions: ['canada'] },
  { names: [{ name: 'Element AI Inc.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '6650 Rue Saint-Urbain, Montréal, QC H2S 3G9' }], people: [], regions: ['canada'] },
  { names: [{ name: 'Cohere Inc.', type: 'legal' }], entity_type: 'corporation', addresses: [{ full_address: '101 College St, Toronto, ON M5G 1L7' }], people: [{ name: 'Aidan Gomez', titles: ['CEO'] }], regions: ['canada'] },
  { names: [{ name: 'Clio Legal Inc.', type: 'legal' }, { name: 'Clio', type: 'dba' }], entity_type: 'corporation', addresses: [{ full_address: '4611 Canada Way, Burnaby, BC V5G 4X3' }], people: [], regions: ['canada'] },

  // Europe — GB
  { names: [{ name: 'Revolut Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '7 Westferry Circus, Canary Wharf, London E14 4HD' }], people: [{ name: 'Nikolay Storonsky', titles: ['CEO'] }], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Revolut Holdings Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '7 Westferry Circus, Canary Wharf, London E14 4HD' }], people: [], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Monzo Bank Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '38 Finsbury Square, London EC2A 1PX' }], people: [{ name: 'TS Anil', titles: ['CEO'] }], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Wise Payments Ltd', type: 'legal' }, { name: 'TransferWise Ltd', type: 'dba' }], entity_type: 'ltd', addresses: [{ full_address: 'Tea Building, 56 Shoreditch High St, London E1 6JJ' }], people: [], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Starling Bank Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '3rd Floor, 2 Finsbury Avenue, London EC2M 2PG' }], people: [{ name: 'Anne Boden', titles: ['CEO'] }], regions: ['core-europe', 'extended-europe'] },

  // Europe — DE
  { names: [{ name: 'N26 GmbH', type: 'legal' }], entity_type: 'gmbh', addresses: [{ full_address: 'Klosterstrasse 62, 10179 Berlin' }], people: [{ name: 'Valentin Stalf', titles: ['CEO'] }], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'N26 Bank GmbH', type: 'legal' }], entity_type: 'gmbh', addresses: [{ full_address: 'Klosterstrasse 62, 10179 Berlin' }], people: [], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Zalando SE', type: 'legal' }], entity_type: 'se', addresses: [{ full_address: 'Tamara-Danz-Strasse 1, 10243 Berlin' }], people: [], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Delivery Hero SE', type: 'legal' }], entity_type: 'se', addresses: [{ full_address: 'Oranienburger Strasse 70, 10117 Berlin' }], people: [], regions: ['core-europe', 'extended-europe'] },

  // Europe — FR
  { names: [{ name: 'Qonto SAS', type: 'legal' }], entity_type: 'sas', addresses: [{ full_address: '18 Rue de Navarin, 75009 Paris' }], people: [{ name: 'Alexandre Prot', titles: ['CEO'] }], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'BlaBlaCar SAS', type: 'legal' }], entity_type: 'sas', addresses: [{ full_address: '84 Avenue de la République, 75011 Paris' }], people: [], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Ledger SAS', type: 'legal' }], entity_type: 'sas', addresses: [{ full_address: '1 Rue du Mail, 75002 Paris' }], people: [], regions: ['core-europe', 'extended-europe'] },

  // Europe — NL
  { names: [{ name: 'Adyen N.V.', type: 'legal' }], entity_type: 'nv', addresses: [{ full_address: 'Simon Carmiggeltstraat 6, 1011 DJ Amsterdam' }], people: [{ name: 'Ingo Uytdehaage', titles: ['CEO'] }], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Adyen International B.V.', type: 'legal' }], entity_type: 'bv', addresses: [{ full_address: 'Simon Carmiggeltstraat 6, 1011 DJ Amsterdam' }], people: [], regions: ['core-europe', 'extended-europe'] },

  // Europe — IE
  { names: [{ name: 'Stripe Payments Europe Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '1 Grand Canal Street Lower, Dublin 2, D02 H210' }], people: [], regions: ['core-europe', 'extended-europe'] },
  { names: [{ name: 'Stripe Technology Europe Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '1 Grand Canal Street Lower, Dublin 2, D02 H210' }], people: [], regions: ['core-europe', 'extended-europe'] },

  // APAC — SG
  { names: [{ name: 'Sea Limited', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '1 Fusionopolis Place, #17-10, Singapore 138522' }], people: [{ name: 'Forrest Li', titles: ['CEO'] }], regions: ['apac', 'australia'] },
  { names: [{ name: 'Sea Capital Singapore Pte. Ltd.', type: 'legal' }], entity_type: 'pte_ltd', addresses: [{ full_address: '1 Fusionopolis Place, Singapore 138522' }], people: [], regions: ['apac', 'australia'] },
  { names: [{ name: 'Grab Holdings Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '3 Media Close, Singapore 138498' }], people: [{ name: 'Anthony Tan', titles: ['CEO'] }], regions: ['apac', 'australia'] },
  { names: [{ name: 'Nium Pte. Ltd.', type: 'legal' }], entity_type: 'pte_ltd', addresses: [{ full_address: '180 Cecil St, #13-01, Singapore 069546' }], people: [], regions: ['apac', 'australia'] },

  // APAC — HK
  { names: [{ name: 'Tencent Holdings Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '29 Harbour City, Tsim Sha Tsui, Kowloon, Hong Kong' }], people: [{ name: 'Pony Ma', titles: ['CEO'] }], regions: ['apac', 'australia'] },
  { names: [{ name: 'Tencent International Service Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: '29 Harbour City, Hong Kong' }], people: [], regions: ['apac', 'australia'] },

  // APAC — JP
  { names: [{ name: 'SoftBank Group Corp.', type: 'legal' }], entity_type: 'kk', addresses: [{ full_address: '1-9-1 Higashi-Shimbashi, Minato-ku, Tokyo 105-7303' }], people: [{ name: 'Masayoshi Son', titles: ['CEO'] }], regions: ['apac', 'australia'] },
  { names: [{ name: 'SoftBank Corp.', type: 'legal' }], entity_type: 'kk', addresses: [{ full_address: '1-9-1 Higashi-Shimbashi, Minato-ku, Tokyo 105-7303' }], people: [], regions: ['apac', 'australia'] },

  // APAC — AU
  { names: [{ name: 'Afterpay Ltd', type: 'legal' }], entity_type: 'ltd', addresses: [{ full_address: 'Level 5, 406 Collins St, Melbourne VIC 3000' }], people: [], regions: ['apac', 'australia'] },
  { names: [{ name: 'Afterpay Pty Ltd', type: 'legal' }], entity_type: 'pty_ltd', addresses: [{ full_address: 'Level 5, 406 Collins St, Melbourne VIC 3000' }], people: [], regions: ['apac', 'australia'] },
  { names: [{ name: 'Canva Pty Ltd', type: 'legal' }], entity_type: 'pty_ltd', addresses: [{ full_address: '110 Kippax St, Surry Hills NSW 2010' }], people: [{ name: 'Melanie Perkins', titles: ['CEO'] }], regions: ['apac', 'australia'] },

  // APAC — IN
  { names: [{ name: 'Razorpay Software Private Limited', type: 'legal' }], entity_type: 'pvt_ltd', addresses: [{ full_address: '#22, 1st Floor, SJR Cyber, Laskar Hosur Road, Bengaluru 560030' }], people: [{ name: 'Harshil Mathur', titles: ['CEO'] }], regions: ['apac', 'australia'] },
  { names: [{ name: 'Razorpay Technologies Private Limited', type: 'legal' }], entity_type: 'pvt_ltd', addresses: [{ full_address: '#22, 1st Floor, SJR Cyber, Bengaluru 560030' }], people: [], regions: ['apac', 'australia'] },
]

function getMockAutocompleteResults(query, regionId) {
  if (!query || query.length < 3) return []
  const q = query.toLowerCase()
  return AUTOCOMPLETE_DATA
    .filter(identity =>
      identity.regions.includes(regionId) &&
      identity.names.some(n => n.name.toLowerCase().includes(q))
    )
    .slice(0, 6)
}

/* ─────────────────────────────────────────────
   Mock registry reg# lookup
   (real system would call Identity::Fetcher / SOS registry)
───────────────────────────────────────────── */

const MOCK_REG_NUMBERS = {
  'Shopify Inc.':                          { ON: '1234567',       FED: '3571869-4' },
  'Shopify Payments (Canada) Inc.':        { ON: '2345678' },
  'Shopify Commerce Inc.':                 { ON: '3456789' },
  'Wealthsimple Technologies Inc.':        { BC: 'BC0123456' },
  'Wealthsimple Financial Corp.':          { BC: 'BC0234567' },
  'Lightspeed Commerce Inc.':              { QC: '1181234567' },
  'Hootsuite Inc.':                        { BC: 'BC0567891' },
  'Element AI Inc.':                       { QC: '1171234567' },
  'Cohere Inc.':                           { ON: '4567890' },
  'Clio Legal Inc.':                       { BC: 'BC0678901' },
  'Revolut Ltd':                           { GB: '08804411' },
  'Revolut Holdings Ltd':                  { GB: '13691355' },
  'Monzo Bank Ltd':                        { GB: '09446231' },
  'Wise Payments Ltd':                     { GB: '07209813' },
  'Starling Bank Ltd':                     { GB: '09092081' },
  'N26 GmbH':                              { DE: 'HRB 190048 B' },
  'N26 Bank GmbH':                         { DE: 'HRB 191979 B' },
  'Zalando SE':                            { DE: 'HRB 158855 B' },
  'Qonto SAS':                             { FR: '819 451 869' },
  'BlaBlaCar SAS':                         { FR: '803 673 238' },
  'Adyen N.V.':                            { NL: '34259528' },
  'Adyen International B.V.':             { NL: '61876379' },
  'Stripe Payments Europe Ltd':            { IE: '513174' },
  'Stripe Technology Europe Ltd':          { IE: '599050' },
  'Sea Limited':                           { SG: '201717491H' },
  'Grab Holdings Ltd':                     { SG: '201712618N' },
  'Tencent Holdings Ltd':                  { HK: '0700' },
  'SoftBank Group Corp.':                  { JP: '0104-01-002594' },
  'Afterpay Ltd':                          { AU: '618 280 649' },
  'Afterpay Pty Ltd':                      { AU: '601 427 420' },
  'Canva Pty Ltd':                         { AU: '610 764 975' },
  'Razorpay Software Private Limited':     { IN: 'U72200KA2013PTC097462' },
}

function lookupRegNumber(legalName, jurisdictionOrIso) {
  if (!legalName) return null
  const entry = MOCK_REG_NUMBERS[legalName]
  if (!entry) return null
  if (jurisdictionOrIso && entry[jurisdictionOrIso]) return entry[jurisdictionOrIso]
  return Object.values(entry)[0] || null
}

/* ─────────────────────────────────────────────
   AutocompleteInput component
───────────────────────────────────────────── */

const AutocompleteWrapper = styled.div`
  position: relative;
  margin-bottom: 18px;
`

const AutocompleteInputEl = styled.input`
  width: 100%;
  border: 1px solid ${p => p.$open ? p.theme.accent : p.theme.border};
  border-radius: ${p => p.$open ? '4px 4px 0 0' : '4px'};
  padding: 10px 12px;
  font-size: 14px;
  color: ${p => p.theme.text};
  background: ${p => p.theme.inputBg};
  outline: none;
  transition: border-color 150ms;
  font-family: inherit;

  &:focus { border-color: ${p => p.theme.accent}; }
  &::placeholder { color: ${p => p.theme.textFaintest}; }
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.accent};
  border-top: none;
  border-radius: 0 0 6px 6px;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  overflow: hidden;
`

const DropdownItem = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid ${p => p.theme.borderLight};
  transition: background 80ms;

  &:last-of-type { border-bottom: none; }
  &:hover { background: ${p => p.theme.surface2}; }
`

const SuggestName = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const EntityTypePill = styled.span`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 1px 6px;
  border-radius: 8px;
  background: ${p => p.theme.surface2};
  color: ${p => p.theme.textFaint};
  flex-shrink: 0;
`

const SuggestMeta = styled.div`
  font-size: 11px;
  color: ${p => p.theme.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DbaLabel = styled.span`
  font-size: 10px;
  color: ${p => p.theme.textFaint};
  font-weight: 500;
  margin-left: 4px;
`

const DropdownFooter = styled.div`
  padding: 6px 14px;
  font-size: 10px;
  color: ${p => p.theme.textFaintest};
  background: ${p => p.theme.surface2};
  border-top: 1px solid ${p => p.theme.borderLight};
  display: flex;
  align-items: center;
  gap: 4px;
`

const LoadingItem = styled.div`
  padding: 12px 14px;
  font-size: 12px;
  color: ${p => p.theme.textFaint};
  display: flex;
  align-items: center;
  gap: 8px;
`

const LoadingDot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${p => p.theme.accent};
  animation: pulse 1s ease-in-out infinite;
  animation-delay: ${p => p.$delay || '0s'};

  @keyframes pulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`

/* ─────────────────────────────────────────────
   Attribute Panel styled components
───────────────────────────────────────────── */

const AttrPanel = styled.div`
  border: 1px solid ${p => p.$resolved ? '#2A6B3A' : p.theme.accent};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 18px;
`

const AttrPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: ${p => p.$resolved ? 'rgba(9,127,61,0.1)' : p.theme.surface2};
  border-bottom: 1px solid ${p => p.$resolved ? 'rgba(9,127,61,0.2)' : p.theme.borderLight};
  flex-wrap: wrap;
  gap: 6px;
`

const AttrPanelTitle = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${p => p.$resolved ? '#097F3D' : p.theme.accent};
  display: flex;
  align-items: center;
  gap: 5px;
`

const ConfidenceBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  background: ${p => p.$resolved ? 'rgba(9,127,61,0.12)' : 'rgba(196,112,14,0.12)'};
  color: ${p => p.$resolved ? '#097F3D' : '#C4700E'};
`

const AttrPanelBody = styled.div`
  padding: 6px 14px 4px;
`

const AttrPanelRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 6px 0;
  border-bottom: 1px solid ${p => p.theme.borderLight};
  &:last-child { border-bottom: none; }
`

const AttrKey = styled.div`
  font-size: 10.5px;
  font-weight: 600;
  color: ${p => p.theme.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  min-width: 108px;
  flex-shrink: 0;
  padding-top: 1px;
`

const AttrVal = styled.div`
  font-size: 12.5px;
  color: ${p => p.theme.text};
  line-height: 1.4;
  flex: 1;
`

const RegRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 14px;
  background: ${p => p.theme.surface2};
  border-top: 1px solid ${p => p.theme.borderLight};
  gap: 10px;
`

const RegRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11.5px;
  color: ${p => p.theme.textMuted};
  min-width: 0;
`

const RegNumValue = styled.span`
  font-family: monospace;
  font-size: 12px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
`

const RegResolvedBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #097F3D;
  background: rgba(9,127,61,0.1);
  padding: 2px 7px;
  border-radius: 8px;
  white-space: nowrap;
`

const ResolveBtn = styled.button`
  background: none;
  border: 1px solid ${p => p.theme.accent};
  color: ${p => p.theme.accent};
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 150ms;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover:not(:disabled) { background: ${p => p.theme.selectedBg}; }
  &:disabled { opacity: 0.4; cursor: default; }
`

function AttributePanel({ identity, regResolved, resolving, regNum, jurisdictionOrIso, onResolve }) {
  const legalName = identity.names.find(n => n.type === 'legal')?.name
  const dbaName = identity.names.find(n => n.type === 'dba')?.name
  const entityType = identity.entity_type?.toUpperCase().replace(/_/g, ' ')
  const address = identity.addresses[0]?.full_address
  const officers = identity.people?.length > 0
    ? identity.people.map(p => `${p.name}${p.titles?.[0] ? ` · ${p.titles[0]}` : ''}`).join(', ')
    : null
  const hasInIndex = !!lookupRegNumber(legalName, jurisdictionOrIso)

  return (
    <AttrPanel $resolved={regResolved}>
      <AttrPanelHeader $resolved={regResolved}>
        <AttrPanelTitle $resolved={regResolved}>
          {regResolved ? '✓ Registry lookup complete' : '⚡ Prefilled by Autocomplete'}
        </AttrPanelTitle>
        <ConfidenceBadge $resolved={regResolved}>
          {regResolved ? 'High confidence' : 'Medium confidence · add reg # to improve'}
        </ConfidenceBadge>
      </AttrPanelHeader>
      <AttrPanelBody>
        {entityType && <AttrPanelRow><AttrKey>Entity Type</AttrKey><AttrVal>{entityType}</AttrVal></AttrPanelRow>}
        {address   && <AttrPanelRow><AttrKey>Address</AttrKey><AttrVal>{address}</AttrVal></AttrPanelRow>}
        {dbaName   && <AttrPanelRow><AttrKey>DBA</AttrKey><AttrVal>{dbaName}</AttrVal></AttrPanelRow>}
        {officers  && <AttrPanelRow><AttrKey>Officers</AttrKey><AttrVal>{officers}</AttrVal></AttrPanelRow>}
      </AttrPanelBody>
      <RegRow>
        <RegRowLeft>
          <span>Registration #</span>
          {regResolved && regNum && <RegNumValue>{regNum}</RegNumValue>}
          {!regResolved && <span style={{ opacity: 0.35, letterSpacing: 3 }}>· · ·</span>}
        </RegRowLeft>
        {regResolved ? (
          <RegResolvedBadge>✓ Registry</RegResolvedBadge>
        ) : (
          <ResolveBtn onClick={onResolve} disabled={resolving || !hasInIndex}>
            {resolving ? 'Resolving…' : hasInIndex ? 'Resolve from registry →' : 'Not in index'}
          </ResolveBtn>
        )}
      </RegRow>
    </AttrPanel>
  )
}

function AutocompleteInput({ value, onChange, onSelect, placeholder, regionId }) {
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleChange(e) {
    const val = e.target.value
    onChange(val)

    clearTimeout(debounceRef.current)

    if (val.length < 3) {
      setResults([])
      setIsOpen(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setIsOpen(true)

    debounceRef.current = setTimeout(() => {
      const found = getMockAutocompleteResults(val, regionId)
      setResults(found)
      setIsLoading(false)
    }, 320)
  }

  function handleSelect(identity) {
    const primaryName = identity.names.find(n => n.type === 'legal')?.name || identity.names[0]?.name || ''
    onSelect(primaryName, identity)
    setIsOpen(false)
    setResults([])
  }

  return (
    <AutocompleteWrapper ref={wrapperRef}>
      <AutocompleteInputEl
        value={value}
        onChange={handleChange}
        onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        placeholder={placeholder}
        $open={isOpen}
        autoComplete="off"
      />
      {isOpen && (
        <Dropdown>
          {isLoading ? (
            <LoadingItem>
              <LoadingDot $delay="0s" />
              <LoadingDot $delay="0.15s" />
              <LoadingDot $delay="0.3s" />
              Searching identity index...
            </LoadingItem>
          ) : results.length === 0 ? (
            <LoadingItem>No matches found</LoadingItem>
          ) : (
            <>
              {results.map((identity, i) => {
                const legalName = identity.names.find(n => n.type === 'legal')?.name || identity.names[0]?.name
                const dbaName = identity.names.find(n => n.type === 'dba')?.name
                const address = identity.addresses[0]?.full_address
                const entityType = identity.entity_type?.toUpperCase().replace('_', ' ')
                return (
                  <DropdownItem key={i} onMouseDown={() => handleSelect(identity)}>
                    <SuggestName>
                      {legalName}
                      {dbaName && <DbaLabel>· {dbaName}</DbaLabel>}
                      {entityType && <EntityTypePill>{entityType}</EntityTypePill>}
                    </SuggestName>
                    {address && <SuggestMeta>{address}</SuggestMeta>}
                  </DropdownItem>
                )
              })}
              <DropdownFooter>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="14" y2="14"/>
                </svg>
                Identity Autocomplete · {results.length} result{results.length !== 1 ? 's' : ''}
              </DropdownFooter>
            </>
          )}
        </Dropdown>
      )}
    </AutocompleteWrapper>
  )
}

/* ── Full-page overlay (matches Middesk order flow) ── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${p => p.theme.surface};
  z-index: 1000;
  overflow-y: auto;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
`

const LogoMark = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${p => p.theme.textPrimary};
  letter-spacing: -0.5px;
`

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${p => p.theme.textMuted};
  font-size: 28px;
  line-height: 1;
  &:hover { color: ${p => p.theme.textPrimary}; }
`

const Content = styled.div`
  max-width: 540px;
  margin: 0 auto;
  padding: 0 24px 60px;
`

const BackLink = styled.button`
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

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
  margin-bottom: 4px;
`

const PageSubtitle = styled.p`
  font-size: 14px;
  color: ${p => p.theme.textMuted};
  margin-bottom: 32px;
`

const SectionCard = styled.div`
  border: 1px solid ${p => p.theme.border};
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 16px;
  background: ${p => p.theme.surface};
`

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
  margin-bottom: 12px;
`

const RadioRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  cursor: pointer;
`

const Radio = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${p => p.$checked ? p.theme.accent : p.theme.textFaintest};
  flex-shrink: 0;
  margin-top: 2px;
  position: relative;
  transition: border-color 150ms;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${p => p.$checked ? p.theme.accent : 'transparent'};
    transition: background 150ms;
  }
`

const RadioLabel = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
`

const RadioDesc = styled.div`
  font-size: 12px;
  color: ${p => p.theme.textMuted};
  margin-top: 2px;
  line-height: 1.5;
`

const DisabledCard = styled(SectionCard)`
  opacity: 0.45;
  cursor: not-allowed;
`

const DisabledLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${p => p.theme.textMuted};
  background: ${p => p.theme.surface2};
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
  text-transform: uppercase;
`

const NewBadge = styled.span`
  background: #BFFF6E;
  color: #243636;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  margin-left: 8px;
  vertical-align: middle;
`

const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

const RegionCard = styled.div`
  border: 2px solid ${p => p.$selected ? p.theme.accent : p.theme.border};
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  background: ${p => p.$selected ? p.theme.selectedBg : p.theme.surface};
  transition: border-color 150ms, background 150ms;

  &:hover { border-color: ${p => p.theme.textFaint}; }
`

const RegionFlag = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`

const RegionName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
`

const RegionMarkets = styled.div`
  font-size: 11px;
  color: ${p => p.theme.textMuted};
  margin-top: 3px;
  line-height: 1.4;
`

const RegionMultiple = styled.div`
  font-size: 11px;
  color: ${p => p.theme.accent};
  font-weight: 600;
  margin-top: 4px;
`

const FieldLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.theme.text};
  margin-bottom: 6px;
`

const Required = styled.span`
  color: #CD2523;
  margin-left: 2px;
`

const Input = styled.input`
  width: 100%;
  border: 1px solid ${p => p.theme.border};
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${p => p.theme.text};
  background: ${p => p.theme.inputBg};
  outline: none;
  transition: border-color 150ms;
  margin-bottom: 18px;

  &:focus { border-color: ${p => p.theme.accent}; }
  &::placeholder { color: ${p => p.theme.textFaintest}; }
`

const Select = styled.select`
  width: 100%;
  border: 1px solid ${p => p.theme.border};
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${p => p.theme.text};
  outline: none;
  background-color: ${p => p.theme.inputBg};
  cursor: pointer;
  margin-bottom: 18px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='${p => p.theme.selectArrow}' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;

  &:focus { border-color: ${p => p.theme.accent}; }

  option {
    background: ${p => p.theme.inputBg};
    color: ${p => p.theme.text};
  }
`

const InfoBox = styled.div`
  background: ${p => p.theme.surface2};
  border: 1px solid ${p => p.theme.border};
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 12px;
  color: ${p => p.theme.textMuted};
  line-height: 1.5;
`

const WarnBox = styled.div`
  background: #FCF1E4;
  border: 1px solid #F0D8BC;
  border-radius: 10px;
  padding: 10px 14px;
  margin-top: -10px;
  margin-bottom: 18px;
  font-size: 11.5px;
  color: #C4440E;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

const WarnIcon = styled.span`
  flex-shrink: 0;
  font-size: 14px;
  line-height: 1;
`

const FieldHint = styled.div`
  font-size: 11px;
  line-height: 1.5;
  color: ${p => p.theme.textMuted};
  margin-top: -14px;
  margin-bottom: 18px;
`

const HintIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${p => p.theme.border};
  color: ${p => p.theme.textMuted};
  font-size: 9px;
  font-weight: 800;
  margin-right: 5px;
  vertical-align: middle;
`

const HintExample = styled.span`
  font-family: monospace;
  font-size: 11px;
  background: ${p => p.theme.surface2};
  padding: 1px 5px;
  border-radius: 2px;
  color: ${p => p.theme.accent};
`

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`

const PrimaryButton = styled.button`
  background: ${p => p.theme.accent};
  color: #fff;
  border: none;
  border-radius: 35px;
  padding: 9px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;

  &:hover { background: ${p => p.theme.accentHover}; }
  &:disabled { background: ${p => p.theme.textFaint}; cursor: default; }
`

const SecondaryButton = styled.button`
  background: ${p => p.theme.surface};
  color: ${p => p.theme.text};
  border: 1px solid ${p => p.theme.border};
  border-radius: 35px;
  padding: 9px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;

  &:hover { border-color: ${p => p.theme.textFaint}; }
`

const FooterText = styled.div`
  text-align: center;
  padding: 32px 0 24px;
  font-size: 10px;
  color: ${p => p.theme.textFaintest};
`

/* ── Registration number hints ── */

const REG_NUMBER_HINTS = {
  ON: { label: 'Ontario Corporation Number', example: '1234567', warn: 'GST/HST numbers (e.g. 123456789RT0001) and Business Numbers (BN9) are not registration numbers.' },
  BC: { label: 'BC Incorporation Number', example: 'BC1234567', warn: 'GST/HST numbers and CRA Business Numbers are not accepted.' },
  AB: { label: 'Alberta Corporate Registration Number', example: '2012345678', warn: 'Do not use your GST/HST or CRA Business Number.' },
  QC: { label: 'Quebec NEQ Number', example: '1171234567', warn: 'GST/HST and federal Business Numbers (BN) are not registry numbers.' },
  SK: { label: 'Saskatchewan Corporation Number', example: '123456789', warn: 'Do not use your GST/HST number.' },
  MB: { label: 'Manitoba Corporation Number', example: '1234567', warn: 'Do not use your GST/HST number.' },
  NB: { label: 'New Brunswick Corporation Number', example: '123456', warn: 'Do not use your GST/HST number.' },
  NS: { label: 'Nova Scotia Registry ID', example: '3000001', warn: 'Do not use your GST/HST number.' },
  NL_CA: { label: 'Newfoundland Company Number', example: '12345', warn: 'Do not use your GST/HST number.' },
  PE: { label: 'PEI Corporation Number', example: '12345', warn: 'Do not use your GST/HST number.' },
  NT: { label: 'NWT Registration Number', example: '12345', warn: 'Do not use your GST/HST number.' },
  NU: { label: 'Nunavut Registration Number', example: '12345', warn: 'Do not use your GST/HST number.' },
  YT: { label: 'Yukon Corporation Number', example: '12345', warn: 'Do not use your GST/HST number.' },
  FED: { label: 'Corporations Canada Number', example: '1234567-8', warn: 'Federal BN (Business Number) and GST/HST numbers are different from the Corporations Canada registry number.' },
  GB: { label: 'Companies House Number', example: '08804411' },
  DE: { label: 'Handelsregister Number', example: 'HRB 190048 B' },
  FR: { label: 'SIREN / RCS Number', example: '819 451 869', warn: 'SIRET (14-digit) and TVA (VAT) numbers are not company registration numbers.' },
  NL_EU: { label: 'KVK Number', example: '34259528', warn: 'BTW (VAT) numbers are not KvK registration numbers.' },
  IE: { label: 'CRO Number', example: '513174' },
  IT: { label: 'REA / Registro Imprese Number', example: 'MI-1234567', warn: 'Partita IVA (VAT) is not the company registration number.' },
  BE: { label: 'BCE / KBO Number', example: '0123.456.789' },
  AT: { label: 'Firmenbuchnummer', example: 'FN 123456a' },
  ES: { label: 'CIF Number', example: 'B12345678' },
  SE: { label: 'Organisationsnummer', example: '556000-0000' },
  SG: { label: 'ACRA UEN', example: '201717491H', warn: 'GST registration numbers are not the same as UEN.' },
  HK: { label: 'CR Number', example: '0700' },
  JP: { label: 'Corporate Number', example: '0104-01-002594' },
  AU: { label: 'ACN (Australian Company Number)', example: '601 427 420', warn: 'ABN (Australian Business Number) is different from ACN.' },
  IN: { label: 'CIN (Corporate Identity Number)', example: 'U72200KA2013PTC097462', warn: 'GSTIN and PAN are not company registration numbers.' },
  CN: { label: 'USCC', example: '91110000100018588N' },
}

function getRegHint(regionId, jurisdictionOrIso) {
  if (regionId === 'canada') {
    if (jurisdictionOrIso === 'NL') return REG_NUMBER_HINTS['NL_CA']
    return REG_NUMBER_HINTS[jurisdictionOrIso]
  }
  if (regionId === 'core-europe' || regionId === 'extended-europe') {
    if (jurisdictionOrIso === 'NL') return REG_NUMBER_HINTS['NL_EU']
    return REG_NUMBER_HINTS[jurisdictionOrIso]
  }
  return REG_NUMBER_HINTS[jurisdictionOrIso]
}

const CA_JURISDICTIONS = [
  'AB - Alberta', 'BC - British Columbia', 'MB - Manitoba', 'NB - New Brunswick',
  'NL - Newfoundland and Labrador', 'NS - Nova Scotia', 'NT - Northwest Territories',
  'NU - Nunavut', 'ON - Ontario', 'PE - Prince Edward Island', 'QC - Quebec',
  'SK - Saskatchewan', 'YT - Yukon', 'FED - Federal'
]

const EU_ISO_CODES = [
  { code: 'GB', name: 'United Kingdom' }, { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' }, { code: 'NL', name: 'Netherlands' },
  { code: 'IE', name: 'Ireland' }, { code: 'IT', name: 'Italy' },
  { code: 'BE', name: 'Belgium' }, { code: 'AT', name: 'Austria' },
  { code: 'DK', name: 'Denmark' }, { code: 'FI', name: 'Finland' },
  { code: 'SE', name: 'Sweden' }, { code: 'ES', name: 'Spain' },
  { code: 'LU', name: 'Luxembourg' }, { code: 'SI', name: 'Slovenia' },
  { code: 'LV', name: 'Latvia' }
]

const EU_EXTENDED_ISO_CODES = [
  { code: 'GI', name: 'Gibraltar' }, { code: 'GG', name: 'Guernsey' },
  { code: 'JE', name: 'Jersey' }, { code: 'NO', name: 'Norway' },
  { code: 'GR', name: 'Greece' }, { code: 'MK', name: 'Macedonia' },
  { code: 'CY', name: 'Cyprus' }, { code: 'EE', name: 'Estonia' }
]

const APAC_ISO_CODES = [
  { code: 'CN', name: 'China' }, { code: 'HK', name: 'Hong Kong' },
  { code: 'SG', name: 'Singapore' }, { code: 'NZ', name: 'New Zealand' },
  { code: 'MY', name: 'Malaysia' }, { code: 'JP', name: 'Japan' },
  { code: 'TW', name: 'Taiwan' }, { code: 'IN', name: 'India' },
  { code: 'VN', name: 'Vietnam' }, { code: 'TH', name: 'Thailand' },
  { code: 'ID', name: 'Indonesia' }, { code: 'PH', name: 'Philippines' },
  { code: 'KR', name: 'South Korea' }, { code: 'AU', name: 'Australia' }
]

function getISOOptions(regionId) {
  if (regionId === 'core-europe') return EU_ISO_CODES
  if (regionId === 'extended-europe') return EU_EXTENDED_ISO_CODES
  if (regionId === 'apac' || regionId === 'australia') return APAC_ISO_CODES
  return []
}

/* ─────────────────────────────────────────────
   Search-card + Smart-field styled components
───────────────────────────────────────────── */

const SearchInputWrap = styled.div`
  position: relative;
  margin-bottom: 10px;
`

const SearchIconEl = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${p => p.theme.textFaint};
  display: flex;
  pointer-events: none;
`

const SearchInputEl = styled.input`
  width: 100%;
  border: 1.5px solid ${p => p.theme.border};
  border-radius: 8px;
  padding: 11px 12px 11px 36px;
  font-size: 14px;
  color: ${p => p.theme.text};
  background: ${p => p.theme.inputBg};
  outline: none;
  font-family: inherit;
  transition: border-color 150ms;
  &:focus { border-color: ${p => p.theme.accent}; }
  &::placeholder { color: ${p => p.theme.textFaintest}; }
`

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 4px;
  padding-right: 2px;
`

const ResultCard = styled.div`
  border: 1.5px solid ${p => p.theme.border};
  border-radius: 8px;
  padding: 12px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: ${p => p.theme.surface};
  transition: border-color 100ms, background 100ms;
  &:hover { border-color: ${p => p.theme.accent}; background: ${p => p.theme.selectedBg}; }
`

const ResultCardInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const ResultCardName = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  margin-bottom: 3px;
`

const BestMatchBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #097F3D;
  background: rgba(9,127,61,0.12);
  padding: 1px 7px;
  border-radius: 8px;
`

const RegIndexBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: ${p => p.theme.accent};
  background: ${p => p.theme.surface2};
  padding: 1px 7px;
  border-radius: 8px;
`

const ResultCardAddress = styled.div`
  font-size: 11.5px;
  color: ${p => p.theme.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ResultChevron = styled.span`
  font-size: 20px;
  color: ${p => p.theme.textFaint};
  flex-shrink: 0;
  line-height: 1;
`

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 12.5px;
  color: ${p => p.theme.textFaint};
  border: 1px dashed ${p => p.theme.border};
  border-radius: 8px;
`

const SearchHint = styled.div`
  font-size: 11.5px;
  color: ${p => p.theme.textFaint};
  text-align: center;
  padding: 12px 0 4px;
`

const SmartPopulateNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${p => p.theme.accent};
  padding: 8px 0;
`

const ConfirmBackBtn = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.accent};
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 3px;
  font-family: inherit;
  &:hover { color: ${p => p.theme.textPrimary}; }
`

const SmartFieldWrap = styled.div`
  margin-bottom: 14px;
`

const SmartFieldHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`

const SmartFieldLbl = styled.label`
  font-size: 12.5px;
  font-weight: 600;
  color: ${p => p.theme.text};
`

const SmartSourceTag = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 8px;
  background: ${p =>
    p.$source === 'smart' ? 'rgba(9,127,61,0.12)' :
    p.$source === 'autocomplete' ? p.theme.surface2 : 'transparent'};
  color: ${p =>
    p.$source === 'smart' ? '#097F3D' :
    p.$source === 'autocomplete' ? p.theme.accent : p.theme.textFaint};
`

const SmartInputEl = styled.input`
  width: 100%;
  border: 1.5px solid ${p => p.$highlight ? '#2A7A40' : p.theme.border};
  border-radius: 6px;
  padding: 9px 12px;
  font-size: ${p => p.$mono ? '13px' : '13.5px'};
  font-family: ${p => p.$mono ? 'monospace' : 'inherit'};
  color: ${p => p.theme.text};
  background: ${p => p.$highlight ? 'rgba(9,127,61,0.06)' : p.theme.inputBg};
  outline: none;
  transition: border-color 300ms, background 300ms;
  &:focus { border-color: ${p => p.theme.accent}; background: ${p => p.theme.inputBg}; }
  &::placeholder { color: ${p => p.theme.textFaintest}; }
  &:read-only { opacity: 0.6; cursor: default; }
`

function SmartField({ label, value, onChange, source, highlight, readOnly, mono }) {
  return (
    <SmartFieldWrap>
      <SmartFieldHeader>
        <SmartFieldLbl>{label}</SmartFieldLbl>
        {source && (
          <SmartSourceTag $source={source}>
            {source === 'smart' ? '✓ Smart populated' : source === 'autocomplete' ? '· Autocomplete' : ''}
          </SmartSourceTag>
        )}
      </SmartFieldHeader>
      <SmartInputEl
        value={value}
        onChange={onChange ? e => onChange(e.target.value) : undefined}
        readOnly={readOnly || !onChange}
        $highlight={highlight}
        $mono={mono}
      />
    </SmartFieldWrap>
  )
}

function parseAddress(fullAddress) {
  if (!fullAddress) return {}
  const parts = fullAddress.split(',').map(s => s.trim())
  if (parts.length >= 4) {
    return { addressLine1: parts[0], city: parts[1], stateProvince: parts[2], postalCode: parts[3], country: parts[4] || '' }
  }
  if (parts.length === 3) {
    return { addressLine1: parts[0], city: parts[1], stateProvince: '', postalCode: '', country: parts[2] }
  }
  return { addressLine1: fullAddress, city: '', stateProvince: '', postalCode: '', country: '' }
}

const ContinueLink = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.accent};
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: inherit;
  margin-top: 4px;
  &:hover { color: ${p => p.theme.textPrimary}; }
`

const SectionDivider = styled.div`
  font-size: 10.5px;
  font-weight: 700;
  color: ${p => p.theme.textFaint};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 18px 0 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid ${p => p.theme.borderLight};
`

function OrderForm({ region, formData, setFormData, onRequestSubmit }) {
  const [subStep, setSubStep] = useState('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [smartPopulating, setSmartPopulating] = useState(false)
  const [smartPopulated, setSmartPopulated] = useState(false)
  const [regHighlight, setRegHighlight] = useState(false)
  const [fields, setFields] = useState({
    businessName: '', registrationNumber: '', entityType: '', dba: '', officers: '',
    addressLine1: '', city: '', stateProvince: '', postalCode: '', country: '',
    companyActivity: '', incorporationDate: '', registeredAgent: '', shareCapital: ''
  })
  const [fieldSources, setFieldSources] = useState({})
  const debounceRef = useRef(null)

  if (!region) return null

  const isCanada = region.id === 'canada'
  const isEurope = region.id === 'core-europe' || region.id === 'extended-europe'
  const isApac = region.id === 'apac' || region.id === 'australia'
  const isoOptions = getISOOptions(region.id)

  // Get the current jurisdiction/iso for reg# lookups
  const jurisdictionOrIso = isCanada ? formData.jurisdiction : formData.isoCode

  // Sync all identity attributes to formData (for BusinessSelectPage scoring)
  function syncIdentityToFormData(identity) {
    const legalName = identity.names.find(n => n.type === 'legal')?.name || identity.names[0]?.name || ''
    const dbaName = identity.names.find(n => n.type === 'dba')?.name || ''
    const entityType = identity.entity_type?.toUpperCase().replace(/_/g, ' ') || ''
    const addr = parseAddress(identity.addresses[0]?.full_address)
    const officers = identity.people?.length > 0
      ? identity.people.map(p => `${p.name}${p.titles?.[0] ? ` · ${p.titles[0]}` : ''}`).join(', ')
      : ''

    setFormData(d => ({
      ...d,
      businessName: legalName,
      entityType, officers, dba: dbaName,
      addressLine1: addr.addressLine1 || '', city: addr.city || '',
      stateProvince: addr.stateProvince || '', postalCode: addr.postalCode || '',
      country: addr.country || '',
      ...(isApac ? { keyword: legalName } : {})
    }))
  }

  function selectIdentity(identity) {
    const legalName = identity.names.find(n => n.type === 'legal')?.name || identity.names[0]?.name || ''
    const dbaName = identity.names.find(n => n.type === 'dba')?.name || ''
    const entityType = identity.entity_type?.toUpperCase().replace(/_/g, ' ') || ''
    const addr = parseAddress(identity.addresses[0]?.full_address)
    const officers = identity.people?.length > 0
      ? identity.people.map(p => `${p.name}${p.titles?.[0] ? ` · ${p.titles[0]}` : ''}`).join(', ')
      : ''

    // Look up reg# from mock registry
    const regNum = lookupRegNumber(legalName, jurisdictionOrIso)

    const newFields = {
      businessName: legalName, registrationNumber: regNum || '',
      entityType, dba: dbaName, officers,
      addressLine1: addr.addressLine1 || '', city: addr.city || '',
      stateProvince: addr.stateProvince || '', postalCode: addr.postalCode || '',
      country: addr.country || '',
      companyActivity: '', incorporationDate: '', registeredAgent: '', shareCapital: ''
    }

    const sources = {
      businessName: 'autocomplete',
      entityType: entityType ? 'autocomplete' : null,
      officers: officers ? 'autocomplete' : null,
      dba: dbaName ? 'autocomplete' : null,
      addressLine1: addr.addressLine1 ? 'autocomplete' : null,
      city: addr.city ? 'autocomplete' : null,
      stateProvince: addr.stateProvince ? 'autocomplete' : null,
      postalCode: addr.postalCode ? 'autocomplete' : null,
      country: addr.country ? 'autocomplete' : null,
      registrationNumber: regNum ? 'smart' : null
    }

    setFields(newFields)
    setFieldSources(sources)
    setSmartPopulated(!!regNum)

    // Sync all fields to parent formData
    const formUpdate = {
      businessName: legalName, registrationNumber: regNum || '',
      entityType, officers, dba: dbaName,
      addressLine1: addr.addressLine1 || '', city: addr.city || '',
      stateProvince: addr.stateProvince || '', postalCode: addr.postalCode || '',
      country: addr.country || '',
      ...(isApac ? { keyword: legalName } : {})
    }

    if (regNum) {
      // Has reg# → go to confirm form, set confirmedBusiness
      setFormData(d => ({ ...d, ...formUpdate, confirmedBusiness: newFields }))
      setSubStep('confirm')
      setRegHighlight(true)
      setTimeout(() => setRegHighlight(false), 2000)
    } else {
      // No reg# → sync attributes and route to BusinessSelectPage
      const updatedFormData = { ...formData, ...formUpdate }
      setFormData(d => ({ ...d, ...formUpdate }))
      onRequestSubmit(updatedFormData)
    }
  }

  function handleSearch(val) {
    setSearchQuery(val)
    clearTimeout(debounceRef.current)

    if (val.length < 3) {
      setSearchResults([])
      setIsSearching(false)
      setSmartPopulating(false)
      return
    }

    setIsSearching(true)

    debounceRef.current = setTimeout(() => {
      const found = getMockAutocompleteResults(val, region.id)
      setSearchResults(found)
      setIsSearching(false)

      // Check for exact match → smart populate (only if reg# available)
      const exactMatch = found.find(identity => {
        const legalName = identity.names.find(n => n.type === 'legal')?.name
        return legalName && legalName.toLowerCase() === val.toLowerCase()
      })

      if (exactMatch) {
        const hasReg = !!lookupRegNumber(
          exactMatch.names.find(n => n.type === 'legal')?.name,
          jurisdictionOrIso
        )
        if (hasReg) {
          setSmartPopulating(true)
          setTimeout(() => {
            setSmartPopulating(false)
            selectIdentity(exactMatch)
          }, 600)
        }
      }
    }, 380)
  }

  function handleContinueWithName() {
    const updatedFormData = {
      ...formData,
      businessName: searchQuery,
      ...(isApac ? { keyword: searchQuery } : {})
    }
    setFormData(d => ({ ...d, businessName: searchQuery, ...(isApac ? { keyword: searchQuery } : {}) }))
    onRequestSubmit(updatedFormData)
  }

  function updateField(field, val) {
    setFields(prev => ({ ...prev, [field]: val }))
    setFieldSources(prev => ({ ...prev, [field]: null }))
    // Sync ALL fields to parent formData
    setFormData(d => {
      const update = { ...d, [field]: val }
      if (field === 'businessName' && isApac) update.keyword = val
      // Keep confirmedBusiness in sync if present
      if (d.confirmedBusiness) {
        update.confirmedBusiness = { ...d.confirmedBusiness, [field]: val }
      }
      return update
    })
  }

  /* ── Search sub-step ── */
  if (subStep === 'search') {
    return (
      <div>
        {/* Jurisdiction / Country selector */}
        {isCanada && (
          <>
            <FieldLabel>Jurisdiction <Required>*</Required></FieldLabel>
            <Select
              value={formData.jurisdiction || ''}
              onChange={e => setFormData(d => ({ ...d, jurisdiction: e.target.value }))}
            >
              <option value="">Select province...</option>
              {CA_JURISDICTIONS.map(j => (
                <option key={j} value={j.split(' - ')[0]}>{j}</option>
              ))}
            </Select>
          </>
        )}
        {(isEurope || isApac) && (
          <>
            <FieldLabel>Country <Required>*</Required></FieldLabel>
            <Select
              value={formData.isoCode || ''}
              onChange={e => setFormData(d => ({ ...d, isoCode: e.target.value }))}
            >
              <option value="">Select country...</option>
              {isoOptions.map(c => (
                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </Select>
          </>
        )}

        <FieldLabel style={{ marginBottom: 8 }}>Find your business</FieldLabel>
        <SearchInputWrap>
          <SearchIconEl>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="14" y2="14"/>
            </svg>
          </SearchIconEl>
          <SearchInputEl
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            placeholder={isCanada ? 'Search by company name, e.g. Shopify Inc.' : isApac ? 'Search by company name, e.g. Sea Limited' : 'Search by company name, e.g. Revolut Ltd'}
            autoComplete="off"
            autoFocus
          />
        </SearchInputWrap>

        {smartPopulating && (
          <SmartPopulateNotice>
            <LoadingDot $delay="0s" />
            <LoadingDot $delay="0.15s" />
            <LoadingDot $delay="0.3s" />
            Exact match found — smart populating...
          </SmartPopulateNotice>
        )}

        {!smartPopulating && isSearching && (
          <SmartPopulateNotice>
            <LoadingDot $delay="0s" />
            <LoadingDot $delay="0.15s" />
            <LoadingDot $delay="0.3s" />
            Searching identity index...
          </SmartPopulateNotice>
        )}

        {!smartPopulating && !isSearching && searchResults.length > 0 && (
          <>
            <ResultsList>
              {searchResults.map((identity, i) => {
                const legalName = identity.names.find(n => n.type === 'legal')?.name || identity.names[0]?.name
                const address = identity.addresses[0]?.full_address
                const entityType = identity.entity_type?.toUpperCase().replace(/_/g, ' ')
                const hasReg = !!lookupRegNumber(legalName, jurisdictionOrIso)
                return (
                  <ResultCard key={i} onClick={() => selectIdentity(identity)}>
                    <ResultCardInfo>
                      <ResultCardName>
                        {legalName}
                        {entityType && <EntityTypePill>{entityType}</EntityTypePill>}
                        {i === 0 && <BestMatchBadge>Best match</BestMatchBadge>}
                        {hasReg && <RegIndexBadge>Reg # available</RegIndexBadge>}
                      </ResultCardName>
                      {address && <ResultCardAddress>{address}</ResultCardAddress>}
                    </ResultCardInfo>
                    <ResultChevron>&rsaquo;</ResultChevron>
                  </ResultCard>
                )
              })}
            </ResultsList>
            <ContinueLink onClick={handleContinueWithName}>
              Don't see your business? Continue with name search &rarr;
            </ContinueLink>
          </>
        )}

        {!smartPopulating && !isSearching && searchQuery.length >= 3 && searchResults.length === 0 && (
          <>
            <NoResults>No businesses found matching &ldquo;{searchQuery}&rdquo;</NoResults>
            <ContinueLink onClick={handleContinueWithName}>
              Continue with name search &rarr;
            </ContinueLink>
          </>
        )}

        {searchQuery.length < 3 && !isSearching && (
          <SearchHint>Type at least 3 characters to search the identity index</SearchHint>
        )}

        {/* Registration number input */}
        {(() => {
          const hint = isCanada
            ? getRegHint('canada', formData.jurisdiction)
            : getRegHint(region.id, formData.isoCode)
          return (
            <>
              <SectionDivider style={{ marginTop: 20 }}>Registration Number</SectionDivider>
              <FieldLabel>{hint ? hint.label : 'Company Registration Number'}</FieldLabel>
              <Input
                placeholder={hint ? `e.g. ${hint.example}` : 'e.g. 1234567'}
                value={formData.registrationNumber || ''}
                onChange={e => setFormData(d => ({ ...d, registrationNumber: e.target.value }))}
              />
              {hint?.warn && formData.registrationNumber && (
                <WarnBox><WarnIcon>⚠</WarnIcon><span>{hint.warn}</span></WarnBox>
              )}
            </>
          )
        })()}

        {/* Additional attributes to improve matching */}
        <SectionDivider>Additional Attributes</SectionDivider>
        <FieldHint style={{ marginTop: 0, marginBottom: 12 }}>
          <HintIcon>i</HintIcon>
          Providing additional details improves matching confidence on the results page.
        </FieldHint>

        <FieldLabel>Entity Type</FieldLabel>
        <Input
          placeholder="e.g. Corporation, GmbH, Ltd"
          value={formData.entityType || ''}
          onChange={e => setFormData(d => ({ ...d, entityType: e.target.value }))}
        />

        <FieldLabel>Address</FieldLabel>
        <Input
          placeholder="e.g. 151 O'Connor St, Ottawa"
          value={formData.addressLine1 || ''}
          onChange={e => setFormData(d => ({ ...d, addressLine1: e.target.value }))}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <FieldLabel>City</FieldLabel>
            <Input
              placeholder="e.g. Ottawa"
              value={formData.city || ''}
              onChange={e => setFormData(d => ({ ...d, city: e.target.value }))}
            />
          </div>
          <div>
            <FieldLabel>State / Province</FieldLabel>
            <Input
              placeholder="e.g. ON"
              value={formData.stateProvince || ''}
              onChange={e => setFormData(d => ({ ...d, stateProvince: e.target.value }))}
            />
          </div>
        </div>

        <FieldLabel>Officers / Directors</FieldLabel>
        <Input
          placeholder="e.g. John Smith, CEO"
          value={formData.officers || ''}
          onChange={e => setFormData(d => ({ ...d, officers: e.target.value }))}
        />

        {isApac && (
          <>
            <SectionDivider>Language</SectionDivider>
            <Select
              value={formData.language || 'EN'}
              onChange={e => setFormData(d => ({ ...d, language: e.target.value }))}
            >
              <option value="EN">EN — English</option>
              <option value="OG">OG — Original Language</option>
              <option value="ALL">ALL — Both</option>
            </Select>
          </>
        )}
      </div>
    )
  }

  /* ── Confirm sub-step (only reached when reg# is available) ── */
  const hint = isCanada
    ? getRegHint('canada', formData.jurisdiction)
    : getRegHint(region.id, formData.isoCode)

  return (
    <div>
      <ConfirmBackBtn onClick={() => {
        setSubStep('search')
        setSmartPopulated(false)
        setSearchResults([])
        setSearchQuery('')
        setFormData(d => { const { confirmedBusiness, ...rest } = d; return rest })
      }}>
        &lsaquo; Back to search
      </ConfirmBackBtn>

      <InfoBox style={{ background: 'rgba(9,127,61,0.06)', borderColor: 'rgba(9,127,61,0.2)' }}>
        <strong style={{ color: '#097F3D' }}>Smart populated</strong> — we matched this business in the registry index and auto-filled the registration number. Review and edit any fields below before placing your order.
      </InfoBox>

      {/* Jurisdiction / Country (read-only context) */}
      {isCanada && formData.jurisdiction && (
        <SmartField
          label="Jurisdiction"
          value={CA_JURISDICTIONS.find(j => j.startsWith(formData.jurisdiction)) || formData.jurisdiction}
          readOnly
        />
      )}
      {(isEurope || isApac) && formData.isoCode && (
        <SmartField
          label="Country"
          value={(isoOptions.find(c => c.code === formData.isoCode)?.name || '') + ` (${formData.isoCode})`}
          readOnly
        />
      )}

      <SectionDivider>Business Identity</SectionDivider>

      <SmartField
        label="Business Name"
        value={fields.businessName}
        onChange={val => updateField('businessName', val)}
        source={fieldSources.businessName}
      />

      <SmartField
        label={hint ? hint.label : 'Registration Number'}
        value={fields.registrationNumber}
        onChange={val => updateField('registrationNumber', val)}
        source={fieldSources.registrationNumber}
        highlight={regHighlight}
        mono
      />
      {hint?.warn && fields.registrationNumber && (
        <WarnBox style={{ marginTop: -8, marginBottom: 14 }}><WarnIcon>⚠</WarnIcon><span>{hint.warn}</span></WarnBox>
      )}

      <SmartField
        label="Entity Type"
        value={fields.entityType}
        onChange={val => updateField('entityType', val)}
        source={fieldSources.entityType}
      />

      {fields.dba && (
        <SmartField
          label="DBA / Trading Name"
          value={fields.dba}
          onChange={val => updateField('dba', val)}
          source={fieldSources.dba}
        />
      )}

      <SectionDivider>Address</SectionDivider>

      <SmartField
        label="Address Line 1"
        value={fields.addressLine1}
        onChange={val => updateField('addressLine1', val)}
        source={fieldSources.addressLine1}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SmartField
          label="City"
          value={fields.city}
          onChange={val => updateField('city', val)}
          source={fieldSources.city}
        />
        <SmartField
          label="State / Province"
          value={fields.stateProvince}
          onChange={val => updateField('stateProvince', val)}
          source={fieldSources.stateProvince}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SmartField
          label="Postal Code"
          value={fields.postalCode}
          onChange={val => updateField('postalCode', val)}
          source={fieldSources.postalCode}
        />
        <SmartField
          label="Country"
          value={fields.country}
          onChange={val => updateField('country', val)}
          source={fieldSources.country}
        />
      </div>

      <SectionDivider>Additional Attributes</SectionDivider>

      <SmartField
        label="Officers / Directors"
        value={fields.officers}
        onChange={val => updateField('officers', val)}
        source={fieldSources.officers}
      />

      <SmartField
        label="Company Activity / Industry"
        value={fields.companyActivity}
        onChange={val => updateField('companyActivity', val)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <SmartField
          label="Incorporation Date"
          value={fields.incorporationDate}
          onChange={val => updateField('incorporationDate', val)}
        />
        <SmartField
          label="Share Capital"
          value={fields.shareCapital}
          onChange={val => updateField('shareCapital', val)}
        />
      </div>

      <SmartField
        label="Registered Agent"
        value={fields.registeredAgent}
        onChange={val => updateField('registeredAgent', val)}
      />

      {isApac && (
        <>
          <FieldLabel style={{ marginTop: 8 }}>Language</FieldLabel>
          <Select
            value={formData.language || 'EN'}
            onChange={e => setFormData(d => ({ ...d, language: e.target.value }))}
          >
            <option value="EN">EN — English</option>
            <option value="OG">OG — Original Language</option>
            <option value="ALL">ALL — Both</option>
          </Select>
        </>
      )}
    </div>
  )
}

export default function NewOrderModal({ onClose, onSubmit, internationalSearchEnabled = true }) {
  const [step, setStep] = useState(internationalSearchEnabled ? 1 : 2)
  const [orderType, setOrderType] = useState(internationalSearchEnabled ? 'international' : 'domestic')
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [formData, setFormData] = useState({})

  const totalSteps = 3
  const firstStep = internationalSearchEnabled ? 1 : 2

  function handleNext() {
    if (step < totalSteps) setStep(s => s + 1)
  }

  function handleBack() {
    if (step > firstStep) setStep(s => s - 1)
  }

  function handleSubmit(formDataOverride) {
    onSubmit({ orderType, region: selectedRegion, formData: formDataOverride || formData })
    onClose()
  }

  const canProceed = () => {
    if (step === 1) return !!orderType
    if (step === 2) return !!selectedRegion
    if (step === 3) {
      if (!selectedRegion) return false
      if (selectedRegion.id === 'canada') return !!(formData.jurisdiction && (formData.registrationNumber || formData.businessName))
      if (selectedRegion.id === 'core-europe' || selectedRegion.id === 'extended-europe')
        return !!(formData.isoCode && (formData.registrationNumber || formData.businessName))
      if (selectedRegion.id === 'apac' || selectedRegion.id === 'australia')
        return !!(formData.isoCode && formData.keyword)
    }
    return false
  }

  return (
    <Overlay>
      <TopBar>
        <LogoMark>middesk</LogoMark>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
      </TopBar>

      <Content>
        {step > firstStep && (
          <BackLink onClick={handleBack}>
            &lsaquo; {step === 2 ? 'Back to package selection' : 'Back to geography'}
          </BackLink>
        )}

        <PageTitle>
          {step === 1 && 'Place an order'}
          {step === 2 && 'Select Geography'}
          {step === 3 && 'Business Information'}
        </PageTitle>
        <PageSubtitle>
          {step === 1 && 'Select which business to place an order on.'}
          {step === 2 && 'Select the region where the business is registered.'}
          {step === 3 && `Ordering: International Verify — ${selectedRegion?.label}`}
        </PageSubtitle>

        {step === 1 && (
          <>
            <SectionCard>
              <SectionTitle>Business Verification</SectionTitle>
              <RadioRow onClick={() => setOrderType('domestic')}>
                <Radio $checked={orderType === 'domestic'} />
                <div>
                  <RadioLabel>Domestic Verify</RadioLabel>
                  <RadioDesc>Verify US-registered businesses via state + federal registries</RadioDesc>
                </div>
              </RadioRow>
              {internationalSearchEnabled ? (
                <RadioRow onClick={() => setOrderType('international')}>
                  <Radio $checked={orderType === 'international'} />
                  <div>
                    <RadioLabel>International Search <NewBadge>NEW</NewBadge></RadioLabel>
                    <RadioDesc>Verify businesses registered in Canada, Europe, or APAC — business name, registration status, address, and more</RadioDesc>
                  </div>
                </RadioRow>
              ) : (
                <div style={{ opacity: 0.4, padding: '8px 0', cursor: 'not-allowed' }}>
                  <RadioRow as="div">
                    <Radio $checked={false} />
                    <div>
                      <RadioLabel>International Search <DisabledLabel>Disabled</DisabledLabel></RadioLabel>
                      <RadioDesc>Enable in Settings to use this feature</RadioDesc>
                    </div>
                  </RadioRow>
                </div>
              )}
            </SectionCard>

            <DisabledCard>
              <SectionTitle>Web Presence</SectionTitle>
              <RadioDesc>Web Analysis, Industry Classification</RadioDesc>
            </DisabledCard>

            <DisabledCard>
              <SectionTitle>KYC &amp; Fraud</SectionTitle>
              <RadioDesc>Perform KYC and fraud checks on the people associated with the business.</RadioDesc>
            </DisabledCard>
          </>
        )}

        {step === 2 && (
          <RegionGrid>
            {REGIONS.map(region => (
              <RegionCard
                key={region.id}
                $selected={selectedRegion?.id === region.id}
                onClick={() => setSelectedRegion(region)}
              >
                <RegionFlag>{region.flag}</RegionFlag>
                <RegionName>{region.label}</RegionName>
                <RegionMarkets>{region.markets.split(', ').slice(0, 4).join(', ')}{region.markets.split(', ').length > 4 ? '...' : ''}</RegionMarkets>
                <RegionMultiple>{region.multiple} price multiple</RegionMultiple>
              </RegionCard>
            ))}
          </RegionGrid>
        )}

        {step === 3 && (
          <OrderForm
            region={selectedRegion}
            formData={formData}
            setFormData={setFormData}
            onRequestSubmit={handleSubmit}
          />
        )}

        <ButtonRow>
          {step === firstStep && (
            <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
          )}
          {step < totalSteps
            ? <PrimaryButton onClick={handleNext} disabled={!canProceed()}>Next</PrimaryButton>
            : <PrimaryButton onClick={handleSubmit} disabled={!canProceed()}>Place Order</PrimaryButton>
          }
        </ButtonRow>

        <FooterText>&copy; 2026 Middesk, Inc.</FooterText>
      </Content>
    </Overlay>
  )
}
