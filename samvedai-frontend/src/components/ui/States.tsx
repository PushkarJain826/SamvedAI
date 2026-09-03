'use client';

import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';

export function LoadingState({ message }: { message?: string }) {
  const { language } = useApp();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-text-secondary" role="status">
      <div className="flex gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-accent loading-dot" />
        <span className="w-2 h-2 rounded-full bg-accent loading-dot" />
        <span className="w-2 h-2 rounded-full bg-accent loading-dot" />
      </div>
      <p className="text-sm">{message || t(language, 'thinking')}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto">
      {Icon && <Icon className="w-12 h-12 text-border mb-4" />}
      <p className="font-medium text-text text-lg">{title}</p>
      <p className="text-sm text-text-secondary mt-2 leading-relaxed">{description}</p>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  const { language } = useApp();
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <span className="text-red-500 text-xl">!</span>
      </div>
      <p className="text-sm text-text-secondary">
        {message || t(language, 'errorMessage')}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm font-medium text-accent border border-accent rounded-md hover:bg-accent hover:text-white transition-colors"
        >
          {t(language, 'retry')}
        </button>
      )}
    </div>
  );
}

export function Disclaimer({ text }: { text: string }) {
  return (
    <div className="border border-border rounded-lg p-4 bg-secondary/50 mt-8">
      <p className="text-xs text-text-secondary leading-relaxed">{text}</p>
    </div>
  );
}
