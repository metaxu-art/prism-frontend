import React from 'react';
import Image from 'next/image';

const WaitingForWalletConnection = () => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(255,255,255,0.65)',
			}}
			className="w-full max-w-[800px] mx-auto bg-white text-center font-semibold border-2 border-[#B445D7] text-3xl py-16"
		>
			<Image src="/loading.svg" width={100} height={100} alt="Loading svg" />
			<br />
			<span>Connecting Your Wallet.</span>
		</div>
	);
};

export default WaitingForWalletConnection;
