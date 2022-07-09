import React from 'react';

export type InputProps = {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
	name?: string;
	tabIndex?: number;
	id?: string;
};

const PrimaryInput: React.FC<InputProps> = ({
	onChange,
	value,
	type = 'text',
	placeholder,
	name,
	tabIndex,
	id,
}) => {
	return (
		<input
			id={id}
			tabIndex={tabIndex}
			name={name}
			className="w-full border border-white rounded-lg px-3 py-3 bg-inherit"
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			value={value}
		/>
	);
};
export default PrimaryInput;
