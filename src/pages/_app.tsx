import type { AppProps } from 'next/app';
import '../globals.css';
import { useState } from 'react';
import { Signer } from '_utils/interfaces/signer';
import { StoreContext } from '_utils/context-api/store-context';
import { AuthenticationStatus } from '_utils/enums/authentication-status';

function MyApp({ Component, pageProps }: AppProps) {
	const [signer, setSigner] = useState<Signer | null>(null);
	const [authenticationStatus, setUserAuthenticatingStatus] = useState<AuthenticationStatus>(
		AuthenticationStatus.Idle,
	);
	return (
		<StoreContext.Provider
			value={{
				setSigner,
				signer: signer,
				isUserAuthenticated: !!signer,
				authenticationStatus,
				setUserAuthenticatingStatus,
			}}
		>
			<Component {...pageProps} />
		</StoreContext.Provider>
	);
}

export default MyApp;
