export const REGIONS = [
  { id: 'canada', label: 'Canada', flag: '🇨🇦', multiple: '1.5x', markets: 'Canada' },
  {
    id: 'core-europe',
    label: 'Core Europe',
    flag: '🇪🇺',
    multiple: '2.5–3x',
    markets: 'UK, France, Germany, Netherlands, Ireland, Italy, Belgium, Austria, Denmark, Finland, Sweden, Spain, Luxembourg, Slovenia, Latvia'
  },
  {
    id: 'extended-europe',
    label: 'Extended Europe',
    flag: '🌍',
    multiple: 'n/a',
    markets: 'Gibraltar, Guernsey, Jersey, Norway, Greece, Macedonia, Cyprus, Estonia'
  },
  {
    id: 'apac',
    label: 'APAC',
    flag: '🌏',
    multiple: '3–4x',
    markets: 'China, Hong Kong, Singapore, New Zealand, Malaysia, Japan, Taiwan, India, Vietnam, Thailand, Indonesia, Philippines, South Korea'
  },
  {
    id: 'australia',
    label: 'Australia',
    flag: '🇦🇺',
    multiple: '4x',
    markets: 'Australia'
  }
]

export const MOCK_RESULTS = {
  canada: {
    name: 'Wealthsimple Technologies Inc.',
    registrationNumber: 'BC0123456',
    registryType: 'Corporation',
    standardizedStatus: 'Active',
    registryStatus: 'ACTIVE',
    registeredJurisdiction: 'British Columbia, Canada',
    registeredDate: '2014-09-12',
    statusUpdatedDate: '2024-06-01',
    address: {
      registered: '860 Broadway W, Suite 400, Vancouver, BC V5Z 1K4, Canada',
      mail: '860 Broadway W, Suite 400, Vancouver, BC V5Z 1K4, Canada'
    },
    parties: [
      { name: 'Michael Katchen', type: 'Director', effectiveDate: '2014-09-12' },
      { name: 'Brett Huneycutt', type: 'Officer', effectiveDate: '2017-03-01' }
    ],
    events: [
      { type: 'Incorporation', date: '2014-09-12', description: 'Company incorporated in British Columbia' },
      { type: 'Address Change', date: '2021-04-15', description: 'Registered address updated to current location' }
    ],
    source: 'BC Corporate Registry'
  },
  'core-europe': {
    name: 'Revolut Ltd',
    registrationNumber: '08804411',
    registryType: 'Private Limited Company',
    standardizedStatus: 'Active',
    registryStatus: 'ACTIVE',
    registeredJurisdiction: 'England, United Kingdom',
    registeredDate: '2014-12-10',
    statusUpdatedDate: '2025-01-01',
    legalForm: 'Ltd',
    companyActivity: 'Financial Services / Electronic Money',
    registrationAuthority: 'Companies House (UK)',
    shareCapital: '£1,000',
    address: {
      registered: '7 Westferry Circus, Canary Wharf, London E14 4HD, United Kingdom'
    },
    parties: [
      { name: 'Nikolay Storonsky', type: 'CEO / Director', effectiveDate: '2014-12-10', dob: '1984-xx-xx', address: 'London, UK' },
      { name: 'Vlad Yatsenko', type: 'CTO / Director', effectiveDate: '2014-12-10', dob: '1986-xx-xx', address: 'London, UK' }
    ],
    shareholders: [
      { name: 'Nikolay Storonsky', sharePercentage: '26.4%', shareCount: '264,000' },
      { name: 'SoftBank Vision Fund', sharePercentage: '18.8%', shareCount: '188,000' },
      { name: 'Tiger Global Management', sharePercentage: '12.1%', shareCount: '121,000' }
    ],
    events: [
      { type: 'Incorporation', date: '2014-12-10', description: 'Registered at Companies House' },
      { type: 'Capital Increase', date: '2021-07-15', description: 'Series E funding round — valuation raised to $33B' },
      { type: 'Banking Licence', date: '2024-07-25', description: 'FCA banking licence granted' }
    ],
    source: 'Companies House (UK)'
  },
  'extended-europe': {
    name: 'Monzo Bank Ltd',
    registrationNumber: '09446231',
    standardizedStatus: 'Active',
    registryStatus: 'ACTIVE',
    registeredJurisdiction: 'England, United Kingdom',
    registeredDate: '2015-01-28',
    statusUpdatedDate: '2024-11-10',
    address: {
      registered: 'Broadwalk House, 5 Appold St, London EC2A 2AG, United Kingdom'
    },
    events: [
      { type: 'Incorporation', date: '2015-01-28', description: 'Registered at Companies House as Monzo Bank Ltd' }
    ],
    source: 'Companies House (UK)'
  },
  apac: {
    name: 'Sea Limited',
    registrationNumber: '201717491H',
    standardizedStatus: 'Active',
    registryStatus: 'ACTIVE',
    registeredJurisdiction: 'Singapore',
    registeredDate: '2017-06-01',
    statusUpdatedDate: '2024-12-01',
    address: {
      registered: '1 Fusionopolis Place, #17-10 Galaxis, Singapore 138522'
    },
    parties: [
      { name: 'Forrest Li', type: 'CEO / Director', effectiveDate: '2017-06-01', dob: '1978-xx-xx', address: 'Singapore' },
      { name: 'Gang Ye', type: 'COO / Director', effectiveDate: '2017-06-01', dob: '1979-xx-xx', address: 'Singapore' }
    ],
    shareholders: [
      { name: 'Forrest Li', sharePercentage: '17.3%', shareCount: '96,500,000' },
      { name: 'Tencent Holdings', sharePercentage: '18.7%', shareCount: '104,300,000' }
    ],
    events: [
      { type: 'Incorporation', date: '2017-06-01', description: 'Registered with ACRA Singapore' },
      { type: 'NYSE Listing', date: '2017-10-20', description: 'IPO on New York Stock Exchange' }
    ],
    source: 'ACRA (Singapore)'
  },
  australia: {
    name: 'Afterpay Pty Ltd',
    registrationNumber: '601 427 420',
    standardizedStatus: 'Active',
    registryStatus: 'ACTIVE',
    registeredJurisdiction: 'New South Wales, Australia',
    registeredDate: '2014-06-27',
    statusUpdatedDate: '2024-03-01',
    address: {
      registered: 'Level 5, 406 Collins Street, Melbourne VIC 3000, Australia'
    },
    parties: [
      { name: 'Nick Molnar', type: 'Director', effectiveDate: '2014-06-27' },
      { name: 'Anthony Eisen', type: 'Director', effectiveDate: '2014-06-27' }
    ],
    events: [
      { type: 'Incorporation', date: '2014-06-27', description: 'Registered with ASIC' }
    ],
    source: 'ASIC (Australian Securities and Investments Commission)'
  }
}

