import { User } from '@prisma/client';
import { publicProcedure } from '@telegram/server/trpc';
import { JWT } from '@telegram/utils/jwt';
import { tryCatch } from '@telegram/utils/try-catch';
import { serialize } from 'cookie';
import { NextApiResponse } from 'next';
import z from 'zod';
import { authenticate } from './auth.service';

const MAX_AGE = 60 * 60 * 24; // 1 day

const setHttpCookie = (res: NextApiResponse, token: string) => {
	const cookie = serialize('auth-token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'none',
		path: '/',
		maxAge: MAX_AGE,
	});
	res.setHeader('Set-Cookie', cookie);
};

export const auth = {
	telegram: publicProcedure
		.input(
			z.object({
				initData: z.string().default(''),
			}),
		)
		.mutation(async (options) => {
			const { res } = options.ctx;
			const { initData = '' } = options.input;
			const { data, error } = await tryCatch(authenticate(initData));
			if (error) {
				console.error(error.message);
				return { success: false };
			}
			if (!data) {
				console.error('Invalid Data');
				return { success: false };
			}
			const { user } = data;
			const cookieUser = { ...user, id: user.id.toString() };
			const token: string = JWT().generate(cookieUser as User & { id: string });
			setHttpCookie(res, token);
			return { success: true };
		}),
};
