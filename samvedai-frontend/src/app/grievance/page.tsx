'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { getGrievanceGuidance, submitGrievance } from '@/services/grievanceService';
import { grievanceCategoryLabels } from '@/data/mockData';
import { Disclaimer } from '@/components/ui/States';
import type { GrievanceCategory, GrievanceStep, GrievanceCase } from '@/types';
import { CheckCircle2, ChevronRight, ChevronLeft, FileText } from 'lucide-react';

const STEPS: GrievanceStep[] = ['describe', 'category', 'authority', 'documents', 'submission', 'tracking'];

const STEP_LABELS: Record<GrievanceStep, { en: string; hi: string; mr: string }> = {
  describe: { en: 'Describe', hi: 'वर्णन', mr: 'वर्णन' },
  category: { en: 'Category', hi: 'श्रेणी', mr: 'श्रेणी' },
  authority: { en: 'Authority', hi: 'प्राधिकरण', mr: 'प्राधिकरण' },
  documents: { en: 'Documents', hi: 'दस्तावेज़', mr: 'कागदपत्रे' },
  submission: { en: 'Submission', hi: 'प्रस्तुति', mr: 'सबमिशन' },
  tracking: { en: 'Tracking', hi: 'ट्रैकिंग', mr: 'ट्रॅकिंग' },
};

