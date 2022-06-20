import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import PrimaryButton from '_atoms/buttons/Primary';
import LabelPrimaryInput from '_molecules/LabePrimaryInput';

import { StoreContext } from '_utils/context-api/store-context';
import { useRouter } from 'next/router';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import DropDownMenu from '_molecules/drop-down-menu/DropDownMenu';
import { AssetTypeFactory, CollectionType, DropdownValue } from '_utils/models/dropdown-value';
import { AssetType } from '_utils/enums/asset-type';
import PrimaryTextArea from '_atoms/PrimaryTextArea';
import { Collection } from '_utils/interfaces/collection';
import axios from 'axios';

const collectionDropDownValues = [
	new CollectionType(AssetType.Trait, 'Trait'),
	new CollectionType(AssetType.Standard, 'Other'),
	new CollectionType(AssetType.Master, 'Master'),
];

const CreateCollectionPage = () => {
	const router = useRouter();
	const { query } = router;
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('');
	const [royalties, setRoyalties] = useState('');
	const [maxInvocation, setMaxInvocation] = useState('');
	const [manager, setManager] = useState('');
	const [desc, setDesc] = useState('');
	const [selectedCollectionType, setSelectedCollectionType] = useState<DropdownValue>(
		collectionDropDownValues[0],
	);
	const [isLoading, setLoadingStatus] = useState(false);
	const [collection, setCollection] = useState<Collection>();

	const createCollection = async () => {
		let receipt;
		try {
			const tx = await signer?.projectContract.createCollection(
				name,
				desc,
				maxInvocation,
				query.projectId,
				manager || signer.address,
				selectedCollectionType.id,
				royalties,
			);
			receipt = await tx.wait();
		} catch (e) {
			console.error('creating collection failed', e);
		}
		return receipt;
	};

	const editCollection = async () => {
		let receipt;
		try {
			const tx = await signer?.projectContract.editCollection(
				collection?.id,
				query.projectId,
				name,
				desc,
				maxInvocation,
				manager,
				royalties,
				selectedCollectionType.id,
				collection?.paused,
			);
			receipt = await tx.wait();
		} catch (e) {
			console.error('editing project failed', e);
		}
		return receipt;
	};

	const onCreateCollectionClick = async () => {
		setLoadingStatus(true);

		let receipt;

		if (collection) {
			receipt = await editCollection();
		} else {
			receipt = await createCollection();
		}

		if (receipt) {
			router.push(`/admin/projects/${query.projectId}`);
		}
		setLoadingStatus(false);
	};

	const fetchCollection = async () => {
		let collection;
		try {
			collection = await axios.get(`/collection/${router.query.collectionId}`);
			console.log('collection', collection);
		} catch (e) {
			console.error(`Failed to fetch a collection by id ${router.query.collectionId}. ${e}`);
		}
		if (collection?.data) setCollection(collection.data);
	};

	useEffect(() => {
		if (collection) {
			setName(collection.name);
			setDesc(collection.description);
			setRoyalties(collection.royalties);
			setMaxInvocation(collection.maxInvocation);
			setManager(collection.manager);
			setSelectedCollectionType(AssetTypeFactory.getAssetType(collection.assetType || 0));
		}
	}, [collection]);

	useEffect(() => {
		if (router.query.collectionId) fetchCollection();
	}, [router.query.collectionId]);

	let btnIsActive = false;

	if (collection) {
		console.log(collection);
		console.log('name', name);
		console.log('desc', desc);
		console.log('royalties', royalties);
		console.log('maxInvocation', maxInvocation);
		console.log('manager', manager);
		btnIsActive =
			name.trim() !== collection.name.trim() ||
			desc.trim() !== collection.description ||
			royalties.trim() !== collection.royalties.trim() ||
			maxInvocation.trim() !== collection.maxInvocation.trim() ||
			manager.trim() !== collection.manager.trim() ||
			collection.assetType !== selectedCollectionType.id;
	} else {
		btnIsActive =
			name.trim().length !== 0 &&
			royalties.trim().length !== 0 &&
			maxInvocation.trim().length !== 0;
	}

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
							value={maxInvocation}
							onChange={(e) => setMaxInvocation(e.target.value)}
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
						<PrimaryButton isActive={!isLoading && btnIsActive} onClick={onCreateCollectionClick}>
							<p className="py-2 uppercase font-bold">CREATE COLLECTION</p>
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCollectionPage;
