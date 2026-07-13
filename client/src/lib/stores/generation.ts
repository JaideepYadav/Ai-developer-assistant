import { writable } from 'svelte/store';
import type { GenerationResult, HistoryItem } from '$lib/types/generation';

export const loading = writable(false);
export const history = writable<HistoryItem[]>([]);
export const currentGeneration = writable<GenerationResult | null>(null);
