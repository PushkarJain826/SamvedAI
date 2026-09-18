/* ──────────────────────────────────────────────
   Mock data — schemes, laws, PACS, financial
   topics, sources. Kept separate from UI so it
   can be swapped for real API calls.
   ────────────────────────────────────────────── */

import type {
  Scheme,
  LawTopic,
  PacsService,
  FinancialTopic,
  Source,
  GrievanceCategory,
} from '@/types';

// ── Sources ──────────────────────────────────

export const mockSources: Source[] = [
  {
    id: 'src-1',
    title: 'Pradhan Mantri Fasal Bima Yojana — Operational Guidelines',
    authority: 'Ministry of Agriculture & Farmers Welfare, Government of India',
    section: 'Section 4 — Eligibility & Coverage',
    date: '2016',
    lastUpdated: 'Revised 2023',
    confidence: 'verified',
    description:
      'Official operational guidelines for the PMFBY crop insurance scheme.',
  },
  {
    id: 'src-2',
    title: 'Maharashtra Co-operative Societies Act, 1960',
    authority: 'Government of Maharashtra',
    section: 'Chapter III — Rights and Liabilities of Members',
    confidence: 'verified',
    description:
      'The primary legislation governing cooperative societies in Maharashtra.',
  },
  {
    id: 'src-3',
    title: 'Multi-State Co-operative Societies Act, 2002',
    authority: 'Ministry of Cooperation, Government of India',
    confidence: 'verified',
    description:
      'Central legislation for cooperative societies operating across states.',
  },
  {
    id: 'src-4',
    title: 'NABARD Guidelines for PACS',
    authority: 'National Bank for Agriculture and Rural Development',
    lastUpdated: '2024',
    confidence: 'verified',
    description:
      'Guidelines for the functioning and modernization of Primary Agricultural Credit Societies.',
  },
  {
    id: 'src-5',
    title: 'PM-KISAN Operational Guidelines',
    authority: 'Department of Agriculture & Farmers Welfare',
    lastUpdated: '2023',
    confidence: 'verified',
    description:
      'Official guidelines for the Pradhan Mantri Kisan Samman Nidhi scheme.',
  },
  {
    id: 'src-6',
    title: 'Kisan Credit Card Scheme Guidelines',
    authority: 'Reserve Bank of India / NABARD',
    confidence: 'multiple-sources',
    description:
      'Combined guidelines from RBI and NABARD for Kisan Credit Card implementation.',
  },
];

// ── Government Schemes ───────────────────────

