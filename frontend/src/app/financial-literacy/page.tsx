'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { cn, calculateEMI, formatCurrency } from '@/lib/utils';
import { Disclaimer } from '@/components/ui/States';
import { mockFinancialTopics } from '@/data/mockData';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import type { FinancialTopic, EMIResult } from '@/types';

export default function FinancialLiteracyPage() {
  const { language } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // EMI calculator state
  const [loanAmount, setLoanAmount] = useState('100000');
  const [interestRate, setInterestRate] = useState('7');
  const [tenure, setTenure] = useState('12');
  const [emiResult, setEmiResult] = useState<EMIResult | null>(null);

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseInt(tenure) || 1;
    if (principal > 0 && months > 0) {
      setEmiResult(calculateEMI({ principal, rate, tenure: months }));
    }
  };

  const getTitle = (topic: FinancialTopic) => {
    if (language === 'hi' && topic.titleHi) return topic.titleHi;
    if (language === 'mr' && topic.titleMr) return topic.titleMr;
    return topic.title;
  };

  const getDescription = (topic: FinancialTopic) => {
    if (language === 'hi' && topic.descriptionHi) return topic.descriptionHi;
    if (language === 'mr' && topic.descriptionMr) return topic.descriptionMr;
    return topic.description;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        {t(language, 'financialLiteracy')}
      </h1>
      <p className="text-text-secondary mt-2 leading-relaxed">
        {t(language, 'financialLiteracyDesc')}
      </p>

      {/* Topics */}
      <div className="mt-8 space-y-3">
        {mockFinancialTopics.map((topic) => {
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
                  <h2 className="font-semibold text-text">{getTitle(topic)}</h2>
                  <p className="text-sm text-text-secondary mt-1">{getDescription(topic)}</p>
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
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* EMI Calculator */}
      <section className="mt-12">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-text">{t(language, 'emiCalculator')}</h2>
        </div>

        <div className="bg-surface border border-border rounded-lg p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                {t(language, 'loanAmount')}
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-md text-text focus:outline-none focus:border-accent"
                min="0"
                aria-label={t(language, 'loanAmount')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                {t(language, 'interestRate')}
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-md text-text focus:outline-none focus:border-accent"
                min="0"
                step="0.1"
                aria-label={t(language, 'interestRate')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                {t(language, 'tenure')} ({t(language, 'months')})
              </label>
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-md text-text focus:outline-none focus:border-accent"
                min="1"
                aria-label={t(language, 'tenure')}
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="mt-4 px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent-dark transition-colors"
          >
            {t(language, 'calculate')}
          </button>

          {emiResult && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-bg rounded-lg text-center">
                <p className="text-xs text-text-secondary">{t(language, 'monthlyEmi')}</p>
                <p className="text-xl font-bold text-accent mt-1">{formatCurrency(emiResult.emi)}</p>
              </div>
              <div className="p-4 bg-bg rounded-lg text-center">
                <p className="text-xs text-text-secondary">{t(language, 'totalPayment')}</p>
                <p className="text-lg font-semibold text-text mt-1">{formatCurrency(emiResult.totalPayment)}</p>
              </div>
              <div className="p-4 bg-bg rounded-lg text-center">
                <p className="text-xs text-text-secondary">{t(language, 'totalInterest')}</p>
                <p className="text-lg font-semibold text-text mt-1">{formatCurrency(emiResult.totalInterest)}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Disclaimer text={t(language, 'disclaimer')} />
    </div>
  );
}
