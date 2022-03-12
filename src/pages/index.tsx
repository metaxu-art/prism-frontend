import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext } from 'react';
import NavigationBar from '_organisms/NavigationBar';
import { StoreContext } from '_utils/context-api/store-context';
import UserNotConnected from '_atoms/UserNotConnected';
import WaitingForWalletConnection from '_atoms/WaitingForWalletConnection';
import ConnectedToWrongNetwork from '_atoms/ConnectedToWrongNetwork';
import { AuthenticationStatus } from '_utils/enums/authentication-status';
import { LoginView } from '_organisms/login-view/LoginView';

const Home: NextPage = () => {
	const { isUserAuthenticated, authenticationStatus } = useContext(StoreContext);

	return (
		<div
			style={{
				backgroundImage: 'url("/images/background-image.png")',
			}}
			className="relative w-screen h-screen flex flex-col overflow-y-auto"
		>
			<Head>
				<title>Prism</title>
			</Head>

			<NavigationBar />

			<div className="flex-1 w-full overflow-hidden mx-auto flex justify-center items-center">
				{!isUserAuthenticated && (
					<div className="w-full px-10">
						{authenticationStatus === AuthenticationStatus.Idle && <UserNotConnected />}
						{authenticationStatus === AuthenticationStatus.Loading && (
							<WaitingForWalletConnection />
						)}
						{authenticationStatus === AuthenticationStatus.WrongNetwork && (
							<ConnectedToWrongNetwork />
						)}

						{authenticationStatus === AuthenticationStatus.UnknownError && <div>Unknown Error</div>}
					</div>
				)}
				{isUserAuthenticated && AuthenticationStatus.Success && <LoginView />}
			</div>
		</div>
	);
};

export default Home;
