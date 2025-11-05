import { transfer } from '@telegram/clients/ton.client';
import { privateProcedure } from '@telegram/server/trpc';
import { tryCatch } from '@telegram/utils/try-catch';
import { z } from 'zod';

export const app = {
	authenticated: privateProcedure.query((options) => {
		const { ctx } = options;
		const { user } = ctx;
		if (!user) return { isAuthenticated: false };
		return { isAuthenticated: true };
	}),
	pay: privateProcedure
		.input(z.object({ address: z.string(), amount: z.number() }))
		.mutation(async (options) => {
			const { ctx, input } = options;
			const { user } = ctx;
			if (!user) return { success: false };
			const { address, amount } = input;
			const { error } = await tryCatch(transfer({ address, amount }));
			if (error) {
				console.error(error);
				return { success: false };
			}
			return { success: true };
		}),
};
