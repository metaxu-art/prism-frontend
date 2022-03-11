import React from 'react';
import SecondaryButton from '_atoms/buttons/Secondary';
import DropDownMenu from '_molecules/DropDownMenu';

import Inventories from '_molecules/inventories/Inventories';
const EditNFTView = () => {
	return (
		<div className="flex-1 overflow-hidden flex flex-col h-100 bg-white/80">
			<div className="flex py-5 2xl:py-10 px-5">
				<div className="flex-1 px-5">
					<DropDownMenu>Project</DropDownMenu>
				</div>
				<div className="flex-1 px-5">
					<DropDownMenu>CYBERFREN #2536</DropDownMenu>
				</div>
			</div>
			<div className="bg-[#A100FF] pl-10 py-4">
				<span className="text-white text-xl 2xl:text-3xl font-bold">INVENTORY</span>
			</div>

			<div className="flex-1 overflow-hidden">
				<div className="h-full max-h-[800px] overflow-y-auto p-10 2xl:p-14">
					<Inventories />
				</div>
			</div>

			<div className="w-full px-10 pb-10">
				<SecondaryButton>
					<p className="py-3 text-2xl">Publish {'>>'}</p>
				</SecondaryButton>
			</div>
		</div>
	);
};

export default EditNFTView;
