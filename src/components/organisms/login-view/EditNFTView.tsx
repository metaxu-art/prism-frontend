import React, { useState } from 'react';
import PrimaryButton from '_atoms/buttons/Primary';
import SecondaryButton from '_atoms/buttons/Secondary';
import DropDownMenu from '_molecules/drop-down-menu/DropDownMenu';
import Inventories from '_molecules/inventories/Inventories';
import MetaverseCheckBoxes from '_molecules/MetaverseCheckBoxes';

const metaverses = ['PFP', 'SANDBOX 3D Voxel', 'WWWEBB full body Sprite'];

const EditNFTView = () => {
	const [isNftReadyToPublish, setNftReadyToPublishStatus] = useState(false);
	const [selectedCheckBoxMetaverseIndex, setSelectedCheckBoxMetaverseIndex] = useState<number>(-1);

	return (
		<div className="flex-1 h-full flex flex-col bg-white/80">
			<div className="flex py-5 2xl:py-10 px-5">
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

			<div className="flex-1 overflow-y-auto p-10 2xl:p-14">
				{!isNftReadyToPublish && <Inventories />}
				{isNftReadyToPublish && (
					<MetaverseCheckBoxes
						metaverseNames={metaverses}
						currentCheckBoxIndex={selectedCheckBoxMetaverseIndex}
						setCurrentCheckBoxIndex={setSelectedCheckBoxMetaverseIndex}
					/>
				)}
			</div>

			<div className="flex px-10 pb-10">
				{isNftReadyToPublish && (
					<div className="flex-1 pr-10">
						<PrimaryButton onClick={() => setNftReadyToPublishStatus(false)} color="black">
							<p className="py-3 font-semibold text-xl">{'<<'}BACK TO EDIT</p>
						</PrimaryButton>
					</div>
				)}
				<div className="flex-1">
					<SecondaryButton
						isActive={!isNftReadyToPublish || selectedCheckBoxMetaverseIndex !== -1}
						onClick={() => {
							if (!isNftReadyToPublish) {
								setNftReadyToPublishStatus(true);
							} else {
								console.log(`SELECTED METAVERSE: ${metaverses[selectedCheckBoxMetaverseIndex]}`);
							}
						}}
					>
						<p className="py-3 text-2xl">Publish {'>>'}</p>
					</SecondaryButton>
				</div>
			</div>
		</div>
	);
};

export default EditNFTView;
