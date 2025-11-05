import { PageTemplate } from '@telegram/templates/PageTemplate';
import { formatDate } from '@telegram/utils/date';
import { NextPage } from 'next';
import Link from 'next/link';
import { PiArrowRightBold } from 'react-icons/pi';

const CONTENT =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet pretium enim, egestas tincidunt orci. Nullam rutrum iaculis libero id suscipit. Nullam consectetur felis a hendrerit tincidunt. Nam sodales porttitor dui, id feugiat diam pulvinar at. Morbi pulvinar metus sed nisl egestas aliquam. In rhoncus augue a cursus tristique.';

const NewsPage: NextPage = () => {
	return (
		<PageTemplate activeId="news">
			<div className="flex flex-col gap-y-4 p-4">
				{[
					{
						id: '1',
						title: 'Article 1',
						date: new Date(),
						content: CONTENT,
						tags: ['Tag 1', 'Tag 2'],
					},
					{
						id: '2',
						title: 'Article 2',
						date: new Date(),
						content: CONTENT,
						tags: ['Tag 1', 'Tag 2'],
					},
					{
						id: '3',
						title: 'Article 3',
						date: new Date(),
						content: CONTENT,
						tags: ['Tag 1', 'Tag 2'],
					},
					{
						id: '4',
						title: 'Article 4',
						date: new Date(),
						content: CONTENT,
						tags: ['Tag 1', 'Tag 2'],
					},
				].map(
					({
						id = '',
						title = '',
						date = new Date(),
						content = '',
						tags = [],
					}) => {
						return (
							<div
								key={id}
								className="rounded-2xl border border-neutral-900 shadow shadow-neutral-900">
								<div className="aspect-video w-full border-b border-neutral-900"></div>
								<div className="flex flex-col gap-y-2 p-4">
									<p className="text-xs text-neutral-500">{formatDate(date)}</p>
									<h1 className="text-lg leading-none font-semibold">
										{title}
									</h1>
									<div className="flex items-center gap-x-2">
										{tags.map((tag: string) => {
											return (
												<span
													key={tag}
													className="rounded-full bg-yellow-500 px-2 py-0.5 text-xs text-neutral-900">
													{tag}
												</span>
											);
										})}
									</div>
									<p className="line-clamp-3 text-sm text-neutral-300">
										{content}
									</p>
									<Link href={`/news/${id}`}>
										<div className="flex items-center gap-x-2">
											<p className="text-sm text-yellow-500">Find out more </p>
											<PiArrowRightBold className="text-yellow-500" />
										</div>
									</Link>
								</div>
							</div>
						);
					},
				)}
			</div>
		</PageTemplate>
	);
};

export default NewsPage;