export const mockSchemes: Scheme[] = [
  {
    id: 'scheme-1',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    titleHi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    titleMr: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    description:
      'Comprehensive crop insurance scheme covering pre-sowing to post-harvest losses due to natural calamities, pests, and diseases.',
    descriptionHi:
      'प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण बुवाई से लेकर फसल कटाई के बाद तक के नुकसान को कवर करने वाली व्यापक फसल बीमा योजना।',
    descriptionMr:
      'नैसर्गिक आपत्ती, कीटक आणि रोगांमुळे पेरणीपूर्व ते कापणीनंतरच्या नुकसानीसाठी सर्वसमावेशक पीक विमा योजना.',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'insurance',
    eligibility: [
      'All farmers (including sharecroppers and tenant farmers)',
      'Farmers growing notified crops in notified areas',
      'Both loanee and non-loanee farmers eligible',
    ],
    benefits: [
      'Coverage for standing crops, prevented sowing, post-harvest losses',
      'Low premium: 2% for Kharif, 1.5% for Rabi, 5% for horticulture/commercial crops',
      'No cap on government subsidy — full claim amount paid',
      'Technology-driven yield estimation and quick claim settlement',
    ],
    documents: [
      'Aadhaar card',
      'Land records / tenancy agreement',
      'Bank account details',
      'Sowing certificate from Patwari / revenue authority',
      'Crop photographs (for post-harvest claims)',
    ],
    applicationProcess: [
      'Visit nearest bank branch, PACS, or Common Service Centre (CSC)',
      'Fill the PMFBY application form with crop and land details',
      'Submit required documents and pay the farmer share of premium',
      'Receive policy confirmation and note your application reference number',
      'In case of crop loss, report to the insurance company or helpline within 72 hours',
    ],
    source: mockSources[0],
    lastUpdated: '2023',
  },
  {
    id: 'scheme-2',
    title: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    titleHi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    titleMr: 'प्रधानमंत्री किसान सन्मान निधी (PM-KISAN)',
    description:
      'Direct income support of ₹6,000 per year to eligible farmer families, paid in three equal installments of ₹2,000 each.',
    descriptionHi:
      'पात्र किसान परिवारों को ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, ₹2,000 की तीन समान किस्तों में।',
    descriptionMr:
      'पात्र शेतकरी कुटुंबांना दरवर्षी ₹6,000 थेट उत्पन्न सहाय्य, प्रत्येकी ₹2,000 च्या तीन समान हप्त्यांमध्ये.',
    ministry: 'Department of Agriculture & Farmers Welfare',
    category: 'welfare',
    eligibility: [
      'All landholding farmer families',
      'Subject to certain exclusion criteria (institutional landholders, income-tax payers, etc.)',
    ],
    benefits: [
      '₹6,000 per year in three installments',
      'Direct bank transfer',
      'No intermediaries',
    ],
    documents: [
      'Aadhaar card',
      'Bank account linked to Aadhaar',
      'Land ownership documents',
    ],
    applicationProcess: [
      'Visit the PM-KISAN portal or nearest CSC',
      'Register with Aadhaar, bank details, and land records',
      'Verification by state/district agriculture officials',
      'Installments transferred directly to bank account',
    ],
    source: mockSources[4],
    lastUpdated: '2023',
  },
  {
    id: 'scheme-3',
    title: 'Kisan Credit Card (KCC)',
    titleHi: 'किसान क्रेडिट कार्ड (KCC)',
    titleMr: 'किसान क्रेडिट कार्ड (KCC)',
    description:
      'Provides farmers with affordable short-term credit for crop production, post-harvest needs, and farm maintenance.',
    descriptionHi:
      'किसानों को फसल उत्पादन, फसल कटाई के बाद की जरूरतों और खेत के रखरखाव के लिए सस्ता अल्पकालिक ऋण।',
    descriptionMr:
      'शेतकऱ्यांना पीक उत्पादन, कापणीनंतरच्या गरजा आणि शेत देखभालीसाठी परवडणारे अल्पकालीन कर्ज.',
    ministry: 'Ministry of Finance / NABARD / RBI',
    category: 'credit',
    eligibility: [
      'All farmers — individual or joint — owning cultivable land',
      'Tenant farmers and sharecroppers',
      'Self-help groups and joint liability groups of farmers',
    ],
    benefits: [
      'Credit limit based on land holding and crop pattern',
      'Subsidized interest rate (currently 7% with 3% subvention for timely repayment)',
      'Flexible withdrawal and repayment',
      'Insurance coverage under PMFBY automatically linked',
    ],
    documents: [
      'Aadhaar card',
      'Land records / ownership proof',
      'Passport-size photographs',
      'Bank application form',
    ],
    applicationProcess: [
      'Approach nearest bank branch (public/private/cooperative) or PACS',
      'Fill the KCC application form',
      'Submit documents and land records',
      'Bank assesses and sanctions credit limit',
      'KCC card issued — use for withdrawals as needed',
    ],
    source: mockSources[5],
    lastUpdated: '2024',
  },
  {
    id: 'scheme-4',
    title: 'Soil Health Card Scheme',
    titleHi: 'मृदा स्वास्थ्य कार्ड योजना',
    titleMr: 'मृदा आरोग्य कार्ड योजना',
    description:
      'Provides soil testing and health cards to farmers with crop-wise recommendations for nutrients and fertilizers.',
    descriptionHi:
      'किसानों को मिट्टी परीक्षण और स्वास्थ्य कार्ड प्रदान करना, जिसमें फसल-अनुसार पोषक तत्वों की सिफारिशें होती हैं।',
    descriptionMr:
      'शेतकऱ्यांना माती परीक्षण आणि आरोग्य कार्ड प्रदान करणे, ज्यात पिकानुसार पोषक तत्वांच्या शिफारशी असतात.',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'agriculture',
    eligibility: ['All farmers across the country'],
    benefits: [
      'Free soil testing',
      'Crop-wise nutrient and fertilizer recommendations',
      'Improved soil health and crop yield',
      'Reduced input costs',
    ],
    documents: [
      'Aadhaar card',
      'Land details for soil sample collection',
    ],
    applicationProcess: [
      'Contact local agriculture department or Krishi Vigyan Kendra',
      'Soil sample collected from the farm',
      'Testing done at soil testing laboratory',
      'Soil Health Card issued with recommendations',
    ],
    source: mockSources[4],
    lastUpdated: '2023',
  },
];

