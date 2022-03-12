import React from 'react';
import CheckBoxLabel from '_molecules/CheckBoxLabel';
import { Metaverse, metaverseValues } from '_utils/enums/metaverse';

type Props = {
	onMetaverseCheckboxToggled?: (metaverse: Metaverse, b: boolean) => void;
	currentSelectedMetaverses?: Metaverse[];
};

const MetaverseCheckBoxes: React.FC<Props> = ({
	onMetaverseCheckboxToggled = () => {},
	currentSelectedMetaverses = [],
}) => {
	return (
		<div>
			{metaverseValues.map((metaverseValue, i) => {
				const bottomPadding = i !== metaverseValues.length ? 'pb-10' : 'pb-0';
				const isActive = currentSelectedMetaverses.includes(metaverseValue);
				return (
					<div key={i} className={`${bottomPadding}`}>
						<CheckBoxLabel
							onClick={() => {
								onMetaverseCheckboxToggled(metaverseValue, !isActive);
							}}
							isActive={isActive}
						>
							{metaverseValue}
						</CheckBoxLabel>
					</div>
				);
			})}
		</div>
	);
};

export default MetaverseCheckBoxes;
