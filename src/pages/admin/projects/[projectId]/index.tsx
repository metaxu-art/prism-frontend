import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { StoreContext } from '_utils/context-api/store-context';
import NavigationBar from '_organisms/NavigationBar';
import Link from 'next/link';
import PrimaryButton from '_atoms/buttons/Primary';
import { DropdownValue, TraitCollection } from '_utils/models/dropdown-value';
import BaseCenterModal from '_atoms/base-modals/CenterModal';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import { CollectionTypeEnum } from '_utils/enums/collection-type';
import { FiEdit } from 'react-icons/fi';
import { Status } from '_utils/enums/status';

interface CollectionInterface {
	name: string;
	amountTokens: number;
	type: CollectionTypeEnum;
	manager: string;
	id: string;
	status: Status;
}

const dummyCollections: CollectionInterface[] = [
	{
		name: 'CyberFrens Core',
		amountTokens: 400,
		id: '0',
		manager: '0x4925dAe3cA2d4533E30b6234637c76B07198b017',
		status: Status.Paused,
		type: CollectionTypeEnum.Master,
	},
	{
		name: 'Collection 2',
		id: '1',
		amountTokens: 10,
		manager: '0x4925dAe3cA2d4533E30b6234637c76B07198b017',
		status: Status.Unpaused,
		type: CollectionTypeEnum.Trait,
	},
];

const ProjectDetailPage = () => {
	const { signer } = useContext(StoreContext);
	const router = useRouter();
	const { query } = router;
	const [isLoading, setLoading] = useState(true);
	const [collections, setCollections] = useState<CollectionInterface[]>([...dummyCollections]);
	const [selectedCollection, setSelectedCollection] = useState<DropdownValue>(
		new TraitCollection(),
	);

	useEffect(() => {
		if (!signer) router.push('/');
		else {
			setLoading(false);
			// get collections based on query.projectId
			// filter token
		}
	}, []);

	useEffect(() => {
		console.log('filter collection by', selectedCollection.name);
	}, [selectedCollection]);

	const onStatusButtonClick = (collectionId: string, status: Status) => {
		setCollections((oldCollections) => {
			return oldCollections.map((collection) => {
				if (collection.id === collectionId) {
					collection.status = status === Status.Paused ? Status.Unpaused : Status.Paused;
				}
				return collection;
			});
		});
	};
	const onUnpauseButtonClick = (collectionId: string) => {};

	return (
		<div className="w-full h-full flex flex-col">
			<Head>
				<title>Prism | Project {query.projectId} </title>
			</Head>
			<NavigationBar />
			<AdminNavigationbar
				backLinkText="Projects"
				backLinkHref="/admin/projects"
				title={`Project #${query.projectId}`}
			/>

			<div className="py-5">
				<div className="grid grid-cols-6 gap-5 max-w-[1536px] mx-auto">
					<span className="overflow-hidden font-semibold text-2xl"># name</span>
					<span className="overflow-hidden font-semibold text-2xl"># amount tokens</span>
					<span className="overflow-hidden font-semibold text-2xl"># type</span>
					<span className="overflow-hidden font-semibold text-2xl"># manager</span>
					<span className="overflow-hidden font-semibold text-2xl"># collectionID</span>
					<span className="overflow-hidden font-semibold text-2xl"># status</span>
				</div>
			</div>

			<div className="flex-1 overflow-auto pb-5">
				{collections.length === 0 && (
					<div className="flex justify-center items-center h-full">
						<span className="uppercase text-3xl font-bold">
							YOU DON’T HAVE ANY collections YET.
						</span>
					</div>
				)}

				{collections.map(({ name, amountTokens, id, manager, status, type }, index) => (
					<div
						key={id}
						className={`border-black ${
							collections.length - 1 === index && 'border-b-2'
						} border-t-2 py-2`}
					>
						<div className="grid grid-cols-6 gap-5 max-w-[1536px] mx-auto ">
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{name}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{amountTokens}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{type === CollectionTypeEnum.Master && 'Master'}
								{type === CollectionTypeEnum.Trait && 'Trait'}
								{type === CollectionTypeEnum.Other && 'Other'}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{manager}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								#{id}
							</span>
							<div className="flex items-center justify-between">
								<div className="max-w-[400px]">
									<button
										onClick={() => onStatusButtonClick(id, status)}
										className={`w-full ${
											status === Status.Paused ? 'bg-[#FF7C7C]' : 'bg-[#CDFFBC]'
										} text-black font-semibold px-4 border border-black rounded-md py-1`}
									>
										{status === Status.Paused && 'Paused'}
										{status === Status.Unpaused && 'Unpaused'}
									</button>
								</div>
								<Link href={`/admin/projects/${query.projectId}/${id}`}>
									<a>
										<FiEdit className="cursor-pointer text-2xl" />
									</a>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="w-full max-w-[300px] mx-auto py-5">
				<Link href={`/admin/projects/${query.projectId}/create-collection`} passHref>
					<a>
						<PrimaryButton>
							<p className="font-semibold py-2 uppercase">ADD COLLECTION</p>
						</PrimaryButton>
					</a>
				</Link>
			</div>

			<BaseCenterModal modalVisible={isLoading}>
				<div className="flex flex-col justify-start items-start">
					<div className="w-full pb-2">
						<img
							src="/loading-gif.gif"
							width={120}
							height={120}
							className="mx-auto"
							alt="Loading svg"
						/>
					</div>
					<div className="text-white text-2xl">Waiting for setup...</div>
				</div>
			</BaseCenterModal>
		</div>
	);
};

export default ProjectDetailPage;

{
	/* <BaseCenterModal
				modalVisible={isAddCollectionModalOpen}
				handleGreyAreaClick={() => setAddCollectionModalVisiblity(false)}
			>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className="relative bg-white w-full max-w-[560px] rounded-lg px-16 py-10"
				>
					<FiXCircle
						className="text-4xl absolute top-5 right-5 cursor-pointer"
						onClick={() => setAddCollectionModalVisiblity(false)}
					/>
					<div className="pb-10">
						<p className="font-bold text-4xl">Add new collection</p>
					</div>

					<div className="pb-4">
						<LabelPrimaryInput label="trait type" />
					</div>
					<div className="pb-10">
						<LabelPrimaryInput label="max. amount of traits" />
					</div>

					<PrimaryButton>
						<p className="font-bold py-1">ADD TRAIT COLLECTION</p>
					</PrimaryButton>
				</div>
			 */
}
