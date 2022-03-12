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
			<div className="relative w-20 h-20 border border-black">
				<Image src={inventory.image} alt={`Inventory ${inventory.name}: ${inventory.desc}`} />
			</div>
			<div>
				<span className="text-xl font-bold">{inventory.name}</span>
			</div>

			<div>
				<div className="bg-white border-2 border-black text-[#A100FF] font-semibold rounded px-1 py-2">
					{inventory.desc}
				</div>
			</div>
			<div>
				<CheckBox isActive={inventory.checked} onClick={onInventoryToggled} />
			</div>
		</div>
	);
};

export default Inventory;
