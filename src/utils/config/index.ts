import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const config = {
	projectContractAddress: '0xe957a12c5546808E8E071EC5b910f0EF59554D99', // mumbai
	tokensContractAddress: '0x5CfAc860BE6Ad5e770e7E5D9fa31Fb255Ec6b4b4', // mumbai
	pinata: {
		apiKey: process.env.PINATA_API_KEY || '',
		secretKey: process.env.PINATA_SECRET_KEY || '',
		jwt: process.env.PINATA_JWT || '',
		baseUrl: 'https://gateway.pinata.cloud/ipfs/',
	},
};

export default config;
