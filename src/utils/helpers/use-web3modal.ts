import { useContext } from 'react';
import { StoreContext } from '_utils/context-api/store-context';
import { web3ModalConnect } from '_utils/services/web3modal';

export const useWeb3Modal = () => {
	const { setSigner, signer } = useContext(StoreContext);
	const login = async () => {
		const provider = await web3ModalConnect();
		if (provider) {
			const signer = provider.getSigner();
			const signerAddress = await signer.getAddress();
			console.log(signerAddress);
			setSigner({
				signerAddress: signerAddress,
			});
		}
	};
	const logOut = () => {
		setSigner(null);
	};

	return { login, logOut };
};
