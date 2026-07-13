import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  return json({
    id: crypto.randomUUID(),
    type: 'review',
    title: 'Mock review suggestions',
    content:
      'No blocking issues found in the mock review. Consider adding targeted tests for changed behavior.',
    createdAt: new Date().toISOString()
  });
};
