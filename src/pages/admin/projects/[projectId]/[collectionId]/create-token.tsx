import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import PrimaryButton from '_atoms/buttons/Primary';
import LabelPrimaryInput from '_molecules/LabePrimaryInput';

import { StoreContext } from '_utils/context-api/store-context';
import { useRouter } from 'next/router';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import DropDownMenu from '_molecules/drop-down-menu/DropDownMenu';
import { DropdownValue, TraitType } from '_utils/models/dropdown-value';
import FilePicker from '_atoms/FilePicker';

const CreateTokenPage = () => {
	const router = useRouter();
	const { query } = router;
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('');
	const [royalties, setRoyalties] = useState('');
	const [maxSize, setMaxSize] = useState('');
	const [collaborator, setCollaborator] = useState('');
	const [selectedTraitType, setSelectedTraitType] = useState<DropdownValue>();
	const [allTraitTypes, setAllTraitTypes] = useState<DropdownValue[]>([]);

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

	useEffect(() => {
		// get all the types
		const allTypes = ['Armor', 'Shoes', 'Skin'];
		setAllTraitTypes(allTypes.map((type, index) => new TraitType(index, type)));
	});

	const btnIsActive =
		name.trim().length !== 0 &&
		royalties.trim().length !== 0 &&
		maxSize.trim().length !== 0 &&
		collaborator.trim().length !== 0;

	return (
		<div className="w-full h-full overflow-auto">
			<Head>
				<title>Prism | Create Token</title>
			</Head>
			<NavigationBar />

			<div className="mb-16">
				<AdminNavigationbar
					title="Create Token"
					backLinkText={`CyberFrens Collection`}
					backLinkHref={`/admin/projects/${query.projectId}/${query.collectionId}`}
				/>
			</div>

			<div className="w-full max-w-[1536px] mx-auto">
				<div className="w-full max-w-[700px]">
					<div className="pb-7">
						<LabelPrimaryInput
							value={name}
							label="Token Name"
							onChange={(e) => setName(e.target.value)}
							placeholder="e.g. Token X"
						/>
					</div>
					<div className="pb-7">
						<LabelPrimaryInput
							value={royalties}
							type="number"
							label="Amount"
							onChange={(e) => setRoyalties(e.target.value)}
							placeholder="e.g. 500"
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={maxSize}
							onChange={(e) => setMaxSize(e.target.value)}
							type="number"
							label="Price in Wei"
							placeholder="e.g. 100000000"
						/>
					</div>

					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Upload Image</p>
						<FilePicker accept=".png" />
					</div>

					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Collection Type</p>
						<DropDownMenu
							selectedDropDownValue={selectedTraitType}
							onDropdownValueSelected={(selectedValue) => setSelectedTraitType(selectedValue)}
							dropDownValues={allTraitTypes}
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

export default CreateTokenPage;
