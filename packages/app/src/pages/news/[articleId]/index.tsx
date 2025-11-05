import { Badge } from '@telegram/components/Badge';
import { useQuery } from '@telegram/hooks/use-query';
import { PageTemplate } from '@telegram/templates/PageTemplate';
import { formatDate } from '@telegram/utils/date';
import Link from 'next/link';
import { PiCaretLeftBold } from 'react-icons/pi';

const CONTENT =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet pretium enim, egestas tincidunt orci. Nullam rutrum iaculis libero id suscipit. Nullam consectetur felis a hendrerit tincidunt. Nam sodales porttitor dui, id feugiat diam pulvinar at. Morbi pulvinar metus sed nisl egestas aliquam. In rhoncus augue a cursus tristique.';

const ArticlePage = () => {
	const articleId: string = useQuery('articleId');

	return (
		<PageTemplate activeId="news">
			<div className="flex flex-col gap-y-6 p-4">
				<Link href="/news">
					<div className="flex items-center gap-x-2 text-yellow-500">
						<PiCaretLeftBold />
						<span className="font-medium">News</span>
					</div>
				</Link>
				<div className="aspect-video w-full rounded-xl border border-neutral-900 shadow shadow-neutral-900"></div>
				<div className="flex flex-col gap-y-3">
					<p className="text-xs text-neutral-500">{formatDate(new Date())}</p>
					<h1 className="text-xl leading-none font-semibold">
						Article {articleId}
					</h1>
					<div className="flex items-center gap-x-2">
						<Badge type="primary">Tag 1</Badge>
						<Badge type="primary">Tag 2</Badge>
					</div>
					<p className="text-sm text-neutral-300">{CONTENT}</p>
				</div>
			</div>
		</PageTemplate>
	);
};

export default ArticlePage;
