import React, { useState } from 'react'
import styled from 'styled-components'
import { REGIONS } from '../mockData'

/* ── Full-page overlay (matches Middesk order flow) ── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #fff;
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
  color: #0B3139;
  letter-spacing: -0.5px;
`

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #5F6874;
  font-size: 28px;
  line-height: 1;
  &:hover { color: #0B3139; }
`

const Content = styled.div`
  max-width: 540px;
  margin: 0 auto;
  padding: 0 24px 60px;
`

const BackLink = styled.button`
  background: none;
  border: none;
  color: #3C5A61;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { color: #0B3139; }
`

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #0B3139;
  margin-bottom: 4px;
`

const PageSubtitle = styled.p`
  font-size: 14px;
  color: #5F6874;
  margin-bottom: 32px;
`

const SectionCard = styled.div`
  border: 1px solid #D9E0E8;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 16px;
  background: #fff;
`

const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0B3139;
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
  border: 2px solid ${p => p.$checked ? '#3C5A61' : '#BDC2C9'};
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
    background: ${p => p.$checked ? '#3C5A61' : 'transparent'};
    transition: background 150ms;
  }
`

const RadioLabel = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  color: #0B3139;
`

const RadioDesc = styled.div`
  font-size: 12px;
  color: #5F6874;
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
  color: #5F6874;
  background: #ECF0F4;
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
  border: 2px solid ${p => p.$selected ? '#3C5A61' : '#D9E0E8'};
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  background: ${p => p.$selected ? '#F0F5F6' : '#fff'};
  transition: border-color 150ms, background 150ms;

  &:hover { border-color: #9DADB0; }
`

const RegionFlag = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`

const RegionName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0B3139;
`

const RegionMarkets = styled.div`
  font-size: 11px;
  color: #5F6874;
  margin-top: 3px;
  line-height: 1.4;
`

const RegionMultiple = styled.div`
  font-size: 11px;
  color: #3C5A61;
  font-weight: 600;
  margin-top: 4px;
`

/* ── Form fields ── */

const FieldLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
`

const Required = styled.span`
  color: #CD2523;
  margin-left: 2px;
