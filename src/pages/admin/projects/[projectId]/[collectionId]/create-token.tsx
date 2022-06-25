import React, { useContext, useEffect, useRef, useState } from 'react';
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
import InteractiveAttributesInputs, {
	AttributeInputValue,
} from '_organisms/interactive-attributes-inputs';
import BaseCenterModal from '_atoms/base-modals/CenterModal';

const CreateTokenPage = () => {
	const router = useRouter();
	const { query } = router;
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('');
	const [maxSupply, setMaxSupply] = useState('');
	const [priceInWei, setPriceInWei] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [selectedTraitType, setSelectedTraitType] = useState<DropdownValue>();
	const [allTraitTypes, setAllTraitTypes] = useState<DropdownValue[]>([]);
	const [collection, setCollection] = useState<Pick<Collection, 'assetType' | 'name'>>();
	const [desc, setDesc] = useState('');
	const [isLoading, setLoadingStatus] = useState(false);
	const [error, setError] = useState('');
	const attributeValues = useRef<AttributeInputValue[]>([]);

	const createTokenInContract = async (ipfsImageHash: string) => {
		let receipt;
		try {
			const tx = await signer?.tokensContract.createToken(
				name,
				desc,
				priceInWei,
				ipfsImageHash,
				attributeValues.current.map((attributeValue) => attributeValue.name),
				attributeValues.current.map((attributeValue) => attributeValue.value),
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
				// console.log(thisAny.width, thisAny.height);
				resolve([thisAny.width, thisAny.height]);
				_URL.revokeObjectURL(objectUrl);
			};
			img.onerror = reject;
			img.src = objectUrl;
		});
	};

	const onCreateTokenButtonClicked = async () => {
		setLoadingStatus(true);
		// console.log('uploading image to ipfs...');
		const pinataRes = await uploadToPinata(imageFile!);
		// console.log('pinataRes', pinataRes.IpfsHash);
		if (!pinataRes) return setError('Failed to upload an image to pinata');

		// console.log('creating token in contract...');
		const receipt = await createTokenInContract(pinataRes.IpfsHash);
		if (!receipt) return setError('Failed to create a token in contract');

		router.push(`/admin/projects/${query.projectId}/${query.collectionId}`);
	};

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

	const fetchProject = async () => {
		let res;
		try {
			res = await axios.get(`/project/${query.projectId}`);
			console.log('project', res.data);
		} catch (e) {
			console.error(`Failed to fetch a project by id ${query.projectId}. ${e}`);
		}
		if (res?.data) setDesc(res.data.description);
	};

	const fetchTraitTypes = async () => {
		let res;
		try {
			res = await axios.get(`/project/${query.projectId}`);
			// console.log(res.data);
		} catch (e) {
			console.error(`Failed to fetch project by the id ${query.projectId}. ${e}`);
		}
		if (res?.data)
			setAllTraitTypes(
				res.data.traitTypes.map((traitType: string, id: number) => new TraitType(id, traitType)),
			);
	};

	const onImageFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];

			let imgDimens: number[]; // [width, height]
			try {
				imgDimens = (await getImageFileSize(file)) as number[];
				// console.log('file dimens', imgDimens);
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
		}
	};

	useEffect(() => {
		fetchCollection();
		fetchTraitTypes();
		fetchProject();
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
						<InteractiveAttributesInputs
							handleAttributeValuesChanged={(attr) => {
								attributeValues.current = attr;
							}}
						/>
					</div>
					<div className="pb-7">
						<p className="font-bold text-xl pb-1">Token Description</p>
						<PrimaryTextArea
							onChange={(e) => setDesc(e.target.value)}
							placeholder="Token description..."
							value={desc}
						/>
					</div>

					<div className="max-w-[250px]">
						<PrimaryButton
							isActive={!isLoading && btnIsActive}
							onClick={onCreateTokenButtonClicked}
						>
							<p className="py-2 uppercase font-bold">CREATE TOKEN</p>
						</PrimaryButton>
					</div>
				</div>
			</div>
			<BaseCenterModal modalVisible={isLoading}>
				<img src="/loading-gif.gif" />
			</BaseCenterModal>
		</div>
	);
};

export default CreateTokenPage;
