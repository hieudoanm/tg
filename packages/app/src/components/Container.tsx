import { FC, ReactNode } from 'react';

export const Container: FC<{ children: ReactNode }> = ({
	children = <></>,
}) => {
	return (
		<div className="mx-auto flex h-screen w-full max-w-lg flex-col overflow-hidden bg-neutral-950/10">
			{children}
		</div>
	);
};
