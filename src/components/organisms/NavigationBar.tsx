import React, { useContext } from 'react';
import PrimaryButton from '_atoms/buttons/Primary';
import { StoreContext } from '_utils/context-api/store-context';
import { useWeb3Modal } from '_utils/helpers/use-web3modal';

const NavigationBar = () => {
	const { login, logOut } = useWeb3Modal();
	const { isUserAuthenticated, signer } = useContext(StoreContext);

	const reduceAddressCharacters = (address: string) => {
		const firstThreeChars = address.substring(0, 8);
		const lastThree = address.substring(address.length - 8, address.length);
		return `${firstThreeChars}...${lastThree}`;
	};

	return (
		<div className="w-full py-8 border-b-4 border-black">
			<div className="flex justify-between max-w-[1600px] mx-auto px-10">
				<span className="text-3xl font-semibold">PRISM</span>
				<div className="w-full max-w-[260px]">
					<PrimaryButton onClick={isUserAuthenticated ? logOut : login}>
						<span className="font-bold">
							{isUserAuthenticated
								? reduceAddressCharacters(signer!.signerAddress)
								: 'Connect Wallet'}{' '}
						</span>
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default NavigationBar;
