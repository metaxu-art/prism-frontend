import React from 'react';
import Image from 'next/image';
import CheckBox from '_atoms/CheckBox';
import { Inventory } from '_utils/interfaces/inventory';

type Props = {
	inventory: Inventory;
	onInventoryToggled?: () => void;
};

const Inventory: React.FC<Props> = ({ inventory, onInventoryToggled = () => {} }) => {
	return (
		<div className="flex items-center justify-between pb-5">
			<div className="flex-1 flex items-center">
				<div className="relative w-20 h-20 border border-black">
					<Image src={inventory.image} alt={`Inventory ${inventory.name}: ${inventory.desc}`} />
				</div>
				<div className="pl-5">
					<span className="text-xl font-bold">{inventory.name}</span>
				</div>
			</div>

			<div className="flex-1 flex items-center justify-between">
				<div className="pr-10 max-w-[210px]">
					<div className="bg-white border-2 border-black text-[#A100FF] font-semibold rounded px-1 py-2 overflow-hidden text-ellipsis whitespace-nowrap">
						{inventory.desc}
					</div>
				</div>

				<div>
					<CheckBox isActive={inventory.checked} onClick={onInventoryToggled} />
				</div>
			</div>
		</div>
	);
};

export default Inventory;
