import { json } from '@sveltejs/kit';
import { generateText, GeminiError } from '$lib/server/services/gemini';
import type { RequestHandler } from './$types';

interface CommitRequestBody {
  context?: unknown;
}

function createCommitPrompt(context: string): string {
  return `You are an expert Git assistant.

Generate exactly ONE Conventional Commit message.

Rules:
- Follow the Conventional Commits specification.
- Choose the most appropriate type (feat, fix, docs, refactor, chore, test, ci, build, perf).
- Maximum 72 characters.
- Output ONLY the commit message.
- Do NOT use Markdown.
- Do NOT explain your reasoning.
- Do NOT wrap the output in quotes.
- If the changes are ambiguous, infer the most appropriate commit type.

Code changes:

${context}`;
}

export const POST: RequestHandler = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as CommitRequestBody | null;
  const context = typeof body?.context === 'string' ? body.context.trim() : '';

  if (!context) {
    return json({ message: 'Context is required.' }, { status: 400 });
  }

  try {
    const content = await generateText([
      {
        role: 'user',
        content: createCommitPrompt(context)
      }
    ]);

    return json({
      id: crypto.randomUUID(),
      type: 'commit',
      title: 'Generated Commit Message',
      content,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    const message =
      error instanceof GeminiError
        ? error.message
        : 'Unable to generate a commit message right now.';

    return json({ message }, { status: 500 });
  }
};
