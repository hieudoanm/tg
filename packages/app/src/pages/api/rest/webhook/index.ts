import { generateContent } from '@telegram/clients/api/gemini.client';
import { ParseMode, Telegram } from '@telegram/clients/api/telegram.client';
import { tryCatch } from '@telegram/utils/try-catch';
import { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

// --- Define minimal Telegram types ---
interface TelegramUser {
	id: number;
	is_bot: boolean;
	first_name: string;
	last_name?: string;
	username?: string;
}

interface TelegramChat {
	id: number;
	type: string;
	title?: string;
	username?: string;
	first_name?: string;
	last_name?: string;
}

interface TelegramMessage {
	message_id: number;
	from: TelegramUser;
	chat: TelegramChat;
	date: number;
	text?: string;
}

interface TelegramUpdate {
	update_id: number;
	message?: TelegramMessage;
	// you can add more fields if you handle other update types
}

const handler = async (
	request: NextApiRequest,
	response: NextApiResponse<{ error: string | null }>,
) => {
	const { method } = request;

	if (method === 'OPTIONS') {
		return response.status(200).end();
	}
	if (method !== 'POST') {
		return response.status(405).json({ error: 'Method Not Allowed' });
	}

	const update: TelegramUpdate = request.body;
	const chatId: number = update.message?.chat.id ?? 0;
	console.info('chatId', chatId);
	const text = update.message?.text ?? '';
	console.info('text', text);
	const messageId: number = update.message?.message_id ?? 0;
	console.info('messageId', messageId);
	const { data, error } = await tryCatch(generateContent({ prompt: text }));
	if (error) {
		console.error('error', error);
		const { error: sendError } = await tryCatch(
			Telegram().messages.send({
				chatId,
				message: 'No Response',
				parseMode: ParseMode.MARKDOWN,
				messageId,
				token: TELEGRAM_BOT_TOKEN,
			}),
		);
		if (sendError) {
			console.error('sendError', sendError);
			return response.status(500).json({ error: 'Internal Server Error' });
		}
		return response.status(500).json({ error: 'Internal Server Error' });
	}
	const encoded: string =
		data.candidates.at(0)?.content.parts.at(0)?.text ?? 'No Response';
	const message: string = decodeURIComponent(encoded);
	console.info('message', message);
	const { error: sendError } = await tryCatch(
		Telegram().messages.send({
			chatId,
			message,
			parseMode: ParseMode.MARKDOWN,
			messageId,
			token: TELEGRAM_BOT_TOKEN,
		}),
	);
	if (sendError) {
		console.error(sendError);
		await tryCatch(
			Telegram().messages.send({
				chatId,
				message: sendError.message,
				parseMode: ParseMode.MARKDOWN,
				messageId,
				token: TELEGRAM_BOT_TOKEN,
			}),
		);
		return response.status(200).end();
	}
	return response.status(200).end();
};

export default handler;
