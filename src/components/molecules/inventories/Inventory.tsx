import React, { useState } from 'react';
import CheckBox from '_atoms/CheckBox';

const Inventory = () => {
	const [isToggled, setToggle] = useState(false);

	return (
		<div className="flex items-center justify-between pb-5">
			<div className="w-20 h-20 border border-black"></div>
			<div>
				<span className="text-xl font-bold">WEAPON_1</span>
			</div>

			<div>
				<div className="bg-white border-2 border-black text-[#A100FF] font-semibold rounded px-1 py-2">
					#0,1 % have this tra..
				</div>
			</div>
			<div>
				<CheckBox isActive={isToggled} onClick={() => setToggle((s) => !s)} />
			</div>
		</div>
	);
};

export default Inventory;
