'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  MessageCircle,
  BookOpen,
  Shield,
  Landmark,
  PiggyBank,
  AlertCircle,
  FileText,
  Info,
  Settings,
  Wheat,
  Home,
  Search,
  Sun,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t, LANGUAGES } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' as const, icon: Home },
  { href: '/assistant', labelKey: 'assistant' as const, icon: MessageCircle },
  { href: '/schemes', labelKey: 'governmentSchemes' as const, icon: Landmark },
  { href: '/crop-insurance', labelKey: 'cropInsurance' as const, icon: Wheat },
  { href: '/cooperative-laws', labelKey: 'cooperativeLaws' as const, icon: BookOpen },
  { href: '/pacs', labelKey: 'pacsServices' as const, icon: Shield },
  { href: '/financial-literacy', labelKey: 'financialLiteracy' as const, icon: PiggyBank },
  { href: '/grievance', labelKey: 'grievanceAssistance' as const, icon: AlertCircle },
  { href: '/sources', labelKey: 'sources' as const, icon: FileText },
  { href: '/about', labelKey: 'about' as const, icon: Info },
  { href: '/accessibility', labelKey: 'accessibility' as const, icon: Settings },
];

export default function Header() {
  const { language, setLanguage } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand with emblem */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="SAMVEDAI Home">
            {/* Emblem SVG: Sun + Sprouting Plant */}
            <div className="w-10 h-10 rounded-full bg-[#E8F3E4] border border-[#C8E6C9] flex items-center justify-center relative overflow-hidden shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Sun rays & disc */}
                <circle cx="20" cy="14" r="7" fill="#F4B942" />
                <path d="M20 3V6M12.5 6.5L14.5 9M27.5 6.5L25.5 9" stroke="#E6A820" strokeWidth="1.5" strokeLinecap="round" />
                {/* Soil line */}
                <path d="M6 31C12 28 28 28 34 31" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" />
                {/* Sprout stem and leaves */}
                <path d="M20 30V18" stroke="#2E7D32" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 22C16 19 12 21 11 25C15 26 19 24 20 22Z" fill="#388E3C" />
                <path d="M20 19C24 16 28 18 29 22C25 23 21 21 20 19Z" fill="#4CAF50" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-text leading-none">
                {t(language, 'brand')}
              </span>
              <span className="text-[10px] font-medium text-text-secondary tracking-wider mt-0.5">
                Sahaj • Sahi • Sabke Liye
              </span>
            </div>
          </Link>

          {/* Desktop nav — condensed pills */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.slice(0, 8).map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5',
                    isActive
                      ? 'bg-[#F4EBD9] text-[#1F2937] font-semibold border border-[#E8DFC9] shadow-xs'
                      : 'text-text-secondary hover:text-text hover:bg-secondary'
                  )}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                  <span>{t(language, item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
              className="hidden sm:block text-xs bg-secondary border border-border rounded-full px-3 py-1.5 text-text cursor-pointer focus:ring-2 focus:ring-accent font-medium shadow-xs"
              aria-label={t(language, 'language')}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeLabel}
                </option>
              ))}
            </select>

            {/* Quick action icons */}
            <div className="hidden sm:flex items-center gap-1">
              <Link
                href="/schemes"
                className="p-2 rounded-full text-text-secondary hover:text-text hover:bg-secondary transition-colors"
                aria-label={t(language, 'search')}
                title={t(language, 'search')}
              >
                <Search className="w-4 h-4" />
              </Link>
              <Link
                href="/accessibility"
                className="p-2 rounded-full text-text-secondary hover:text-text hover:bg-secondary transition-colors"
                aria-label={t(language, 'accessibility')}
                title={t(language, 'accessibility')}
              >
                <Sun className="w-4 h-4" />
              </Link>
            </div>

            {/* More links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.slice(8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'p-2 rounded-full transition-colors',
                    pathname === item.href
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:text-text hover:bg-secondary'
                  )}
                  aria-label={t(language, item.labelKey)}
                  title={t(language, item.labelKey)}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-text-secondary hover:bg-secondary"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {/* Language on mobile */}
            <div className="pb-3 mb-3 border-b border-border sm:hidden">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'mr')}
                className="w-full text-sm bg-secondary border border-border rounded-md px-3 py-2 text-text"
                aria-label={t(language, 'language')}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeLabel}
                  </option>
                ))}
              </select>
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:text-text hover:bg-secondary'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {t(language, item.labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
