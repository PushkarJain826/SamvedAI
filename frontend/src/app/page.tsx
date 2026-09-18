'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Mic,
  Languages,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Landmark,
  Wheat,
  BookOpen,
  Shield,
  PiggyBank,
  AlertCircle,
  LayoutGrid,
  Sprout,
  Users,
  Leaf,
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

const HERO_IMAGES = [
  '/images/farmer-hero1.jpg',
  '/images/farmer-hero2.jpg',
  '/images/farmer-hero3.jpg',
];

export default function HomePage() {
  const { language } = useApp();

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero Section ─────────────────────── */}
      <section className="relative bg-[#FEFAF3] pt-10 pb-12 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">

        {/* Subtle decorative foliage in background */}
        <div className="absolute top-12 left-2 text-[#2E7D32]/10 pointer-events-none hidden md:block">
          <Leaf className="w-16 h-16 transform -rotate-45" />
        </div>

        <div className="absolute top-24 right-4 text-[#2E7D32]/10 pointer-events-none hidden md:block">
          <Leaf className="w-20 h-20 transform rotate-45" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">

              {/* Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E8F3E4] text-[#2E7D32] border border-[#C8E6C9] shadow-xs">
                  <Sprout className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Empowering Rural India</span>
                </span>
              </div>

              {/* Title with Terracotta Accent */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-text leading-[1.18] tracking-tight">
                {language === 'en' ? (
                  <>
                    Government information,
                    <br />
                    <span className="text-[#C65D2E]">made simple</span> for everyone.
                  </>
                ) : (
                  t(language, 'heroTitle')
                )}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
                {t(language, 'heroDescription')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/assistant"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all text-sm shadow-md shadow-accent/20 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t(language, 'askSamvedai')}</span>
                  <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F8F1E4] hover:bg-[#EFE5D3] text-text font-medium rounded-full border border-[#E5DAC0] transition-colors text-sm shadow-xs"
                >
                  <LayoutGrid className="w-4 h-4 text-accent" />
                  <span>{t(language, 'exploreServices')}</span>
                </Link>
              </div>

              {/* Voice Indicator */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary pt-1">
                <Mic className="w-4 h-4 text-[#C65D2E] shrink-0" />
                <span>
                  {language === 'en'
                    ? 'Speak your question naturally. Ideal for those more comfortable with spoken language.'
                    : t(language, 'voiceDesc')}
                </span>
              </div>
            </div>

            {/* Right Visual Column (Farmer with callouts) */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">

              {/* Warm organic backdrop shape */}
              <div className="absolute inset-0 bg-[#F4B942]/15 rounded-[40px] transform rotate-2 scale-105 filter blur-xs" />

              <div className="absolute -inset-2 bg-[#E8F3E4]/40 rounded-[48px] transform -rotate-1" />
              
              {/* Image + Quote */}
              <div className="relative z-10 w-full flex flex-col items-center">

                {/* Farmer Image Crossfade */}
                <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl aspect-[841/562] rounded-3xl overflow-hidden shadow-xl border-4 border-white/95 z-10">
                  {HERO_IMAGES.map((image, index) => (
                    <img
                      key={image}
                      src={image}
                      alt="Indian Farmer in field"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-3000 ${
                        index === currentImage
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
                {/* Digital India Quote */}
                <div className="relative z-10 mt-3 text-center max-w-xl px-4">
                  <p className="text-lg sm:text-xl font-semibold text-[#2E7D32] leading-relaxed">
                    “Grow more. Know more. Go digital.”
                  </p>

                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="h-px w-10 bg-[#C8E6C9]" />
                    <span className="text-xs font-medium uppercase tracking-widest text-[#8A9A7B]">
                      Digital India
                    </span>
                    <div className="h-px w-10 bg-[#C8E6C9]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
              

        {/* Soft Organic Wave Separator */}
        <div className="w-full overflow-hidden leading-none mt-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-12 text-[#FFFFFF]"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ── Capabilities (4 Pill Cards) ─────── */}
      <section className="bg-surface py-8 sm:py-12 border-b border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Card 1: Multilingual */}
            <div className="bg-[#FEFAF3] border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E8F3E4] text-[#2E7D32] flex items-center justify-center shrink-0">
                <Languages className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-bold text-text text-sm sm:text-base">
                  {t(language, 'multilingualTitle')}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  {t(language, 'multilingualDesc')}
                </p>
              </div>
            </div>

            {/* Card 2: Voice Enabled */}
            <div className="bg-[#FEFAF3] border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FFF3E0] text-[#D96B27] flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-bold text-text text-sm sm:text-base">
                  {t(language, 'voiceTitle')}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  {t(language, 'voiceDesc')}
                </p>
              </div>
            </div>

            {/* Card 3: Trusted Sources */}
            <div className="bg-[#FEFAF3] border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E1F5FE] text-[#0277BD] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-bold text-text text-sm sm:text-base">
                  {t(language, 'trustedTitle')}
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  {t(language, 'trustedDesc')}
                </p>
              </div>
            </div>

            {/* Card 4: For Everyone */}
            <div className="bg-[#FEFAF3] border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FCE4EC] text-[#C2185B] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-bold text-text text-sm sm:text-base">
                  For Everyone
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                  Built for farmers, cooperative members and rural citizens.
                </p>
              </div>
            </div>
          </div>

          {/* Together for stronger communities divider */}
          <div className="flex items-center justify-center gap-3 pt-10 text-xs text-text-secondary">
            <div className="h-px w-16 sm:w-32 bg-border" />

            <span className="flex items-center gap-1.5 font-medium text-text-secondary/80">
              <Sprout className="w-3.5 h-3.5 text-accent" />
              Together for stronger communities
            </span>

            <div className="h-px w-16 sm:w-32 bg-border" />
          </div>
        </div>
      </section>

      {/* ── Services — editorial numbered list ── */}
      <section
        id="services"
        className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20"
      >
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Key Areas
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-text mt-1">
            Explore Services
          </h2>
        </div>

        <div className="space-y-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.num}
                href={service.href}
                className="group flex items-start gap-5 p-5 bg-surface border border-border/80 hover:border-accent/40 rounded-2xl shadow-xs hover:shadow-md transition-all"
              >
                <span className="text-2xl sm:text-3xl font-light text-border group-hover:text-accent transition-colors tabular-nums leading-none pt-1">
                  {service.num}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-secondary text-text-secondary group-hover:bg-accent/10 group-hover:text-accent flex items-center justify-center transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <h3 className="font-semibold text-text group-hover:text-accent transition-colors text-base sm:text-lg">
                      {t(language, service.key)}
                    </h3>
                  </div>

                  <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
                    {t(language, service.descKey)}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-secondary group-hover:bg-accent group-hover:text-white flex items-center justify-center text-text-secondary transition-colors shrink-0 mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── How It Works ─────────────────────── */}
      <section className="bg-surface border-y border-border py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Simple Process
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-text mt-1">
              {t(language, 'howItWorks')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-4">
            {STEPS.map((step, i) => (
              <div
                key={step.key}
                className="relative bg-[#FEFAF3] border border-border/70 rounded-2xl p-4 sm:p-5 shadow-xs flex sm:flex-col items-start gap-3 sm:gap-0"
              >
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-xs">
                  {i + 1}
                </div>

                <div className="sm:mt-3">
                  <h3 className="font-semibold text-text text-sm">
                    {t(language, step.key)}
                  </h3>

                  <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                    {t(language, step.desc)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="bg-[#FEFAF3] border border-[#E8DFC9] rounded-3xl p-8 sm:p-12 shadow-xs relative overflow-hidden">

          <div className="absolute top-0 right-0 p-8 text-[#2E7D32]/5 pointer-events-none">
            <Leaf className="w-32 h-32 transform rotate-12" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-text max-w-2xl mx-auto leading-snug">
            {t(language, 'tagline')}
          </h2>

          <div className="mt-6 flex justify-center">
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all text-sm shadow-md shadow-accent/20 hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t(language, 'askSamvedai')}</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}