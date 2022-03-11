import React from 'react';

type Props = {
	onClick?: () => void;
	isActive?: boolean;
};

const SecondaryButton: React.FC<Props> = ({ children, onClick, isActive = true }) => {
	return (
		<button
			onClick={isActive ? onClick : undefined}
			className={`bg-black w-full px-3 py-1 text-lg hover:opacity-50 transition ease-in text-white ${
				isActive ? 'opacity-100' : 'opacity-50'
			} ${isActive ? 'cursor-pointer' : 'cursor-default'}`}
		>
			{children}
		</button>
	);
};

export default SecondaryButton;
