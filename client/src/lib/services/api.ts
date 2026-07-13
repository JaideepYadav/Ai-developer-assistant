import type { GenerationRequest, GenerationResult } from '$lib/types/generation';

const apiBaseUrl = '/api';

async function postGeneration(
  endpoint: string,
  payload: GenerationRequest
): Promise<GenerationResult> {
  const response = await fetch(`${apiBaseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorBody?.message ?? 'Generation request failed');
  }

  return response.json() as Promise<GenerationResult>;
}

export function generateCommit(payload: GenerationRequest): Promise<GenerationResult> {
  return postGeneration('/commit', payload);
}

export function generatePR(payload: GenerationRequest): Promise<GenerationResult> {
  return postGeneration('/pr', payload);
}

export function generateReview(payload: GenerationRequest): Promise<GenerationResult> {
  return postGeneration('/review', payload);
}

export function generateExplanation(payload: GenerationRequest): Promise<GenerationResult> {
  return postGeneration('/explain', payload);
}