`

const Input = styled.input`
  width: 100%;
  border: 1px solid #D9E0E8;
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 150ms;
  margin-bottom: 18px;

  &:focus { border-color: #3C5A61; }
  &::placeholder { color: #BDC2C9; }
`

const Select = styled.select`
  width: 100%;
  border: 1px solid #D9E0E8;
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 14px;
  color: #333;
  outline: none;
  background: #fff;
  cursor: pointer;
  margin-bottom: 18px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235F6874' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;

  &:focus { border-color: #3C5A61; }
`

const InfoBox = styled.div`
  background: #ECF0F4;
  border: 1px solid #D9E0E8;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #5F6874;
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
  color: #5F6874;
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
  background: #D9E0E8;
  color: #5F6874;
  font-size: 9px;
  font-weight: 800;
  margin-right: 5px;
  vertical-align: middle;
`

const HintExample = styled.span`
  font-family: monospace;
  font-size: 11px;
  background: #ECF0F4;
  padding: 1px 5px;
  border-radius: 2px;
  color: #3C5A61;
`

/* ── Footer buttons ── */

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
`

const PrimaryButton = styled.button`
  background: #3C5A61;
  color: #fff;
  border: none;
  border-radius: 35px;
  padding: 9px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;

  &:hover { background: #6D8388; }
  &:disabled { background: #9DADB0; cursor: default; }
`

const SecondaryButton = styled.button`
  background: #fff;
  color: #333;
  border: 1px solid #D9E0E8;
  border-radius: 35px;
  padding: 9px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease;

  &:hover { border-color: #BDC2C9; }
`

const FooterText = styled.div`
  text-align: center;
  padding: 32px 0 24px;
  font-size: 10px;
  color: #BDC2C9;
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

function OrderForm({ region, formData, setFormData }) {
  if (!region) return null

  if (region.id === 'canada') {
    const hint = getRegHint('canada', formData.jurisdiction)
    return (
      <div>
        <InfoBox>
          Provide a Business/Corporate Number <strong>or</strong> Company Name, plus the Jurisdiction.
        </InfoBox>
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
        <FieldLabel>{hint ? hint.label : 'Business / Corporate Number'}</FieldLabel>
        <Input
          placeholder={hint ? `e.g. ${hint.example}` : 'e.g. BC1234567'}
          value={formData.registrationNumber || ''}
          onChange={e => setFormData(d => ({ ...d, registrationNumber: e.target.value }))}
        />
        {hint?.warn && (
          <WarnBox>
            <WarnIcon>⚠</WarnIcon>
            <span>{hint.warn}</span>
          </WarnBox>
        )}
        {!hint && formData.jurisdiction && (
          <FieldHint>
            <HintIcon>i</HintIcon>
            Enter the registry-issued incorporation or corporation number for this jurisdiction.
          </FieldHint>
        )}
        <FieldLabel>Company Name</FieldLabel>
        <Input
          placeholder="e.g. Shopify Inc."
          value={formData.businessName || ''}
          onChange={e => setFormData(d => ({ ...d, businessName: e.target.value }))}
        />
      </div>
    )
  }

  const isoOptions = getISOOptions(region.id)

  if (region.id === 'core-europe' || region.id === 'extended-europe') {
    const hint = getRegHint(region.id, formData.isoCode)
    return (
      <div>
        <InfoBox>
          Provide a Company Number <strong>or</strong> Company Name, plus the ISO country code.
        </InfoBox>
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
        <FieldLabel>{hint ? hint.label : 'Company Number'}</FieldLabel>
        <Input
          placeholder={hint ? `e.g. ${hint.example}` : 'e.g. HRB 190048 B'}
          value={formData.registrationNumber || ''}
          onChange={e => setFormData(d => ({ ...d, registrationNumber: e.target.value }))}
        />
        {hint?.warn && (
          <WarnBox>
            <WarnIcon>⚠</WarnIcon>
            <span>{hint.warn}</span>
          </WarnBox>
        )}
        <FieldLabel>Company Name</FieldLabel>
        <Input
          placeholder="e.g. N26 GmbH"
          value={formData.businessName || ''}
          onChange={e => setFormData(d => ({ ...d, businessName: e.target.value }))}
        />
      </div>
    )
  }

  if (region.id === 'apac' || region.id === 'australia') {
    const hint = getRegHint(region.id, formData.isoCode)
    return (
      <div>
        <InfoBox>
          APAC requires a country code and a keyword (company name or registration number).
        </InfoBox>
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
        <FieldLabel>Company Name or Registration Number <Required>*</Required></FieldLabel>
        <Input
          placeholder={hint ? `e.g. Sea Limited or ${hint.example}` : 'e.g. Sea Limited or 201717491H'}
          value={formData.keyword || ''}
          onChange={e => setFormData(d => ({ ...d, keyword: e.target.value }))}
        />
        {hint?.warn && (
          <WarnBox>
            <WarnIcon>⚠</WarnIcon>
            <span>{hint.warn}</span>
          </WarnBox>
        )}
        {hint && !hint.warn && (
          <FieldHint>
            <HintIcon>i</HintIcon>
            Registry number format: <HintExample>{hint.example}</HintExample> ({hint.label})
          </FieldHint>
        )}
        <FieldLabel>Language</FieldLabel>
        <Select
          value={formData.language || 'EN'}
          onChange={e => setFormData(d => ({ ...d, language: e.target.value }))}
        >
          <option value="EN">EN — English</option>
          <option value="OG">OG — Original Language</option>
          <option value="ALL">ALL — Both</option>
        </Select>
      </div>
    )
  }

  return null
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

  function handleSubmit() {
    onSubmit({ orderType, region: selectedRegion, formData })
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
