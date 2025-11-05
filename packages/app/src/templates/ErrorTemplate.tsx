import { Button } from '@telegram/components/Button';
import { useTelegram } from '@telegram/contexts/TelegramContext';
import Link from 'next/link';
import { FC, useEffect } from 'react';

export const ErrorTemplate: FC<{ code: string }> = ({ code }) => {
	const { requestFullscreen } = useTelegram();

	useEffect(() => {
		requestFullscreen();
	}, [requestFullscreen]);

	return (
		<div className="mx-auto flex h-screen w-full max-w-lg items-center justify-center border border-neutral-800 p-8">
			<div className="flex flex-col items-center justify-center gap-y-8">
				<h1 className="text-9xl">{code}</h1>
				<Link href="/">
					<Button>Go Home</Button>
				</Link>
			</div>
		</div>
	);
};
