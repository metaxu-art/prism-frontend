import React from 'react';
import PrimaryInput, { InputProps } from '_atoms/inputs/Primary';

type Props = InputProps & { label?: string };

const LabelPrimaryInput: React.FC<Props> = (props) => {
	const { label } = props;
	return (
		<>
			<p className=" text-l pb-2 text-white text-opacity-100">{label}</p>
			<PrimaryInput {...props} />
		</>
	);
};

export default LabelPrimaryInput;
