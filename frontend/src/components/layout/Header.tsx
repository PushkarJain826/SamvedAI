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
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t, LANGUAGES } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' as const, icon: null },
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
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="SAMVEDAI Home">
            <span className="text-xl font-bold tracking-tight text-text">
              {t(language, 'brand')}
            </span>
          </Link>

          {/* Desktop nav — condensed */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.slice(0, 8).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:text-text hover:bg-secondary'
                  )}
                >
                  {t(language, item.labelKey)}
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
              className="hidden sm:block text-sm bg-secondary border border-border rounded-md px-2 py-1.5 text-text cursor-pointer focus:ring-2 focus:ring-accent"
              aria-label={t(language, 'language')}
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeLabel}
                </option>
              ))}
            </select>

            {/* More links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.slice(8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'p-2 rounded-md transition-colors',
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
