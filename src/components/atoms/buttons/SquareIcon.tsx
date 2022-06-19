import React from 'react';
import { ReactNode } from 'react';

type Props = { icon: ReactNode; backgroundColor: 'red' | 'purple'; onClick?: () => void };

const SquareIconButton: React.FC<Props> = ({ icon, backgroundColor = 'red', onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`p-3 font-bold ${backgroundColor === 'red' && 'bg-[#FF0000]'} ${
				backgroundColor === 'purple' && 'bg-[#A100FF]'
			}  rounded-md text-white`}
		>
			{icon}
		</button>
	);
};

export default SquareIconButton;
