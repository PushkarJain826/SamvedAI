/* ──────────────────────────────────────────────
   SAMVEDAI — Internationalisation dictionary
   ────────────────────────────────────────────── */

import { Language } from '@/types';

type TranslationKey =
  | 'brand'
  | 'tagline'
  | 'subtitle'
  | 'heroTitle'
  | 'heroDescription'
  | 'askSamvedai'
  | 'exploreServices'
  | 'governmentSchemes'
  | 'cropInsurance'
  | 'cooperativeLaws'
  | 'pacsServices'
  | 'financialLiteracy'
  | 'grievanceAssistance'
  | 'home'
  | 'assistant'
  | 'sources'
  | 'about'
  | 'accessibility'
  | 'search'
  | 'searchSchemes'
  | 'allCategories'
  | 'eligibility'
  | 'benefits'
  | 'documents'
  | 'applicationProcess'
  | 'howItWorks'
  | 'step1Title'
  | 'step1Desc'
  | 'step2Title'
  | 'step2Desc'
  | 'step3Title'
  | 'step3Desc'
  | 'step4Title'
  | 'step4Desc'
  | 'step5Title'
  | 'step5Desc'
  | 'multilingualTitle'
  | 'multilingualDesc'
  | 'voiceTitle'
  | 'voiceDesc'
  | 'trustedTitle'
  | 'trustedDesc'
  | 'newConversation'
  | 'typeMessage'
  | 'listening'
  | 'thinking'
  | 'helpful'
  | 'notHelpful'
  | 'copyAnswer'
  | 'copied'
  | 'sourcesLabel'
  | 'followUp'
  | 'viewSource'
  | 'verified'
  | 'multipleSources'
  | 'partial'
  | 'unavailable'
  | 'mayHaveChanged'
  | 'language'
  | 'textSize'
  | 'reducedMotion'
  | 'highContrast'
  | 'normal'
  | 'large'
  | 'extraLarge'
  | 'on'
  | 'off'
  | 'accessibilityTitle'
  | 'languageSettings'
  | 'describeYourProblem'
  | 'selectCategory'
  | 'responsibleAuthority'
  | 'requiredDocuments'
  | 'submissionGuidance'
  | 'trackingReference'
  | 'next'
  | 'previous'
  | 'submit'
  | 'emiCalculator'
  | 'loanAmount'
  | 'interestRate'
  | 'tenure'
  | 'months'
  | 'monthlyEmi'
  | 'totalPayment'
  | 'totalInterest'
  | 'calculate'
  | 'disclaimer'
  | 'legalDisclaimer'
  | 'pacsDisclaimer'
  | 'aboutTitle'
  | 'aboutDescription'
  | 'trustTitle'
  | 'trustDescription'
  | 'governmentSchemesDesc'
  | 'cropInsuranceDesc'
  | 'cooperativeLawsDesc'
  | 'pacsServicesDesc'
  | 'financialLiteracyDesc'
  | 'grievanceAssistanceDesc'
  | 'emptyChat'
  | 'emptyChatDesc'
  | 'errorMessage'
  | 'retry';

type Translations = Record<Language, Record<TranslationKey, string>>;

