import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BaseCenterModal from '_atoms/base-modals/CenterModal';
// import { ethers } from 'ethers';
import SecondaryButton from '_atoms/buttons/Secondary';
// import DropDownMenu from '_molecules/drop-down-menu/DropDownMenu';
import Traits from '_molecules/inventories/Traits';
import MetaverseCheckBoxes from '_molecules/MetaverseCheckBoxes';
import { Metaverse } from '_utils/enums/metaverse';
import { Token } from '_utils/interfaces/token';
import TertiaryButton from '_atoms/buttons/Tertiary';
// import config from '_utils/config/index';
// import abi from '../../../abi.json';

type Props = {
	onTraitToggled?: (trait: Token, checked: boolean) => void;
	setSelectedTraits?: React.Dispatch<React.SetStateAction<Token[]>>;
	selectedTraits?: Token[];
	onUnselectedButtonClick?: () => void;
	onTraitArrowUpClicked?: (tokenId: number) => void;
	onTraitArrowDownClicked?: (tokenId: number) => void;
};

const EditNFTView: React.FC<Props> = ({
	onTraitToggled,
	onUnselectedButtonClick,
	setSelectedTraits = () => {},
	selectedTraits = [],
	onTraitArrowUpClicked,
	onTraitArrowDownClicked,
}) => {
	const [allTokens, setAllTokens] = useState<Token[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingText, setLoadingText] = useState('Loading traits...');
	const [isNftReadyToPublish, setNftReadyToPublishStatus] = useState(false);
	const [selectedMetaverses, setSelectedCheckBoxMetaverses] = useState<Metaverse[]>([]);
	const [masterUrl, setMasterUrl] = useState<string>('');
	const [isMasterUrlModalVisible, setMasterUrlVisibility] = useState(false);

	const onMetaverseCheckboxToggled = (metaverse: Metaverse, checked: boolean) => {
		if (checked) {
			//add metaverse
			const metas = [...selectedMetaverses];
			metas.push(metaverse);
			setSelectedCheckBoxMetaverses(metas);
		} else {
			//remove metaverse
			setSelectedCheckBoxMetaverses((oldMetaverses) => {
				return oldMetaverses.filter((oldMetaverse) => oldMetaverse !== metaverse);
			});
		}
	};

	const onPublishButtonClicked = async () => {
		if (!isNftReadyToPublish) setNftReadyToPublishStatus(true);
		else {
			//Publish only to PFP
			const selectedTraitIds = selectedTraits.map((token) => token.tokenID);

			setLoadingText('Composing and uploading your NFT to IPFS...');
			setLoading(true);

			let res;
			try {
				res = await axios.patch('/token', {
					traitIds: selectedTraitIds,
					masterId: '42',
				});
				// https://gateway.pinata.cloud/ipfs/QmUg2GZk6qBbjMPbtkS2KmNspgUQCJ4smr1whZJCMGFmGP
			} catch (e) {
				console.error(e);
			}

			if (res?.data) {
				setMasterUrl('https://gateway.pinata.cloud/ipfs/' + res.data.fileInfo.IpfsHash);
				setMasterUrlVisibility(true);
			}
			setLoading(false);

			// const contract = new ethers.Contract(config.contractAddress, abi, signer?.jsonRpcSigner);
			// try {
			// 	const tx = await contract.editMaster(1, selectedTraitIds);
			// 	await tx.wait();
			// 	setNftReadyToPublishStatus(false);
			// } catch (e) {
			// 	console.error(e);
			// }
			// console.log(selectedMetaverses);
		}
	};

	const fetchAllTokens = async () => {
		const selectedTokensList: number[] = [];

		let res;

		try {
			res = await axios.get('/tokens/traits');
		} catch (e) {
			console.error(e);
		}

		if (res?.data) {
			const filteredTokens = res.data.tokens.filter((token: Token) =>
				selectedTokensList.includes(token.tokenID),
			);
			setLoading(false);
			setAllTokens(res.data.tokens);
			setSelectedTraits(filteredTokens);
		}
	};

	const componentDidMount = () => {
		fetchAllTokens();
	};

	useEffect(componentDidMount, []);

	return (
		<div className="flex-1 h-full flex flex-col bg-white/80">
			{/* <div className="w-full flex py-5 max-w-[700px] mx-auto 2xl:py-10 px-5">
				<div className="flex-1 px-5">
					<DropDownMenu>Project</DropDownMenu>
				</div>
				<div className="flex-1 px-5">
					<DropDownMenu>CYBERFREN #2536</DropDownMenu>
				</div>
			</div> */}

			<div className="bg-[#A100FF] pl-10 py-4">
				<span className="text-white text-xl 2xl:text-3xl font-bold">
					{isNftReadyToPublish ? 'PUBLISH TO METAVERSE' : 'INVENTORY'}
				</span>
			</div>
			{!isNftReadyToPublish && (
				<div className="w-full flex justify-end max-w-[700px] mx-auto py-4">
					<button
						disabled={selectedTraits.length === 0}
						onClick={onUnselectedButtonClick}
						className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition ease-in"
					>
						Unselect all
					</button>
				</div>
			)}

			<div className="w-full flex-1 overflow-y-auto p-10 2xl:p-14 max-w-[700px] mx-auto mb-4">
				{!isNftReadyToPublish && (
					<Traits
						traits={allTokens}
						onTraitToggled={onTraitToggled}
						selectedTraitIds={selectedTraits.map((trait) => trait.tokenID)}
						onTraitArrowDownClick={onTraitArrowDownClicked}
						onTraitArrowUpClicked={onTraitArrowUpClicked}
					/>
				)}
				{isNftReadyToPublish && (
					<MetaverseCheckBoxes
						currentSelectedMetaverses={selectedMetaverses}
						onMetaverseCheckboxToggled={onMetaverseCheckboxToggled}
					/>
				)}
			</div>

			<div className="w-full flex px-10 pb-10 max-w-[700px] mx-auto">
				{isNftReadyToPublish && (
					<div className="flex-1 pr-10">
						<SecondaryButton onClick={() => setNftReadyToPublishStatus(false)} color="black">
							<p className="py-3 font-semibold text-xl">{'<<'}BACK TO EDIT</p>
						</SecondaryButton>
					</div>
				)}
				<div className="flex-1">
					<TertiaryButton
						// isActive={!isNftReadyToPublish || selectedMetaverses.length !== 0}
						onClick={onPublishButtonClicked}
					>
						<p className="py-3 text-2xl">Publish {'>>'}</p>
					</TertiaryButton>
				</div>
			</div>
			<BaseCenterModal modalVisible={loading}>
				<div className="text-center">
					<div className="pb-2">
						<img src="/loading-gif.gif" width={150} height={150} alt="Loading svg" />
					</div>
					<div className="text-white text-2xl">{loadingText}</div>
				</div>
			</BaseCenterModal>

			<BaseCenterModal
				modalVisible={isMasterUrlModalVisible}
				handleGreyAreaClick={() => setMasterUrlVisibility(false)}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					style={{
						backgroundColor: 'rgba(255,255,255,0.65)',
					}}
					className="w-full max-w-[1200px] mx-auto bg-white text-center font-semibold border-2 border-[#B445D7] text-3xl py-16 px-20"
				>
					<div className="pb-2 font-bold text-3xl">
						Congrats Champ! You have successfully created your on NFT! 🎉🥳
					</div>
					<a
						className="text-2xl hover:text-blue-800 hover:underline transition ease-in-out"
						href={masterUrl}
						target="__blank"
					>
						{masterUrl}
					</a>
				</div>
			</BaseCenterModal>
		</div>
	);
};

export default EditNFTView;
