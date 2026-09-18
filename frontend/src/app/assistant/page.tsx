'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Plus,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { cn, generateId, formatTimestamp } from '@/lib/utils';
import { sendMessage } from '@/services/chatService';
import SourceCard from '@/components/ui/SourceCard';
import type { ChatMessage, Source } from '@/types';

export default function AssistantPage() {
  const { language } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<Source[]>([]);
  const [showSourcesMobile, setShowSourcesMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSend = async (text?: string) => {
    const msg = text || inputValue.trim();
    if (!msg || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: msg,
      timestamp: new Date().toISOString(),
      language,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage({
        message: msg,
        language,
      });

      const assistantMessage: ChatMessage = {
        id: response.id,
        role: 'assistant',
        content: response.message,
        sections: response.sections,
        sources: response.sources,
        followUps: response.followUps,
        timestamp: response.timestamp,
        language: response.language,
        feedback: null,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      if (response.sources.length > 0) {
        setSelectedSources(response.sources);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: t(language, 'errorMessage'),
        timestamp: new Date().toISOString(),
        language,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    // Mock voice toggle — real implementation would use Web Speech API
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate stopping after 3 seconds
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const handleCopy = async (id: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  const handleFeedback = (id: string, feedback: 'helpful' | 'not-helpful') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, feedback } : m))
    );
  };

  const handleNewConversation = () => {
    setMessages([]);
    setSelectedSources([]);
    setShowSourcesMobile(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* ── Main conversation area ─────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
          <h1 className="font-semibold text-text text-sm">
            {t(language, 'assistant')}
          </h1>
          <div className="flex items-center gap-2">
            {hasMessages && selectedSources.length > 0 && (
              <button
                onClick={() => setShowSourcesMobile(!showSourcesMobile)}
                className="lg:hidden flex items-center gap-1 text-xs text-accent font-medium px-2 py-1 rounded border border-accent/30 hover:bg-accent/5"
              >
                <FileText className="w-3 h-3" />
                {t(language, 'sourcesLabel')} ({selectedSources.length})
              </button>
            )}
            <button
              onClick={handleNewConversation}
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text px-2 py-1 rounded hover:bg-secondary transition-colors"
              aria-label={t(language, 'newConversation')}
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t(language, 'newConversation')}</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <MessageCircle className="w-12 h-12 text-border mb-4" />
              <h2 className="text-xl font-semibold text-text">
                {t(language, 'emptyChat')}
              </h2>
              <p className="text-sm text-text-secondary mt-2 max-w-md leading-relaxed">
                {t(language, 'emptyChatDesc')}
              </p>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-lg">
                {[
                  'मला पीक विमा कसा मिळेल?',
                  'How do I get crop insurance?',
                  'PM-KISAN योजना क्या है?',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="text-sm px-3 py-2 border border-border rounded-md text-text-secondary hover:text-text hover:border-accent hover:bg-surface transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      S
                    </div>
                  )}

                  <div
                    className={cn(
                      'max-w-[85%] sm:max-w-[75%]',
                      message.role === 'user'
                        ? 'bg-accent text-white rounded-2xl rounded-br-md px-4 py-3'
                        : 'bg-surface border border-border rounded-2xl rounded-bl-md px-4 py-3'
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>

                    {/* Sections */}
                    {message.sections?.map((section, i) => (
                      <div key={i} className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">{section.title}</h4>
                        {section.type === 'text' && (
                          <p className="text-sm leading-relaxed">{section.content}</p>
                        )}
                        {(section.type === 'list' || section.type === 'steps') &&
                          section.items && (
                            <ul className={cn(
                              'text-sm space-y-1.5',
                              section.type === 'steps' ? 'list-decimal' : 'list-disc',
                              'ml-4'
                            )}>
                              {section.items.map((item, j) => (
                                <li key={j} className="leading-relaxed">{item}</li>
                              ))}
                            </ul>
                          )}
                        {section.type === 'note' && (
                          <div className={cn(
                            'text-sm p-3 rounded-md leading-relaxed',
                            message.role === 'user'
                              ? 'bg-white/10'
                              : 'bg-secondary'
                          )}>
                            {section.content}
                          </div>
                        )}
                        {section.type === 'warning' && (
                          <div className="text-sm p-3 rounded-md bg-amber-50 text-amber-800 leading-relaxed">
                            {section.content}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Source badges (compact) */}
                    {message.role === 'assistant' && message.sources && message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        {message.sources.map((src) => (
                          <SourceCard key={src.id} source={src} compact />
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className={cn(
                      'text-[10px] mt-2',
                      message.role === 'user' ? 'text-white/60' : 'text-text-secondary'
                    )}>
                      {formatTimestamp(message.timestamp)}
                    </p>

                    {/* Actions for assistant messages */}
                    {message.role === 'assistant' && !message.isLoading && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/30">
                        <button
                          onClick={() => handleCopy(message.id, message.content)}
                          className="flex items-center gap-1 text-xs text-text-secondary hover:text-text p-1 rounded transition-colors"
                          aria-label={t(language, 'copyAnswer')}
                        >
                          {copiedId === message.id ? (
                            <>
                              <Check className="w-3 h-3 text-accent" />
                              {t(language, 'copied')}
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              {t(language, 'copyAnswer')}
                            </>
                          )}
                        </button>
                        <span className="text-border">|</span>
                        <button
                          onClick={() => handleFeedback(message.id, 'helpful')}
                          className={cn(
                            'flex items-center gap-1 text-xs p-1 rounded transition-colors',
                            message.feedback === 'helpful'
                              ? 'text-accent'
                              : 'text-text-secondary hover:text-text'
                          )}
                          aria-label={t(language, 'helpful')}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, 'not-helpful')}
                          className={cn(
                            'flex items-center gap-1 text-xs p-1 rounded transition-colors',
                            message.feedback === 'not-helpful'
                              ? 'text-red-500'
                              : 'text-text-secondary hover:text-text'
                          )}
                          aria-label={t(language, 'notHelpful')}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading state */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold shrink-0">
                    S
                  </div>
                  <div className="bg-surface border border-border rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent loading-dot" />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent loading-dot" />
                        <span className="w-1.5 h-1.5 rounded-full bg-accent loading-dot" />
                      </span>
                      {t(language, 'thinking')}
                    </div>
                  </div>
                </div>
              )}

              {/* Follow-up suggestions */}
              {!isLoading && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].followUps && (
                <div className="pl-10">
                  <p className="text-xs text-text-secondary mb-2 font-medium">
                    {t(language, 'followUp')}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {messages[messages.length - 1].followUps!.map((fu, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(fu)}
                        className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent px-3 py-2 border border-border rounded-md hover:border-accent bg-surface transition-colors text-left"
                      >
                        <ChevronRight className="w-3 h-3 shrink-0" />
                        {fu}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-surface px-4 py-3">
          <div className="max-w-3xl mx-auto">
            {/* Listening indicator */}
            {isListening && (
              <div className="flex items-center gap-2 mb-3 text-sm text-accent">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 pulse-ring" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                </span>
                {t(language, 'listening')}
              </div>
            )}

            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t(language, 'typeMessage')}
                  rows={1}
                  className="w-full resize-none bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-colors"
                  aria-label={t(language, 'typeMessage')}
                  disabled={isLoading}
                />
              </div>

              {/* Voice button */}
              <button
                onClick={toggleListening}
                className={cn(
                  'p-2.5 rounded-lg transition-colors shrink-0',
                  isListening
                    ? 'bg-accent text-white'
                    : 'bg-bg border border-border text-text-secondary hover:text-text hover:border-accent'
                )}
                aria-label={isListening ? t(language, 'listening') : 'Voice input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send button */}
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                className={cn(
                  'p-2.5 rounded-lg transition-colors shrink-0',
                  inputValue.trim() && !isLoading
                    ? 'bg-accent text-white hover:bg-accent-dark'
                    : 'bg-bg border border-border text-border cursor-not-allowed'
                )}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Source panel (desktop) ─────────── */}
      <aside className="hidden lg:flex w-80 flex-col border-l border-border bg-surface overflow-y-auto">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-text">{t(language, 'sourcesLabel')}</h2>
        </div>
        <div className="p-4 space-y-3 flex-1">
          {selectedSources.length > 0 ? (
            selectedSources.map((src) => (
              <SourceCard key={src.id} source={src} />
            ))
          ) : (
            <p className="text-sm text-text-secondary">
              {t(language, 'emptyChatDesc')}
            </p>
          )}
        </div>
      </aside>

      {/* ── Source panel (mobile overlay) ──── */}
      {showSourcesMobile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setShowSourcesMobile(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-xl max-h-[60vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-surface">
              <h2 className="text-sm font-semibold text-text">{t(language, 'sourcesLabel')}</h2>
              <button
                onClick={() => setShowSourcesMobile(false)}
                className="text-xs text-text-secondary hover:text-text"
              >
                Close
              </button>
            </div>
            <div className="p-4 space-y-3">
              {selectedSources.map((src) => (
                <SourceCard key={src.id} source={src} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
