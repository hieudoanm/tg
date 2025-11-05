import { FC } from 'react';
import { PiSpinner } from 'react-icons/pi';

export const LoadingTemplate: FC = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex flex-col gap-y-4">
				<span className="text-center text-2xl font-semibold">Mini App</span>
				<PiSpinner className="mx-auto animate-spin text-4xl" />
			</div>
		</div>
	);
};
