import React from 'react';
import Image from 'next/image';

import { Inventory } from '_utils/interfaces/inventory';

type Props = { selectedInvetories?: Inventory[] };

const NFTView: React.FC<Props> = ({ selectedInvetories = [] }) => {
	return (
		<div className="flex-1 flex flex-col">
			<div className="flex-1 flex justify-center items-center">
				<div className="p-4 bg-[#E6C5FA] my-4">
					<div className="relative w-[300px] h-[300px] 2xl:w-[500px] 2xl:h-[500px] bg-black">
						{/* <Image objectFit="cover" layout="fill" src={CyberWalker} alt="Cyber Walker 1" /> */}
						{selectedInvetories.map((invetory, i) => {
							return (
								<div className="absolute top-0 right-0 left-0 bottom-0" key={i}>
									<Image src={invetory.image} alt={`Invetory ${invetory.name} Image`} />
								</div>
							);
						})}
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
			<div className="flex flex-wrap p-5 pt-8 justify-center lg:justify-start min-h-[20px]">
				{selectedInvetories.map(({ name }, i) => {
					return (
						<div key={i} className="pr-4 pb-6">
							<span className="bg-[#E6C5FA] px-3 py-1 rounded font-semibold text-sm">{name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default NFTView;
