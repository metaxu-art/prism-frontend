import React, { useState } from 'react';
import PrimaryButton from '_atoms/buttons/Primary';
import SecondaryButton from '_atoms/buttons/Secondary';
import DropDownMenu from '_molecules/drop-down-menu/DropDownMenu';
import Inventories from '_molecules/inventories/Inventories';

import MetaverseCheckBoxes from '_molecules/MetaverseCheckBoxes';
import { Metaverse } from '_utils/enums/metaverse';
import { Inventory } from '_utils/interfaces/inventory';

type Props = {
	onInventoryToggled?: (index: number) => void;
	currentInventories?: Inventory[];
};

const EditNFTView: React.FC<Props> = ({ currentInventories, onInventoryToggled }) => {
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

	const onPublishButtonClicked = () => {
		if (!isNftReadyToPublish) setNftReadyToPublishStatus(true);
		else console.log(selectedMetaverses);
	};

	return (
		<div className="flex-1 h-full flex flex-col bg-white/80">
			<div className="w-full flex py-5 max-w-[700px] mx-auto 2xl:py-10 px-5">
				<div className="flex-1 px-5">
					<DropDownMenu>Project</DropDownMenu>
				</div>
				<div className="flex-1 px-5">
					<DropDownMenu>CYBERFREN #2536</DropDownMenu>
				</div>
			</div>
			<div className="bg-[#A100FF] pl-10 py-4">
				<span className="text-white text-xl 2xl:text-3xl font-bold">
					{isNftReadyToPublish ? 'PUBLISH TO METAVERSE' : 'INVENTORY'}
				</span>
			</div>

			<div className="w-full flex-1 overflow-y-auto p-10 2xl:p-14 max-w-[700px] mx-auto">
				{!isNftReadyToPublish && (
					<Inventories inventories={currentInventories} onInventoryToggled={onInventoryToggled} />
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
						<PrimaryButton onClick={() => setNftReadyToPublishStatus(false)} color="black">
							<p className="py-3 font-semibold text-xl">{'<<'}BACK TO EDIT</p>
						</PrimaryButton>
					</div>
				)}
				<div className="flex-1">
					<SecondaryButton
						isActive={!isNftReadyToPublish || selectedMetaverses.length !== 0}
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