// ── Cooperative Law Topics ───────────────────

export const mockLawTopics: LawTopic[] = [
  {
    id: 'law-1',
    title: 'Membership',
    titleHi: 'सदस्यता',
    titleMr: 'सदस्यत्व',
    description: 'Who can become a member, how to join, and member categories.',
    descriptionHi: 'कौन सदस्य बन सकता है, कैसे जुड़ें, और सदस्य श्रेणियाँ।',
    descriptionMr: 'कोण सदस्य होऊ शकतो, कसे सामील व्हावे, आणि सदस्य प्रकार.',
    category: 'membership',
    sections: [
      {
        heading: 'Who can join',
        content:
          'Any person who resides within the area of operation of the cooperative society and fulfils the qualifications prescribed in the by-laws may apply for membership.',
        reference: 'Section 22, Maharashtra Co-operative Societies Act',
      },
      {
        heading: 'Application process',
        content:
          'Submit a written application to the secretary of the cooperative society along with the prescribed share capital and admission fee. The committee shall decide on admission within a prescribed timeframe.',
      },
      {
        heading: 'Types of membership',
        content:
          'Members may be regular (voting) members or nominal/associate members as specified in the by-laws of the society.',
      },
    ],
    source: mockSources[1],
  },
  {
    id: 'law-2',
    title: 'Rights of Members',
    titleHi: 'सदस्यों के अधिकार',
    titleMr: 'सदस्यांचे अधिकार',
    description: 'Voting rights, access to records, participation in meetings, and share in profits.',
    descriptionHi: 'मतदान अधिकार, रिकॉर्ड तक पहुँच, बैठकों में भागीदारी और लाभ में हिस्सा।',
    descriptionMr: 'मतदानाचा अधिकार, नोंदींची तपासणी, सभांमध्ये सहभाग आणि नफ्यात वाटा.',
    category: 'rights',
    sections: [
      {
        heading: 'Voting right',
        content: 'Every regular member has one vote, irrespective of the number of shares held (one member, one vote principle).',
        reference: 'Section 27, MCS Act',
      },
      {
        heading: 'Inspection of records',
        content: 'Any member may inspect the books, records, and financial statements of the society during office hours.',
      },
      {
        heading: 'Share in profits',
        content: 'Members are entitled to receive dividends as declared by the general body, subject to applicable regulations.',
      },
    ],
    source: mockSources[1],
  },
  {
    id: 'law-3',
    title: 'Duties of Members',
    titleHi: 'सदस्यों के कर्तव्य',
    titleMr: 'सदस्यांची कर्तव्ये',
    description: 'Obligations of cooperative society members.',
    descriptionHi: 'सहकारी समिति सदस्यों के दायित्व।',
    descriptionMr: 'सहकारी संस्था सदस्यांचे दायित्व.',
    category: 'duties',
    sections: [
      {
        heading: 'Attend meetings',
        content: 'Members should attend general body meetings and exercise their vote responsibly.',
      },
      {
        heading: 'Pay dues',
        content: 'Members must pay share capital contributions, loan repayments, and other dues on time.',
      },
      {
        heading: 'Comply with by-laws',
        content: 'Members are bound by the by-laws and decisions of the general body and managing committee.',
      },
    ],
    source: mockSources[1],
  },
  {
    id: 'law-4',
    title: 'Elections',
    titleHi: 'चुनाव',
    titleMr: 'निवडणुका',
    description: 'How cooperative society committee elections are conducted.',
    descriptionHi: 'सहकारी समिति समिति चुनाव कैसे कराए जाते हैं।',
    descriptionMr: 'सहकारी संस्था समितीच्या निवडणुका कशा घेतल्या जातात.',
    category: 'elections',
    sections: [
      {
        heading: 'Election process',
        content:
          'Elections to the committee of a cooperative society are conducted under the supervision of the state cooperative election authority. Every regular member who is not in default has the right to vote and contest.',
        reference: 'Section 73CA-73CI, MCS Act',
      },
      {
        heading: 'Term of office',
        content: 'The committee holds office for a term of five years from the date of election.',
      },
    ],
    source: mockSources[1],
  },
  {
    id: 'law-5',
    title: 'Disputes & Complaints',
    titleHi: 'विवाद और शिकायतें',
    titleMr: 'विवाद आणि तक्रारी',
    description: 'How disputes between members and the cooperative are resolved.',
    descriptionHi: 'सदस्यों और सहकारी के बीच विवाद कैसे सुलझाए जाते हैं।',
    descriptionMr: 'सदस्य आणि सहकारी संस्था यांच्यातील विवाद कसे सोडवले जातात.',
    category: 'disputes',
    sections: [
      {
        heading: 'Dispute resolution',
        content:
          'Disputes touching the constitution, management, or business of a cooperative society are referred to the Cooperative Court or the Registrar for adjudication.',
        reference: 'Section 91, MCS Act',
      },
      {
        heading: 'Filing a complaint',
        content:
          'Members can file complaints with the Registrar of Cooperative Societies, the District Deputy Registrar, or the Cooperative Court.',
      },
    ],
    source: mockSources[1],
  },
];

