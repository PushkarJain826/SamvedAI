'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Scale } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { getLawTopics } from '@/services/lawService';
import SourceCard from '@/components/ui/SourceCard';
import { LoadingState, Disclaimer } from '@/components/ui/States';
import type { LawTopic } from '@/types';

export default function CooperativeLawsPage() {
  const { language } = useApp();
  const [topics, setTopics] = useState<LawTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getLawTopics();
      setTopics(data);
      setLoading(false);
    };
    load();
  }, []);

  const getTitle = (topic: LawTopic) => {
    if (language === 'hi' && topic.titleHi) return topic.titleHi;
    if (language === 'mr' && topic.titleMr) return topic.titleMr;
    return topic.title;
  };

  const getDescription = (topic: LawTopic) => {
    if (language === 'hi' && topic.descriptionHi) return topic.descriptionHi;
    if (language === 'mr' && topic.descriptionMr) return topic.descriptionMr;
    return topic.description;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-start gap-3">
        <Scale className="w-7 h-7 text-accent shrink-0 mt-1" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text">
            {t(language, 'cooperativeLaws')}
          </h1>
          <p className="text-text-secondary mt-2 leading-relaxed">
            {t(language, 'cooperativeLawsDesc')}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : (
        <div className="mt-8 space-y-3">
          {topics.map((topic) => {
            const isExpanded = expandedId === topic.id;
            return (
              <article
                key={topic.id}
                className="border border-border rounded-lg bg-surface overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-secondary/50 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0">
                    <h2 className="font-semibold text-text">
                      {getTitle(topic)}
                    </h2>
                    <p className="text-sm text-text-secondary mt-1">
                      {getDescription(topic)}
                    </p>
                    <span className="inline-block text-xs px-2 py-0.5 rounded bg-secondary text-text-secondary capitalize mt-2">
                      {topic.category}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-text-secondary shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-secondary shrink-0 mt-1" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
                    {topic.sections.map((section, i) => (
                      <div key={i}>
                        <h3 className="text-sm font-semibold text-text">{section.heading}</h3>
                        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                          {section.content}
                        </p>
                        {section.reference && (
                          <p className="text-xs text-accent mt-1">{section.reference}</p>
                        )}
                      </div>
                    ))}

                    <div className="pt-2">
                      <SourceCard source={topic.source} />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      <Disclaimer text={t(language, 'legalDisclaimer')} />
    </div>
  );
}
