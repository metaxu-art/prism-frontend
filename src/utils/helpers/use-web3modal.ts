import { useContext } from 'react';
import { StoreContext } from '_utils/context-api/store-context';
import { AuthenticationStatus } from '_utils/enums/authentication-status';
import { web3ModalConnect } from '_utils/services/web3modal';

export const useWeb3Modal = () => {
	const { setSigner, setUserAuthenticatingStatus } = useContext(StoreContext);

	const onAccountsChanged = (accounts: string[]) => {
		console.log('accountsChanged:', accounts);
	};

	const login = async () => {
		setUserAuthenticatingStatus(AuthenticationStatus.Loading);
		const provider = await web3ModalConnect();

		if (provider) {
			// setProvider(provider);
			// provider.addListener('accountsChanged', onAccountsChanged); // doesn't work

			const network = await provider.getNetwork();
			// console.log(network.name);
			if (network.name !== 'matic') {
				setUserAuthenticatingStatus(AuthenticationStatus.WrongNetwork);
			} else {
				const signer = provider.getSigner();
				const signerAddress = await signer.getAddress();

				setUserAuthenticatingStatus(AuthenticationStatus.Success);
				setSigner({
					signerAddress: signerAddress,
				});
			}
		} else {
			setUserAuthenticatingStatus(AuthenticationStatus.Idle);
		}
	};
	const logOut = () => {
		setSigner(null);
		setUserAuthenticatingStatus(AuthenticationStatus.Idle);
	};

	return { login, logOut };
};
