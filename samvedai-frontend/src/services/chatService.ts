/* ──────────────────────────────────────────────
   Chat service — mock implementation
   Replace with FastAPI calls later.
   ────────────────────────────────────────────── */

import type { ChatRequest, ChatResponse, ChatSection, Source } from '@/types';
import { delay, generateId } from '@/lib/utils';
import { mockSources } from '@/data/mockData';

/**
 * Send a chat message and receive an AI response.
 * Currently returns a canned Marathi demo answer for
 * the PMFBY question, plus a generic fallback.
 */
export async function sendMessage(req: ChatRequest): Promise<ChatResponse> {
  // Simulate network + inference latency
  await delay(1500 + Math.random() * 1000);

  const isPMFBY =
    req.message.includes('पीक विमा') ||
    req.message.includes('crop insurance') ||
    req.message.includes('PMFBY') ||
    req.message.includes('फसल बीमा');

  if (isPMFBY) {
    return pmfbyResponse(req);
  }

  const isDocuments =
    req.message.includes('कागदपत्रे') ||
    req.message.includes('documents') ||
    req.message.includes('दस्तावेज़');

  if (isDocuments) {
    return documentsResponse(req);
  }

  const isApply =
    req.message.includes('अर्ज') ||
    req.message.includes('apply') ||
    req.message.includes('आवेदन') ||
    req.message.includes('कुठे');

  if (isApply) {
    return applyResponse(req);
  }

  const isPremium =
    req.message.includes('प्रीमियम') ||
    req.message.includes('premium') ||
    req.message.includes('किती');

  if (isPremium) {
    return premiumResponse(req);
  }

  // Generic fallback
  return genericResponse(req);
}

function pmfbyResponse(req: ChatRequest): ChatResponse {
  const sections: ChatSection[] = [
    {
      title: 'पात्रता (Eligibility)',
      type: 'list',
      content: '',
      items: [
        'सर्व शेतकरी (कूळ शेतकरी आणि भाडेकरू शेतकऱ्यांसह) पात्र आहेत.',
        'अधिसूचित क्षेत्रात अधिसूचित पिके घेणारे शेतकरी.',
        'कर्जदार आणि बिगर-कर्जदार शेतकरी दोन्ही पात्र.',
      ],
    },
    {
      title: 'आवश्यक कागदपत्रे (Documents)',
      type: 'list',
      content: '',
      items: [
        'आधार कार्ड',
        'जमिनीचे दस्तऐवज / भाडेकरार',
        'बँक खाते तपशील',
        'पेरणी प्रमाणपत्र (पटवारी / महसूल अधिकारी)',
      ],
    },
    {
      title: 'पुढील पावले (Next Steps)',
      type: 'steps',
      content: '',
      items: [
        'जवळच्या बँक शाखा, PACS किंवा CSC ला भेट द्या.',
        'PMFBY अर्ज भरा आणि पीक व जमीन तपशील द्या.',
        'आवश्यक कागदपत्रे सबमिट करा आणि शेतकरी हिस्सा प्रीमियम भरा.',
        'पॉलिसी पुष्टीकरण मिळवा आणि संदर्भ क्रमांक नोंदवा.',
      ],
    },
    {
      title: 'महत्त्वाची सूचना',
      type: 'note',
      content:
        'पीक नुकसान झाल्यास ७२ तासांच्या आत विमा कंपनी किंवा हेल्पलाइनला कळवा. प्रीमियम दर: खरीप — २%, रबी — १.५%, फलोत्पादन — ५%.',
    },
  ];

  return {
    id: generateId(),
    message:
      'प्रधानमंत्री फसल बीमा योजना (PMFBY) अंतर्गत पीक विमा मिळवण्यासाठी खालील माहिती पहा:',
    sections,
    sources: [mockSources[0]],
    followUps: [
      'मला कोणती कागदपत्रे लागतील?',
      'मी कुठे अर्ज करू शकतो?',
      'प्रीमियम किती आहे?',
    ],
    language: req.language,
    timestamp: new Date().toISOString(),
  };
}

function documentsResponse(req: ChatRequest): ChatResponse {
  const sections: ChatSection[] = [
    {
      title: 'आवश्यक कागदपत्रे',
      type: 'list',
      content: '',
      items: [
        'आधार कार्ड (ओळखपत्र म्हणून)',
        'जमिनीचे सातबारा उतारा / ८-अ / भाडेकरार',
        'बँक खाते पासबुक किंवा रद्द केलेला चेक',
        'पेरणी प्रमाणपत्र (तलाठी / महसूल अधिकारी)',
        'पासपोर्ट आकाराचे फोटो (२ प्रती)',
      ],
    },
    {
      title: 'टीप',
      type: 'note',
      content: 'भाडेकरू शेतकऱ्यांना जमीन मालकाचे संमतीपत्र आवश्यक असू शकते. आपल्या स्थानिक PACS किंवा बँक शाखेशी संपर्क करा.',
    },
  ];

  return {
    id: generateId(),
    message: 'PMFBY साठी खालील कागदपत्रे आवश्यक आहेत:',
    sections,
    sources: [mockSources[0]],
    followUps: [
      'मी कुठे अर्ज करू शकतो?',
      'प्रीमियम किती आहे?',
      'नुकसान झाल्यास काय करावे?',
    ],
    language: req.language,
    timestamp: new Date().toISOString(),
  };
}

