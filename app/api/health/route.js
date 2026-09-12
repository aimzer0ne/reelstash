import { healthResponse } from '@/lib/reelstash.js';

export const maxDuration = 10;
export const dynamic = 'force-dynamic';

export function GET() {
  return healthResponse();
}
