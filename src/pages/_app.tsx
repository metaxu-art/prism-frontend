import type { AppProps } from 'next/app';
import '../globals.css';
import { useState } from 'react';
import { Signer } from '_utils/interfaces/signer';
import { StoreContext } from '_utils/context-api/store-context';

function MyApp({ Component, pageProps }: AppProps) {
	const [signer, setSigner] = useState<Signer | null>(null);
	return (
		<StoreContext.Provider
			value={{
				setSigner,
				signer: signer,
				isUserAuthenticated: !!signer,
			}}
		>
			<Component {...pageProps} />
		</StoreContext.Provider>
	);
}

export default MyApp;
