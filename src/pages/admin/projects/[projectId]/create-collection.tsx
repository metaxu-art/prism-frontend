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
import { CollectionTypeEnum } from '_utils/enums/collection-type';

const CreateCollectionPage = () => {
	const router = useRouter();
	const { query } = router;
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('');
	const [royalties, setRoyalties] = useState('');
	const [maxSize, setMaxSize] = useState('');
	const [collaborator, setCollaborator] = useState('');
	const [selectedCollectionType, setSelectedCollectionType] = useState<DropdownValue>(
		new CollectionType(0, 'Trait'),
	);

	// const createCollection = async () => {
	// 	const traitTypeList = traitTypes.split(',');
	// 	try {
	// 		const tx = await signer?.projectContract.createProject(
	// 			projectName,
	// 			signer.address,
	// 			traitTypeList,
	// 		);
	// 		await tx.wait();
	// 	} catch (e) {
	// 		console.error('creating project failed', e);
	// 		return;
	// 	}
	// 	router.push('/admin/projects');
	// };

	// const buttonIsActive = projectName.trim().length !== 0 && traitTypes.trim().length !== 0;

	const enumList = Object.values(CollectionTypeEnum).map((e) => e);
	const enumNames = enumList.map((e) => e).slice(0, enumList.length / 2);

	const btnIsActive =
		name.trim().length !== 0 &&
		royalties.trim().length !== 0 &&
		maxSize.trim().length !== 0 &&
		collaborator.trim().length !== 0;

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

			<div className="w-full max-w-[1536px] mx-auto">
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
							value={maxSize}
							onChange={(e) => setMaxSize(e.target.value)}
							type="number"
							label="Maximum Collection Size"
							placeholder="e.g. 100"
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={collaborator}
							onChange={(e) => setCollaborator(e.target.value)}
							label="Collaborator"
							placeholder="e.g. 0xaF33...C1f (optional)"
						/>
					</div>

					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Collection Type</p>
						<DropDownMenu
							selectedDropDownValue={selectedCollectionType}
							onDropdownValueSelected={(selectedValue) => setSelectedCollectionType(selectedValue)}
							dropDownValues={enumNames.map(
								(eName, index) => new CollectionType(index, eName.toString()),
							)}
						/>
					</div>

					<div className="max-w-[250px]">
						<PrimaryButton isActive={btnIsActive} onClick={() => {}}>
							{/* <PrimaryButton isActive={buttonIsActive} onClick={createCollection}> */}
							<p className="py-2 uppercase font-bold">CREATE COLLECTION</p>
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateCollectionPage;
