import React from 'react';
import { Token } from '_utils/interfaces/token';
import Trait from './Trait';

type Props = {
	onTraitToggled?: (trait: Token, checked: boolean) => void;
	traits?: Token[];
	selectedTraitIds?: number[];
};

const Traits: React.FC<Props> = ({
	onTraitToggled = () => {},
	traits = [],
	selectedTraitIds = [],
}) => {
	return (
		<>
			{traits.map((trait, i) => {
				const checked = selectedTraitIds.includes(trait.tokenID);
				return (
					<Trait
						onTraitToggled={() => onTraitToggled(trait, !checked)}
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
