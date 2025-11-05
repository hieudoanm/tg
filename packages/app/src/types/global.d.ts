export {};

declare global {
	interface Window {
		Telegram: {
			WebApp: {
				initData: string;
				ready: () => void;
				requestFullscreen: () => void;
				isExpanded: boolean;
				platform: TelegramPlatform;
			};
		};
	}
}
