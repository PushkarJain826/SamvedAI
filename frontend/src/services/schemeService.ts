/* Mock scheme service — replace with FastAPI calls */

import type { Scheme, SchemeCategory } from '@/types';
import { mockSchemes } from '@/data/mockData';
import { delay } from '@/lib/utils';

export async function getSchemes(filters?: {
  category?: SchemeCategory;
  search?: string;
}): Promise<Scheme[]> {
  await delay(300);

  let results = [...mockSchemes];

  if (filters?.category) {
    results = results.filter((s) => s.category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        (s.titleHi && s.titleHi.includes(q)) ||
        (s.titleMr && s.titleMr.includes(q))
    );
  }

  return results;
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
  await delay(200);
  return mockSchemes.find((s) => s.id === id) ?? null;
}
