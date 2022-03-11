import React from 'react';
import CheckBoxLabel from '_molecules/CheckBoxLabel';

type Props = {
	metaverseNames?: string[];
	setCurrentCheckBoxIndex?: (i: number) => void;
	currentCheckBoxIndex?: number;
};

const MetaverseCheckBoxes: React.FC<Props> = ({
	metaverseNames = [],
	setCurrentCheckBoxIndex = () => {},
	currentCheckBoxIndex,
}) => {
	return (
		<div>
			{metaverseNames.map((metaverseName, i) => {
				let bottomPadding = i !== metaverseNames.length ? 'pb-10' : 'pb-0';
				return (
					<div key={i} className={`${bottomPadding}`}>
						<CheckBoxLabel
							onClick={() => {
								setCurrentCheckBoxIndex(i);
							}}
							isActive={currentCheckBoxIndex === i}
						>
							{metaverseName}
						</CheckBoxLabel>
					</div>
				);
			})}
		</div>
	);
};

export default MetaverseCheckBoxes;
