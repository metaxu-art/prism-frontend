import React from 'react';

const WaitingForWalletConnection = () => {
	return (
		<div className="w-full max-w-[600px] mx-auto bg-white py-16 px-10 rounded-lg flex flex-col items-center">
			<img src="/loading-gif.gif" width={100} height={100} alt="Loading svg" />

			<span className="text-2xl font-bold text-center">Connecting your wallet to Prism...</span>
		</div>
	);
};

export default WaitingForWalletConnection;
