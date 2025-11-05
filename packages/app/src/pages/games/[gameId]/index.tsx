import { Badge } from '@telegram/components/Badge';
import { Button } from '@telegram/components/Button';
import { useQuery } from '@telegram/hooks/use-query';
import { PageTemplate } from '@telegram/templates/PageTemplate';
import Link from 'next/link';
import { PiCaretLeftBold } from 'react-icons/pi';

const StoreItemPage = () => {
	const gameId: string = useQuery('gameId');

	return (
		<PageTemplate activeId="store">
			<div className="flex flex-col gap-y-6 p-4">
				<Link href="/games">
					<div className="flex items-center gap-x-2 text-yellow-500">
						<PiCaretLeftBold />
						<span className="font-medium">Games</span>
					</div>
				</Link>
				<div className="aspect-square w-full rounded-xl border border-neutral-900 shadow shadow-neutral-900"></div>
				<div className="flex flex-col gap-y-3">
					<div>
						<Badge type="primary">Category</Badge>
					</div>
					<h1 className="text-xl leading-none font-semibold">Game {gameId}</h1>
					<p className="text-sm leading-none text-neutral-500">
						Lorem ipsum dolor sit amet.
					</p>
				</div>
				<Button>Play Now</Button>
			</div>
		</PageTemplate>
	);
};

export default StoreItemPage;
