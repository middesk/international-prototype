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
  },
  {
    id: 'ord_004',
    businessName: 'Cypto Bridge Ltd',
    region: 'Extended Europe',
    regionId: 'extended-europe',
    isoCode: 'GI',
    registrationNumber: '115234',
    status: 'active',
    createdAt: '2026-03-21',
    result: {
      name: 'Cypto Bridge Ltd',
      registrationNumber: '115234',
      standardizedStatus: 'Active',
      registryStatus: 'REGISTERED',
      registeredJurisdiction: 'Gibraltar',
      registeredDate: '2019-06-10',
      statusUpdatedDate: '2024-08-01',
      address: {
        registered: '57/63 Line Wall Road, Gibraltar'
      },
      source: 'Gibraltar Companies House'
    }
  },
  {
    id: 'ord_005',
    businessName: '深圳市腾讯计算机系统有限公司',
    region: 'APAC',
    regionId: 'apac',
    isoCode: 'CN',
    registrationNumber: '91440300708461136T',
    status: 'active',
    createdAt: '2026-03-20',
    result: {
      name: '深圳市腾讯计算机系统有限公司',
      registrationNumber: '91440300708461136T',
      registryType: '有限责任公司',
      standardizedStatus: 'Active',
      registryStatus: '存续（在营、开业、在册）',
      registeredJurisdiction: 'Shenzhen, China',
      registeredDate: '1998-11-11',
      statusUpdatedDate: '2025-01-01',
      legalForm: '有限责任公司',
      companyActivity: '增值电信业务',
      address: {
        registered: '深圳市南山区粤海街道麻岭社区科技中一路腾讯大厦35层'
      },
      parties: [
        { name: '马化腾', type: '法定代表人', effectiveDate: '1998-11-11' }
      ],
      source: 'National Enterprise Credit Information Publicity System (China)'
    }
  },
  {
    id: 'ord_006',
    businessName: 'Stripe Payments Europe Ltd',
    region: 'Core Europe',
    regionId: 'core-europe',
    isoCode: 'IE',
    registrationNumber: '513174',
    status: 'active',
    createdAt: '2026-03-19',
    result: {
      name: 'Stripe Payments Europe Ltd',
      registrationNumber: '513174',
      registryType: 'Private Company Limited by Shares',
      standardizedStatus: 'Active',
      registryStatus: 'NORMAL',
      registeredJurisdiction: 'Dublin, Ireland',
      registeredDate: '2012-06-01',
      statusUpdatedDate: '2025-02-01',
      legalForm: 'Ltd',
      registrationAuthority: 'Companies Registration Office (CRO)',
      address: {
        registered: '1 Grand Canal Street Lower, Grand Canal Dock, Dublin 2, Ireland'
      },
      parties: [
        { name: 'Patrick Collison', type: 'Director', effectiveDate: '2012-06-01' },
        { name: 'John Collison', type: 'Director', effectiveDate: '2012-06-01' },
        { name: 'Dhivya Suryadevara', type: 'Director', effectiveDate: '2022-09-01' }
      ],
      events: [
        { type: 'Incorporation', date: '2012-06-01', description: 'Registered with CRO Ireland' },
        { type: 'Address Change', date: '2023-03-15', description: 'Moved to Grand Canal Street Lower' }
      ],
      source: 'CRO (Ireland)'
    }
  },
  {
    id: 'ord_007',
    businessName: 'Wealthsimple Financial Corp.',
    region: 'Canada',
    regionId: 'canada',
    isoCode: 'CA',
    jurisdiction: 'QC',
    registrationNumber: '1171234890',
    status: 'active',
    createdAt: '2026-03-18',
    result: {
      name: 'Wealthsimple Financial Corp.',
      registrationNumber: '1171234890',
      registryType: 'Corporation',
      standardizedStatus: 'Dissolved',
      registryStatus: 'DISSOUTE',
      registeredJurisdiction: 'Quebec, Canada',
      registeredDate: '2018-04-12',
      statusUpdatedDate: '2024-06-15',
      address: {
        registered: '1000 rue De La Gauchetière O, Montréal, QC H3B 4W5, Canada'
      },
      parties: [
        { name: 'Jean-Pierre Tremblay', type: 'Administrateur', effectiveDate: '2018-04-12' }
      ],
      events: [
        { type: 'Immatriculation', date: '2018-04-12', description: 'Société immatriculée au Registraire des entreprises du Québec' },
        { type: 'Dissolution', date: '2024-06-15', description: 'Société dissoute' }
      ],
      source: 'Registraire des entreprises (Quebec)'
    }
  },
  {
    id: 'ord_008',
    businessName: 'Revolut Ltd',
    region: 'Core Europe',
    regionId: 'core-europe',
    isoCode: 'GB',
    registrationNumber: '08804411',
    status: 'active',
    createdAt: '2026-03-17',
    result: {
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
      relatedEntities: [
        { name: 'Revolut Holdings Ltd', jurisdiction: 'England, UK', regNumber: '13691355', relationship: 'Parent company' },
        { name: 'Revolut Payments UAB', jurisdiction: 'Lithuania', regNumber: '304580906', relationship: 'EU licensed subsidiary' },
        { name: 'Revolut Ltd (Australia)', jurisdiction: 'Australia', regNumber: '637 798 790', relationship: 'APAC subsidiary' }
      ],
      events: [
        { type: 'Incorporation', date: '2014-12-10', description: 'Registered at Companies House' },
        { type: 'Capital Increase', date: '2021-07-15', description: 'Series E funding round — valuation raised to $33B' },
        { type: 'Banking Licence', date: '2024-07-25', description: 'FCA banking licence granted' }
      ],
      source: 'Companies House (UK)'
    }
  },
  {
    id: 'ord_009',
    businessName: 'SolarTech Pte. Ltd.',
    region: 'APAC',
    regionId: 'apac',
    isoCode: 'SG',
    registrationNumber: '202012345K',
    status: 'active',
    createdAt: '2026-03-16',
    result: {
      name: 'SolarTech Pte. Ltd.',
      registrationNumber: '202012345K',
      registryType: 'Private Company Limited by Shares',
      standardizedStatus: 'Active',
      registryStatus: 'LIVE',
      registeredJurisdiction: 'Singapore',
      registeredDate: '2020-03-15',
      statusUpdatedDate: '2025-02-01',
      legalForm: 'Pte. Ltd.',
      address: {
        registered: '10 Anson Road, #20-05 International Plaza, Singapore 079903'
      },
      parties: [
        { name: 'Wei Lin Chen', type: 'Director', effectiveDate: '2020-03-15' }
      ],
      shareholders: [
        { name: 'Tencent Holdings Ltd', sharePercentage: '35.0%', shareCount: '350,000' },
        { name: 'SoftBank Vision Fund II', sharePercentage: '22.0%', shareCount: '220,000' },
        { name: 'Wei Lin Chen', sharePercentage: '43.0%', shareCount: '430,000' }
      ],
      source: 'ACRA (Singapore)'
    }
  },
  {
    id: 'ord_011',
    businessName: 'Shopify Inc. (Federal)',
    region: 'Canada',
    regionId: 'canada',
    isoCode: 'CA',
    jurisdiction: 'FED',
    registrationNumber: '7654321-8',
    status: 'active',
    createdAt: '2026-03-16',
    result: {
      name: 'Shopify Inc.',
      registrationNumber: '7654321-8',
      registryType: 'Corporation',
      standardizedStatus: 'Active',
      registryStatus: 'ACTIVE',
      registeredJurisdiction: 'Federal, Canada',
      registeredDate: '2006-09-28',
      statusUpdatedDate: '2024-01-15',
      registrationAuthority: 'Corporations Canada',
      address: {
        registered: '150 Elgin St, Suite 800, Ottawa, ON K2P 1L4, Canada'
      },
      parties: [
        { name: 'Tobias Lütke', type: 'Director', effectiveDate: '2006-09-28' },
        { name: 'Harley Finkelstein', type: 'Officer', effectiveDate: '2010-06-01' }
      ],
      relatedEntities: [
        { name: 'Shopify Inc.', jurisdiction: 'Ontario, Canada', regNumber: '1234567', relationship: 'Provincial registration' },
        { name: 'Shopify Payments (Canada) Inc.', jurisdiction: 'Ontario, Canada', regNumber: '2345678', relationship: 'Subsidiary (provincial)' },
        { name: 'Shopify International Ltd', jurisdiction: 'Dublin, Ireland', regNumber: '614814', relationship: 'International subsidiary' }
      ],
      events: [
        { type: 'Federal Incorporation', date: '2006-09-28', description: 'Incorporated under Canada Business Corporations Act' },
        { type: 'Extra-Provincial Registration', date: '2006-10-15', description: 'Registered in Ontario as extra-provincial corporation' }
      ],
      source: 'Corporations Canada'
    }
  },
  {
    id: 'ord_010',
    businessName: 'Nordic Payments AS',
    region: 'Extended Europe',
    regionId: 'extended-europe',
    isoCode: 'NO',
    registrationNumber: '912345678',
    status: 'active',
    createdAt: '2026-03-15',
    result: {
      name: 'Nordic Payments AS',
      registrationNumber: '912345678',
      standardizedStatus: 'Liquidation',
      registryStatus: 'Under avvikling',
      registeredJurisdiction: 'Oslo, Norway',
      registeredDate: '2017-08-22',
      statusUpdatedDate: '2025-11-01',
      source: 'Brønnøysundregistrene (Norway)'
    }
  }
]
