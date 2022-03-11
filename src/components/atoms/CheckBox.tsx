import React from 'react';
import { FiX } from 'react-icons/fi';

export type CheckBoxProps = {
	isActive?: boolean;
	onClick?: () => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ isActive, onClick }) => {
	return (
		<div onClick={onClick} className="w-11 h-11 border-2 border-black cursor-pointer rounded">
			{isActive && <FiX className="w-full h-full stroke-[#A100FF]" />}
		</div>
	);
};

export default CheckBox;
