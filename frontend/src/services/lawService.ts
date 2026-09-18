/* Mock law service */
import type { LawTopic } from '@/types';
import { mockLawTopics } from '@/data/mockData';
import { delay } from '@/lib/utils';

export async function getLawTopics(): Promise<LawTopic[]> {
  await delay(200);
  return [...mockLawTopics];
}

export async function getLawTopicById(id: string): Promise<LawTopic | null> {
  await delay(200);
  return mockLawTopics.find((l) => l.id === id) ?? null;
}
