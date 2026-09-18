/* Mock PACS service */
import type { PacsService } from '@/types';
import { mockPacsServices } from '@/data/mockData';
import { delay } from '@/lib/utils';

export async function getPacsServices(): Promise<PacsService[]> {
  await delay(200);
  return [...mockPacsServices];
}
