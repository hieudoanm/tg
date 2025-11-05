import Link from 'next/link';
import { FC } from 'react';
import {
	PiGameController,
	PiGameControllerFill,
	PiHouse,
	PiHouseFill,
	PiNewspaper,
	PiNewspaperFill,
	PiStorefront,
	PiStorefrontFill,
	PiUserCircle,
	PiUserCircleFill,
} from 'react-icons/pi';

export const Navbar: FC<{ activeId: string }> = ({ activeId }) => {
	return (
		<nav className="border-t border-neutral-900 bg-neutral-950">
			<div className="grid grid-cols-5">
				{[
					{
						id: 'home',
						href: '/',
						icon: <PiHouse />,
						activeIcon: <PiHouseFill />,
						text: 'Home',
					},
					{
						id: 'games',
						href: '/games',
						icon: <PiGameController />,
						activeIcon: <PiGameControllerFill />,
						text: 'Games',
					},
					{
						id: 'store',
						href: '/store',
						icon: <PiStorefront />,
						activeIcon: <PiStorefrontFill />,
						text: 'Store',
					},
					{
						id: 'news',
						href: '/news',
						icon: <PiNewspaper />,
						activeIcon: <PiNewspaperFill />,
						text: 'News',
					},
					{
						id: 'profile',
						href: '/profile',
						icon: <PiUserCircle />,
						activeIcon: <PiUserCircleFill />,
						text: 'Profile',
					},
				].map(({ id = '', href = '', text = '', icon = <></>, activeIcon = <>

						</> }) => {
					const active: boolean = id === activeId;
					const activeClass = active
						? 'text-yellow-500 border-t-4 border-yellow-500 pt-2'
						: 'pt-3';
					return (
						<div key={id} className="col-span-1">
							<Link href={href}>
								<div
									className={`flex flex-col items-center justify-center gap-y-0.5 pb-2 ${activeClass}`}>
									<span className="text-3xl">
										{active ? <>{activeIcon}</> : <>{icon}</>}
									</span>
									<span className="text-xs">{text}</span>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</nav>
	);
};
