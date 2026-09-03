'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { getSources } from '@/services/sourceService';
import SourceCard from '@/components/ui/SourceCard';
import { LoadingState } from '@/components/ui/States';
import type { Source } from '@/types';
import { ShieldCheck, AlertCircle, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

const CONFIDENCE_LEVELS = [
  {
    icon: CheckCircle2,
    color: 'text-accent',
    labelKey: 'verified' as const,
    desc: {
      en: 'Information comes from an authoritative, official source and has been verified.',
      hi: 'जानकारी एक आधिकारिक स्रोत से आती है और सत्यापित है।',
      mr: 'माहिती अधिकृत, अधिकृत स्रोतातून येते आणि सत्यापित आहे.',
    },
  },
  {
    icon: ShieldCheck,
    color: 'text-accent',
    labelKey: 'multipleSources' as const,
    desc: {
      en: 'Information is supported by multiple official sources, increasing confidence.',
      hi: 'जानकारी अनेक आधिकारिक स्रोतों द्वारा समर्थित है।',
      mr: 'माहिती अनेक अधिकृत स्रोतांद्वारे समर्थित आहे.',
    },
  },
  {
    icon: AlertCircle,
    color: 'text-amber-600',
    labelKey: 'partial' as const,
    desc: {
      en: 'Only partial information was found. Some details may be missing or incomplete.',
      hi: 'केवल आंशिक जानकारी मिली। कुछ विवरण गायब हो सकते हैं।',
      mr: 'फक्त आंशिक माहिती सापडली. काही तपशील अपूर्ण असू शकतात.',
    },
  },
  {
    icon: HelpCircle,
    color: 'text-red-500',
    labelKey: 'unavailable' as const,
    desc: {
      en: 'No reliable source could be found for this information. Use with caution.',
      hi: 'इस जानकारी का कोई विश्वसनीय स्रोत नहीं मिला। सावधानी से उपयोग करें।',
      mr: 'या माहितीसाठी विश्वसनीय स्रोत सापडला नाही. सावधगिरीने वापरा.',
    },
  },
  {
    icon: Clock,
    color: 'text-amber-600',
    labelKey: 'mayHaveChanged' as const,
    desc: {
      en: 'The source is older and the information may have been updated since. Verify with the relevant authority.',
      hi: 'स्रोत पुराना है और जानकारी अपडेट हो सकती है। संबंधित प्राधिकरण से सत्यापित करें।',
      mr: 'स्रोत जुना आहे आणि माहिती बदलली असू शकते. संबंधित प्राधिकरणाकडून तपासा.',
    },
  },
];

export default function SourcesPage() {
  const { language } = useApp();
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getSources();
      setSources(data);
      setLoading(false);
    };
    load();
  }, []);

  const getLang = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        {t(language, 'trustTitle')}
      </h1>
      <p className="text-text-secondary mt-2 leading-relaxed max-w-2xl">
        {t(language, 'trustDescription')}
      </p>

      {/* How we handle sources */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-text mb-4">
          {language === 'en' ? 'How we indicate confidence' : language === 'hi' ? 'हम विश्वसनीयता कैसे दर्शाते हैं' : 'आम्ही विश्वसनीयता कशी दर्शवतो'}
        </h2>
        <div className="space-y-3">
          {CONFIDENCE_LEVELS.map((level) => {
            const Icon = level.icon;
            return (
              <div key={level.labelKey} className="flex items-start gap-3 p-4 bg-surface border border-border rounded-lg">
                <Icon className={`w-5 h-5 ${level.color} shrink-0 mt-0.5`} />
                <div>
                  <p className="font-medium text-text text-sm">{t(language, level.labelKey)}</p>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                    {getLang(level.desc)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Where information comes from */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-text mb-4">
          {language === 'en' ? 'Where our information comes from' : language === 'hi' ? 'हमारी जानकारी कहाँ से आती है' : 'आमची माहिती कुठून येते'}
        </h2>
        <div className="bg-surface border border-border rounded-lg p-5">
          <ul className="space-y-3 text-sm text-text leading-relaxed">
            <li>
              {language === 'en'
                ? '• Official government gazettes, ministry circulars, and scheme operational guidelines'
                : language === 'hi'
                ? '• आधिकारिक सरकारी राजपत्र, मंत्रालय परिपत्र और योजना संचालन दिशानिर्देश'
                : '• अधिकृत सरकारी राजपत्रे, मंत्रालय परिपत्रके आणि योजना संचालन मार्गदर्शक तत्त्वे'}
            </li>
            <li>
              {language === 'en'
                ? '• State cooperative societies acts and rules'
                : language === 'hi'
                ? '• राज्य सहकारी समिति अधिनियम और नियम'
                : '• राज्य सहकारी संस्था कायदे आणि नियम'}
            </li>
            <li>
              {language === 'en'
                ? '• NABARD guidelines and circulars'
                : language === 'hi'
                ? '• NABARD दिशानिर्देश और परिपत्र'
                : '• NABARD मार्गदर्शक तत्त्वे आणि परिपत्रके'}
            </li>
            <li>
              {language === 'en'
                ? '• RBI banking and credit guidelines'
                : language === 'hi'
                ? '• RBI बैंकिंग और ऋण दिशानिर्देश'
                : '• RBI बँकिंग आणि कर्ज मार्गदर्शक तत्त्वे'}
            </li>
          </ul>
        </div>
      </section>

      {/* Source directory */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-text mb-4">
          {language === 'en' ? 'Source Directory' : language === 'hi' ? 'स्रोत निर्देशिका' : 'स्रोत निर्देशिका'}
        </h2>
        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-3">
            {sources.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
