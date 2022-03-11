import React from 'react';

type Props = {
	onClick?: () => void;
	color?: 'black' | 'white';
};

const PrimaryButton: React.FC<Props> = ({ onClick, children, color = 'white' }) => {
	let style = 'border-white text-white';
	if (color === 'black') style = 'border-black text-black';
	return (
		<button
			onClick={onClick}
			className={`w-full border-2 px-3 py-1 text-lg hover:opacity-50 transition ease-in ${style}`}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
