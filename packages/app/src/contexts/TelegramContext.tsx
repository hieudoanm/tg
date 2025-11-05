import { LoadingTemplate } from '@telegram/templates/LoadingTemplate';
import { trpcClient } from '@telegram/utils/trpc';
import { tryCatch } from '@telegram/utils/try-catch';
import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

enum TelegramPlatform {
	Android = 'android',
	IOS = 'ios',
	MacOS = 'macos',
	TDesktop = 'tdesktop',
	Web = 'web',
}

const getUser = async (): Promise<{
	initData: string;
	user: TelegramUser | null;
}> => {
	if (window?.Telegram?.WebApp?.initData) {
		const telegramWebAppInitData = window.Telegram.WebApp.initData;
		const initData = Object.fromEntries(
			new URLSearchParams(telegramWebAppInitData),
		) as InitData;
		const { user: userString } = initData;
		const { data: user, error } = await tryCatch<TelegramUser>(
			JSON.parse(userString),
		);
		if (error) {
			console.error(error);
			return { user: null, initData: '' };
		}

		return { user, initData: telegramWebAppInitData };
	}

	return {
		user: null,
		initData: '',
	};
};

const UserContext = createContext<{
	isAuthenticated: boolean;
	user: TelegramUser | null;
	getPlatform: () => TelegramPlatform;
	requestFullscreen: () => void;
}>({
	isAuthenticated: false,
	user: null,
	getPlatform: () => TelegramPlatform.Web,
	requestFullscreen: () => {},
});

export const TelegramProvider: React.FC<{ children: ReactNode }> = ({
	children = <></>,
}) => {
	const [{ loading = true, isAuthenticated = false, user = null }, setState] =
		useState<{
			loading: boolean;
			isAuthenticated: boolean;
			user: TelegramUser | null;
		}>({
			loading: false,
			isAuthenticated: false,
			user: null,
		});

	useEffect(() => {
		const getUserAsync = async () => {
			setState((previous) => ({ ...previous, loading: true }));
			const { initData, user } = await getUser();
			const { data, error } = await tryCatch(
				trpcClient.auth.telegram.mutate({ initData }),
			);
			if (error) console.error(error.message);
			if (!data) console.error('Invalid Data');
			const { data: authenticatedData, error: authenticatedError } =
				await tryCatch(trpcClient.app.authenticated.query());
			if (authenticatedError) console.error(authenticatedError.message);
			if (!authenticatedData) console.error('Invalid Data');
			const { isAuthenticated } = authenticatedData ?? {
				isAuthenticated: false,
			};
			setState((previous) => ({
				...previous,
				loading: false,
				isAuthenticated,
				user,
			}));
		};
		getUserAsync();
	}, []);
	const tg = typeof window !== 'undefined' && window.Telegram?.WebApp;

	const getPlatform = useCallback((): TelegramPlatform => {
		try {
			if (tg) {
				tg.ready();
				return tg.platform;
			}
		} catch (error) {
			console.error(error);
			return TelegramPlatform.Web;
		}
		return TelegramPlatform.Web;
	}, [tg]);

	const requestFullscreen = useCallback(() => {
		try {
			if (tg) {
				if (getPlatform() === TelegramPlatform.Web) return;
				tg.ready();
				tg.requestFullscreen();
			}
		} catch (error) {
			console.error(error);
		}
	}, [tg, getPlatform]);

	const value = useMemo(
		() => ({ isAuthenticated, user, getPlatform, requestFullscreen }),
		[isAuthenticated, user, getPlatform, requestFullscreen],
	);

	return (
		<UserContext.Provider value={value}>
			{loading ? <LoadingTemplate /> : <>{children}</>}
		</UserContext.Provider>
	);
};

export const useTelegram = () => {
	return useContext(UserContext);
};
