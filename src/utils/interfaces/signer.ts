import { providers } from 'ethers';

export interface Signer {
	signerAddress: string;
	jsonRpcSigner: providers.JsonRpcSigner;
}
