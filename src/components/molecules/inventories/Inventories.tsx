import React from 'react';
import Inventory from './Inventory';

const Inventories = () => {
	return (
		<>
			{[0, 1].map((id) => (
				<Inventory key={id} />
			))}
		</>
	);
};
export default Inventories;
