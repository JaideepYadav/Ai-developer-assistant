import type { GenerationResult } from '$lib/types/generation';

const HISTORY_KEY = 'ai-dev-assistant-history';

export function getHistory(): GenerationResult[] {
  try {
    const history = localStorage.getItem(HISTORY_KEY);

    if (!history) return [];

    return JSON.parse(history) as GenerationResult[];
  } catch {
    return [];
  }
}

export function saveHistory(item: GenerationResult) {
  const history = getHistory();

  history.unshift(item);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function deleteHistory(id: string) {
  const history = getHistory().filter((item) => item.id !== id);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