// ── PACS Services ────────────────────────────

export const mockPacsServices: PacsService[] = [
  {
    id: 'pacs-1',
    title: 'Short-Term Crop Loans',
    titleHi: 'अल्पकालिक फसल ऋण',
    titleMr: 'अल्पकालीन पीक कर्ज',
    description:
      'Seasonal crop loans for purchasing seeds, fertilizers, pesticides, and meeting other agricultural expenses.',
    descriptionHi:
      'बीज, उर्वरक, कीटनाशक खरीदने और अन्य कृषि खर्चों को पूरा करने के लिए मौसमी फसल ऋण।',
    descriptionMr:
      'बियाणे, खते, कीटकनाशके खरेदी आणि इतर शेती खर्चासाठी हंगामी पीक कर्ज.',
    eligibility: [
      'Members of the PACS',
      'Farmers with cultivable land in the PACS area',
      'Must not be a defaulter on previous loans',
    ],
    documents: [
      'PACS membership proof',
      'Land ownership / tenancy records',
      'Aadhaar card',
      'Previous loan clearance certificate (if applicable)',
    ],
    process: [
      'Apply at your local PACS office',
      'Submit land records and membership proof',
      'PACS verifies eligibility and land holding',
      'Loan sanctioned based on cropping pattern and land area',
      'Amount credited to member account or disbursed',
    ],
    note: 'Loan terms, interest rates, and limits vary by PACS and state cooperative bank guidelines.',
  },
  {
    id: 'pacs-2',
    title: 'Input Supply (Seeds, Fertilizers)',
    titleHi: 'इनपुट आपूर्ति (बीज, उर्वरक)',
    titleMr: 'निविष्ठा पुरवठा (बियाणे, खते)',
    description:
      'Many PACS act as authorized dealers for seeds, fertilizers, and pesticides, making quality inputs available at fair prices.',
    descriptionHi:
      'कई PACS बीज, उर्वरक और कीटनाशकों के अधिकृत डीलर के रूप में कार्य करते हैं, उचित मूल्य पर गुणवत्तापूर्ण इनपुट उपलब्ध कराते हैं।',
    descriptionMr:
      'अनेक PACS बियाणे, खते आणि कीटकनाशकांचे अधिकृत विक्रेते म्हणून काम करतात, योग्य किमतीत दर्जेदार निविष्ठा उपलब्ध करतात.',
    eligibility: ['Members and sometimes non-members in the area'],
    documents: ['PACS membership card', 'Aadhaar card'],
    process: [
      'Visit the PACS input supply counter',
      'Select required seeds/fertilizers',
      'Payment may be in cash or adjusted against crop loan',
    ],
  },
  {
    id: 'pacs-3',
    title: 'Savings & Deposits',
    titleHi: 'बचत एवं जमा',
    titleMr: 'बचत आणि ठेवी',
    description:
      'PACS offer savings accounts and fixed deposit facilities to members.',
    descriptionHi:
      'PACS सदस्यों को बचत खाता और सावधि जमा सुविधा प्रदान करते हैं।',
    descriptionMr:
      'PACS सदस्यांना बचत खाते आणि मुदत ठेव सुविधा प्रदान करतात.',
    eligibility: ['Members of the PACS'],
    documents: ['PACS membership card', 'Aadhaar card', 'Passport photograph'],
    process: [
      'Open a savings account at your PACS office',
      'Deposit savings regularly',
      'Earn interest as per PACS/state cooperative bank rates',
    ],
    note: 'Interest rates and deposit schemes vary by PACS and the affiliated cooperative bank.',
  },
];

