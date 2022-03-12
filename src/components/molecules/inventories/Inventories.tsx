import React from 'react';
import { Inventory as InventoryInterface } from '_utils/interfaces/inventory';
import Inventory from './Inventory';

type Props = {
	onInventoryToggled?: (index: number) => void;
	inventories?: InventoryInterface[];
};

const Inventories: React.FC<Props> = ({ onInventoryToggled = () => {}, inventories = [] }) => {
	return (
		<>
			{inventories.map((inventory, i) => (
				<Inventory onInventoryToggled={() => onInventoryToggled(i)} key={i} inventory={inventory} />
			))}

			{/* {[0, 7].map((id) => (
				<Inventory key={id} />
			))} */}
		</>
	);
};
export default Inventories;
