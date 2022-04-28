import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
const ConnectedToWrongNetwork = () => {
	return (
		<div className="w-full max-w-[600px] mx-auto bg-white py-16 px-10 rounded-lg flex flex-col items-center">
			<FiAlertCircle className="text-7xl" stroke="#E15B64" />
			<span className="text-2xl font-bold text-center">
				Wrong network detected. Please switch your network to Polygon.
			</span>
		</div>
	);
};

export default ConnectedToWrongNetwork;
