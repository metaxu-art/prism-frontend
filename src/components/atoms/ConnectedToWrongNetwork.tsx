import React from 'react';

const ConnectedToWrongNetwork = () => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(255,255,255,0.65)',
			}}
			className="w-full max-w-[800px] mx-auto bg-white text-center font-semibold border-2 border-[#B445D7] text-3xl py-16"
		>
			<span>Wrong Network.</span> <br />
			<span>Please connect to Polygon Mainnet.</span>
		</div>
	);
};

export default ConnectedToWrongNetwork;
