'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { getSchemes } from '@/services/schemeService';
import SourceCard from '@/components/ui/SourceCard';
import { LoadingState, Disclaimer } from '@/components/ui/States';
import type { Scheme, SchemeCategory } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES: { value: SchemeCategory | ''; label: string }[] = [
  { value: '', label: 'allCategories' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'credit', label: 'Credit' },
  { value: 'subsidy', label: 'Subsidy' },
  { value: 'welfare', label: 'Welfare' },
];

export default function SchemesPage() {
  const { language } = useApp();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<SchemeCategory | ''>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const results = await getSchemes({
        category: categoryFilter || undefined,
        search: searchQuery || undefined,
      });
      setSchemes(results);
      setLoading(false);
    };
    load();
  }, [searchQuery, categoryFilter]);

  const getTitle = (scheme: Scheme) => {
    if (language === 'hi' && scheme.titleHi) return scheme.titleHi;
    if (language === 'mr' && scheme.titleMr) return scheme.titleMr;
    return scheme.title;
  };

  const getDescription = (scheme: Scheme) => {
    if (language === 'hi' && scheme.descriptionHi) return scheme.descriptionHi;
    if (language === 'mr' && scheme.descriptionMr) return scheme.descriptionMr;
    return scheme.description;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        {t(language, 'governmentSchemes')}
      </h1>
      <p className="text-text-secondary mt-2 leading-relaxed">
        {t(language, 'governmentSchemesDesc')}
      </p>

      {/* Search + Filter */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder={t(language, 'searchSchemes')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-lg text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-accent"
            aria-label={t(language, 'search')}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as SchemeCategory | '')}
          className="text-sm bg-surface border border-border rounded-lg px-3 py-2.5 text-text cursor-pointer focus:outline-none focus:border-accent"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.value === '' ? t(language, 'allCategories') : cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Schemes list */}
      {loading ? (
        <LoadingState />
      ) : (
        <div className="mt-8 space-y-4">
          {schemes.map((scheme) => {
            const isExpanded = expandedId === scheme.id;
            return (
              <article
                key={scheme.id}
                className="border border-border rounded-lg bg-surface overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-secondary/50 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0">
                    <h2 className="font-semibold text-text leading-snug">
                      {getTitle(scheme)}
                    </h2>
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed line-clamp-2">
                      {getDescription(scheme)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary text-text-secondary capitalize">
                        {scheme.category}
                      </span>
                      <span className="text-xs text-text-secondary">{scheme.ministry}</span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-text-secondary shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-secondary shrink-0 mt-1" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border pt-4 space-y-5">
                    {/* Eligibility */}
                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">
                        {t(language, 'eligibility')}
                      </h3>
                      <ul className="text-sm text-text-secondary space-y-1 list-disc ml-4">
                        {scheme.eligibility.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">
                        {t(language, 'benefits')}
                      </h3>
                      <ul className="text-sm text-text-secondary space-y-1 list-disc ml-4">
                        {scheme.benefits.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Documents */}
                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">
                        {t(language, 'documents')}
                      </h3>
                      <ul className="text-sm text-text-secondary space-y-1 list-disc ml-4">
                        {scheme.documents.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Application Process */}
                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">
                        {t(language, 'applicationProcess')}
                      </h3>
                      <ol className="text-sm text-text-secondary space-y-1.5 list-decimal ml-4">
                        {scheme.applicationProcess.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ol>
                    </div>

                    {/* Source */}
                    <div>
                      <h3 className="text-sm font-semibold text-text mb-2">
                        {t(language, 'sourcesLabel')}
                      </h3>
                      <SourceCard source={scheme.source} />
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          {schemes.length === 0 && (
            <p className="text-center text-text-secondary py-12">
              No schemes found matching your search.
            </p>
          )}
        </div>
      )}

      <Disclaimer text={t(language, 'disclaimer')} />
    </div>
  );
}
