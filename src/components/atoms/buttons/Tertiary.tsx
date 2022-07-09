import React from 'react';

type Props = {
	onClick?: () => void;
};

const TertiaryButton: React.FC<Props> = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`w-full border border-black shadow-lg px-3 py-3 text-lg hover:opacity-60 bg-white transition ease-in rounded-lg text-black`}
		>
			{children}
		</button>
	);
};
export default TertiaryButton;
