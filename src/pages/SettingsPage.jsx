import React from 'react'
import styled from 'styled-components'

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0B3139;
  margin-bottom: 6px;
`

const PageDesc = styled.p`
  font-size: 14px;
  color: #5F6874;
  margin-bottom: 28px;
`

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  margin-bottom: 16px;
`

const CardTitle = styled.h3`
  font-size: 11px;
  font-weight: 600;
  color: #9DADB0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ECF0F4;
`

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #ECF0F4;
  &:last-child { border-bottom: none; }
`

const SettingInfo = styled.div`
  flex: 1;
  margin-right: 24px;
`

const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0B3139;
  margin-bottom: 3px;
`

const SettingDesc = styled.div`
  font-size: 12px;
  color: #5F6874;
  line-height: 1.5;
`

const Toggle = styled.button`
  width: 40px;
  height: 22px;
  border-radius: 11px;
  border: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background 200ms;
  background: ${p => p.$on ? '#3C5A61' : '#D9E0E8'};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${p => p.$on ? '21px' : '3px'};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    transition: left 200ms;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  }
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

const ThresholdControl = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
`

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`

const Slider = styled.input`
  width: 140px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 2px;
  background: #ECF0F4;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${p => p.$active ? '#3C5A61' : '#9DADB0'};
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${p => p.$active ? '#3C5A61' : '#9DADB0'};
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`

const ThresholdValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${p => p.$active ? '#3C5A61' : '#9DADB0'};
  min-width: 48px;
  text-align: right;
  font-variant-numeric: tabular-nums;
`

const SliderLabel = styled.div`
  font-size: 10px;
  color: #9DADB0;
  text-align: right;
`

const ThresholdPreview = styled.div`
  margin-top: 8px;
  font-size: 11px;
  line-height: 1.5;
  color: #5F6874;
`

const ThresholdBadge = styled.span`
  display: inline-block;
  padding: 1px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  margin-left: 4px;
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

export default function SettingsPage({ settings, onUpdateSettings }) {
  const threshold = settings.autoSelectThreshold ?? 0
  const thresholdActive = threshold > 0

  function handleThresholdChange(e) {
    const val = parseInt(e.target.value, 10)
    onUpdateSettings({ ...settings, autoSelectThreshold: val })
  }

  function handleToggleThreshold() {
    if (thresholdActive) {
      onUpdateSettings({ ...settings, autoSelectThreshold: 0 })
    } else {
      onUpdateSettings({ ...settings, autoSelectThreshold: 90 })
    }
  }

  return (
    <div>
      <PageTitle>Settings</PageTitle>
      <PageDesc>Configure your account and verification preferences.</PageDesc>

      <Card>
        <CardTitle>Products</CardTitle>
        <SettingRow data-tension="13">
          <SettingInfo>
            <SettingLabel>
              International Search
              <NewBadge>NEW</NewBadge>
            </SettingLabel>
            <SettingDesc>
              Enable international business verification across Canada, Europe, and APAC regions.
              When disabled, only Domestic Verify will be available when placing orders.
            </SettingDesc>
          </SettingInfo>
          <Toggle
            $on={settings.internationalSearchEnabled}
            onClick={() => onUpdateSettings({
              ...settings,
              internationalSearchEnabled: !settings.internationalSearchEnabled
            })}
          />
        </SettingRow>
      </Card>

      <Card>
        <CardTitle>Matching Behavior</CardTitle>
        <SettingRow style={{ flexWrap: 'wrap' }}>
          <SettingInfo>
            <SettingLabel>Auto-Select Confidence Threshold</SettingLabel>
            <SettingDesc>
              When enabled, if the top search result scores at or above the threshold, it will
              be automatically selected — skipping the manual business selection step.
            </SettingDesc>
            {thresholdActive && (
              <ThresholdPreview>
                Results scoring <ThresholdBadge $score={threshold}>{threshold}%+</ThresholdBadge> will be auto-selected.
                {threshold >= 95 && ' Only near-exact matches (e.g. registration number lookups) will auto-pick.'}
                {threshold >= 85 && threshold < 95 && ' Strong name matches and registration number lookups will auto-pick.'}
                {threshold >= 70 && threshold < 85 && ' Most confident matches will auto-pick.'}
                {threshold < 70 && ' Low threshold — many results will be auto-picked.'}
              </ThresholdPreview>
            )}
          </SettingInfo>
          <ThresholdControl>
            {thresholdActive && (
              <SliderWrapper>
                <Slider
                  type="range"
                  min={50}
                  max={99}
                  value={threshold}
                  $active={thresholdActive}
                  onChange={handleThresholdChange}
                />
                <SliderLabel>50% — 99%</SliderLabel>
              </SliderWrapper>
            )}
            <ThresholdValue $active={thresholdActive}>
              {thresholdActive ? `${threshold}%` : 'Off'}
            </ThresholdValue>
            <Toggle $on={thresholdActive} onClick={handleToggleThreshold} />
          </ThresholdControl>
        </SettingRow>
      </Card>

      <Card>
        <CardTitle>Account</CardTitle>
        <SettingRow>
          <SettingInfo>
            <SettingLabel>Company Name</SettingLabel>
            <SettingDesc>Acme Corp</SettingDesc>
          </SettingInfo>
        </SettingRow>
        <SettingRow>
          <SettingInfo>
            <SettingLabel>Plan</SettingLabel>
            <SettingDesc>Growth</SettingDesc>
          </SettingInfo>
        </SettingRow>
        <SettingRow>
          <SettingInfo>
            <SettingLabel>API Keys</SettingLabel>
            <SettingDesc style={{ fontFamily: 'monospace', fontSize: 13 }}>sk_live_•••••••••••••4f2a</SettingDesc>
          </SettingInfo>
        </SettingRow>
      </Card>
    </div>
  )
}
