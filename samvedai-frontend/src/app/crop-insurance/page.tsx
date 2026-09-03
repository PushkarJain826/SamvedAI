'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { Disclaimer } from '@/components/ui/States';
import SourceCard from '@/components/ui/SourceCard';
import { mockSources } from '@/data/mockData';
import { CheckCircle2, FileText, AlertCircle, Phone } from 'lucide-react';

const STEPS = [
  {
    num: 1,
    title: { en: 'Check eligibility & notification', hi: 'पात्रता और अधिसूचना जाँचें', mr: 'पात्रता आणि अधिसूचना तपासा' },
    desc: {
      en: 'Verify that your crop and area are notified under PMFBY for the current season. Check with your local agriculture department or bank.',
      hi: 'सत्यापित करें कि आपकी फसल और क्षेत्र वर्तमान मौसम में PMFBY के तहत अधिसूचित हैं।',
      mr: 'तुमचे पीक आणि क्षेत्र चालू हंगामासाठी PMFBY अंतर्गत अधिसूचित आहे का ते तपासा.',
    },
  },
  {
    num: 2,
    title: { en: 'Gather documents', hi: 'दस्तावेज़ इकट्ठा करें', mr: 'कागदपत्रे जमा करा' },
    desc: {
      en: 'Prepare your Aadhaar card, land records (7/12 extract), bank passbook, and sowing certificate from the revenue authority.',
      hi: 'आधार कार्ड, भूमि अभिलेख, बैंक पासबुक और बुवाई प्रमाणपत्र तैयार करें।',
      mr: 'आधार कार्ड, सातबारा उतारा, बँक पासबुक आणि पेरणी प्रमाणपत्र तयार करा.',
    },
  },
  {
    num: 3,
    title: { en: 'Visit bank / PACS / CSC', hi: 'बैंक / PACS / CSC जाएँ', mr: 'बँक / PACS / CSC ला भेट द्या' },
    desc: {
      en: 'Go to your nearest bank branch, PACS office, or Common Service Centre. Fill the PMFBY application form with crop and land details.',
      hi: 'अपनी निकटतम बैंक शाखा, PACS कार्यालय या CSC जाएँ। PMFBY आवेदन भरें।',
      mr: 'जवळच्या बँक शाखा, PACS कार्यालय किंवा CSC ला जा. PMFBY अर्ज भरा.',
    },
  },
  {
    num: 4,
    title: { en: 'Pay farmer premium', hi: 'किसान प्रीमियम भरें', mr: 'शेतकरी प्रीमियम भरा' },
    desc: {
      en: 'Pay the farmer share of the premium — just 2% for Kharif, 1.5% for Rabi, and 5% for horticulture/commercial crops. The government pays the rest.',
      hi: 'किसान हिस्से का प्रीमियम भरें — खरीफ के लिए केवल 2%, रबी के लिए 1.5%, बागवानी के लिए 5%।',
      mr: 'शेतकरी हिस्सा प्रीमियम भरा — खरीप साठी फक्त २%, रबी साठी १.५%, फलोत्पादनासाठी ५%.',
    },
  },
  {
    num: 5,
    title: { en: 'Get policy confirmation', hi: 'पॉलिसी पुष्टि प्राप्त करें', mr: 'पॉलिसी पुष्टीकरण मिळवा' },
    desc: {
      en: 'Receive your insurance policy confirmation with your application reference number. Keep this safe.',
      hi: 'अपनी बीमा पॉलिसी पुष्टि और संदर्भ संख्या प्राप्त करें। इसे सुरक्षित रखें।',
      mr: 'विमा पॉलिसी पुष्टीकरण आणि संदर्भ क्रमांक मिळवा. हे सुरक्षित ठेवा.',
    },
  },
  {
    num: 6,
    title: { en: 'Report loss within 72 hours', hi: '72 घंटे में नुकसान की सूचना दें', mr: '७२ तासांत नुकसान कळवा' },
    desc: {
      en: 'In case of crop damage, report to the insurance company, toll-free helpline, or your bank/PACS within 72 hours. Provide crop photographs and details.',
      hi: 'फसल नुकसान होने पर 72 घंटे के भीतर बीमा कंपनी या हेल्पलाइन को सूचित करें।',
      mr: 'पीक नुकसान झाल्यास ७२ तासांत विमा कंपनी किंवा हेल्पलाइनला कळवा.',
    },
  },
];

const PREMIUM_TABLE = [
  { season: { en: 'Kharif (monsoon)', hi: 'खरीफ (मानसून)', mr: 'खरीप (पावसाळी)' }, rate: '2%' },
  { season: { en: 'Rabi (winter)', hi: 'रबी (शीतकाल)', mr: 'रबी (हिवाळी)' }, rate: '1.5%' },
  { season: { en: 'Horticulture / Commercial', hi: 'बागवानी / व्यापारिक', mr: 'फलोत्पादन / व्यापारी' }, rate: '5%' },
];

