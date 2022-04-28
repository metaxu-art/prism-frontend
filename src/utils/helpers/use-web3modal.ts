import { ethers } from 'ethers';
import { useContext } from 'react';
import config from '_utils/config';
import { StoreContext } from '_utils/context-api/store-context';
import { AuthenticationStatus } from '_utils/enums/authentication-status';
import { web3ModalConnect } from '_utils/services/web3modal';
import projectAbi from '../../project-abi.json';
import tokensAbi from '../../tokens-abi.json';

export const useWeb3Modal = () => {
	const { setSigner, setUserAuthenticatingStatus } = useContext(StoreContext);

	const login = async () => {
		setUserAuthenticatingStatus(AuthenticationStatus.Loading);
		const provider = await web3ModalConnect();

		if (provider) {
			const network = await provider.getNetwork();

			// if (network.name !== 'matic') {
			if (false) {
				setUserAuthenticatingStatus(AuthenticationStatus.WrongNetwork);
			} else {
				const signer = provider.getSigner();
				const signerAddress = await signer.getAddress();
				const projectContract = new ethers.Contract(
					config.projectContractAddress,
					projectAbi,
					signer,
				);
				const tokensContract = new ethers.Contract(config.tokensContractAddress, tokensAbi, signer);

				setUserAuthenticatingStatus(AuthenticationStatus.Success);
				setSigner({
					address: signerAddress,
					jsonRpcSigner: signer,
					projectContract,
					tokensContract,
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
