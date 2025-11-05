import { User } from '@prisma/client';
import { prismaClient } from '@telegram/prisma/prisma.client';
import { tryCatch } from '@telegram/utils/try-catch';
import { createHmac } from 'node:crypto';

const TELEGRAM_BOT_TOKEN: string = process.env.TELEGRAM_BOT_TOKEN!;

const compareLex = (a: string, b: string): number => {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

export const authenticate = async (
	initData: string,
): Promise<{ user: User }> => {
	console.info('TELEGRAM_BOT_TOKEN', TELEGRAM_BOT_TOKEN);
	const secretKey: Buffer<ArrayBufferLike> = createHmac('sha256', 'WebAppData')
		.update(TELEGRAM_BOT_TOKEN)
		.digest();
	console.info('initData', initData);
	const params = new URLSearchParams(initData);
	console.info('params', params);
	const hash = params.get('hash');
	console.info('hash', hash);
	if (!hash) throw new Error('Invalid Hash');
	params.delete('hash');
	const initDataWithoutHash = Array.from(params)
		.map(([key, value]) => `${key}=${value}`)
		.sort(compareLex)
		.join('\n');
	const hmac: string = createHmac('sha256', secretKey)
		.update(initDataWithoutHash)
		.digest('hex');
	console.info('hmac', hmac);
	if (hmac !== hash) throw new Error('Invalid HMAC');

	const telegramUser: TelegramUser = JSON.parse(params.get('user') ?? '{}');
	const {
		id = 0,
		username = '',
		first_name: firstName = '',
		last_name: lastName = '',
		language_code: languageCode = '',
		photo_url: photoUrl = '',
		allows_write_to_pm: allowsWriteToPM = false,
	} = telegramUser;

	const { data: user, error } = await tryCatch(
		prismaClient.user.upsert({
			create: {
				id,
				username,
				firstName,
				lastName,
				languageCode,
				photoUrl,
				allowsWriteToPM,
			},
			update: {
				id,
				username,
				firstName,
				lastName,
				languageCode,
				photoUrl,
				allowsWriteToPM,
			},
			where: { id },
		}),
	);
	if (error) throw new Error(error.message);
	if (!user) throw new Error('Invalid User');
	return { user };
};
