import React from 'react';

type Props = {
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	value?: string;
};

const PrimaryTextArea: React.FC<Props> = ({ value, onChange, placeholder }) => {
	return (
		<textarea
			onChange={onChange}
			placeholder={placeholder}
			className="w-full border-2 placeholder:font-bold border-black rounded-lg px-3 py-3"
			cols={30}
			rows={5}
			value={value}
		/>
	);
};

export default PrimaryTextArea;
