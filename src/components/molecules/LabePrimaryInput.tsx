import React from 'react';
import PrimaryInput, { InputProps } from '_atoms/inputs/Primary';

type Props = InputProps & { label?: string };

const LabelPrimaryInput: React.FC<Props> = (props) => {
	const { label } = props;
	return (
		<>
			<p className="font-bold text-xl pb-1">{label}</p>
			<PrimaryInput {...props} />
		</>
	);
};

export default LabelPrimaryInput;
