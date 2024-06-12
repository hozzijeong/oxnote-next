/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const nextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	async redirects() {
		if (process.env.NEXT_PUBLIC_HOME_REDIRECT) {
			return [
				{
					source: process.env.NEXT_PUBLIC_HOME,
					destination: process.env.NEXT_PUBLIC_HOME_REDIRECT,
					permanent: false,
				},
			];
		}

		return [];
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Cross-Origin-Opener-Policy',
						value: 'same-origin-allow-popups',
					},
					{
						key: 'Cross-Origin-Resource-Policy',
						value: 'cross-origin',
					},
				],
			},
		];
	},
};

export default nextConfig;