function applyResponse(req: ChatRequest): ChatResponse {
  const sections: ChatSection[] = [
    {
      title: 'अर्ज कुठे करावा',
      type: 'steps',
      content: '',
      items: [
        'जवळच्या बँक शाखेत (सरकारी / खाजगी / सहकारी बँक)',
        'प्राथमिक कृषी पतसंस्था (PACS)',
        'Common Service Centre (CSC) / जन सेवा केंद्र',
        'कृषी विभाग कार्यालय',
      ],
    },
    {
      title: 'ऑनलाइन',
      type: 'text',
      content: 'PMFBY पोर्टलवरून ऑनलाइन अर्ज करणेही शक्य आहे, मात्र यासाठी बँक खाते आधार-लिंक असणे आवश्यक.',
    },
  ];

  return {
    id: generateId(),
    message: 'तुम्ही खालील ठिकाणी पीक विमा अर्ज करू शकता:',
    sections,
    sources: [mockSources[0]],
    followUps: [
      'प्रीमियम किती आहे?',
      'नुकसान झाल्यास काय करावे?',
      'KCC शी संबंध काय?',
    ],
    language: req.language,
    timestamp: new Date().toISOString(),
  };
}

function premiumResponse(req: ChatRequest): ChatResponse {
  const sections: ChatSection[] = [
    {
      title: 'शेतकरी प्रीमियम दर',
      type: 'list',
      content: '',
      items: [
        'खरीप (पावसाळी) पिके: विमा रकमेच्या २%',
        'रबी (हिवाळी) पिके: विमा रकमेच्या १.५%',
        'फलोत्पादन आणि व्यापारी पिके: विमा रकमेच्या ५%',
      ],
    },
    {
      title: 'उदाहरण',
      type: 'text',
      content: 'जर विमा रक्कम ₹1,00,000 असेल आणि तुम्ही खरीप पीक घेत असाल, तर तुमचा प्रीमियम ₹2,000 असेल. उर्वरित प्रीमियम केंद्र आणि राज्य सरकार समान प्रमाणात भरतात.',
    },
    {
      title: 'महत्त्वाचे',
      type: 'note',
      content: 'सरकारी अनुदानावर कोणतीही मर्यादा नाही — संपूर्ण दाव्याची रक्कम दिली जाते.',
    },
  ];

  return {
    id: generateId(),
    message: 'PMFBY अंतर्गत शेतकऱ्यांना खूपच कमी प्रीमियम भरावा लागतो:',
    sections,
    sources: [mockSources[0]],
    followUps: [
      'नुकसान झाल्यास काय करावे?',
      'कोणत्या पिकांना कवर आहे?',
      'KCC शी संबंध काय?',
    ],
    language: req.language,
    timestamp: new Date().toISOString(),
  };
}

function genericResponse(req: ChatRequest): ChatResponse {
  const langResponses = {
    en: {
      message:
        'I can help you with information about government schemes, crop insurance, cooperative laws, PACS services, financial literacy, and grievance procedures. Could you please ask about a specific topic?',
      followUps: [
        'How do I get crop insurance?',
        'What government schemes am I eligible for?',
        'How do I file a grievance?',
      ],
    },
    hi: {
      message:
        'मैं सरकारी योजनाओं, फसल बीमा, सहकारी कानूनों, PACS सेवाओं, वित्तीय साक्षरता और शिकायत प्रक्रियाओं के बारे में सहायता कर सकता हूँ। कृपया किसी विशिष्ट विषय पर पूछें।',
      followUps: [
        'फसल बीमा कैसे मिलेगा?',
        'मैं किन योजनाओं के लिए पात्र हूँ?',
        'शिकायत कैसे दर्ज करें?',
      ],
    },
    mr: {
      message:
        'मी सरकारी योजना, पीक विमा, सहकारी कायदे, PACS सेवा, आर्थिक साक्षरता आणि तक्रार प्रक्रियांबद्दल मदत करू शकतो. कृपया एखाद्या विशिष्ट विषयाबद्दल विचारा.',
      followUps: [
        'मला पीक विमा कसा मिळेल?',
        'कोणत्या सरकारी योजना उपलब्ध आहेत?',
        'तक्रार कशी करावी?',
      ],
    },
  };

  const resp = langResponses[req.language] || langResponses.en;

  return {
    id: generateId(),
    message: resp.message,
    sources: [],
    followUps: resp.followUps,
    language: req.language,
    timestamp: new Date().toISOString(),
  };
}

// ── Future: Replace with real API calls ──────
// export async function sendMessage(req: ChatRequest): Promise<ChatResponse> {
//   const response = await fetch(`${API_BASE}/chat`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(req),
//   });
//   return response.json();
// }
