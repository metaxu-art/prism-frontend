import React from 'react';
import CheckBox, { CheckBoxProps } from '_atoms/CheckBox';

type Props = {} & CheckBoxProps;

const CheckBoxLabel: React.FC<Props> = (props) => {
	const { children } = props;
	return (
		<div className="flex items-center">
			<div className="pr-10">
				<CheckBox {...props} />
			</div>
			<label className="font-semibold text-2xl">{children}</label>
		</div>
	);
};

export default CheckBoxLabel;
