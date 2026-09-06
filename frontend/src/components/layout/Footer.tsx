'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';

export default function Footer() {
  const { language } = useApp();

  const footerLinks = [
    { href: '/schemes', label: t(language, 'governmentSchemes') },
    { href: '/crop-insurance', label: t(language, 'cropInsurance') },
    { href: '/cooperative-laws', label: t(language, 'cooperativeLaws') },
    { href: '/pacs', label: t(language, 'pacsServices') },
    { href: '/financial-literacy', label: t(language, 'financialLiteracy') },
    { href: '/grievance', label: t(language, 'grievanceAssistance') },
    { href: '/sources', label: t(language, 'sources') },
    { href: '/about', label: t(language, 'about') },
    { href: '/accessibility', label: t(language, 'accessibility') },
  ];

  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-text">{t(language, 'brand')}</p>
            <p className="text-sm text-text-secondary mt-1">{t(language, 'subtitle')}</p>
            <p className="text-sm text-text-secondary mt-3 max-w-xs leading-relaxed">
              {t(language, 'tagline')}
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text py-1 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-text-secondary leading-relaxed">
            {t(language, 'disclaimer')}
          </p>
          <p className="text-xs text-text-secondary mt-2">
            SIH 2025 — Problem Statement SIH26088
          </p>
        </div>
      </div>
    </footer>
  );
}
