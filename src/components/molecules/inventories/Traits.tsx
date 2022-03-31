import React from 'react';
import { Token } from '_utils/interfaces/token';
import Trait from './Trait';

type Props = {
	onTraitToggled?: (index: number) => void;
	traits?: Token[];
};

const Traits: React.FC<Props> = ({ onTraitToggled = () => {}, traits = [] }) => {
	return (
		<>
			{traits.map((trait, i) => (
				<Trait onTraitToggled={() => onTraitToggled(i)} key={i} trait={trait} />
			))}
		</>
	);
};
export default Traits;
