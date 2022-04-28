import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import BaseCenterModal from '_atoms/base-modals/CenterModal';
import PrimaryButton from '_atoms/buttons/Primary';
import { StoreContext } from '_utils/context-api/store-context';
import { useWeb3Modal } from '_utils/helpers/use-web3modal';

const NavigationBar = () => {
	const { login, logOut } = useWeb3Modal();
	const { isUserAuthenticated, signer } = useContext(StoreContext);
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (!signer) router.push('/');
		else setLoading(false);
	}, [signer]);

	const reduceAddressCharacters = (address: string, charachterAmount: number) => {
		const firstThreeChars = address.substring(0, charachterAmount / 2);
		const lastThree = address.substring(address.length - charachterAmount / 2, address.length);
		return `${firstThreeChars}...${lastThree}`;
	};

	return (
		<div className="w-full sticky top-0 z-10 py-4 2xl:py-8 border-b-[3px] border-white bg-black">
			<div className="flex items-center justify-between max-w-[1536px] mx-auto px-10 2xl:px-0">
				{/* <span className="text-3xl font-semibold text-white">PRISM</span> */}
				<Link href="/" passHref>
					<a>
						<span className="text-4xl font-semibold text-white">PRISM</span>
					</a>
				</Link>
				<div className="w-full max-w-[300px]">
					<PrimaryButton onClick={isUserAuthenticated ? logOut : login}>
						<p className="font-bold py-1">
							{isUserAuthenticated
								? reduceAddressCharacters(signer!.address, 16)
								: 'Connect Wallet'}{' '}
						</p>
					</PrimaryButton>
				</div>
			</div>
			<BaseCenterModal modalVisible={isLoading}>
				<div className="flex flex-col justify-start items-start">
					<div className="w-full pb-2">
						<img
							src="/loading-gif.gif"
							width={120}
							height={120}
							className="mx-auto"
							alt="Loading svg"
						/>
					</div>
					<div className="text-white text-2xl">Waiting for setup...</div>
				</div>
			</BaseCenterModal>
		</div>
	);
};

export default NavigationBar;
