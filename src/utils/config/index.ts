import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const config = {
	projectContractAddress: '0x2E9563618F7cC7B4bef7784750cb8616a8Cb8D32', // mumbai
	tokensContractAddress: '0x3455371c6A400686024E8f5cA8Fc59dca51A1666', // mumbai
	pinata: {
		apiKey: process.env.PINATA_API_KEY || '',
		secretKey: process.env.PINATA_SECRET_KEY || '',
		jwt: process.env.PINATA_JWT || '',
		baseUrl: 'https://gateway.pinata.cloud/ipfs/',
	},
};

export default config;
