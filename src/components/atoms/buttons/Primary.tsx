import React from 'react';

type Props = {
	onClick?: () => void;
};

const PrimaryButton: React.FC<Props> = ({ onClick, children }) => {
	return (
		<button
			onClick={onClick}
			className="w-full border-2 border-white px-3 py-1 text-lg hover:opacity-50 transition ease-in text-white"
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
