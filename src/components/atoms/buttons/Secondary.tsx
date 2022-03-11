import React from 'react';

type Props = {
	onClick?: () => void;
};

const SecondaryButton: React.FC<Props> = ({ children }) => {
	return (
		<button className="bg-black w-full px-3 py-1 text-lg hover:opacity-50 transition ease-in text-white">
			{children}
		</button>
	);
};

export default SecondaryButton;
