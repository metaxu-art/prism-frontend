import { ethers } from 'ethers';
import React, { useContext, useState } from 'react';

import PrimaryButton from '_atoms/buttons/Primary';
import SecondaryButton from '_atoms/buttons/Secondary';
// import DropDownMenu from '_molecules/drop-down-menu/DropDownMenu';
import Traits from '_molecules/inventories/Traits';
import MetaverseCheckBoxes from '_molecules/MetaverseCheckBoxes';
import { StoreContext } from '_utils/context-api/store-context';
import { Metaverse } from '_utils/enums/metaverse';
import { Token } from '_utils/interfaces/token';
import config from '_utils/config/index';
import abi from '../../../abi.json';
type Props = {
	onTraitToggled?: (index: number) => void;
	onUnselectedButtonClick?: () => void;
	allTokens?: Token[];
};

const EditNFTView: React.FC<Props> = ({
	allTokens = [],
	onTraitToggled,
	onUnselectedButtonClick,
}) => {
	const { signer } = useContext(StoreContext);
	const [isNftReadyToPublish, setNftReadyToPublishStatus] = useState(false);
	const [selectedMetaverses, setSelectedCheckBoxMetaverses] = useState<Metaverse[]>([]);

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
			const selectedTraitIds = allTokens
				.filter((token) => token.checked)
				.map((token) => token.tokenID);

			console.log('selectedTraitIds', selectedTraitIds);
			const contract = new ethers.Contract(config.contractAddress, abi, signer?.jsonRpcSigner);
			try {
				const tx = await contract.editMaster(1, selectedTraitIds);
				await tx.wait();
				setNftReadyToPublishStatus(false);
			} catch (e) {
				console.error(e);
			}

			// console.log(selectedMetaverses);
		}
	};

	const isSomeCheckboxesChecked = allTokens.some((token) => token.checked);

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
						disabled={!isSomeCheckboxesChecked}
						onClick={onUnselectedButtonClick}
						className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow transition ease-in"
					>
						Unselect all
					</button>
				</div>
			)}

			<div className="w-full flex-1 overflow-y-auto p-10 2xl:p-14 max-w-[700px] mx-auto">
				{!isNftReadyToPublish && <Traits traits={allTokens} onTraitToggled={onTraitToggled} />}
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
						<PrimaryButton onClick={() => setNftReadyToPublishStatus(false)} color="black">
							<p className="py-3 font-semibold text-xl">{'<<'}BACK TO EDIT</p>
						</PrimaryButton>
					</div>
				)}
				<div className="flex-1">
					<SecondaryButton
						// isActive={!isNftReadyToPublish || selectedMetaverses.length !== 0}
						onClick={onPublishButtonClicked}
					>
						<p className="py-3 text-2xl">Publish {'>>'}</p>
					</SecondaryButton>
				</div>
			</div>
		</div>
	);
};

export default EditNFTView;
