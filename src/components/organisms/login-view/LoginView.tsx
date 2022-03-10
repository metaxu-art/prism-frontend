import React from 'react';
import EditNFTView from './EditNFTView';
import NFTView from './NFTView';

export const LoginView = () => {
	return (
		<div className="w-full h-full bg-red-200 flex">
			<NFTView />
			<EditNFTView />
		</div>
	);
};
