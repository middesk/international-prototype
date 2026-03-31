import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const BackBtn = styled.button`
  background: none;
  border: none;
  color: ${p => p.theme.accent};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { color: ${p => p.theme.textPrimary}; }
`

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: ${p => p.theme.textPrimary};
  margin-bottom: 4px;
`

const PageDesc = styled.p`
  font-size: 14px;
  color: ${p => p.theme.textMuted};
  margin-bottom: 8px;
`

const SearchMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`

const MetaBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${p => p.theme.surface2};
  color: ${p => p.theme.textMuted};
`

const ResultCount = styled.span`
  font-size: 12px;
  color: ${p => p.theme.textFaint};
`

const TableCard = styled.div`
  background: ${p => p.theme.surface};
  border: 1px solid ${p => p.theme.border};
  border-radius: 8px;
  overflow: hidden;
`

const BusinessRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid ${p => p.theme.borderLight};
  cursor: pointer;
  transition: background 80ms;

  &:hover { background: ${p => p.theme.surface2}; }
  &:last-child { border-bottom: none; }
`

const BusinessInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const BusinessNameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 3px;
`

const BusinessName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${p => p.theme.textPrimary};
`

const ScoreBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  flex-shrink: 0;
  background: ${p =>
    p.$score >= 90 ? '#E2F7E6' :
    p.$score >= 70 ? '#DDE4FF' :
    p.$score >= 50 ? '#FCF1E4' :
    '#ECF0F4'};
  color: ${p =>
    p.$score >= 90 ? '#097F3D' :
    p.$score >= 70 ? '#0637FF' :
    p.$score >= 50 ? '#C4440E' :
    '#5F6874'};
`

const TopMatchLabel = styled.span`
  background: #097F3D;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  flex-shrink: 0;
`

const ScoreBarOuter = styled.div`
  width: 48px;
  height: 4px;
  border-radius: 2px;
  background: ${p => p.theme.surface2};
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 16px;
`

const ScoreBarFill = styled.div`
  height: 100%;
  border-radius: 2px;
  width: ${p => p.$score}%;
  background: ${p =>
    p.$score >= 90 ? '#097F3D' :
    p.$score >= 70 ? '#0637FF' :
    p.$score >= 50 ? '#C4440E' :
    '#BDC2C9'};
`

const BusinessMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: ${p => p.theme.textMuted};
`

const StatusDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 4px;
  background: ${p =>
    p.$status === 'Active' ? '#097F3D' :
    p.$status === 'Dissolved' ? '#CD2523' : '#BDC2C9'};
`

const SelectBtn = styled.button`
  background: ${p => p.theme.accent};
  color: #fff;
  border: none;
  border-radius: 35px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 120ms;
  &:hover { background: ${p => p.theme.accentHover}; }
`

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${p => p.theme.surface2};
  border-top-color: ${p => p.theme.accent};
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 60px auto 16px;
  @keyframes spin { to { transform: rotate(360deg); } }
`

const LoadingText = styled.p`
  text-align: center;
  font-size: 14px;
  color: ${p => p.theme.textMuted};
  margin-bottom: 60px;
`

const RegNumber = styled.span`
  font-family: monospace;
  font-size: 12px;
  color: ${p => p.theme.textFaint};
`

const AutoPickBanner = styled.div`
  background: #E2F7E6;
  border: 1px solid #B7E8C0;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #097F3D;
  font-weight: 500;
`

const MatchingInfo = styled.div`
  font-size: 11.5px;
  color: ${p => p.theme.accent};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
`

const AttrBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(60,90,97,0.08);
  color: ${p => p.theme.accent};
  border: 1px solid ${p => p.theme.borderLight};
