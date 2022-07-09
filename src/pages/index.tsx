import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import NavigationBar from '_organisms/NavigationBar';
import { StoreContext } from '_utils/context-api/store-context';
import UserNotConnected from '_atoms/UserNotConnected';
import WaitingForWalletConnection from '_atoms/WaitingForWalletConnection';
import ConnectedToWrongNetwork from '_atoms/ConnectedToWrongNetwork';
import { AuthenticationStatus } from '_utils/enums/authentication-status';
import SelectAdminComposeView from '_molecules/SelectAdminComposeView';

const Home: NextPage = () => {
	const { isUserAuthenticated, authenticationStatus } = useContext(StoreContext);

	useEffect(() => {}, []);

	const onDocumentClick = () => {
		// handle dropdown menu close event
	};

	return (
		<div
			onClick={onDocumentClick}
			style={{
				backgroundImage: 'url("/images/background-image.png")',
				backgroundSize: 'cover'
			}}
			className="relative w-screen h-screen flex flex-col overflow-y-auto overflow-auto"
		>
			<Head>
				<title>Prism | Welcome</title>
			</Head>

			<NavigationBar/>

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
				{isUserAuthenticated && AuthenticationStatus.Success && <SelectAdminComposeView />}
			</div>
		</div>
	);
};

export default Home;
