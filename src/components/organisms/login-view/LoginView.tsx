import React, { useState, useEffect } from 'react';
import { Token } from '_utils/interfaces/token';
import EditNFTView from './EditNFTView';
import NFTView from './NFTView';
import abi from '../../../abi.json';
import axios from 'axios';
import { ethers } from 'ethers';
import config from '_utils/config/index';

// const provider = new ethers.providers.AlchemyProvider(
// 	`maticmum`,
// 	'Z3lPhWsTamnqsW-sxVTx20hmB_lXA2Cu',
// );

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

const contract = new ethers.Contract(config.contractAddress, abi, provider);

const LoginView = () => {
	const [allTokens, setAllTokens] = useState<Token[]>([]);

	const onTraitToggled = (index: number) => {
		setAllTokens((oldTraits) =>
			oldTraits.map((oldTrait, oldInvetoryIndex) => {
				if (index === oldInvetoryIndex) {
					return {
						...oldTrait,
						checked: !oldTrait.checked,
					};
				}
				return { ...oldTrait };
			}),
		);
	};

	const onUnselectedAllButtonClick = () => {
		setAllTokens((allTokens) => {
			return allTokens.map((token) => {
				token.checked = false;
				return token;
			});
		});
	};

	const componentDidMount = async () => {
		// const tokens = await contract.viewTokensOfAddress('0xedf4AaA709F12e67AC5834c70c5Fafc00Bc12bb3');]
		// const tokens = await contract.masterToTraits('0xedf4AaA709F12e67AC5834c70c5Fafc00Bc12bb3');
		const selectedTokensList = [1, 10, 11];

		let allTokens;

		try {
			allTokens = await axios.get('/tokens');
		} catch (e) {
			console.error(e);
		}

		if (allTokens?.data) {
			console.log('allTokens.data.tokens', allTokens.data.tokens);
			const tokens = allTokens.data.tokens.map((token: any) => {
				return {
					...token,
					checked: selectedTokensList.includes(token.tokenID),
				};
			});
			setAllTokens(tokens);
		}

		// console.log('tokens', tokens);
		// const tokens = await contract.addressToToken('0xedf4AaA709F12e67AC5834c70c5Fafc00Bc12bb3', 0);
		// console.log('tokens', tokens);
		// const tokens: Token[] = [
		// 	{
		// 		attributes: ['', ''],
		// 		checked: false,
		// 		imageURI: '',
		// 		isTraid: true,
		// 		name: 'IDK',
		// 		tag: 'some_tag',
		// 	},
		// ];
		// console.log('tokens', tokens);
	};

	useEffect(() => {
		componentDidMount();
	}, []);

	const checkedTokens = allTokens.filter((token) => token.checked);

	return (
		<div className="w-full h-full flex">
			<NFTView selectedTraits={checkedTokens} />
			<EditNFTView
				onUnselectedButtonClick={onUnselectedAllButtonClick}
				allTokens={allTokens}
				onTraitToggled={onTraitToggled}
			/>
		</div>
	);
};

export default LoginView;
