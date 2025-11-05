import { TelegramProvider } from '@telegram/contexts/TelegramContext';
import '@telegram/styles/globals.css';
import { trpcHook } from '@telegram/utils/trpc';
import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
import Head from 'next/head';
import { FC } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Telegram Mini App</title>
			</Head>
			<div className={`${geistSans.className} ${geistMono.className}`}>
				<TonConnectUIProvider manifestUrl="https://hieudoanm-telegram-mini-app.vercel.app/tonconnect-manifest.json">
					<TelegramProvider>
						<Component {...pageProps} />
					</TelegramProvider>
				</TonConnectUIProvider>
			</div>
		</>
	);
};

export default trpcHook.withTRPC(App);
