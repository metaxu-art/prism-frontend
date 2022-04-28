import React from 'react';

export type InputProps = {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
};

const PrimaryInput: React.FC<InputProps> = ({ onChange, value, type = 'text', placeholder }) => {
	return (
		<input
			className="w-full border-2 border-black rounded-lg px-3 py-3 placeholder:font-bold"
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			value={value}
		/>
	);
};
export default PrimaryInput;
