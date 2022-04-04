/** @type {import('next').NextConfig} */

require('dotenv').config();
const nextConfig = {
	env: {
		NODEENV: process.env.NODEENV,
	},
	reactStrictMode: true,
	images: {
		domains: ['sentientmachine.mypinata.cloud', 'gateway.pinata.cloud'],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});

		return config;
	},
};

module.exports = nextConfig;
