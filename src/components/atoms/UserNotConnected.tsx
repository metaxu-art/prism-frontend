import Image from 'next/image';

const UserNotConnected = () => {
	return (
		<div className="w-full max-w-[600px] mx-auto bg-white py-16 px-10 rounded-lg flex flex-col items-center">
			<div className="relative w-[250px] h-[205px] rounded-lg overflow-hidden bg-red-200 mb-8">
				<Image src="/images/prism.png" alt="Prism logo" layout="fill" />
			</div>
			<span className="text-2xl font-bold text-center text-[#222222]">
				Connect to Polygon network.
			</span>
		</div>
	);
};

export default UserNotConnected;
