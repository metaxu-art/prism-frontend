type Props = {
	isCenter?: boolean;
};

export const RowItem: React.FC<Props> = ({ children, isCenter = false }) => {
	return (
		<div className={`flex-1 w-1/5 max-w-[300px] pr-6 ${isCenter && 'flex justify-center'}`}>
			{children}
		</div>
	);
};

export const RowItemElipsisText: React.FC<{ textSize?: 'xs' | 'lg' | 'xl' }> = ({
	children,
	textSize = 'xl',
}) => {
	let fontSize = 'text-lg';
	if (textSize === 'lg') fontSize = 'text-2xl';
	else if (textSize === 'xl') fontSize = 'text-3xl';

	return (
		<RowItem>
			<p className={`overflow-hidden whitespace-nowrap text-ellipsis font-semibold ${fontSize}`}>
				{children}
			</p>
		</RowItem>
	);
};