export default function GrievancePage() {
  const { language } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GrievanceCategory | ''>('');
  const [authority, setAuthority] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);
  const [submissionGuidance, setSubmissionGuidance] = useState('');
  const [submittedCase, setSubmittedCase] = useState<GrievanceCase | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      const load = async () => {
        const guidance = await getGrievanceGuidance(category);
        setAuthority(guidance.authority);
        setDocuments(guidance.documents);
        setSubmissionGuidance(guidance.submissionGuidance);
      };
      load();
    }
  }, [category]);

  const canProceed = () => {
    switch (STEPS[currentStep]) {
      case 'describe':
        return description.trim().length > 10;
      case 'category':
        return category !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!category) return;
    setIsSubmitting(true);
    try {
      const result = await submitGrievance({
        description,
        category,
        responsibleAuthority: authority,
        documents,
        submissionGuidance,
      });
      setSubmittedCase(result);
      setCurrentStep(STEPS.length - 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLang = (obj: Record<string, string>) => obj[language] || obj.en;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-text">
        {t(language, 'grievanceAssistance')}
      </h1>
      <p className="text-text-secondary mt-2 leading-relaxed">
        {t(language, 'grievanceAssistanceDesc')}
      </p>

      {/* Step indicator */}
      <div className="mt-8 mb-8">
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-1.5 shrink-0">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold',
                    i < currentStep
                      ? 'bg-accent text-white'
                      : i === currentStep
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-text-secondary'
                  )}
                >
                  {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium hidden sm:inline',
                    i <= currentStep ? 'text-text' : 'text-text-secondary'
                  )}
                >
                  {getLang(STEP_LABELS[step])}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn(
                  'flex-1 h-px min-w-[16px]',
                  i < currentStep ? 'bg-accent' : 'bg-border'
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-surface border border-border rounded-lg p-5 sm:p-6 min-h-[300px]">
        {/* Step 1: Describe */}
        {STEPS[currentStep] === 'describe' && (
          <div>
            <h2 className="font-semibold text-text text-lg mb-4">
              {t(language, 'describeYourProblem')}
            </h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'en'
                ? 'Describe your issue in detail — what happened, when, and who is involved…'
                : language === 'hi'
                ? 'अपनी समस्या का विस्तार से वर्णन करें — क्या हुआ, कब, और कौन शामिल है…'
                : 'तुमच्या समस्येचे तपशीलवार वर्णन करा — काय झाले, केव्हा, आणि कोण सहभागी आहे…'}
              rows={6}
              className="w-full px-4 py-3 text-sm bg-bg border border-border rounded-lg text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-accent resize-none"
              aria-label={t(language, 'describeYourProblem')}
            />
            <p className="text-xs text-text-secondary mt-2">
              {language === 'en'
                ? 'Minimum 10 characters. Be as specific as possible.'
                : language === 'hi'
                ? 'न्यूनतम 10 अक्षर। यथासंभव विशिष्ट रहें।'
                : 'किमान 10 अक्षरे. शक्य तितके विशिष्ट व्हा.'}
            </p>
          </div>
        )}

        {/* Step 2: Category */}
        {STEPS[currentStep] === 'category' && (
          <div>
            <h2 className="font-semibold text-text text-lg mb-4">
              {t(language, 'selectCategory')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(grievanceCategoryLabels) as GrievanceCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'text-left p-4 rounded-lg border transition-colors',
                    category === cat
                      ? 'border-accent bg-accent/5 text-accent'
                      : 'border-border bg-bg text-text hover:border-accent/50'
                  )}
                >
                  <p className="font-medium text-sm">{getLang(grievanceCategoryLabels[cat])}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Authority */}
        {STEPS[currentStep] === 'authority' && (
          <div>
            <h2 className="font-semibold text-text text-lg mb-4">
              {t(language, 'responsibleAuthority')}
            </h2>
            <div className="p-4 bg-bg border border-border rounded-lg">
              <p className="text-sm font-medium text-text">{authority}</p>
              <p className="text-xs text-text-secondary mt-2">
                {language === 'en'
                  ? 'Based on your complaint category, this is the recommended authority to approach.'
                  : language === 'hi'
                  ? 'आपकी शिकायत श्रेणी के आधार पर, यह अनुशंसित प्राधिकरण है।'
                  : 'तुमच्या तक्रार श्रेणीवर आधारित, हे संपर्क करण्यासाठी शिफारस केलेले प्राधिकरण आहे.'}
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Documents */}
        {STEPS[currentStep] === 'documents' && (
          <div>
            <h2 className="font-semibold text-text text-lg mb-4">
              {t(language, 'requiredDocuments')}
            </h2>
            <ul className="space-y-2">
              {documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-3 p-3 bg-bg border border-border rounded-lg">
                  <FileText className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-text">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step 5: Submission */}
        {STEPS[currentStep] === 'submission' && !submittedCase && (
          <div>
            <h2 className="font-semibold text-text text-lg mb-4">
              {t(language, 'submissionGuidance')}
            </h2>
            <div className="p-4 bg-bg border border-border rounded-lg">
              <p className="text-sm text-text leading-relaxed">{submissionGuidance}</p>
            </div>

            {/* Summary */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-text">
                {language === 'en' ? 'Summary' : language === 'hi' ? 'सारांश' : 'सारांश'}
              </h3>
              <div className="text-sm text-text-secondary space-y-1">
                <p><strong>{t(language, 'selectCategory')}:</strong> {category && getLang(grievanceCategoryLabels[category])}</p>
                <p><strong>{t(language, 'responsibleAuthority')}:</strong> {authority}</p>
                <p><strong>{t(language, 'describeYourProblem')}:</strong> {description.slice(0, 100)}{description.length > 100 ? '…' : ''}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Tracking */}
        {(STEPS[currentStep] === 'tracking' || submittedCase) && (
          <div className="text-center py-8">
            {submittedCase ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
                <h2 className="text-lg font-bold text-text">
                  {language === 'en' ? 'Guidance Generated' : language === 'hi' ? 'मार्गदर्शन तैयार' : 'मार्गदर्शन तयार'}
                </h2>
                <p className="text-sm text-text-secondary mt-2 max-w-md mx-auto leading-relaxed">
                  {language === 'en'
                    ? 'Your grievance guidance has been prepared. Use the information above to file your complaint with the appropriate authority.'
                    : language === 'hi'
                    ? 'आपका शिकायत मार्गदर्शन तैयार हो गया है। उचित प्राधिकरण को शिकायत दर्ज करने के लिए ऊपर दी गई जानकारी का उपयोग करें।'
                    : 'तुमचे तक्रार मार्गदर्शन तयार आहे. योग्य प्राधिकरणाकडे तक्रार दाखल करण्यासाठी वरील माहिती वापरा.'}
                </p>
                {submittedCase.referenceNumber && (
                  <div className="mt-4 inline-block px-4 py-2 bg-secondary rounded-lg">
                    <p className="text-xs text-text-secondary">{t(language, 'trackingReference')}</p>
                    <p className="text-sm font-mono font-bold text-text">{submittedCase.referenceNumber}</p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-text-secondary">{t(language, 'trackingReference')}</p>
            )}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={cn(
            'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
            currentStep === 0
              ? 'text-border cursor-not-allowed'
              : 'text-text-secondary hover:text-text hover:bg-secondary'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          {t(language, 'previous')}
        </button>

        {STEPS[currentStep] === 'submission' && !submittedCase ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-1 px-6 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            {isSubmitting
              ? (language === 'en' ? 'Processing…' : language === 'hi' ? 'प्रोसेसिंग…' : 'प्रक्रिया सुरू…')
              : t(language, 'submit')}
          </button>
        ) : (
          !submittedCase && (
            <button
              onClick={handleNext}
              disabled={!canProceed() || currentStep >= STEPS.length - 1}
              className={cn(
                'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
                canProceed() && currentStep < STEPS.length - 1
                  ? 'bg-accent text-white hover:bg-accent-dark'
                  : 'bg-secondary text-border cursor-not-allowed'
              )}
            >
              {t(language, 'next')}
              <ChevronRight className="w-4 h-4" />
            </button>
          )
        )}
      </div>

      <Disclaimer text={t(language, 'disclaimer')} />
    </div>
  );
}
