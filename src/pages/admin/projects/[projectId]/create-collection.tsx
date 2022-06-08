import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import PrimaryButton from '_atoms/buttons/Primary';
import LabelPrimaryInput from '_molecules/LabePrimaryInput';

import { StoreContext } from '_utils/context-api/store-context';
import { useRouter } from 'next/router';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import DropDownMenu from '_molecules/drop-down-menu/DropDownMenu';
import { CollectionType, DropdownValue } from '_utils/models/dropdown-value';
import { AssetType } from '_utils/enums/asset-type';
import PrimaryTextArea from '_atoms/PrimaryTextArea';

const collectionDropDownValues = [
	new CollectionType(AssetType.Trait, 'Trait'),
	new CollectionType(AssetType.Standard, 'Other'),
	new CollectionType(AssetType.Master, 'Master'),
];

const CreateCollectionPage = () => {
	const router = useRouter();
	const { query } = router;
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('Collection name');
	const [royalties, setRoyalties] = useState('100000000');
	const [maxInvocations, setMaxInvocations] = useState('100');
	const [manager, setManager] = useState('');
	const [desc, setDesc] = useState(
		'CyberFrens is a multiverse Project exploring the intersection and capibilities of NFTs accross different virtual worlds.',
	);
	const [selectedCollectionType, setSelectedCollectionType] = useState<DropdownValue>(
		collectionDropDownValues[0],
	);
	const [isLoading, setLoadingStatus] = useState(false);

	const createCollection = async () => {
		setLoadingStatus(true);

		let receipt;
		try {
			const tx = await signer?.projectContract.createCollection(
				name,
				desc,
				maxInvocations,
				query.projectId,
				manager || signer.address,
				selectedCollectionType.id,
				royalties,
			);
			receipt = await tx.wait();
		} catch (e) {
			console.error('creating collection failed', e);
		}
		if (receipt) {
			router.push(`/admin/projects/${query.projectId}`);
		}
		setLoadingStatus(false);
	};

	const btnIsActive =
		name.trim().length !== 0 && royalties.trim().length !== 0 && maxInvocations.trim().length !== 0;

	return (
		<div className="w-full h-full overflow-auto">
			<Head>
				<title>Prism | Create Collection</title>
			</Head>
			<NavigationBar />

			<div className="mb-16">
				<AdminNavigationbar
					title="Create Collection"
					backLinkText={`PROJECT	#${query.projectId}`}
					backLinkHref={`/admin/projects/${query.projectId}`}
				/>
			</div>

			<div className="w-full max-w-[1536px] mx-auto px-10 2xl:px-0">
				<div className="w-full max-w-[700px]">
					<div className="pb-7">
						<LabelPrimaryInput
							value={name}
							label="Collection Name"
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g. Collection X"
						/>
					</div>
					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Project Description</p>
						<PrimaryTextArea
							onChange={(e) => setDesc(e.target.value)}
							placeholder="CyberFrens is a multiverse Project exploring the intersection and
							capibilities of NFTs accross different virtual worlds."
							value={desc}
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={royalties}
							type="number"
							label="Royalties"
							onChange={(e) => setRoyalties(e.target.value)}
							placeholder="Value in wei"
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={maxInvocations}
							onChange={(e) => setMaxInvocations(e.target.value)}
							type="number"
							label="Maximum Collection Size"
							placeholder="e.g. 100"
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={manager}
							onChange={(e) => setManager(e.target.value)}
							label="Collaborator"
							placeholder="e.g. 0xaF33...C1f (optional)"
						/>
						<span className="text-sm font-bold text-red-600">
							If you leave this input field empty by default you will be the collaborator
						</span>
					</div>

					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Collection Type</p>
						<DropDownMenu
							selectedDropDownValue={selectedCollectionType}
							onDropdownValueSelected={(selectedValue) => setSelectedCollectionType(selectedValue)}
							dropDownValues={collectionDropDownValues}
						/>
					</div>

					<div className="max-w-[250px]">
						<PrimaryButton isActive={!isLoading && btnIsActive} onClick={createCollection}>
							<p className="py-2 uppercase font-bold">CREATE COLLECTION</p>
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCollectionPage;
