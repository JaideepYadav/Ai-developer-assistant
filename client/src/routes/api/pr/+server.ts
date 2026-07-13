import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  return json({
    id: crypto.randomUUID(),
    type: 'pull-request',
    title: 'Mock pull request',
    content:
      'Summary:\n- Demonstrates a generated PR description.\n\nTesting:\n- Not run; mock response only.',
    createdAt: new Date().toISOString()
  });
};
