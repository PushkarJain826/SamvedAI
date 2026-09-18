'use client';

import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import type { Source, SourceConfidence } from '@/types';
import { ExternalLink, CheckCircle2, CircleDot, AlertCircle, XCircle, Clock } from 'lucide-react';

const CONFIDENCE_CONFIG: Record<
  SourceConfidence,
  { icon: typeof CheckCircle2; color: string; labelKey: 'verified' | 'multipleSources' | 'partial' | 'unavailable' | 'mayHaveChanged' }
> = {
  verified: { icon: CheckCircle2, color: 'text-accent', labelKey: 'verified' },
  'multiple-sources': { icon: CircleDot, color: 'text-accent', labelKey: 'multipleSources' },
  partial: { icon: AlertCircle, color: 'text-amber-600', labelKey: 'partial' },
  unavailable: { icon: XCircle, color: 'text-red-500', labelKey: 'unavailable' },
  'may-have-changed': { icon: Clock, color: 'text-amber-600', labelKey: 'mayHaveChanged' },
};

interface SourceCardProps {
  source: Source;
  compact?: boolean;
}

export default function SourceCard({ source, compact = false }: SourceCardProps) {
  const { language } = useApp();
  const config = CONFIDENCE_CONFIG[source.confidence];
  const Icon = config.icon;

  if (compact) {
    return (
      <div className="flex items-start gap-2 text-sm py-2">
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${config.color}`} />
        <div className="min-w-0">
          <p className="font-medium text-text leading-tight">{source.title}</p>
          <p className="text-text-secondary text-xs mt-0.5">{source.authority}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg p-4 bg-surface">
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.color}`} />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-text leading-snug">{source.title}</p>
          <p className="text-sm text-text-secondary mt-1">{source.authority}</p>

          {source.section && (
            <p className="text-sm text-text-secondary mt-1">{source.section}</p>
          )}

          {source.description && (
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
              {source.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className={`flex items-center gap-1 ${config.color}`}>
              {t(language, config.labelKey)}
            </span>

            {source.lastUpdated && (
              <span className="text-text-secondary">
                {source.lastUpdated}
              </span>
            )}

            {source.url && (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                {t(language, 'viewSource')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
