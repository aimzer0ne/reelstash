import { handleApiRequest } from '@/lib/reelstash.js';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export function POST(request) {
  return handleApiRequest(request);
}

export function OPTIONS(request) {
  return handleApiRequest(request);
}
