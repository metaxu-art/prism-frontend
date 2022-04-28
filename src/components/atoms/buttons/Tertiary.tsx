import React from 'react';

type Props = {
	onClick?: () => void;
};

const TertiaryButton: React.FC<Props> = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`w-full border border-black px-3 py-3 text-lg hover:opacity-60 transition ease-in rounded-lg text-black`}
		>
			{children}
		</button>
	);
};
export default TertiaryButton;
