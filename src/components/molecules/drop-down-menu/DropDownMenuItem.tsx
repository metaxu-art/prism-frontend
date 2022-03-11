import React from 'react';

type Props = {
	onClick?: () => void;
};

const DropDownMenuItem: React.FC<Props> = ({ onClick, children }) => {
	return (
		<div onClick={onClick} className="p-2 cursor-pointer bg-white hover:bg-gray-200">
			<span>{children}</span>
		</div>
	);
};

export default DropDownMenuItem;
