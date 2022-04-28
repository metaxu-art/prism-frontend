import { ethers, providers } from 'ethers';

export interface Signer {
	address: string;
	jsonRpcSigner: providers.JsonRpcSigner;
	projectContract: ethers.Contract;
	tokensContract: ethers.Contract;
}
