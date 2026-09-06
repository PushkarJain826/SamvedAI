'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { t, LANGUAGES } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Language, AccessibilitySettings } from '@/types';

export default function AccessibilityPage() {
  const { language, setLanguage, accessibility, setAccessibility } = useApp();

  const updateA11y = (patch: Partial<AccessibilitySettings>) => {
    setAccessibility({ ...accessibility, ...patch });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        {t(language, 'accessibilityTitle')}
      </h1>
      <p className="text-text-secondary mt-2 leading-relaxed">
        {language === 'en'
          ? 'Customize SAMVEDAI to suit your needs. Changes are saved automatically.'
          : language === 'hi'
          ? 'अपनी ज़रूरतों के अनुसार संवेदAI को अनुकूलित करें। परिवर्तन स्वचालित रूप से सहेजे जाते हैं।'
          : 'तुमच्या गरजेनुसार संवेदAI अनुकूलित करा. बदल आपोआप जतन होतात.'}
      </p>

      {/* Language */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-text mb-4">{t(language, 'languageSettings')}</h2>
        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'p-4 rounded-lg border text-left transition-colors',
                  language === lang.code
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                )}
                aria-pressed={language === lang.code}
              >
                <p className="font-semibold text-text">{lang.nativeLabel}</p>
                <p className="text-sm text-text-secondary mt-0.5">{lang.label}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Text Size */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-text mb-4">{t(language, 'textSize')}</h2>
        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="grid grid-cols-3 gap-3">
            {(['normal', 'large', 'x-large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => updateA11y({ textSize: size })}
                className={cn(
                  'p-4 rounded-lg border text-center transition-colors',
                  accessibility.textSize === size
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/50'
                )}
                aria-pressed={accessibility.textSize === size}
              >
                <p
                  className={cn(
                    'font-semibold text-text',
                    size === 'normal' && 'text-sm',
                    size === 'large' && 'text-base',
                    size === 'x-large' && 'text-lg'
                  )}
                >
                  {size === 'normal'
                    ? t(language, 'normal')
                    : size === 'large'
                    ? t(language, 'large')
                    : t(language, 'extraLarge')}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {size === 'normal' ? '16px' : size === 'large' ? '18px' : '20px'}
                </p>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-4 p-4 bg-bg rounded-lg">
            <p className="text-text text-sm leading-relaxed">
              {language === 'en'
                ? 'This is a preview of how text will appear with the selected size. SAMVEDAI helps farmers understand government schemes, cooperative laws, and financial literacy in simple language.'
                : language === 'hi'
                ? 'यह चयनित आकार के साथ टेक्स्ट कैसा दिखेगा इसका पूर्वावलोकन है। संवेदAI किसानों को सरकारी योजनाओं और सहकारी कानूनों को सरल भाषा में समझने में मदद करता है।'
                : 'निवडलेल्या आकारासह मजकूर कसा दिसेल याचे हे पूर्वावलोकन आहे. संवेदAI शेतकऱ्यांना सरकारी योजना आणि सहकारी कायदे सोप्या भाषेत समजून घेण्यास मदत करतो.'}
            </p>
          </div>
        </div>
      </section>

      {/* Reduced Motion */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-text mb-4">{t(language, 'reducedMotion')}</h2>
        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text font-medium">{t(language, 'reducedMotion')}</p>
              <p className="text-xs text-text-secondary mt-1">
                {language === 'en'
                  ? 'Disable animations and transitions for a calmer experience.'
                  : language === 'hi'
                  ? 'शांत अनुभव के लिए एनिमेशन और ट्रांज़िशन अक्षम करें।'
                  : 'शांत अनुभवासाठी ॲनिमेशन आणि ट्रांझिशन बंद करा.'}
              </p>
            </div>
            <button
              onClick={() => updateA11y({ reducedMotion: !accessibility.reducedMotion })}
              className={cn(
                'relative w-12 h-7 rounded-full transition-colors',
                accessibility.reducedMotion ? 'bg-accent' : 'bg-border'
              )}
              role="switch"
              aria-checked={accessibility.reducedMotion}
              aria-label={t(language, 'reducedMotion')}
            >
              <span
                className={cn(
                  'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                  accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        </div>
      </section>

      {/* High Contrast */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-text mb-4">{t(language, 'highContrast')}</h2>
        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text font-medium">{t(language, 'highContrast')}</p>
              <p className="text-xs text-text-secondary mt-1">
                {language === 'en'
                  ? 'Increase color contrast for better readability.'
                  : language === 'hi'
                  ? 'बेहतर पठनीयता के लिए रंग कंट्रास्ट बढ़ाएँ।'
                  : 'चांगल्या वाचनीयतेसाठी रंग कॉन्ट्रास्ट वाढवा.'}
              </p>
            </div>
            <button
              onClick={() => updateA11y({ highContrast: !accessibility.highContrast })}
              className={cn(
                'relative w-12 h-7 rounded-full transition-colors',
                accessibility.highContrast ? 'bg-accent' : 'bg-border'
              )}
              role="switch"
              aria-checked={accessibility.highContrast}
              aria-label={t(language, 'highContrast')}
            >
              <span
                className={cn(
                  'absolute top-1 w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                  accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Keyboard navigation info */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-text mb-4">
          {language === 'en' ? 'Keyboard Navigation' : language === 'hi' ? 'कीबोर्ड नेविगेशन' : 'कीबोर्ड नेव्हिगेशन'}
        </h2>
        <div className="bg-surface border border-border rounded-lg p-5 text-sm text-text-secondary leading-relaxed">
          {language === 'en'
            ? 'SAMVEDAI supports full keyboard navigation. Use Tab to move between interactive elements, Enter or Space to activate buttons and links, and Escape to close overlays. Focus indicators are visible on all interactive elements.'
            : language === 'hi'
            ? 'संवेदAI पूर्ण कीबोर्ड नेविगेशन का समर्थन करता है। Tab से तत्वों के बीच जाएँ, Enter या Space से बटन और लिंक सक्रिय करें, Escape से ओवरले बंद करें।'
            : 'संवेदAI पूर्ण कीबोर्ड नेव्हिगेशनला सपोर्ट करतो. Tab ने घटकांमध्ये जा, Enter किंवा Space ने बटणे आणि लिंक्स सक्रिय करा, Escape ने ओव्हरले बंद करा.'}
        </div>
      </section>
    </div>
  );
}
