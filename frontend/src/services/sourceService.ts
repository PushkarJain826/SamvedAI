/* Mock source service */
import type { Source } from '@/types';
import { mockSources } from '@/data/mockData';
import { delay } from '@/lib/utils';

export async function getSources(): Promise<Source[]> {
  await delay(200);
  return [...mockSources];
}
