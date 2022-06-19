/** @type {import('next').NextConfig} */

require('dotenv').config();
const nextConfig = {
	env: {
		NODEENV: process.env.NODEENV,
		PRIVATE_KEY: process.env.PRIVATE_KEY,
		PINATA_API_KEY: process.env.PINATA_API_KEY,
		PINATA_SECRET_KEY: process.env.PINATA_SECRET_KEY,
		PINATA_JWT: process.env.PINATA_JWT,
	},
	reactStrictMode: true,
	images: {
		domains: ['sentientmachine.mypinata.cloud', 'gateway.pinata.cloud'],
	},
	webpack(config) {
		// config.resolve.fallback = { ...config.resolve.fallback, fs: false };

		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

module.exports = nextConfig;
