import React from 'react';

import Inventory from './Inventory';

const Inventories = () => {
	return (
		<>
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((id) => (
				<Inventory key={id} />
			))}

			{/* {[0, 7].map((id) => (
				<Inventory key={id} />
			))} */}
		</>
	);
};
export default Inventories;
