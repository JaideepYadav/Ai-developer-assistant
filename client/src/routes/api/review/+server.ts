import { json } from '@sveltejs/kit';
import { generateText, GeminiError } from '$lib/server/services/gemini';
import type { RequestHandler } from './$types';

interface ReviewRequestBody {
  context?: unknown;
}

function createReviewPrompt(context: string): string {
  return `You are an experienced Senior Software Engineer.

Review the following code.

Return your review using this format:

Overall Review

Potential Bugs

Performance

Readability

Security

Testing Suggestions

Keep the review concise, practical, and actionable.

Code:

${context}`;
}

export const POST: RequestHandler = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as ReviewRequestBody | null;

  const context = typeof body?.context === 'string' ? body.context.trim() : '';

  if (!context) {
    return json({ message: 'Context is required.' }, { status: 400 });
  }

  try {
    const content = await generateText([
      {
        role: 'user',
        content: createReviewPrompt(context)
      }
    ]);

    return json({
      id: crypto.randomUUID(),
      type: 'review',
      title: 'AI Code Review',
      content,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    const message =
      error instanceof GeminiError ? error.message : 'Unable to review code right now.';

    return json({ message }, { status: 500 });
  }
};
