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
		return [
			{
				source: '/',
				destination: '/quiz-register',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
