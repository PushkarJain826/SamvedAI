import type { ChatRequest, ChatResponse, Source } from '@/types';

const API_BASE = 'http://127.0.0.1:8000/api';

interface BackendSource {
  chunk_id: number;
  document_id: number;
  section: string | null;
  page_start: number | null;
  page_end: number | null;
  relevance_score: number | null;
}

interface BackendChatResponse {
  message: string;
  sources: BackendSource[];
}

function mapSource(source: BackendSource): Source {
  return {
    id: `chunk-${source.chunk_id}`,
    title: source.section || 'Government document',
    authority: 'Government source',
    section: source.section || undefined,
    confidence: 'verified',
    description:
      source.page_start && source.page_end
        ? `Pages ${source.page_start}-${source.page_end}`
        : undefined,
  };
}

export async function sendMessage(
  req: ChatRequest
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: req.message,
      language: req.language,
      conversation_id: req.conversationId ?? null,
      voice_input: req.voiceInput ?? false,
    }),
  });

  if (!response.ok) {
    throw new Error(`Chat API request failed: ${response.status}`);
  }

  const data: BackendChatResponse = await response.json();

  return {
    id: crypto.randomUUID(),
    message: data.message,
    sources: data.sources.map(mapSource),
    followUps: [],
    language: req.language,
    timestamp: new Date().toISOString(),
  };
}
