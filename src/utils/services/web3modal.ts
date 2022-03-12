// import WalletConnectProvider from '@walletconnect/web3-provider';
// import WalletLink from 'walletlink';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';

const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			// infuraId: '',
		},
	},
	walletlink: {
		package: WalletLink,
		options: {
			appName: 'Prism',
			// infuraId: '',
			appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
			darkMode: false, // Optional. Use dark theme, defaults to false
		},
	},
};

export const web3ModalConnect = async () => {
	const web3Modal = new Web3Modal({
		providerOptions,
		lightboxOpacity: 0.8,
		theme: 'dark',
		cacheProvider: true, // stores provider that was used for the first time
	});

	let instance;
	try {
		instance = await web3Modal.connect();
	} catch (e) {
		console.error('web3modal[web3ModalConnect]:', e);
		return;
	}

	return new ethers.providers.Web3Provider(instance);
};
