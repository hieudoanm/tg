import type { NextConfig } from 'next';

const PLATFORM = process.env.PLATFORM ?? '';
const NODE_ENV = process.env.NODE_ENV ?? 'development';
const BASE_PATH = 'tg';

const buildConfig: Pick<NextConfig, 'basePath' | 'output' | 'distDir'> =
	PLATFORM !== 'vercel'
		? {
				basePath: NODE_ENV === 'development' ? '' : `/${BASE_PATH}`,
				output: NODE_ENV === 'development' ? 'standalone' : 'export',
				distDir: NODE_ENV === 'development' ? '.next' : '../../docs',
			}
		: {};

const nextConfig: NextConfig = {
	/* config options here */
	...buildConfig,
	trailingSlash: true,
	reactStrictMode: true,
	images: { unoptimized: NODE_ENV !== 'development' },
};

export default nextConfig;
