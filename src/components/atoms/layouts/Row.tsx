import React from 'react';

const Row: React.FC<{ hasBottomBorder?: boolean; hasTopBorder?: boolean }> = ({
	children,
	hasBottomBorder,
	hasTopBorder,
}) => {
	return (
		<div
			className={`py-3 pb-2 ${hasBottomBorder && 'border-b-2'} ${
				hasTopBorder && 'border-t-2'
			} border-black `}
		>
			<div className="flex items-center max-w-[1536px] mx-auto px-10 2xl:px-0">{children}</div>
		</div>
	);
};

export default Row;
