import React from 'react';
import Image from 'next/image';
import CyberWalker from '_images/cyberskywalker-1.png';

const NFTView = () => {
	return (
		<div className="flex-1 flex flex-col 2xl:border-white 2xl:border-l-4 ">
			<div className="flex-1 flex justify-center items-center">
				<div className="p-4 bg-[#E6C5FA] my-4">
					<div className="relative w-[300px] h-[300px] 2xl:w-[500px] 2xl:h-[500px]">
						<Image objectFit="cover" layout="fill" src={CyberWalker} alt="Cyber Walker 1" />
					</div>
				</div>
			</div>
			<div className="flex font-semibold text-xl 2xl:text-3xl text-center bg-[#E6C5FA] py-5">
				<div className="flex-1 py-2 border-r-[3px] border-white">
					{/* <p>CYBERFRENS</p> */}
					<span>CYBERFREN #2536</span>
				</div>
				<div className="flex-1 py-2">
					<span>CURRENT RANK: #11</span>
				</div>
			</div>
			<div className="flex flex-wrap p-5 pt-8 justify-center lg:justify-start">
				{[0, 1, 2, 3, 4, 5, 6].map((id) => {
					return (
						<div key={id} className="pr-4 pb-6">
							<span className="bg-[#E6C5FA] px-3 py-1 rounded font-semibold text-sm">
								Cyberglasses
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default NFTView;
