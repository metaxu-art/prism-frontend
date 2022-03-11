import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Props = {};

const DropDownMenu: React.FC<Props> = ({ children }) => {
	return (
		<div className="bg-white border border-black px-10 py-4 font-semibold text-lg flex items-center justify-between cursor-pointer">
			<span className="whitespace-nowrap">{children}</span>
			<FiChevronDown className="text-3xl" />
		</div>
	);
};

export default DropDownMenu;
