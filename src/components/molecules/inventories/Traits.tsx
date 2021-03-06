import React from 'react';
import { Token } from '_utils/interfaces/token';
import Trait from './Trait';

type Props = {
	onTraitToggled?: (trait: Token, checked: boolean) => void;
	traits?: Token[];
	selectedTraitIds?: number[];
	onTraitArrowUpClicked?: (tokenId: number) => void;
	onTraitArrowDownClick?: (tokenId: number) => void;
};

const Traits: React.FC<Props> = ({
	onTraitToggled = () => {},
	traits = [],
	selectedTraitIds = [],
	onTraitArrowUpClicked = () => {},
	onTraitArrowDownClick = () => {},
}) => {
	return (
		<>
			{traits.map((trait, i) => {
				const checked = selectedTraitIds.includes(trait.id);
				return (
					<Trait
						onTraitToggled={() => onTraitToggled(trait, !checked)}
						onArrowUpClick={() => onTraitArrowUpClicked(trait.id)}
						onArrowDownClick={() => onTraitArrowDownClick(trait.id)}
						key={i}
						trait={trait}
						checked={checked}
					/>
				);
			})}
		</>
	);
};
export default Traits;
