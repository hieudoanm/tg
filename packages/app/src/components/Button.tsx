import { FC, ReactNode } from 'react';

type ButtonSize = 'sm' | 'md';

export const Button: FC<{
	size?: ButtonSize;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	children: ReactNode;
}> = ({
	size = 'md',
	type = 'button',
	onClick = () => {},
	children = <></>,
}) => {
	if (size === 'sm') {
		return (
			<button
				type={type}
				className="w-full rounded-full bg-yellow-500 px-3 py-1 text-sm font-semibold text-neutral-900"
				onClick={onClick}>
				{children}
			</button>
		);
	}

	return (
		<button
			type={type}
			className="w-full rounded-full bg-yellow-500 px-4 py-2 font-semibold text-neutral-900"
			onClick={onClick}>
			{children}
		</button>
	);
};

export const OutlineButton: FC<{
	size?: ButtonSize;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	children: ReactNode;
}> = ({
	size = 'md',
	type = 'button',
	onClick = () => {},
	children = <></>,
}) => {
	if (size === 'sm') {
		return (
			<button
				type={type}
				className="w-full rounded-full border border-yellow-500 px-3 py-1 text-sm font-semibold text-yellow-500"
				onClick={onClick}>
				{children}
			</button>
		);
	}

	return (
		<button
			type={type}
			className="w-full rounded-full border border-yellow-500 px-4 py-2 font-semibold text-yellow-500"
			onClick={onClick}>
			{children}
		</button>
	);
};
