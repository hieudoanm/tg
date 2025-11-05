import { tryCatch } from '@telegram/utils/try-catch';

export enum ParseMode {
	HTML = 'html',
	MARKDOWN = 'markdown',
}
export type SetWebhookResponse = {
	ok: boolean;
	result: boolean;
	description: string;
};

export type DeleteWebhookResponse = {
	ok: boolean;
	result: boolean;
	description: string;
};

export type WebhookResult = {
	url: string;
	has_custom_certificate: boolean;
	pending_update_count: number;
};

export type WebhookInfo = {
	ok: boolean;
	result: WebhookResult;
};

const BASE_URL = 'https://api.telegram.org/bot';

const INVALID_TOKEN: string = 'Invalid token';

const post = async <T, D>(url: string, requestBody?: D): Promise<T> => {
	const encodedUrl = encodeURI(url);
	const headers = { 'Content-Type': 'application/json' };
	const method = 'POST';
	const body = JSON.stringify(requestBody);
	const { data: response, error: fetchError } = await tryCatch(
		fetch(encodedUrl, { method, headers, body }),
	);
	if (fetchError) throw new Error(fetchError.message);
	const { data, error } = await tryCatch(response.json());
	if (error) throw new Error(error.message);
	return data as T;
};

const splitMessage = (text: string, limit = 4096) => {
	const chunks = [];
	for (let i = 0; i < text.length; i += limit) {
		chunks.push(text.slice(i, i + limit));
	}
	return chunks;
};

const sendMessage = async ({
	token = '',
	chatId = 0,
	message = '',
	messageId = 0,
	parseMode = ParseMode.MARKDOWN,
}: {
	token: string;
	chatId: number;
	message: string;
	messageId?: number;
	parseMode?: ParseMode;
}): Promise<void> => {
	if (!token) throw new Error(INVALID_TOKEN);
	if (!chatId) throw new Error('Invalid chatId');
	if (!message) throw new Error('Invalid message');
	const sendMessageUrl = `${BASE_URL}${token}/sendMessage`;
	if (message.length < 4096) {
		const { data, error } = await tryCatch(
			post(sendMessageUrl, {
				chat_id: chatId,
				text: `${message}`,
				parse_mode: parseMode,
				reply_to_message_id: messageId,
			}),
		);
		if (error) {
			console.error(error);
		} else {
			console.log(data);
		}
	} else {
		const parts: string[] = splitMessage(message);
		for (const part of parts) {
			const { data, error } = await tryCatch(
				post(sendMessageUrl, {
					chat_id: chatId,
					text: `${part}`,
					parse_mode: parseMode,
					reply_to_message_id: messageId,
				}),
			);
			if (error) {
				console.error(error);
			} else {
				console.log(data);
			}
		}
	}
};

export const setWebhook = async (
	token: string,
	url: string,
): Promise<SetWebhookResponse> => {
	if (!token) throw new Error(INVALID_TOKEN);
	if (!url) throw new Error('Invalid url');
	const setWebhookUrl = `${BASE_URL}${token}/setWebhook`;
	return post<SetWebhookResponse, { url: string }>(setWebhookUrl, { url });
};

export const deleteWebhook = async (
	token: string,
	url: string,
): Promise<DeleteWebhookResponse> => {
	if (!token) throw new Error(INVALID_TOKEN);
	if (!url) throw new Error('Invalid url');
	const deleteWebhookUrl = `${BASE_URL}${token}/deleteWebhook`;
	return post<DeleteWebhookResponse, { url: string }>(deleteWebhookUrl, {
		url,
	});
};

export const getWebhookInfo = async (token: string): Promise<WebhookInfo> => {
	if (!token) throw new Error(INVALID_TOKEN);
	const getWebhookInfoUrl = `${BASE_URL}${token}/getWebhookInfo`;
	return post<WebhookInfo, undefined>(getWebhookInfoUrl);
};

export const Telegram = () => {
	return {
		messages: { send: sendMessage },
		webhook: { info: getWebhookInfo, set: setWebhook, delete: deleteWebhook },
	};
};
