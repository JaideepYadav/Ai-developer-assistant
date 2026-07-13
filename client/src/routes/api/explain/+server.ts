import { json } from '@sveltejs/kit';
import { generateText, GeminiError } from '$lib/server/services/gemini';
import type { RequestHandler } from './$types';

interface ExplainRequestBody {
  context?: unknown;
}

function createExplainPrompt(context: string): string {
  return `You are an expert software engineer and technical educator.

Analyze the following code and provide a comprehensive explanation.

Return your response in the following structured format. Use plain text with clear section headers.

Summary:
<One-paragraph high-level summary of what the code does>

Explanation:
<Detailed explanation of how the code works, its purpose, and its key components>

Step-by-step:
1. <First step in the code's execution flow>
2. <Second step>
3. <Continue as needed>

Suggestions:
- <Suggestion for improvement or alternative approach>
- <Another suggestion>
- <Continue as needed>

Code to analyze:

${context}`;
}

export const POST: RequestHandler = async ({ request }) => {
  const body = (await request.json().catch(() => null)) as ExplainRequestBody | null;
  const context = typeof body?.context === 'string' ? body.context.trim() : '';

  if (!context) {
    return json({ message: 'Code context is required.' }, { status: 400 });
  }

  try {
    const content = await generateText([
      {
        role: 'system',
        content:
          'You are an expert software engineer who provides clear, structured code explanations.'
      },
      {
        role: 'user',
        content: createExplainPrompt(context)
      }
    ]);

    return json({
      id: crypto.randomUUID(),
      type: 'explanation',
      title: 'Code Explanation',
      content,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    const message =
      error instanceof GeminiError ? error.message : 'Unable to explain the code right now.';

    return json({ message }, { status: 500 });
  }
};