`

export default function BusinessSelectPage({ onSelectBusiness, settings }) {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = location.state
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState([])
  const [autoSelected, setAutoSelected] = useState(false)

  const threshold = settings?.autoSelectThreshold ?? 0

  useEffect(() => {
    if (!searchData) {
      navigate('/')
      return
    }

    const mockResults = getMockResults(searchData)
    const topResult = mockResults[0]
    const shouldAutoSelect = threshold > 0 && topResult && topResult.score >= threshold

    if (shouldAutoSelect) {
      const timer = setTimeout(() => {
        setResults(mockResults)
        setAutoSelected(true)
        setLoading(false)
        setTimeout(() => {
          onSelectBusiness({ searchData, selectedBusiness: topResult })
        }, 800)
      }, 1000)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setResults(mockResults)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!searchData) return null

  function handleSelect(business) {
    onSelectBusiness({ searchData, selectedBusiness: business })
  }

  const isoOrJurisdiction = searchData.formData.isoCode || searchData.formData.jurisdiction
  const searchTerm = searchData.formData.businessName || searchData.formData.keyword || searchData.formData.registrationNumber
  const fd = searchData.formData
  const submittedAttrs = [
    fd.entityType && 'Entity type',
    fd.addressLine1 && 'Address',
    fd.city && 'City',
    fd.stateProvince && 'State/Province',
    fd.officers && 'Officers'
  ].filter(Boolean)

  return (
    <div>
      <BackBtn onClick={() => navigate('/')}>&lsaquo; Businesses</BackBtn>
      <PageTitle>Select a Business</PageTitle>
      <PageDesc>
        {results.length > 0
          ? 'We found the following matches. Select the correct business to continue.'
          : 'Searching registries for matching businesses...'}
      </PageDesc>
      <SearchMeta>
        <MetaBadge>{searchData.region.label}</MetaBadge>
        {isoOrJurisdiction && <MetaBadge>{isoOrJurisdiction}</MetaBadge>}
        {searchTerm && <MetaBadge>"{searchTerm}"</MetaBadge>}
        {submittedAttrs.map(attr => <AttrBadge key={attr}>{attr}</AttrBadge>)}
        {!loading && <ResultCount>{results.length} results</ResultCount>}
      </SearchMeta>
      {submittedAttrs.length > 0 && (
        <MatchingInfo>
          ⚡ {submittedAttrs.length} attribute{submittedAttrs.length !== 1 ? 's' : ''} used to improve matching confidence
        </MatchingInfo>
      )}

      {loading ? (
        <>
          <Spinner />
          <LoadingText>
            {threshold > 0
              ? 'Searching registries and evaluating matches...'
              : 'Searching registries...'}
          </LoadingText>
        </>
      ) : (
        <>
          {autoSelected && (
            <AutoPickBanner>
              Top match scores {results[0]?.score}% — above your {threshold}% threshold. Selecting automatically...
            </AutoPickBanner>
          )}
          <TableCard>
            {results.map((biz, i) => (
              <BusinessRow key={i} onClick={() => handleSelect(biz)}>
                <BusinessInfo>
                  <BusinessNameRow>
                    <BusinessName>{biz.name}</BusinessName>
                    {i === 0 && biz.score >= 80 && <TopMatchLabel>Top Match</TopMatchLabel>}
                    <ScoreBadge $score={biz.score}>{biz.score}%</ScoreBadge>
                  </BusinessNameRow>
                  <BusinessMeta>
                    <span><StatusDot $status={biz.status} />{biz.status}</span>
                    <span>{biz.jurisdiction}</span>
                    <RegNumber>{biz.registrationNumber}</RegNumber>
                    {biz.legalForm && <span>{biz.legalForm}</span>}
                  </BusinessMeta>
                </BusinessInfo>
                <ScoreBarOuter><ScoreBarFill $score={biz.score} /></ScoreBarOuter>
                <SelectBtn>Select</SelectBtn>
              </BusinessRow>
            ))}
          </TableCard>
        </>
      )}
    </div>
  )
}

function getMockResults(searchData) {
  const { formData, region } = searchData
  const name = formData.businessName || formData.keyword || ''
  const regNum = formData.registrationNumber || ''
  const iso = formData.isoCode || ''
  const jurisdiction = formData.jurisdiction || ''
  const hasRegNumber = !!regNum

  const mocksByKey = {
    'CA-ON': [
      { name: 'Shopify Inc.', registrationNumber: '1234567', jurisdiction: 'Ontario, Canada', legalForm: 'Corporation', status: 'Active', registeredDate: '2006-09-28' },
      { name: 'Shopify Payments (Canada) Inc.', registrationNumber: '2345678', jurisdiction: 'Ontario, Canada', legalForm: 'Corporation', status: 'Active', registeredDate: '2014-02-15' },
      { name: 'Shopify Commerce Inc.', registrationNumber: '3456789', jurisdiction: 'Ontario, Canada', legalForm: 'Corporation', status: 'Active', registeredDate: '2019-08-01' },
    ],
    'CA-BC': [
      { name: 'Wealthsimple Technologies Inc.', registrationNumber: 'BC0123456', jurisdiction: 'British Columbia, Canada', legalForm: 'Corporation', status: 'Active', registeredDate: '2014-09-12' },
      { name: 'Wealthsimple Financial Corp.', registrationNumber: 'BC0234567', jurisdiction: 'British Columbia, Canada', legalForm: 'Corporation', status: 'Active', registeredDate: '2016-03-20' },
      { name: 'Wealthsimple Digital Assets Inc.', registrationNumber: 'BC0345678', jurisdiction: 'British Columbia, Canada', legalForm: 'Corporation', status: 'Active', registeredDate: '2021-01-10' },
    ],
    'CA-QC': [
      { name: 'Element AI Inc.', registrationNumber: '1171234567', jurisdiction: 'Quebec, Canada', legalForm: 'Corporation', status: 'Active', registeredDate: '2016-10-05' },
      { name: 'Element AI Solutions Inc.', registrationNumber: '1171234890', jurisdiction: 'Quebec, Canada', legalForm: 'Corporation', status: 'Dissolved', registeredDate: '2018-04-12' },
    ],
    GB: [
      { name: 'Revolut Ltd', registrationNumber: '08804411', jurisdiction: 'England, UK', legalForm: 'Ltd', status: 'Active', registeredDate: '2014-12-10' },
      { name: 'Revolut Holdings Ltd', registrationNumber: '13691355', jurisdiction: 'England, UK', legalForm: 'Ltd', status: 'Active', registeredDate: '2021-09-14' },
      { name: 'Revolut Travel Ltd', registrationNumber: '10302063', jurisdiction: 'England, UK', legalForm: 'Ltd', status: 'Active', registeredDate: '2016-07-22' },
      { name: 'Revolut Insurance Europe DAC', registrationNumber: '09991876', jurisdiction: 'England, UK', legalForm: 'DAC', status: 'Active', registeredDate: '2019-01-09' },
    ],
    DE: [
      { name: 'N26 GmbH', registrationNumber: 'HRB 190048 B', jurisdiction: 'Berlin, Germany', legalForm: 'GmbH', status: 'Active', registeredDate: '2013-02-05' },
      { name: 'N26 Bank GmbH', registrationNumber: 'HRB 191979 B', jurisdiction: 'Berlin, Germany', legalForm: 'GmbH', status: 'Active', registeredDate: '2015-04-12' },
      { name: 'N26 Operations GmbH', registrationNumber: 'HRB 203344 B', jurisdiction: 'Berlin, Germany', legalForm: 'GmbH', status: 'Active', registeredDate: '2018-06-01' },
    ],
    FR: [
      { name: 'Qonto SAS', registrationNumber: '819 451 869', jurisdiction: 'Paris, France', legalForm: 'SAS', status: 'Active', registeredDate: '2016-04-15' },
      { name: 'Qonto France SAS', registrationNumber: '832 908 113', jurisdiction: 'Paris, France', legalForm: 'SAS', status: 'Active', registeredDate: '2018-02-20' },
    ],
    NL: [
      { name: 'Adyen N.V.', registrationNumber: '34259528', jurisdiction: 'Amsterdam, Netherlands', legalForm: 'N.V.', status: 'Active', registeredDate: '2006-08-28' },
      { name: 'Adyen International B.V.', registrationNumber: '61876379', jurisdiction: 'Amsterdam, Netherlands', legalForm: 'B.V.', status: 'Active', registeredDate: '2014-11-01' },
    ],
    IE: [
      { name: 'Stripe Payments Europe Ltd', registrationNumber: '513174', jurisdiction: 'Dublin, Ireland', legalForm: 'Ltd', status: 'Active', registeredDate: '2012-06-01' },
      { name: 'Stripe Technology Europe Ltd', registrationNumber: '599050', jurisdiction: 'Dublin, Ireland', legalForm: 'Ltd', status: 'Active', registeredDate: '2016-11-20' },
    ],
    SG: [
      { name: 'Sea Limited', registrationNumber: '201717491H', jurisdiction: 'Singapore', legalForm: 'Ltd', status: 'Active', registeredDate: '2017-06-01' },
      { name: 'Sea Capital Singapore Pte. Ltd.', registrationNumber: '201927312K', jurisdiction: 'Singapore', legalForm: 'Pte. Ltd.', status: 'Active', registeredDate: '2019-09-15' },
      { name: 'Sea Digital Financial Pte. Ltd.', registrationNumber: '202015732G', jurisdiction: 'Singapore', legalForm: 'Pte. Ltd.', status: 'Active', registeredDate: '2020-06-18' },
    ],
    HK: [
      { name: 'Tencent Holdings Ltd', registrationNumber: '0700', jurisdiction: 'Hong Kong', legalForm: 'Ltd', status: 'Active', registeredDate: '2004-06-16' },
      { name: 'Tencent International Service Ltd', registrationNumber: '1543976', jurisdiction: 'Hong Kong', legalForm: 'Ltd', status: 'Active', registeredDate: '2010-03-05' },
    ],
    JP: [
      { name: 'SoftBank Group Corp.', registrationNumber: '0104-01-002594', jurisdiction: 'Tokyo, Japan', legalForm: 'KK', status: 'Active', registeredDate: '1981-09-03' },
      { name: 'SoftBank Corp.', registrationNumber: '0104-01-046812', jurisdiction: 'Tokyo, Japan', legalForm: 'KK', status: 'Active', registeredDate: '1986-12-09' },
    ],
    AU: [
      { name: 'Afterpay Ltd', registrationNumber: '618 280 649', jurisdiction: 'New South Wales, Australia', legalForm: 'Ltd', status: 'Active', registeredDate: '2016-06-20' },
      { name: 'Afterpay Pty Ltd', registrationNumber: '601 427 420', jurisdiction: 'New South Wales, Australia', legalForm: 'Pty Ltd', status: 'Active', registeredDate: '2014-06-27' },
      { name: 'Afterpay Corporate Services Pty Ltd', registrationNumber: '634 456 778', jurisdiction: 'New South Wales, Australia', legalForm: 'Pty Ltd', status: 'Active', registeredDate: '2019-11-01' },
    ],
    IN: [
      { name: 'Razorpay Software Private Limited', registrationNumber: 'U72200KA2013PTC097462', jurisdiction: 'Karnataka, India', legalForm: 'Pvt Ltd', status: 'Active', registeredDate: '2013-12-19' },
      { name: 'Razorpay Technologies Private Limited', registrationNumber: 'U74999KA2017PTC104474', jurisdiction: 'Karnataka, India', legalForm: 'Pvt Ltd', status: 'Active', registeredDate: '2017-08-10' },
    ],
  }

  let key = iso
  if (region.id === 'canada') {
    key = `CA-${jurisdiction}`
  }

  let candidates = mocksByKey[key]

  if (!candidates) {
    const baseName = name || regNum || 'Example Corp'
    candidates = [
      { name: baseName, registrationNumber: 'REG-001234', status: 'Active', jurisdiction: key, legalForm: 'Ltd', registeredDate: '2015-03-10' },
      { name: `${baseName} Holdings`, registrationNumber: 'REG-005678', status: 'Active', jurisdiction: key, legalForm: 'Ltd', registeredDate: '2018-07-22' },
      { name: `${baseName} International`, registrationNumber: 'REG-009012', status: 'Dissolved', jurisdiction: key, legalForm: 'Ltd', registeredDate: '2012-01-15' },
    ]
  }

  // Count submitted attributes for score boosting
  const attrCount = [
    formData.entityType, formData.addressLine1, formData.city,
    formData.stateProvince, formData.officers
  ].filter(Boolean).length

  return candidates.map((biz, i) => {
    let score
    if (hasRegNumber) {
      if (i === 0) {
        score = 97
      } else {
        score = Math.max(15, 55 - i * 18 + Math.floor(Math.random() * 5))
      }
    } else {
      if (i === 0) {
        score = 82 + Math.floor(Math.random() * 10)
        // Boost top match when extra attributes are submitted
        if (attrCount > 0) score = Math.min(97, score + attrCount * 3)
      } else if (i === 1) {
        score = 55 + Math.floor(Math.random() * 15)
        if (attrCount > 0) score = Math.max(20, score - attrCount * 2)
      } else {
        score = Math.max(12, 40 - (i - 2) * 14 + Math.floor(Math.random() * 10))
        if (attrCount > 0) score = Math.max(8, score - attrCount * 3)
      }
    }
    return { ...biz, score }
  }).sort((a, b) => b.score - a.score)
}
