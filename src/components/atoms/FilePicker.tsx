import React from 'react';
import { FiUpload } from 'react-icons/fi';
type Props = {
	accept?: string;
};

const FilePicker: React.FC<Props> = ({ accept }) => {
	return (
		<div className="relative w-full border-2 border-black rounded-lg px-3 py-3 cursor-pointer">
			<input
				type="file"
				className="bg-red-200 absolute top-0 bottom-0 left-0 right-0 cursor-pointer opacity-0"
			/>

			<FiUpload className="text-3xl mx-auto" />
		</div>
	);
};

export default FilePicker;
