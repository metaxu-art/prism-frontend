const UserNotConnected = () => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(255,255,255,0.65)',
			}}
			className="w-full max-w-[800px] mx-auto bg-white text-center font-semibold border-2 border-[#B445D7] text-3xl py-16"
		>
			<span>No Wallet connected.</span> <br />
			<span>Please connect to Polygon Mumbai</span>
			<br />
			<span>to Proceed.</span>
		</div>
	);
};

export default UserNotConnected;
