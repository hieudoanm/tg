import { FC, ReactNode } from 'react';

export type BadgeType = 'primary' | 'error' | 'success';

export const Badge: FC<{ type: BadgeType; children: ReactNode }> = ({
	type = 'primary',
	children = <></>,
}) => {
	if (type === 'success') {
		return (
			<span className="rounded-full bg-green-900 px-2 py-0.5 text-xs text-neutral-900">
				{children}
			</span>
		);
	}
	if (type === 'error') {
		return (
			<span className="rounded-full bg-red-900 px-2 py-0.5 text-xs text-neutral-900">
				{children}
			</span>
		);
	}

	return (
		<span className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs text-neutral-900">
			{children}
		</span>
	);
};