// ── Financial Topics ─────────────────────────

export const mockFinancialTopics: FinancialTopic[] = [
  {
    id: 'fin-1',
    title: 'Savings',
    titleHi: 'बचत',
    titleMr: 'बचत',
    description: 'Why saving matters and how to build a habit of saving.',
    descriptionHi: 'बचत क्यों ज़रूरी है और बचत की आदत कैसे बनाएँ।',
    descriptionMr: 'बचत का महत्त्वाची आहे आणि बचतीची सवय कशी लावावी.',
    icon: 'piggy-bank',
    sections: [
      {
        heading: 'Why save?',
        content:
          'Saving money helps you prepare for unexpected expenses, fund future goals, and build financial security for your family.',
      },
      {
        heading: 'Where to save?',
        content:
          'Banks, post offices, cooperative societies, and PACS offer savings accounts. Choose one that is accessible and offers fair interest.',
      },
      {
        heading: 'Tips',
        content:
          'Set aside a fixed portion of income regularly, even if small. Avoid keeping large amounts of cash at home. Use a bank or post office account.',
      },
    ],
  },
  {
    id: 'fin-2',
    title: 'Loans & Interest',
    titleHi: 'ऋण और ब्याज',
    titleMr: 'कर्ज आणि व्याज',
    description: 'Understanding loans, interest rates, and repayment.',
    descriptionHi: 'ऋण, ब्याज दरों और पुनर्भुगतान को समझना।',
    descriptionMr: 'कर्ज, व्याज दर आणि परतफेड समजून घेणे.',
    icon: 'banknote',
    sections: [
      {
        heading: 'What is interest?',
        content:
          'Interest is the cost of borrowing money. It is usually expressed as a percentage per year. For example, 7% per annum means you pay ₹7 for every ₹100 borrowed per year.',
      },
      {
        heading: 'Types of loans',
        content:
          'Crop loans, term loans for equipment, housing loans, and personal loans. Banks, PACS, and cooperative banks offer these at different rates.',
      },
      {
        heading: 'Repayment',
        content:
          'Always repay loans on time to maintain a good credit record and remain eligible for future credit. Timely repayment may also qualify you for interest subventions.',
      },
    ],
  },
  {
    id: 'fin-3',
    title: 'EMI & Installments',
    titleHi: 'EMI और किस्तें',
    titleMr: 'EMI आणि हप्ते',
    description: 'How EMI works and how to plan installment repayments.',
    descriptionHi: 'EMI कैसे काम करती है और किस्त भुगतान कैसे करें।',
    descriptionMr: 'EMI कसे काम करते आणि हप्ता परतफेडीचे नियोजन कसे करावे.',
    icon: 'calculator',
    sections: [
      {
        heading: 'What is EMI?',
        content:
          'EMI (Equated Monthly Installment) is a fixed monthly payment that includes both principal and interest. It allows you to repay a loan gradually over a set period.',
      },
      {
        heading: 'How is EMI calculated?',
        content:
          'EMI depends on three factors: loan amount, interest rate, and tenure (number of months). Higher loan amounts or interest rates mean higher EMIs. Longer tenure means lower EMIs but more total interest paid.',
      },
    ],
  },
  {
    id: 'fin-4',
    title: 'Insurance',
    titleHi: 'बीमा',
    titleMr: 'विमा',
    description: 'Understanding insurance: crop, health, and life insurance basics.',
    descriptionHi: 'बीमा समझें: फसल, स्वास्थ्य और जीवन बीमा।',
    descriptionMr: 'विमा समजून घ्या: पीक, आरोग्य आणि जीवन विमा.',
    icon: 'shield-check',
    sections: [
      {
        heading: 'Why insurance?',
        content:
          'Insurance protects you from financial loss due to unexpected events. Crop insurance covers agricultural losses; health and life insurance protect your family.',
      },
      {
        heading: 'Key terms',
        content:
          'Premium: the amount you pay. Sum insured: maximum amount you can claim. Claim: request for payment when loss occurs.',
      },
    ],
  },
  {
    id: 'fin-5',
    title: 'Fraud Awareness',
    titleHi: 'धोखाधड़ी जागरूकता',
    titleMr: 'फसवणूक जागरूकता',
    description: 'How to identify and protect yourself from financial fraud.',
    descriptionHi: 'वित्तीय धोखाधड़ी की पहचान और उससे बचाव कैसे करें।',
    descriptionMr: 'आर्थिक फसवणूक ओळखणे आणि स्वतःचे संरक्षण कसे करावे.',
    icon: 'alert-triangle',
    sections: [
      {
        heading: 'Common frauds',
        content:
          'Fake loan offers, OTP/PIN sharing requests, lottery/prize scams, and fraudulent apps or websites. Never share your OTP, PIN, or account password with anyone.',
      },
      {
        heading: 'How to protect yourself',
        content:
          'Use only official bank channels. Do not click on suspicious links. Verify any "government scheme" offer with your local bank or agriculture office before providing personal information.',
      },
      {
        heading: 'What to do if defrauded',
        content:
          'Report immediately to your bank, local police, and the national cyber-crime helpline (1930).',
      },
    ],
  },
];

