import React, { useContext } from 'react';
import PrimaryButton from '_atoms/buttons/Primary';
import { StoreContext } from '_utils/context-api/store-context';
import { useWeb3Modal } from '_utils/helpers/use-web3modal';
import PrismWipLogo from '_svgs/prism-wip-logo.svg';

const NavigationBar = () => {
	const { login, logOut } = useWeb3Modal();
	const { isUserAuthenticated, signer } = useContext(StoreContext);

	const reduceAddressCharacters = (address: string, charachterAmount: number) => {
		const firstThreeChars = address.substring(0, charachterAmount / 2);
		const lastThree = address.substring(address.length - charachterAmount / 2, address.length);
		return `${firstThreeChars}...${lastThree}`;
	};

	return (
		<div className="w-full sticky top-0 z-10 py-4 2xl:py-8 border-b-[3px] border-white bg-black">
			<div className="flex justify-between max-w-[1536px] mx-auto px-10 2xl:px-0">
				{/* <span className="text-3xl font-semibold text-white">PRISM</span> */}
				<PrismWipLogo />
				<div className="w-full max-w-[260px]">
					<PrimaryButton onClick={isUserAuthenticated ? logOut : login}>
						<span className="font-bold">
							{isUserAuthenticated
								? reduceAddressCharacters(signer!.signerAddress, 16)
								: 'Connect Wallet'}{' '}
						</span>
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
};

export default NavigationBar;
