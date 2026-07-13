import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/private';

interface ChatMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

export class GeminiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'GeminiError';
	}
}

export async function generateText(messages: ChatMessage[]): Promise<string> {
	const apiKey = env.GEMINI_API_KEY;

	if (!apiKey) {
		throw new GeminiError('Gemini API key is not configured.');
	}

	const model = env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

	const ai = new GoogleGenAI({
		apiKey
	});

	const prompt = messages
		.map((m) => `${m.role.toUpperCase()}:\n${m.content}`)
		.join('\n\n');

	try {
		const response = await ai.models.generateContent({
			model,
			contents: prompt
		});

		const text = response.text?.trim();

		if (!text) {
			throw new GeminiError('Gemini returned an empty response.');
		}

		return text;
	} catch (error) {
		if (error instanceof Error) {
			throw new GeminiError(error.message);
		}

		throw new GeminiError('Unknown Gemini error.');
	}
}