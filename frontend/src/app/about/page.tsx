'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import {
  MessageCircle,
  Languages,
  Mic,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const FLOW_STEPS = [
  {
    title: { en: 'Ask', hi: 'पूछें', mr: 'विचारा' },
    desc: {
      en: 'Ask your question in English, Hindi, or Marathi — by typing or speaking.',
      hi: 'अपना प्रश्न अंग्रेज़ी, हिंदी या मराठी में पूछें — लिखकर या बोलकर।',
      mr: 'तुमचा प्रश्न इंग्रजी, हिंदी किंवा मराठीत विचारा — लिहून किंवा बोलून.',
    },
  },
  {
    title: { en: 'Understand', hi: 'समझें', mr: 'समजून घ्या' },
    desc: {
      en: 'SAMVEDAI processes your question, identifies the language, and understands what you need.',
      hi: 'संवेदAI आपके प्रश्न को प्रोसेस करता है, भाषा पहचानता है और आपकी ज़रूरत समझता है।',
      mr: 'संवेदAI तुमचा प्रश्न प्रक्रिया करतो, भाषा ओळखतो आणि तुमची गरज समजतो.',
    },
  },
  {
    title: { en: 'Find', hi: 'खोजें', mr: 'शोधा' },
    desc: {
      en: 'Searches through verified government and cooperative sources to find relevant information.',
      hi: 'प्रासंगिक जानकारी खोजने के लिए सत्यापित सरकारी और सहकारी स्रोतों की खोज करता है।',
      mr: 'संबंधित माहिती शोधण्यासाठी सत्यापित सरकारी आणि सहकारी स्रोतांमध्ये शोध करतो.',
    },
  },
  {
    title: { en: 'Explain', hi: 'समझाएँ', mr: 'समजावून सांगा' },
    desc: {
      en: 'Presents the answer in clear, simple language that anyone can understand — not in bureaucratic jargon.',
      hi: 'उत्तर को स्पष्ट, सरल भाषा में प्रस्तुत करता है — नौकरशाही शब्दजाल में नहीं।',
      mr: 'उत्तर स्पष्ट, सोप्या भाषेत सादर करतो — शासकीय भाषेत नाही.',
    },
  },
  {
    title: { en: 'Act', hi: 'करें', mr: 'कृती करा' },
    desc: {
      en: 'Provides actionable next steps — where to go, what documents to carry, whom to contact.',
      hi: 'कार्रवाई योग्य अगले कदम बताता है — कहाँ जाएँ, क्या दस्तावेज़ ले जाएँ, किससे संपर्क करें।',
      mr: 'कृती करण्यायोग्य पुढील पावले सांगतो — कुठे जावे, कोणती कागदपत्रे न्यावी, कोणाशी संपर्क करावा.',
    },
  },
];

export default function AboutPage() {
  const { language } = useApp();
  const getLang = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        {t(language, 'aboutTitle')}
      </h1>
      <p className="text-text-secondary mt-3 leading-relaxed max-w-2xl text-lg">
        {t(language, 'aboutDescription')}
      </p>

      {/* The Problem */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-text mb-4">
          {language === 'en' ? 'The Problem' : language === 'hi' ? 'समस्या' : 'समस्या'}
        </h2>
        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-sm text-text leading-relaxed">
            {language === 'en'
              ? 'Millions of farmers and cooperative members in India struggle to understand government schemes, cooperative laws, and financial procedures. Information is often available only in complex legal or bureaucratic language, in English, or buried in lengthy documents. Language barriers, limited digital literacy, and lack of accessible guidance prevent citizens from accessing benefits they are entitled to.'
              : language === 'hi'
              ? 'भारत में लाखों किसान और सहकारी सदस्य सरकारी योजनाओं, सहकारी कानूनों और वित्तीय प्रक्रियाओं को समझने में कठिनाई महसूस करते हैं। जानकारी अक्सर जटिल कानूनी भाषा में, अंग्रेज़ी में, या लंबे दस्तावेज़ों में छिपी होती है।'
              : 'भारतातील लाखो शेतकरी आणि सहकारी सदस्य सरकारी योजना, सहकारी कायदे आणि आर्थिक प्रक्रिया समजून घेण्यास संघर्ष करतात. माहिती बहुतेक वेळा जटिल कायदेशीर भाषेत, इंग्रजीत किंवा लांबलचक कागदपत्रांत दडलेली असते.'}
          </p>
        </div>
      </section>

      {/* Key features */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-text mb-6">
          {language === 'en' ? 'Key Features' : language === 'hi' ? 'प्रमुख विशेषताएँ' : 'प्रमुख वैशिष्ट्ये'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-surface border border-border rounded-lg">
            <Languages className="w-6 h-6 text-accent mb-3" />
            <h3 className="font-semibold text-text text-sm">{t(language, 'multilingualTitle')}</h3>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              {t(language, 'multilingualDesc')}
            </p>
          </div>
          <div className="p-5 bg-surface border border-border rounded-lg">
            <Mic className="w-6 h-6 text-accent mb-3" />
            <h3 className="font-semibold text-text text-sm">{t(language, 'voiceTitle')}</h3>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              {t(language, 'voiceDesc')}
            </p>
          </div>
          <div className="p-5 bg-surface border border-border rounded-lg">
            <ShieldCheck className="w-6 h-6 text-accent mb-3" />
            <h3 className="font-semibold text-text text-sm">{t(language, 'trustedTitle')}</h3>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              {t(language, 'trustedDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* How it works — detailed */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-text mb-6">{t(language, 'howItWorks')}</h2>
        <div className="space-y-0">
          {FLOW_STEPS.map((step, i) => (
            <div key={i} className="flex gap-4 pb-6 relative">
              {i < FLOW_STEPS.length - 1 && (
                <div className="absolute left-[15px] top-[40px] bottom-0 w-px bg-border" />
              )}
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0 relative z-10">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-text">{getLang(step.title)}</h3>
                <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                  {getLang(step.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SIH Context */}
      <section className="mt-12">
        <div className="bg-surface border border-border rounded-lg p-5">
          <h2 className="font-semibold text-text mb-2">
            SIH 2025 — Problem Statement SIH26088
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {language === 'en'
              ? 'SAMVEDAI is built as a solution for the Smart India Hackathon problem statement SIH26088: Multilingual Cooperative Governance & Legal Assistance Chatbot. It aims to make cooperative and government information accessible to rural citizens through AI-powered, multilingual, voice-enabled assistance.'
              : language === 'hi'
              ? 'संवेदAI स्मार्ट इंडिया हैकाथॉन समस्या कथन SIH26088 के समाधान के रूप में बनाया गया है। यह AI-संचालित, बहुभाषी, ध्वनि-सक्षम सहायता के माध्यम से ग्रामीण नागरिकों को सहकारी और सरकारी जानकारी सुलभ बनाने का लक्ष्य रखता है।'
              : 'संवेदAI हे स्मार्ट इंडिया हॅकेथॉन समस्या विवरण SIH26088 चे उत्तर म्हणून बनवले आहे. AI-चालित, बहुभाषिक, आवाज-सक्षम सहाय्याद्वारे ग्रामीण नागरिकांना सहकारी आणि सरकारी माहिती सुलभ करणे हे त्याचे उद्दिष्ट आहे.'}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <Link
          href="/assistant"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          {t(language, 'askSamvedai')}
        </Link>
      </section>
    </div>
  );
}