export const translations: Translations = {
  en: {
    brand: 'SAMVEDAI',
    tagline: 'Information you can understand. Guidance you can act on.',
    subtitle: 'Cooperative & Rural Information Assistant',
    heroTitle: 'Government information, made simple for everyone.',
    heroDescription:
      'SAMVEDAI helps farmers, cooperative members and rural citizens understand government schemes, cooperative laws, PACS services, crop insurance, financial literacy and grievance procedures — in the language you speak.',
    askSamvedai: 'Ask SAMVEDAI',
    exploreServices: 'Explore services',
    governmentSchemes: 'Government Schemes',
    cropInsurance: 'Crop Insurance',
    cooperativeLaws: 'Cooperative Laws',
    pacsServices: 'PACS Services',
    financialLiteracy: 'Financial Literacy',
    grievanceAssistance: 'Grievance Assistance',
    home: 'Home',
    assistant: 'AI Assistant',
    sources: 'Sources & Trust',
    about: 'About',
    accessibility: 'Accessibility',
    search: 'Search',
    searchSchemes: 'Search schemes by name or keyword…',
    allCategories: 'All Categories',
    eligibility: 'Eligibility',
    benefits: 'Benefits',
    documents: 'Required Documents',
    applicationProcess: 'How to Apply',
    howItWorks: 'How it works',
    step1Title: 'Ask',
    step1Desc: 'Ask your question in any supported language, by text or voice.',
    step2Title: 'Understand',
    step2Desc: 'SAMVEDAI understands your intent and language.',
    step3Title: 'Find',
    step3Desc: 'Retrieves information from trusted, official sources.',
    step4Title: 'Explain',
    step4Desc: 'Presents the answer in clear, simple language.',
    step5Title: 'Act',
    step5Desc: 'Gives you actionable next steps you can follow.',
    multilingualTitle: 'Multilingual',
    multilingualDesc: 'Ask in English, Hindi, or Marathi. Get answers in the language you understand best.',
    voiceTitle: 'Voice Enabled',
    voiceDesc: 'Speak your question naturally. Ideal for those more comfortable with spoken language.',
    trustedTitle: 'Trusted Sources',
    trustedDesc: 'Every answer is grounded in official government and cooperative sources.',
    newConversation: 'New conversation',
    typeMessage: 'Type your question…',
    listening: 'Listening…',
    thinking: 'Thinking…',
    helpful: 'Helpful',
    notHelpful: 'Not helpful',
    copyAnswer: 'Copy',
    copied: 'Copied',
    sourcesLabel: 'Sources',
    followUp: 'Follow-up questions',
    viewSource: 'View source',
    verified: 'Verified source',
    multipleSources: 'Multiple sources',
    partial: 'Partial information',
    unavailable: 'Source unavailable',
    mayHaveChanged: 'Information may have changed',
    language: 'Language',
    textSize: 'Text Size',
    reducedMotion: 'Reduced Motion',
    highContrast: 'High Contrast',
    normal: 'Normal',
    large: 'Large',
    extraLarge: 'Extra Large',
    on: 'On',
    off: 'Off',
    accessibilityTitle: 'Accessibility & Language Settings',
    languageSettings: 'Language Settings',
    describeYourProblem: 'Describe your problem',
    selectCategory: 'Select category',
    responsibleAuthority: 'Responsible Authority',
    requiredDocuments: 'Required Documents',
    submissionGuidance: 'Submission Guidance',
    trackingReference: 'Tracking & Reference',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    emiCalculator: 'EMI Calculator',
    loanAmount: 'Loan Amount (₹)',
    interestRate: 'Interest Rate (%)',
    tenure: 'Tenure',
    months: 'months',
    monthlyEmi: 'Monthly EMI',
    totalPayment: 'Total Payment',
    totalInterest: 'Total Interest',
    calculate: 'Calculate',
    disclaimer:
      'This tool provides general guidance only. For official information, consult the relevant government department or cooperative authority.',
    legalDisclaimer:
      'The information provided here is for general educational purposes. It does not constitute legal advice. Please consult a legal professional or your local cooperative authority for specific matters.',
    pacsDisclaimer:
      'Services, eligibility criteria, and processes may vary by PACS and location. Contact your local PACS for specific details.',
    aboutTitle: 'About SAMVEDAI',
    aboutDescription:
      'SAMVEDAI is a multilingual cooperative and rural information assistant that helps citizens understand complex government policies, schemes, and cooperative laws in simple, accessible language.',
    trustTitle: 'Sources & Trust',
    trustDescription:
      'Every answer from SAMVEDAI is grounded in official sources. We clearly indicate where information comes from and how confident we are in it.',
    governmentSchemesDesc:
      'Explore central and state government schemes for agriculture, insurance, subsidies and rural welfare.',
    cropInsuranceDesc:
      'Understand the Pradhan Mantri Fasal Bima Yojana (PMFBY) and crop insurance processes.',
    cooperativeLawsDesc:
      'Learn about cooperative membership, rights, duties, elections, and dispute resolution.',
    pacsServicesDesc:
      'Discover services offered by Primary Agricultural Credit Societies.',
    financialLiteracyDesc:
      'Learn about savings, loans, interest rates, EMI, credit, and fraud awareness.',
    grievanceAssistanceDesc:
      'Get guided help filing complaints and grievances with the right authority.',
    emptyChat: 'Ask SAMVEDAI anything',
    emptyChatDesc:
      'Ask about government schemes, crop insurance, cooperative laws, PACS services, financial literacy, or grievance procedures.',
    errorMessage: 'Something went wrong. Please try again.',
    retry: 'Retry',
  },
  hi: {
    brand: 'संवेदAI',
    tagline: 'जानकारी जो आप समझ सकें। मार्गदर्शन जिस पर आप अमल कर सकें।',
    subtitle: 'सहकारी एवं ग्रामीण सूचना सहायक',
    heroTitle: 'सरकारी जानकारी, सबके लिए सरल।',
    heroDescription:
      'संवेदAI किसानों, सहकारी सदस्यों और ग्रामीण नागरिकों को सरकारी योजनाओं, सहकारी कानूनों, PACS सेवाओं, फसल बीमा, वित्तीय साक्षरता और शिकायत प्रक्रियाओं को समझने में सहायता करता है।',
    askSamvedai: 'संवेदAI से पूछें',
    exploreServices: 'सेवाएँ देखें',
    governmentSchemes: 'सरकारी योजनाएँ',
    cropInsurance: 'फसल बीमा',
    cooperativeLaws: 'सहकारी कानून',
    pacsServices: 'PACS सेवाएँ',
    financialLiteracy: 'वित्तीय साक्षरता',
    grievanceAssistance: 'शिकायत सहायता',
    home: 'होम',
    assistant: 'AI सहायक',
    sources: 'स्रोत और विश्वास',
    about: 'हमारे बारे में',
    accessibility: 'सुलभता',
    search: 'खोजें',
    searchSchemes: 'योजना का नाम या कीवर्ड खोजें…',
    allCategories: 'सभी श्रेणियाँ',
    eligibility: 'पात्रता',
    benefits: 'लाभ',
    documents: 'आवश्यक दस्तावेज़',
    applicationProcess: 'आवेदन कैसे करें',
    howItWorks: 'यह कैसे काम करता है',
    step1Title: 'पूछें',
    step1Desc: 'अपना प्रश्न किसी भी समर्थित भाषा में, टेक्स्ट या आवाज़ से पूछें।',
    step2Title: 'समझें',
    step2Desc: 'संवेदAI आपकी भाषा और इरादे को समझता है।',
    step3Title: 'खोजें',
    step3Desc: 'विश्वसनीय, आधिकारिक स्रोतों से जानकारी प्राप्त करता है।',
    step4Title: 'समझाएँ',
    step4Desc: 'उत्तर को सरल, स्पष्ट भाषा में प्रस्तुत करता है।',
    step5Title: 'करें',
    step5Desc: 'अगले कदम बताता है जिन पर आप अमल कर सकते हैं।',
    multilingualTitle: 'बहुभाषी',
    multilingualDesc: 'अंग्रेज़ी, हिंदी या मराठी में पूछें। जिस भाषा में समझते हैं, उसमें जवाब पाएँ।',
    voiceTitle: 'आवाज़ सक्षम',
    voiceDesc: 'अपना प्रश्न बोलकर पूछें। बोली भाषा में सहज लोगों के लिए उपयुक्त।',
    trustedTitle: 'विश्वसनीय स्रोत',
    trustedDesc: 'हर उत्तर आधिकारिक सरकारी और सहकारी स्रोतों पर आधारित है।',
    newConversation: 'नई बातचीत',
    typeMessage: 'अपना प्रश्न लिखें…',
    listening: 'सुन रहा है…',
    thinking: 'सोच रहा है…',
    helpful: 'उपयोगी',
    notHelpful: 'उपयोगी नहीं',
    copyAnswer: 'कॉपी',
    copied: 'कॉपी हो गया',
    sourcesLabel: 'स्रोत',
    followUp: 'अनुवर्ती प्रश्न',
    viewSource: 'स्रोत देखें',
    verified: 'सत्यापित स्रोत',
    multipleSources: 'अनेक स्रोत',
    partial: 'आंशिक जानकारी',
    unavailable: 'स्रोत अनुपलब्ध',
    mayHaveChanged: 'जानकारी बदल गई हो सकती है',
    language: 'भाषा',
    textSize: 'टेक्स्ट आकार',
    reducedMotion: 'कम गति',
    highContrast: 'उच्च कंट्रास्ट',
    normal: 'सामान्य',
    large: 'बड़ा',
    extraLarge: 'अतिरिक्त बड़ा',
    on: 'चालू',
    off: 'बंद',
    accessibilityTitle: 'सुलभता और भाषा सेटिंग्स',
    languageSettings: 'भाषा सेटिंग्स',
    describeYourProblem: 'अपनी समस्या का वर्णन करें',
    selectCategory: 'श्रेणी चुनें',
    responsibleAuthority: 'ज़िम्मेदार प्राधिकरण',
    requiredDocuments: 'आवश्यक दस्तावेज़',
    submissionGuidance: 'प्रस्तुत करने का मार्गदर्शन',
    trackingReference: 'ट्रैकिंग और संदर्भ',
    next: 'आगे',
    previous: 'पीछे',
    submit: 'जमा करें',
    emiCalculator: 'EMI कैलकुलेटर',
    loanAmount: 'ऋण राशि (₹)',
    interestRate: 'ब्याज दर (%)',
    tenure: 'अवधि',
    months: 'महीने',
    monthlyEmi: 'मासिक EMI',
    totalPayment: 'कुल भुगतान',
    totalInterest: 'कुल ब्याज',
    calculate: 'गणना करें',
    disclaimer:
      'यह उपकरण केवल सामान्य मार्गदर्शन प्रदान करता है। आधिकारिक जानकारी के लिए संबंधित सरकारी विभाग से संपर्क करें।',
    legalDisclaimer:
      'यहाँ प्रदान की गई जानकारी सामान्य शैक्षणिक उद्देश्यों के लिए है। यह कानूनी सलाह नहीं है। विशिष्ट मामलों के लिए कृपया कानूनी पेशेवर से परामर्श करें।',
    pacsDisclaimer:
      'सेवाएँ, पात्रता मानदंड और प्रक्रियाएँ PACS और स्थान के अनुसार भिन्न हो सकती हैं।',
    aboutTitle: 'संवेदAI के बारे में',
    aboutDescription:
      'संवेदAI एक बहुभाषी सहकारी और ग्रामीण सूचना सहायक है जो नागरिकों को जटिल सरकारी नीतियों, योजनाओं और सहकारी कानूनों को सरल भाषा में समझने में मदद करता है।',
    trustTitle: 'स्रोत और विश्वास',
    trustDescription:
      'संवेदAI का हर उत्तर आधिकारिक स्रोतों पर आधारित है। हम स्पष्ट रूप से बताते हैं कि जानकारी कहाँ से आती है।',
    governmentSchemesDesc: 'कृषि, बीमा, सब्सिडी और ग्रामीण कल्याण योजनाएँ देखें।',
    cropInsuranceDesc: 'प्रधानमंत्री फसल बीमा योजना (PMFBY) और फसल बीमा प्रक्रिया समझें।',
    cooperativeLawsDesc: 'सहकारी सदस्यता, अधिकार, कर्तव्य, चुनाव और विवाद निपटान जानें।',
    pacsServicesDesc: 'प्राथमिक कृषि साख समिति की सेवाएँ जानें।',
    financialLiteracyDesc: 'बचत, ऋण, ब्याज दर, EMI, क्रेडिट और धोखाधड़ी जागरूकता सीखें।',
    grievanceAssistanceDesc: 'सही प्राधिकरण को शिकायत दर्ज करने में मार्गदर्शित सहायता प्राप्त करें।',
    emptyChat: 'संवेदAI से कुछ भी पूछें',
    emptyChatDesc: 'सरकारी योजनाओं, फसल बीमा, सहकारी कानूनों, PACS सेवाओं, वित्तीय साक्षरता या शिकायत प्रक्रिया के बारे में पूछें।',
    errorMessage: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
    retry: 'पुनः प्रयास',
  },
  mr: {
    brand: 'संवेदAI',
    tagline: 'तुम्हाला समजेल अशी माहिती. तुम्ही कृती करू शकाल असे मार्गदर्शन.',
    subtitle: 'सहकारी व ग्रामीण माहिती सहाय्यक',
    heroTitle: 'सरकारी माहिती, सर्वांसाठी सोपी.',
    heroDescription:
      'संवेदAI शेतकरी, सहकारी सदस्य आणि ग्रामीण नागरिकांना सरकारी योजना, सहकारी कायदे, PACS सेवा, पीक विमा, आर्थिक साक्षरता आणि तक्रार प्रक्रिया समजून घेण्यास मदत करते.',
    askSamvedai: 'संवेदAI ला विचारा',
    exploreServices: 'सेवा पहा',
    governmentSchemes: 'सरकारी योजना',
    cropInsurance: 'पीक विमा',
    cooperativeLaws: 'सहकारी कायदे',
    pacsServices: 'PACS सेवा',
    financialLiteracy: 'आर्थिक साक्षरता',
    grievanceAssistance: 'तक्रार सहाय्य',
    home: 'मुख्यपृष्ठ',
    assistant: 'AI सहाय्यक',
    sources: 'स्रोत आणि विश्वास',
    about: 'आमच्याबद्दल',
    accessibility: 'सुलभता',
    search: 'शोधा',
    searchSchemes: 'योजनेचे नाव किंवा कीवर्ड शोधा…',
    allCategories: 'सर्व श्रेण्या',
    eligibility: 'पात्रता',
    benefits: 'लाभ',
    documents: 'आवश्यक कागदपत्रे',
    applicationProcess: 'अर्ज कसा करावा',
    howItWorks: 'हे कसे कार्य करते',
    step1Title: 'विचारा',
    step1Desc: 'तुमचा प्रश्न कोणत्याही भाषेत, टेक्स्ट किंवा आवाजाने विचारा.',
    step2Title: 'समजून घ्या',
    step2Desc: 'संवेदAI तुमची भाषा आणि उद्देश समजतो.',
    step3Title: 'शोधा',
    step3Desc: 'विश्वसनीय, अधिकृत स्रोतांमधून माहिती मिळवतो.',
    step4Title: 'समजावून सांगा',
    step4Desc: 'उत्तर सोप्या, स्पष्ट भाषेत सादर करतो.',
    step5Title: 'कृती करा',
    step5Desc: 'पुढील पावले सांगतो ज्यावर तुम्ही कृती करू शकता.',
    multilingualTitle: 'बहुभाषिक',
    multilingualDesc: 'इंग्रजी, हिंदी किंवा मराठीत विचारा. तुम्हाला समजेल त्या भाषेत उत्तर मिळवा.',
    voiceTitle: 'आवाज सक्षम',
    voiceDesc: 'तुमचा प्रश्न बोलून विचारा. बोलीभाषेत सहज असलेल्यांसाठी उपयुक्त.',
    trustedTitle: 'विश्वसनीय स्रोत',
    trustedDesc: 'प्रत्येक उत्तर अधिकृत सरकारी आणि सहकारी स्रोतांवर आधारित आहे.',
    newConversation: 'नवीन संभाषण',
    typeMessage: 'तुमचा प्रश्न लिहा…',
    listening: 'ऐकत आहे…',
    thinking: 'विचार करत आहे…',
    helpful: 'उपयुक्त',
    notHelpful: 'उपयुक्त नाही',
    copyAnswer: 'कॉपी',
    copied: 'कॉपी झाले',
    sourcesLabel: 'स्रोत',
    followUp: 'पुढील प्रश्न',
    viewSource: 'स्रोत पहा',
    verified: 'सत्यापित स्रोत',
    multipleSources: 'अनेक स्रोत',
    partial: 'आंशिक माहिती',
    unavailable: 'स्रोत अनुपलब्ध',
    mayHaveChanged: 'माहिती बदलली असू शकते',
    language: 'भाषा',
    textSize: 'मजकूर आकार',
    reducedMotion: 'कमी हालचाल',
    highContrast: 'उच्च कॉन्ट्रास्ट',
    normal: 'सामान्य',
    large: 'मोठा',
    extraLarge: 'अतिरिक्त मोठा',
    on: 'चालू',
    off: 'बंद',
    accessibilityTitle: 'सुलभता आणि भाषा सेटिंग्स',
    languageSettings: 'भाषा सेटिंग्स',
    describeYourProblem: 'तुमच्या समस्येचे वर्णन करा',
    selectCategory: 'श्रेणी निवडा',
    responsibleAuthority: 'जबाबदार प्राधिकरण',
    requiredDocuments: 'आवश्यक कागदपत्रे',
    submissionGuidance: 'सबमिशन मार्गदर्शन',
    trackingReference: 'ट्रॅकिंग आणि संदर्भ',
    next: 'पुढे',
    previous: 'मागे',
    submit: 'सबमिट करा',
    emiCalculator: 'EMI कॅल्क्युलेटर',
    loanAmount: 'कर्ज रक्कम (₹)',
    interestRate: 'व्याज दर (%)',
    tenure: 'कालावधी',
    months: 'महिने',
    monthlyEmi: 'मासिक EMI',
    totalPayment: 'एकूण भरणा',
    totalInterest: 'एकूण व्याज',
    calculate: 'गणना करा',
    disclaimer:
      'हे साधन केवळ सामान्य मार्गदर्शन प्रदान करते. अधिकृत माहितीसाठी संबंधित सरकारी विभागाशी संपर्क करा.',
    legalDisclaimer:
      'येथे दिलेली माहिती सामान्य शैक्षणिक हेतूंसाठी आहे. ही कायदेशीर सल्ला नाही. विशिष्ट बाबींसाठी कायदेशीर व्यावसायिकाचा सल्ला घ्या.',
    pacsDisclaimer:
      'सेवा, पात्रता निकष आणि प्रक्रिया PACS आणि स्थानानुसार भिन्न असू शकतात.',
    aboutTitle: 'संवेदAI बद्दल',
    aboutDescription:
      'संवेदAI एक बहुभाषिक सहकारी आणि ग्रामीण माहिती सहाय्यक आहे जो नागरिकांना जटिल सरकारी धोरणे, योजना आणि सहकारी कायदे सोप्या भाषेत समजून घेण्यास मदत करतो.',
    trustTitle: 'स्रोत आणि विश्वास',
    trustDescription:
      'संवेदAI चे प्रत्येक उत्तर अधिकृत स्रोतांवर आधारित आहे. माहिती कुठून येते हे आम्ही स्पष्टपणे सांगतो.',
    governmentSchemesDesc: 'शेती, विमा, अनुदान आणि ग्रामीण कल्याण योजना पहा.',
    cropInsuranceDesc: 'प्रधानमंत्री फसल बीमा योजना (PMFBY) आणि पीक विमा प्रक्रिया समजून घ्या.',
    cooperativeLawsDesc: 'सहकारी सदस्यत्व, अधिकार, कर्तव्ये, निवडणुका आणि विवाद निराकरण जाणून घ्या.',
    pacsServicesDesc: 'प्राथमिक कृषी पतसंस्थांच्या सेवा जाणून घ्या.',
    financialLiteracyDesc: 'बचत, कर्ज, व्याज दर, EMI, क्रेडिट आणि फसवणूक जागरूकता शिका.',
    grievanceAssistanceDesc: 'योग्य प्राधिकरणाकडे तक्रार दाखल करण्यात मार्गदर्शित सहाय्य मिळवा.',
    emptyChat: 'संवेदAI ला काहीही विचारा',
    emptyChatDesc: 'सरकारी योजना, पीक विमा, सहकारी कायदे, PACS सेवा, आर्थिक साक्षरता किंवा तक्रार प्रक्रियेबद्दल विचारा.',
    errorMessage: 'काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.',
    retry: 'पुन्हा प्रयत्न',
  },
};

export function t(lang: Language, key: TranslationKey): string {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
];
