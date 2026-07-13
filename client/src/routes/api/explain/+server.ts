import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  return json({
    id: crypto.randomUUID(),
    type: 'explanation',
    title: 'Mock code explanation',
    content: 'This mock explanation describes the submitted code context at a high level.',
    createdAt: new Date().toISOString()
  });
};
