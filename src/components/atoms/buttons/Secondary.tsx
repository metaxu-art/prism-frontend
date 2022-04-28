import React from 'react';

type Props = {
	onClick?: () => void;
	color?: 'black' | 'white';
};

const SecondaryButton: React.FC<Props> = ({ onClick, children, color = 'white' }) => {
	let style = 'border-white text-white';
	if (color === 'black') style = 'border-black text-black';
	return (
		<button
			onClick={onClick}
			className={`w-full border px-3 py-3 text-lg hover:opacity-60 transition ease-in ${style} rounded-lg`}
		>
			{children}
		</button>
	);
};

export default SecondaryButton;
