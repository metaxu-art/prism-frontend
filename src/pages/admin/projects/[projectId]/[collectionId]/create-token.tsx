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
import { Collection } from '_utils/interfaces/collection';
import { uploadToPinata } from '_utils/services/pinata';
import axios from 'axios';
import PrimaryTextArea from '_atoms/PrimaryTextArea';

const CreateTokenPage = () => {
	const router = useRouter();
	const { query } = router;
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('Token X');
	const [maxSupply, setMaxSupply] = useState('100');
	const [priceInWei, setPriceInWei] = useState('1000000');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [selectedTraitType, setSelectedTraitType] = useState<DropdownValue>(
		new TraitType(0, 'armour'),
	);
	const [allTraitTypes, setAllTraitTypes] = useState<DropdownValue[]>([]);
	const [collection, setCollection] = useState<Pick<Collection, 'assetType' | 'name'>>();
	const [desc, setDesc] = useState(
		'CyberFrens is a multiverse Project exploring the intersection and capibilities of NFTs accross different virtual worlds.',
	);
	const [isLoading, setLoadingStatus] = useState(false);
	const [error, setError] = useState('');

	const createTokenInContract = async () => {
		let receipt;
		try {
			const tx = await signer?.tokensContract.createToken(
				name,
				priceInWei,
				query.collectionId,
				maxSupply,
				selectedTraitType?.name, // trait type
				collection?.assetType, // asset type
			);
			receipt = await tx.wait();
		} catch (e) {
			console.error('creating token in contract failed.', e);
		}

		return receipt;
	};

	const getImageFileSize = (imageFile: File) => {
		return new Promise((resolve, reject) => {
			const _URL = window.URL || window.webkitURL;
			const img = new Image();
			const objectUrl = _URL.createObjectURL(imageFile);
			img.onload = function () {
				const thisAny = this as any;
				console.log(thisAny.width, thisAny.height);
				resolve([thisAny.width, thisAny.height]);
				_URL.revokeObjectURL(objectUrl);
			};
			img.onerror = reject;
			img.src = objectUrl;
		});
	};

	const onCreateTokenButtonClicked = async () => {
		setLoadingStatus(true);
		console.log('uploading image to ipfs...');
		const pinataRes = await uploadToPinata(imageFile!);
		if (!pinataRes) return setError('Failed to upload an image to pinata');

		console.log('creating token in contract...');
		const receipt = await createTokenInContract();
		if (!receipt) return setError('Failed to create a token in contract');

		router.push(`/admin/projects/${query.projectId}/${query.collectionId}`);
	};

	// const fetchCollection = async () => {
	// 	let collection;
	// 	try {
	// 		collection = await signer?.projectContract.collections(query.collectionId);
	// 		console.log('collection', collection);s
	// 		setCollection({
	// 			assetType: collection.assetType,
	// 			name: collection.name,
	// 		});
	// 	} catch (e) {
	// 		console.error(`Failed to fetch a collection by id ${query.collectionId}`);
	// 	}
	// };

	// const fetchTraitTypes = async () => {
	// 	let project;
	// 	try {
	// 		project = (await signer?.projectContract.viewProjectTraitTypes(query.projectId)) as string[];
	// 		console.log('traitTypes', project);
	// 	} catch (e) {
	// 		console.log(
	// 			`Failed to fetch project trait types for the project with the id ${query.projectId}`,
	// 		);
	// 	}
	// 	if (project) {
	// 		setAllTraitTypes(project.map((traitType, id) => new TraitType(id, traitType)));
	// 	}
	// };

	const fetchCollection = async () => {
		let res;
		try {
			res = await axios.get(`/collection/${query.collectionId}`);
		} catch (e) {
			console.error(`Failed to fetch a collection by id ${query.collectionId}. ${e}`);
		}
		if (res?.data)
			setCollection({
				assetType: res.data.assetType,
				name: res.data.name,
			});
	};

	const fetchTraitTypes = async () => {
		let res;
		try {
			res = await axios.get(`/project/${query.projectId}`);
			console.log(res.data);
		} catch (e) {
			console.log(`Failed to fetch project by the id ${query.projectId}. ${e}`);
		}
		if (res?.data)
			setAllTraitTypes(
				res.data.traitTypes.map((traitType: string, id: number) => new TraitType(id, traitType)),
			);
	};

	const onImageFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			//check the fie size of the image
			let imgDimens: number[]; // [width, height]
			try {
				imgDimens = (await getImageFileSize(file)) as number[];
				console.log('file dimens', imgDimens);
			} catch (e) {
				console.error(`failed at checking the image dimensions. ${e}`);
				return setError(
					'Failed at checking the image dimensions. Please try to select you image one more time.',
				);
			}
			if (imgDimens.length === 0 || imgDimens[0] !== 1200 || imgDimens[1] !== 1200) {
				setError('The image dimensions have to be 1200/1200px');
				setImageFile(null);
			} else {
				setError('');
				setImageFile(file);
			}
			// if file size no equal to  1200/1200 throw an error
		}
	};

	useEffect(() => {
		// get all the types based on the collectionId
		fetchCollection();
		fetchTraitTypes();
	}, []);

	const btnIsActive =
		name.trim().length !== 0 &&
		maxSupply.trim().length !== 0 &&
		priceInWei.trim().length !== 0 &&
		!!imageFile &&
		!!selectedTraitType;

	return (
		<div className="w-full h-full overflow-auto">
			<Head>
				<title>Prism | Create Token</title>
			</Head>
			<NavigationBar />

			<div className="mb-16">
				<AdminNavigationbar
					title={`Create Token`}
					backLinkText={collection?.name || 'collection'}
					backLinkHref={`/admin/projects/${query.projectId}/${query.collectionId}`}
				/>
			</div>

			<div className="w-full max-w-[1536px] mx-auto px-10 2xl:px-0">
				<span className="text-red-700 font-bold text-sm">{error}</span>
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
							value={maxSupply}
							type="number"
							label="Amount"
							onChange={(e) => setMaxSupply(e.target.value)}
							placeholder="e.g. 500"
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={priceInWei}
							onChange={(e) => setPriceInWei(e.target.value)}
							type="number"
							label="Price in Wei"
							placeholder="e.g. 100000000"
						/>
					</div>

					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Upload Image</p>
						<FilePicker accept=".png" onChange={onImageFilePicked} />
						<span className="font-bold text-sm">{imageFile && `${imageFile.name}`}</span>
					</div>

					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Trait Type</p>
						<DropDownMenu
							selectedDropDownValue={selectedTraitType}
							onDropdownValueSelected={(selectedValue) => setSelectedTraitType(selectedValue)}
							dropDownValues={allTraitTypes}
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

					<div className="max-w-[250px]">
						<PrimaryButton
							isActive={!isLoading && btnIsActive}
							onClick={onCreateTokenButtonClicked}
						>
							<p className="py-2 uppercase font-bold">CREATE TOKEN</p>
							{/* <PrimaryButton isActive={buttonIsActive} onClick={createCollection}> */}
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateTokenPage;
