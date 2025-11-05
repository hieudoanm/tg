import { useRouter } from 'next/router';

export const useQuery = (path: string): string => {
	const router = useRouter();
	const { query } = router;
	const queryMap = new Map(Object.entries(query));
	const value: string | string[] = queryMap.get(path) ?? '';
	if (Array.isArray(value)) return value.at(0) ?? '';
	return value;
};