// ── Grievance authorities ────────────────────

export const grievanceAuthorities: Record<GrievanceCategory, string> = {
  loan: 'District Cooperative Bank / NABARD Regional Office',
  insurance: 'Insurance Company Claims Office / District Agriculture Office',
  scheme: 'District Collector / Block Development Officer',
  cooperative: 'Registrar of Cooperative Societies / District Deputy Registrar',
  pacs: 'PACS Managing Committee / District Cooperative Bank',
  other: 'District Collector / Tehsildar Office',
};

export const grievanceCategoryLabels: Record<GrievanceCategory, { en: string; hi: string; mr: string }> = {
  loan: { en: 'Loan related', hi: 'ऋण संबंधित', mr: 'कर्ज संबंधित' },
  insurance: { en: 'Insurance claim', hi: 'बीमा दावा', mr: 'विमा दावा' },
  scheme: { en: 'Government scheme', hi: 'सरकारी योजना', mr: 'सरकारी योजना' },
  cooperative: { en: 'Cooperative society', hi: 'सहकारी समिति', mr: 'सहकारी संस्था' },
  pacs: { en: 'PACS service', hi: 'PACS सेवा', mr: 'PACS सेवा' },
  other: { en: 'Other', hi: 'अन्य', mr: 'इतर' },
};
