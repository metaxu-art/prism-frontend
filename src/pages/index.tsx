import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useContext } from 'react';
import NavigationBar from '_organisms/NavigationBar';
import { StoreContext } from '_utils/context-api/store-context';
import backgroundImage from '_images/background-image.png';
import UserNotConnected from '_atoms/UserNotConnected';
import WaitingForWalletConnection from '_atoms/WaitingForWalletConnection';
import ConnectedToWrongNetwork from '_atoms/ConnectedToWrongNetwork';
import { AuthenticationStatus } from '_utils/enums/authentication-status';
import { LoginView } from '_organisms/login-view/LoginView';

const Home: NextPage = () => {
	const { isUserAuthenticated, authenticationStatus } = useContext(StoreContext);

	return (
		<div className="relative w-full h-full flex flex-col overflow-y-auto">
			<Head>
				<title>Prism</title>
			</Head>
			<div className="absolute top-0 bottom-0 right-0 left-0 z-[-1]">
				<Image objectFit="cover" src={backgroundImage} alt="Background Image" layout="fill" />
			</div>

			<NavigationBar />
			<div className="flex-1 w-full max-w-[1600px] mx-auto flex justify-center items-center px-10">
				{!isUserAuthenticated && (
					<>
						{authenticationStatus === AuthenticationStatus.Idle && <UserNotConnected />}
						{authenticationStatus === AuthenticationStatus.Loading && (
							<WaitingForWalletConnection />
						)}
						{authenticationStatus === AuthenticationStatus.WrongNetwork && (
							<ConnectedToWrongNetwork />
						)}

						{authenticationStatus === AuthenticationStatus.UnknownError && <div>Unknown Error</div>}
					</>
				)}
				{isUserAuthenticated && AuthenticationStatus.Success && <LoginView />}
			</div>
		</div>
	);
};

export default Home;
