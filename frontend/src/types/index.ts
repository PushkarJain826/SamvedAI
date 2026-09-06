/* ──────────────────────────────────────────────
   SAMVEDAI — Core type definitions
   All interfaces are designed to map 1-to-1
   with the forthcoming FastAPI backend.
   ────────────────────────────────────────────── */

// ── Language ─────────────────────────────────

export type Language = 'en' | 'hi' | 'mr';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

// ── Chat ─────────────────────────────────────

export interface ChatRequest {
  message: string;
  language: Language;
  conversationId?: string;
  voiceInput?: boolean;
}

export interface ChatResponse {
  id: string;
  message: string;
  sources: Source[];
  followUps: string[];
  language: Language;
  timestamp: string;
  sections?: ChatSection[];
}

export interface ChatSection {
  title: string;
  content: string;
  type: 'text' | 'list' | 'steps' | 'note' | 'warning';
  items?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sections?: ChatSection[];
  sources?: Source[];
  followUps?: string[];
  timestamp: string;
  language: Language;
  feedback?: 'helpful' | 'not-helpful' | null;
  isLoading?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  language: Language;
  createdAt: string;
  updatedAt: string;
}

// ── Sources ──────────────────────────────────

export type SourceConfidence =
  | 'verified'
  | 'multiple-sources'
  | 'partial'
  | 'unavailable'
  | 'may-have-changed';

export interface Source {
  id: string;
  title: string;
  authority: string;
  section?: string;
  date?: string;
  lastUpdated?: string;
  confidence: SourceConfidence;
  description?: string;
  /* We intentionally do NOT fabricate real URLs */
  url?: string;
}

// ── Government Schemes ───────────────────────

export interface Scheme {
  id: string;
  title: string;
  titleHi?: string;
  titleMr?: string;
  description: string;
  descriptionHi?: string;
  descriptionMr?: string;
  ministry: string;
  category: SchemeCategory;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  applicationProcess: string[];
  source: Source;
  lastUpdated?: string;
}

export type SchemeCategory =
  | 'agriculture'
  | 'insurance'
  | 'credit'
  | 'subsidy'
  | 'welfare'
  | 'infrastructure';

// ── Cooperative Laws ─────────────────────────

export interface LawTopic {
  id: string;
  title: string;
  titleHi?: string;
  titleMr?: string;
  description: string;
  descriptionHi?: string;
  descriptionMr?: string;
  category: LawCategory;
  sections: LawSection[];
  source: Source;
}

export type LawCategory =
  | 'membership'
  | 'rights'
  | 'duties'
  | 'meetings'
  | 'elections'
  | 'bylaws'
  | 'disputes'
  | 'complaints';

export interface LawSection {
  heading: string;
  content: string;
  reference?: string;
}

// ── PACS Services ────────────────────────────

export interface PacsService {
  id: string;
  title: string;
  titleHi?: string;
  titleMr?: string;
  description: string;
  descriptionHi?: string;
  descriptionMr?: string;
  eligibility: string[];
  documents: string[];
  process: string[];
  note?: string;
}

// ── Grievance ────────────────────────────────

export type GrievanceStep =
  | 'describe'
  | 'category'
  | 'authority'
  | 'documents'
  | 'submission'
  | 'tracking';

export type GrievanceCategory =
  | 'loan'
  | 'insurance'
  | 'scheme'
  | 'cooperative'
  | 'pacs'
  | 'other';

export interface GrievanceCase {
  id?: string;
  description: string;
  category: GrievanceCategory;
  responsibleAuthority: string;
  documents: string[];
  submissionGuidance: string;
  referenceNumber?: string;
  status?: 'draft' | 'submitted' | 'in-progress' | 'resolved';
  createdAt?: string;
}

// ── Financial Literacy ───────────────────────

export interface FinancialTopic {
  id: string;
  title: string;
  titleHi?: string;
  titleMr?: string;
  description: string;
  descriptionHi?: string;
  descriptionMr?: string;
  icon: string;
  sections: { heading: string; content: string }[];
}

// ── EMI Calculator ───────────────────────────

export interface EMIInput {
  principal: number;
  rate: number;
  tenure: number; // months
}

export interface EMIResult {
  emi: number;
  totalPayment: number;
  totalInterest: number;
}

// ── Accessibility ────────────────────────────

export interface AccessibilitySettings {
  textSize: 'normal' | 'large' | 'x-large';
  reducedMotion: boolean;
  highContrast: boolean;
}
