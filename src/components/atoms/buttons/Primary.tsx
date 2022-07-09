import React from 'react';

type Props = {
	onClick?: () => void;
	isActive?: boolean;
};

const PrimaryButton: React.FC<Props> = ({ children, onClick, isActive = true }) => {
	return (
		<button
			onClick={isActive ? onClick : undefined}
			className={` outline-[#856ACB] outline outline-1 rounded-lg w-full px-3 py-2 text-lg hover:opacity-60 transition ease-in text-[#856ACB] ${
				isActive ? 'opacity-100' : 'opacity-50'
			} ${isActive ? 'cursor-pointer' : 'cursor-default'}`}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
