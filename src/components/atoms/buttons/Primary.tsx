import React from 'react';

type Props = {
	onClick?: () => void;
	isActive?: boolean;
};

const PrimaryButton: React.FC<Props> = ({ children, onClick, isActive = true }) => {
	return (
		<button
			onClick={isActive ? onClick : undefined}
			className={`bg-[#A100FF] rounded-lg w-full px-3 py-2 text-lg hover:opacity-60 transition ease-in text-white ${
				isActive ? 'opacity-100' : 'opacity-50'
			} ${isActive ? 'cursor-pointer' : 'cursor-default'}`}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
