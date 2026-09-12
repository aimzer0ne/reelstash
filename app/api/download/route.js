import { handleApiRequest } from '@/lib/reelstash.js';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export function GET(request) {
  return handleApiRequest(request);
}
