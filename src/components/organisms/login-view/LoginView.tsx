import React, { useState } from 'react';
import { Inventory } from '_utils/interfaces/inventory';
import EditNFTView from './EditNFTView';
import NFTView from './NFTView';
import blindfold from '_images/traits/blindfold.png';
import chain from '_images/traits/chain.png';
import clothing from '_images/traits/clothing.png';
import doubleKnife from '_images/traits/double_knife.png';
import glasses from '_images/traits/glasses.png';

const inventories: Inventory[] = [
	{
		checked: false,
		desc: '#0,1 % have this tra..',
		image: blindfold,
		name: 'Blindfold',
	},
	{
		checked: false,
		desc: '#0,1 % have this tra..',
		image: chain,
		name: 'Chain',
	},
	{
		checked: false,
		desc: '#0,1 % have this tra..',
		image: clothing,
		name: 'Clothing',
	},
	{
		checked: false,
		desc: '#0,1 % have this tra..',
		image: doubleKnife,
		name: 'Double Knife',
	},
	{
		checked: false,
		desc: '#0,1 % have this tra..',
		image: glasses,
		name: 'Glasses',
	},
];
export const LoginView = () => {
	const [currentInventories, setCurrentInventories] = useState<Inventory[]>([...inventories]);

	const onInventoryToggled = (index: number) => {
		console.log(index);
		setCurrentInventories((oldInventories) => {
			return oldInventories.map((oldInventory, oldInvetoryIndex) => {
				if (index === oldInvetoryIndex) {
					return {
						...oldInventory,
						checked: !oldInventory.checked,
					};
				}
				return { ...oldInventory };
			});
		});
	};
	return (
		<div className="w-full h-full flex">
			<NFTView selectedInvetories={currentInventories.filter((inv) => inv.checked)} />
			<EditNFTView
				onInventoryToggled={onInventoryToggled}
				currentInventories={currentInventories}
			/>
		</div>
	);
};
