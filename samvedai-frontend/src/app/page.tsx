'use client';

import Link from 'next/link';
import {
  MessageCircle,
  Mic,
  Languages,
  ShieldCheck,
  ArrowRight,
  Landmark,
  Wheat,
  BookOpen,
  Shield,
  PiggyBank,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';

const SERVICES = [
  { num: '01', key: 'governmentSchemes' as const, descKey: 'governmentSchemesDesc' as const, href: '/schemes', icon: Landmark },
  { num: '02', key: 'cropInsurance' as const, descKey: 'cropInsuranceDesc' as const, href: '/crop-insurance', icon: Wheat },
  { num: '03', key: 'cooperativeLaws' as const, descKey: 'cooperativeLawsDesc' as const, href: '/cooperative-laws', icon: BookOpen },
  { num: '04', key: 'pacsServices' as const, descKey: 'pacsServicesDesc' as const, href: '/pacs', icon: Shield },
  { num: '05', key: 'financialLiteracy' as const, descKey: 'financialLiteracyDesc' as const, href: '/financial-literacy', icon: PiggyBank },
  { num: '06', key: 'grievanceAssistance' as const, descKey: 'grievanceAssistanceDesc' as const, href: '/grievance', icon: AlertCircle },
];

const STEPS = [
  { key: 'step1Title' as const, desc: 'step1Desc' as const },
  { key: 'step2Title' as const, desc: 'step2Desc' as const },
  { key: 'step3Title' as const, desc: 'step3Desc' as const },
  { key: 'step4Title' as const, desc: 'step4Desc' as const },
  { key: 'step5Title' as const, desc: 'step5Desc' as const },
];

export default function HomePage() {
  const { language } = useApp();

  return (
    <div>
      {/* ── Hero ─────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight tracking-tight max-w-3xl">
          {t(language, 'heroTitle')}
        </h1>
        <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-2xl">
          {t(language, 'heroDescription')}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/assistant"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {t(language, 'askSamvedai')}
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-text font-medium rounded-md hover:bg-secondary transition-colors text-sm"
          >
            {t(language, 'exploreServices')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Voice indicator */}
        <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
          <Mic className="w-4 h-4 text-accent" />
          <span>{t(language, 'voiceDesc')}</span>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div>
              <Languages className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-semibold text-text">{t(language, 'multilingualTitle')}</h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {t(language, 'multilingualDesc')}
              </p>
            </div>
            <div>
              <Mic className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-semibold text-text">{t(language, 'voiceTitle')}</h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {t(language, 'voiceDesc')}
              </p>
            </div>
            <div>
              <ShieldCheck className="w-6 h-6 text-accent mb-3" />
              <h3 className="font-semibold text-text">{t(language, 'trustedTitle')}</h3>
              <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                {t(language, 'trustedDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services — editorial numbered list ── */}
      <section id="services" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="space-y-0">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.num}
                href={service.href}
                className="group flex items-start gap-5 py-6 border-b border-border hover:bg-surface/50 transition-colors -mx-4 px-4 rounded-md"
              >
                <span className="text-3xl font-light text-border group-hover:text-accent transition-colors tabular-nums leading-none pt-1">
                  {service.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
                    <h3 className="font-semibold text-text group-hover:text-accent transition-colors">
                      {t(language, service.key)}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                    {t(language, service.descKey)}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-border group-hover:text-accent transition-colors mt-1 shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ─────────────────────── */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-2xl font-bold text-text mb-12">
            {t(language, 'howItWorks')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.key} className="relative">
                <div className="flex sm:flex-col items-start gap-3 sm:gap-0">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="sm:mt-3">
                    <h3 className="font-semibold text-text text-sm">
                      {t(language, step.key)}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      {t(language, step.desc)}
                    </p>
                  </div>
                </div>
                {/* Connector line on desktop */}
                {i < STEPS.length - 1 && (
                  <div className="hidden sm:block absolute top-4 left-[calc(100%_-_8px)] w-[calc(100%_-_24px)] h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-text">
          {t(language, 'tagline')}
        </h2>
        <div className="mt-6">
          <Link
            href="/assistant"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-colors text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {t(language, 'askSamvedai')}
          </Link>
        </div>
      </section>
    </div>
  );
}
