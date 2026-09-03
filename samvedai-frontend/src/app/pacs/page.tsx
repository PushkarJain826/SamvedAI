'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { getPacsServices } from '@/services/pacsService';
import { LoadingState, Disclaimer } from '@/components/ui/States';
import type { PacsService } from '@/types';

export default function PacsPage() {
  const { language } = useApp();
  const [services, setServices] = useState<PacsService[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getPacsServices();
      setServices(data);
      setLoading(false);
    };
    load();
  }, []);

  const getTitle = (svc: PacsService) => {
    if (language === 'hi' && svc.titleHi) return svc.titleHi;
    if (language === 'mr' && svc.titleMr) return svc.titleMr;
    return svc.title;
  };

  const getDescription = (svc: PacsService) => {
    if (language === 'hi' && svc.descriptionHi) return svc.descriptionHi;
    if (language === 'mr' && svc.descriptionMr) return svc.descriptionMr;
    return svc.description;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-start gap-3">
        <Building2 className="w-7 h-7 text-accent shrink-0 mt-1" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text">
            {t(language, 'pacsServices')}
          </h1>
          <p className="text-text-secondary mt-2 leading-relaxed">
            {t(language, 'pacsServicesDesc')}
          </p>
        </div>
      </div>

      {/* What is a PACS */}
      <section className="mt-8 bg-surface border border-border rounded-lg p-5">
        <h2 className="font-semibold text-text mb-2">
          {language === 'en' ? 'What is a PACS?' : language === 'hi' ? 'PACS क्या है?' : 'PACS म्हणजे काय?'}
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          {language === 'en'
            ? 'Primary Agricultural Credit Societies (PACS) are village-level cooperative credit institutions. They provide short-term credit, input supply, and other services to farmers and rural communities. PACS form the grassroots tier of the three-tier cooperative credit structure in India.'
            : language === 'hi'
            ? 'प्राथमिक कृषि साख समिति (PACS) ग्राम स्तरीय सहकारी ऋण संस्थाएँ हैं। ये किसानों को अल्पकालिक ऋण, इनपुट आपूर्ति और अन्य सेवाएँ प्रदान करती हैं।'
            : 'प्राथमिक कृषी पतसंस्था (PACS) ही ग्रामपातळीवरील सहकारी पतसंस्था आहे. ती शेतकऱ्यांना अल्पकालीन कर्ज, निविष्ठा पुरवठा आणि इतर सेवा पुरवते.'}
        </p>
      </section>

      {loading ? (
        <LoadingState />
      ) : (
        <div className="mt-8 space-y-3">
          {services.map((svc) => {
            const isExpanded = expandedId === svc.id;
            return (
              <article
                key={svc.id}
                className="border border-border rounded-lg bg-surface overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-secondary/50 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0">
                    <h2 className="font-semibold text-text">{getTitle(svc)}</h2>
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                      {getDescription(svc)}
                    </p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-text-secondary shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-secondary shrink-0 mt-1" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">{t(language, 'eligibility')}</h3>
                      <ul className="text-sm text-text-secondary space-y-1 list-disc ml-4">
                        {svc.eligibility.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">{t(language, 'documents')}</h3>
                      <ul className="text-sm text-text-secondary space-y-1 list-disc ml-4">
                        {svc.documents.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">{t(language, 'applicationProcess')}</h3>
                      <ol className="text-sm text-text-secondary space-y-1.5 list-decimal ml-4">
                        {svc.process.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ol>
                    </div>

                    {svc.note && (
                      <div className="p-3 bg-secondary rounded-md text-sm text-text-secondary leading-relaxed">
                        {svc.note}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      <Disclaimer text={t(language, 'pacsDisclaimer')} />
    </div>
  );
}
