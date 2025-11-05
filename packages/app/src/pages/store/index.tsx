import { Badge } from '@telegram/components/Badge';
import { Button } from '@telegram/components/Button';
import { PageTemplate } from '@telegram/templates/PageTemplate';
import { NextPage } from 'next';
import Link from 'next/link';

const StorePage: NextPage = () => {
	return (
		<PageTemplate activeId="store">
			<div className="flex flex-col p-4">
				<div className="flex flex-col gap-y-4">
					<div className="aspect-video w-full rounded-2xl border border-neutral-900 bg-neutral-950 shadow shadow-neutral-900">
						<div className="flex h-full w-full flex-col p-4">
							<div className="grow"></div>
							<Button>Buy Now</Button>
						</div>
					</div>
					<h1 className="text-2xl font-black">Store</h1>
					{[
						{ id: '1', name: 'Item 1', price: '$1.00', category: 'Category' },
						{ id: '2', name: 'Item 2', price: '$1.00', category: 'Category' },
						{ id: '3', name: 'Item 3', price: '$1.00', category: 'Category' },
						{ id: '4', name: 'Item 4', price: '$1.00', category: 'Category' },
						{ id: '5', name: 'Item 5', price: '$1.00', category: 'Category' },
						{ id: '6', name: 'Item 6', price: '$1.00', category: 'Category' },
					].map(({ id = '', name = '', price = '', category = '' }) => {
						return (
							<div
								key={id}
								className="rounded-xl border border-neutral-900 bg-neutral-950 px-4 py-3 shadow shadow-neutral-900">
								<div className="flex w-full items-center gap-x-4">
									<div className="flex grow items-center gap-x-4 truncate">
										<div className="aspect-square h-20 rounded-lg border border-neutral-900"></div>
										<div className="flex grow flex-col gap-y-2 truncate">
											<div>
												<Badge type="primary">{category}</Badge>
											</div>
											<h2 className="leading-none font-semibold">{name}</h2>
											<p className="truncate text-lg leading-none font-black">
												{price}
											</p>
										</div>
									</div>
									<div className="shrink-0">
										<Link href={`/store/${id}`}>
											<Button size="sm">Buy</Button>
										</Link>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</PageTemplate>
	);
};

export default StorePage;
