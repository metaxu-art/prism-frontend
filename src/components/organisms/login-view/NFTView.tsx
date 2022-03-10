import React from 'react';
import Image from 'next/image';
import CyberWalker from '_images/cyberskywalker-1.png';

const NFTView = () => {
	return (
		<div className="flex-1 flex flex-col bg-red-400">
			<div className="flex-1 flex justify-center items-center">
				<div className="p-4 bg-[#E6C5FA]">
					<div className="relative h-[500px] w-[500px] ">
						<Image objectFit="cover" layout="fill" src={CyberWalker} alt="Cyber Walker 1" />
					</div>
				</div>
			</div>
			<div>flex with titles</div>
			<div>List of tags</div>
		</div>
	);
};

export default NFTView;
