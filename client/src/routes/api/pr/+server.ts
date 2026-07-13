import { json } from '@sveltejs/kit';
import { generateText, GeminiError } from '$lib/server/services/gemini';
import type { RequestHandler } from './$types';

interface PRRequestBody {
  context?: unknown;
}

function createPRPrompt(context: string): string {
  return `You are an experienced software engineer.

Generate a professional GitHub Pull Request.

Return EXACTLY in the following format.

Title:
<One concise PR title>

## Summary
A short summary describing the purpose of the changes.

## Changes
- Bullet point
- Bullet point
- Bullet point

## Testing
- Mention suggested or completed testing.

Rules:
- Be concise.
- Be professional.
- Do not use markdown code blocks.
- Infer reasonable details if necessary.

Changes:

${context}`;
}

export const POST: RequestHandler = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as PRRequestBody | null;

  const context = typeof body?.context === 'string' ? body.context.trim() : '';

  if (!context) {
    return json({ message: 'Context is required.' }, { status: 400 });
  }

  try {
    const content = await generateText([
      {
        role: 'system',
        content: 'You are an expert software engineer who writes excellent GitHub Pull Requests.'
      },
      {
        role: 'user',
        content: createPRPrompt(context)
      }
    ]);

    return json({
      id: crypto.randomUUID(),
      type: 'pull-request',
      title: 'Generated Pull Request',
      content,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    const message =
      error instanceof GeminiError ? error.message : 'Unable to generate a Pull Request.';

    return json({ message }, { status: 500 });
  }
};