export default function CropInsurancePage() {
  const { language } = useApp();

  const getLang = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        {t(language, 'cropInsurance')}
      </h1>
      <p className="text-text-secondary mt-2 leading-relaxed max-w-2xl">
        {t(language, 'cropInsuranceDesc')}
      </p>

      {/* What is PMFBY */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-text mb-4">
          {language === 'en' ? 'What is PMFBY?' : language === 'hi' ? 'PMFBY क्या है?' : 'PMFBY म्हणजे काय?'}
        </h2>
        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-sm text-text leading-relaxed">
            {language === 'en'
              ? 'The Pradhan Mantri Fasal Bima Yojana (PMFBY) is a comprehensive crop insurance scheme launched by the Government of India. It covers losses due to natural calamities, pests, and diseases from pre-sowing to post-harvest. The scheme ensures financial support to farmers suffering crop loss at very low premium rates.'
              : language === 'hi'
              ? 'प्रधानमंत्री फसल बीमा योजना (PMFBY) भारत सरकार की एक व्यापक फसल बीमा योजना है। यह प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण बुवाई से लेकर कटाई के बाद तक के नुकसान को कवर करती है।'
              : 'प्रधानमंत्री फसल बीमा योजना (PMFBY) ही भारत सरकारची सर्वसमावेशक पीक विमा योजना आहे. ती नैसर्गिक आपत्ती, कीटक आणि रोगांमुळे पेरणीपूर्व ते कापणीनंतरच्या नुकसानीसाठी कवच देते.'}
          </p>
        </div>
      </section>

      {/* Premium rates */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-text mb-4">
          {language === 'en' ? 'Farmer Premium Rates' : language === 'hi' ? 'किसान प्रीमियम दर' : 'शेतकरी प्रीमियम दर'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-secondary">
                <th className="text-left px-4 py-3 font-semibold text-text">
                  {language === 'en' ? 'Season / Crop Type' : language === 'hi' ? 'मौसम / फसल प्रकार' : 'हंगाम / पीक प्रकार'}
                </th>
                <th className="text-left px-4 py-3 font-semibold text-text">
                  {language === 'en' ? 'Farmer Premium' : language === 'hi' ? 'किसान प्रीमियम' : 'शेतकरी प्रीमियम'}
                </th>
              </tr>
            </thead>
            <tbody>
              {PREMIUM_TABLE.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 text-text">{getLang(row.season)}</td>
                  <td className="px-4 py-3 text-accent font-semibold">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          {language === 'en'
            ? 'The remaining premium is shared equally between the Central and State governments. There is no cap on government subsidy.'
            : language === 'hi'
            ? 'शेष प्रीमियम केंद्र और राज्य सरकार समान रूप से वहन करती है। सरकारी अनुदान पर कोई सीमा नहीं है।'
            : 'उर्वरित प्रीमियम केंद्र आणि राज्य सरकार समान प्रमाणात भरतात. सरकारी अनुदानावर मर्यादा नाही.'}
        </p>
      </section>

      {/* Step-by-step process */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-text mb-6">
          {t(language, 'applicationProcess')}
        </h2>
        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex gap-4 pb-8 relative">
              {/* Vertical line */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-[15px] top-[40px] bottom-0 w-px bg-border" />
              )}
              {/* Step number */}
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0 relative z-10">
                {step.num}
              </div>
              <div>
                <h3 className="font-semibold text-text text-sm">{getLang(step.title)}</h3>
                <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                  {getLang(step.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage */}
      <section className="mt-6">
        <h2 className="text-xl font-bold text-text mb-4">
          {language === 'en' ? 'What is covered?' : language === 'hi' ? 'क्या कवर होता है?' : 'काय कवर होते?'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { en: 'Standing crop losses due to floods, drought, hailstorm', hi: 'बाढ़, सूखा, ओलावृष्टि से फसल नुकसान', mr: 'पूर, दुष्काळ, गारपिटीमुळे उभ्या पीक नुकसान' },
            { en: 'Prevented sowing / planting', hi: 'बुवाई न हो पाना', mr: 'पेरणी रोखली गेल्यास' },
            { en: 'Post-harvest losses (up to 14 days)', hi: 'फसल कटाई के बाद नुकसान (14 दिन तक)', mr: 'कापणीनंतर नुकसान (१४ दिवसांपर्यंत)' },
            { en: 'Localized calamities (landslide, inundation)', hi: 'स्थानीय आपदाएँ (भूस्खलन, बाढ़)', mr: 'स्थानिक आपत्ती (भूस्खलन, पूर)' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-surface border border-border rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span className="text-sm text-text">{getLang(item)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Source */}
      <section className="mt-10">
        <h3 className="text-sm font-semibold text-text mb-2">{t(language, 'sourcesLabel')}</h3>
        <SourceCard source={mockSources[0]} />
      </section>

      <Disclaimer text={t(language, 'disclaimer')} />
    </div>
  );
}
