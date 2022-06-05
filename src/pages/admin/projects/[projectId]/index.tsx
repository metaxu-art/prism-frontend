import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { StoreContext } from '_utils/context-api/store-context';
import NavigationBar from '_organisms/NavigationBar';
import Link from 'next/link';
import PrimaryButton from '_atoms/buttons/Primary';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import { FiEdit } from 'react-icons/fi';
import { AssetType } from '_utils/enums/asset-type';
import { Collection } from '_utils/interfaces/collection';
import { Project } from '_utils/interfaces/project';
import BaseCenterModal from '_atoms/base-modals/CenterModal';
import axios from 'axios';

const ProjectDetailPage = () => {
	const { signer } = useContext(StoreContext);
	const router = useRouter();
	const { query } = router;
	const [isLoading, setLoadingStatus] = useState(false);

	const [collections, setCollections] = useState<Collection[]>([]);
	const [project, setProject] = useState<Project>();

	const fetchCollections = async () => {
		let collections;
		try {
			collections = await axios.get(`/collections/${query.projectId}`);
			console.log('collections', collections);
		} catch (e) {
			console.error(`Failed to fetch collections ${e}`);
		}
		if (collections?.data) {
			setCollections(collections.data);
		}
	};

	const fetchProject = async () => {
		let project;
		try {
			project = await axios.get(`/project/${query.projectId}`);
		} catch (e) {
			console.error(`Failed to fetch a project by id ${query.projectId}. ${e}`);
		}
		if (project?.data) setProject(project.data);
	};

	const onStatusButtonClick = async (collection: Collection) => {
		const { id, name, maxInvocation, manager, royalties, assetType, paused } = collection;
		setLoadingStatus(true);
		// console.log(id, name, maxInvocation, manager, royalties, assetType, paused);
		try {
			const tx = await signer?.projectContract.pauseCollection(id);
			await tx.wait();
		} catch (e) {
			setLoadingStatus(false);
			return console.error(`Changing the pause state on buton failed ${e}`);
		}
		setLoadingStatus(false);
		setCollections((oldCollections) =>
			oldCollections.map((collection) => {
				const copyCollection = { ...collection };
				if (copyCollection.id === id) {
					copyCollection.paused = !copyCollection.paused;
				}
				return copyCollection;
			}),
		);
	};

	useEffect(() => {
		fetchCollections();
		fetchProject();
	}, []);

	return (
		<div className="w-full h-full flex flex-col">
			<Head>
				<title>Prism | Project {query.projectId} </title>
			</Head>
			<NavigationBar />
			<AdminNavigationbar
				backLinkText="Projects"
				backLinkHref="/admin/projects"
				title={project?.name}
			/>

			<div className="py-5 px-10 2xl:px-0">
				<div className="grid grid-cols-6 gap-5 max-w-[1536px] mx-auto">
					<span className="overflow-hidden font-semibold text-2xl"># name</span>
					<span className="overflow-hidden font-semibold text-2xl"># tokens</span>
					<span className="overflow-hidden font-semibold text-2xl"># type</span>
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

				{collections.map((collection, index) => {
					const { name, amountTokens, id, assetType, paused } = collection;
					console.log('paused', paused);
					return (
						<div
							key={id}
							className={`border-black ${
								collections.length - 1 === index && 'border-b-2'
							} border-t-2 py-2`}
						>
							<div className="grid grid-cols-6 gap-5 max-w-[1536px] mx-auto px-10 2xl:px-0">
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{name}
								</span>
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{amountTokens}
								</span>
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{assetType === AssetType.Master && 'Master'}
									{assetType === AssetType.Trait && 'Trait'}
									{assetType === AssetType.Standard && 'Other'}
								</span>
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{id}
								</span>
								<div className="flex items-center justify-between">
									<div className="max-w-[400px]">
										<button
											onClick={() => onStatusButtonClick(collection)}
											className={`w-full ${
												paused ? 'bg-[#FF7C7C]' : 'bg-[#CDFFBC]'
											} text-black font-semibold px-4 border border-black rounded-md py-1`}
										>
											{paused && 'Paused'}
											{!paused && 'Unpaused'}
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
					);
				})}
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
				<img src="/loading-gif.gif" />
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
