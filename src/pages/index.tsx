import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import UserNotConnected from '_atoms/UserNotConnected';
import NavigationBar from '_organisms/NavigationBar';
import { StoreContext } from '_utils/context-api/store-context';
import { useWeb3Modal } from '_utils/helpers/use-web3modal';
// import Head from 'next/head';
// import Image from 'next/image';

const Home: NextPage = () => {
	// const  [] = useMoralis();
	const { login, logOut } = useWeb3Modal();
	const { isUserAuthenticated, signer } = useContext(StoreContext);

	return (
		<div className="w-full h-full overflow-y-auto">
			<Head>
				<title>Prism</title>
			</Head>
			<NavigationBar />
			<div className="w-full h-full max-w-[1500px] mx-auto flex justify-center items-center px-10">
				{!isUserAuthenticated && <UserNotConnected />}
				{isUserAuthenticated && <div>Signer {signer?.signerAddress}</div>}
			</div>

			{/* <h1>{isUserAuthenticated ? 'User is authenticated' : 'User is not authenticated'}</h1>
			<br />
			<button onClick={login}>Login</button>
			<button onClick={logOut} disabled={!isUserAuthenticated}>
				Logout
			</button>
			<div>{isUserAuthenticated && `Signer ${signer?.signerAddress}`}</div> */}
		</div>
	);
};

export default Home;