export const INITIAL_ORDERS = [
  {
    id: 'ord_001',
    businessName: 'Shopify Inc.',
    region: 'Canada',
    regionId: 'canada',
    isoCode: 'CA',
    jurisdiction: 'ON',
    registrationNumber: 'BC1234567',
    status: 'active',
    createdAt: '2026-03-20',
    result: {
      name: 'Shopify Inc.',
      registrationNumber: '1234567',
      registryType: 'Corporation',
      standardizedStatus: 'Active',
      registryStatus: 'ACTIVE',
      registeredJurisdiction: 'Ontario, Canada',
      registeredDate: '2006-09-28',
      statusUpdatedDate: '2024-01-15',
      address: {
        registered: '150 Elgin St, Suite 800, Ottawa, ON K2P 1L4, Canada',
        mail: '150 Elgin St, Suite 800, Ottawa, ON K2P 1L4, Canada'
      },
      parties: [
        { name: 'Tobias Lütke', type: 'Director', effectiveDate: '2006-09-28' },
        { name: 'Harley Finkelstein', type: 'Officer', effectiveDate: '2010-06-01' }
      ],
      events: [
        { type: 'Incorporation', date: '2006-09-28', description: 'Company incorporated in Ontario' },
        { type: 'Address Change', date: '2022-03-01', description: 'Registered address updated' }
      ],
      source: 'Ontario Business Registry'
    }
  },
  {
    id: 'ord_002',
    businessName: 'N26 GmbH',
    region: 'Core Europe',
    regionId: 'core-europe',
    isoCode: 'DE',
    registrationNumber: 'HRB 190048 B',
    status: 'active',
    createdAt: '2026-03-21',
    result: {
      name: 'N26 GmbH',
      registrationNumber: 'HRB 190048 B',
      registryType: 'Gesellschaft mit beschränkter Haftung',
      standardizedStatus: 'Active',
      registryStatus: 'ACTIVE',
      registeredJurisdiction: 'Berlin, Germany',
      registeredDate: '2013-02-05',
      statusUpdatedDate: '2025-01-01',
      legalForm: 'GmbH',
      companyActivity: 'Financial Services / Banking',
      registrationAuthority: 'Amtsgericht Charlottenburg',
      shareCapital: '€1,000,000',
      address: {
        registered: 'Klosterstraße 62, 10179 Berlin, Germany'
      },
      parties: [
        { name: 'Valentin Stalf', type: 'Managing Director', effectiveDate: '2013-02-05', dob: '1987-xx-xx', address: 'Berlin, Germany' },
        { name: 'Jan Kemper', type: 'Managing Director', effectiveDate: '2019-04-01', dob: '1977-xx-xx', address: 'Berlin, Germany' }
      ],
      shareholders: [
        { name: 'Insight Partners', sharePercentage: '28.5%', shareCount: '28,500,000' },
        { name: 'GIC Private Limited', sharePercentage: '15.2%', shareCount: '15,200,000' }
      ],
      events: [
        { type: 'Incorporation', date: '2013-02-05', description: 'Company registered at Amtsgericht Charlottenburg' },
        { type: 'Capital Increase', date: '2021-10-15', description: 'Share capital increased to €1,000,000' }
      ],
      source: 'Handelsregister (Germany)'
    }
  },
  {
    id: 'ord_003',
    businessName: 'Sea Limited',
    region: 'APAC',
    regionId: 'apac',
    isoCode: 'SG',
    registrationNumber: '201717491H',
    status: 'pending',
    createdAt: '2026-03-22',
    result: null
  }
]
