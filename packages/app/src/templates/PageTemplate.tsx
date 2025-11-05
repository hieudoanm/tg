import { Container } from '@telegram/components/Container';
import { Navbar } from '@telegram/components/Navbar';
import { useTelegram } from '@telegram/contexts/TelegramContext';
import { FC, ReactNode, useEffect } from 'react';

export const PageTemplate: FC<{ activeId: string; children: ReactNode }> = ({
	activeId = '',
	children = <></>,
}) => {
	const { requestFullscreen } = useTelegram();

	useEffect(() => {
		requestFullscreen();
	}, [requestFullscreen]);

	return (
		<Container>
			<header className="border-b border-neutral-900 pt-7 pb-4">
				<h1 className="text-center text-2xl font-semibold">Mini App</h1>
			</header>
			<main className="scrollbar-none grow overflow-y-auto">{children}</main>
			<Navbar activeId={activeId} />
		</Container>
	);
};
