import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const config = {
	// projectContractAddress: '0x778834A9f6D139e45aD559c8A5f1B8c2AFfE3321', // mumbai testnet
	// tokensContractAddress: '0x67bce7F38C0Ee04C7C986A2Acc46697004229861', // mumbai testnet
	projectContractAddress: '0xBE921c99C563141de9802e7888906BFd7b3514E4', // polygon
	tokensContractAddress: '0x478a2F0fc28C33F9a6cDC464C3453F7f290deE90', // polygon
	pinata: {
		apiKey: process.env.PINATA_API_KEY || '',
		secretKey: process.env.PINATA_SECRET_KEY || '',
		jwt: process.env.PINATA_JWT || '',
		baseUrl: 'https://gateway.pinata.cloud/ipfs/',
	},
};

export default config;
