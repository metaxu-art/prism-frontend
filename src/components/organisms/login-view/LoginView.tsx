import React, { useState } from 'react';
import { Token } from '_utils/interfaces/token';
import EditNFTView from './EditNFTView';
import NFTView from './NFTView';
// import abi from '../../../abi.json';
// import { ethers } from 'ethers';
// import config from '_utils/config/index';

// const provider = new ethers.providers.AlchemyProvider(
// 	`maticmum`,
// 	'Z3lPhWsTamnqsW-sxVTx20hmB_lXA2Cu',
// );

// const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
// const privateKey = '2164f3311f120743f8380f850c89386d8090901307f499d163592c175fe62875';
// const signer = new ethers.Wallet(privateKey);
// const signer = provider.getSigner();
// const contractWithSigner = new ethers.Contract(config.contractAddress, abi, signer);
// const callableContract = new ethers.Contract(config.contractAddress, abi, provider);

const LoginView = () => {
	const [selectedTraits, setSelectedTraits] = useState<Token[]>([]);

	const onTraitToggled = (trait: Token, checked: boolean) => {
		if (checked) setSelectedTraits((oldTraits) => [...oldTraits, trait]);
		else
			setSelectedTraits((oldTraits) =>
				oldTraits.filter((currentTrait) => currentTrait.tokenID !== trait.tokenID),
			);
	};

	const onUnselectedAllButtonClick = () => {
		setSelectedTraits([]);
	};

	const onTraitArrowUpClicked = (tokenId: number) => {
		const tempTraits = [...selectedTraits];
		const token = tempTraits.find((trait) => tokenId === trait.tokenID);
		if (token) {
			const index = tempTraits.indexOf(token);
			tempTraits.splice(index, 1);
			tempTraits.splice(index + 1, 0, token);
			setSelectedTraits(tempTraits);
		}
	};

	const onTraitArrowDownClicked = (tokenId: number) => {
		const tempTraits = [...selectedTraits];
		const token = tempTraits.find((trait) => tokenId === trait.tokenID);
		if (token) {
			const index = tempTraits.indexOf(token);
			if (index !== 0) {
				tempTraits.splice(index, 1);
				tempTraits.splice(index - 1, 0, token);
				setSelectedTraits(tempTraits);
			}
		}
	};

	return (
		<div className="w-full h-full flex">
			<NFTView selectedTraits={selectedTraits} />
			<EditNFTView
				onUnselectedButtonClick={onUnselectedAllButtonClick}
				onTraitToggled={onTraitToggled}
				selectedTraits={selectedTraits}
				setSelectedTraits={setSelectedTraits}
				onTraitArrowUpClicked={onTraitArrowUpClicked}
				onTraitArrowDownClicked={onTraitArrowDownClicked}
			/>
		</div>
	);
};

export default LoginView;
