import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import { useRouter } from 'next/router';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import Link from 'next/link';
import PrimaryButton from '_atoms/buttons/Primary';
import { StoreContext } from '_utils/context-api/store-context';
import { Token } from '_utils/interfaces/token';
import axios from 'axios';
import BaseCenterModal from '_atoms/base-modals/CenterModal';
import { FiExternalLink } from 'react-icons/fi';

// const dummyTokens: Token[] = [
// 	{
// 		id: '0',
// 		name: 'silver armour',
// 		amountMinted: 0,
// 		amountTokens: 0,
// 		type: 'armour',
// 		creator: '0xaF3317cB28F219e52C1fd82d78FA981D1Bf3939D',
// 		status: Status.Paused,
// 	},
// 	{
// 		id: '1',
// 		name: 'shoes',
// 		amountMinted: 0,
// 		amountTokens: 0,
// 		type: 'shoes',
// 		creator: '0xaF3317cB28F219e52C1fd82d78FA981D1Bf3939D',
// 		status: Status.Unpaused,
// 	},
// ];

const CollectionsPage = () => {
	const { signer } = useContext(StoreContext);
	const router = useRouter();
	const { query } = router;
	const [tokens, setTokens] = useState<Token[]>([]);
	const [collectionName, setCollectionName] = useState<string>();
	const [projectName, setProjectName] = useState<string>();
	const [isLoading, setLoadingStatus] = useState(false);

	const fetchProject = async () => {
		let project;
		try {
			project = await axios.get(`/project/${query.projectId}`);
			// console.log('project', project);
		} catch (e) {
			console.error(`Failed to fetch a project by id ${query.projectId}. ${e}`);
		}
		if (project?.data) setProjectName(project.data.name);
	};

	const fetchCollection = async () => {
		let collection;
		try {
			collection = await axios.get(`/collection/${query.collectionId}`);
			// console.log('collection', collection);
		} catch (e) {
			console.error(`Failed to fetch a collection by id ${query.collectionId}. ${e}`);
		}
		if (collection) setCollectionName(collection.data.name);
	};

	const onStatusButtonClick = async ({
		id,
		paused,
		name,
		priceInWei,
		collectionId,
		maxSupply,
		traitType,
		assetType,
	}: Token) => {
		setLoadingStatus(true);

		try {
			const tx = await signer?.tokensContract.pauseToken(id);
			await tx.wait();
		} catch (e) {
			setLoadingStatus(false);
			return console.error(`Failed editing token with the id ${id} ${e}`);
		}
		setLoadingStatus(false);
		setTokens((oldTokens) => {
			return oldTokens.map((token) => {
				if (token.id === id) {
					token.paused = !paused;
				}
				return token;
			});
		});
	};

	const fetchTokens = async () => {
		let tokens;
		try {
			tokens = await axios.get(`/tokens?collectionId=${query.collectionId}`);
		} catch (e) {
			console.error(`Failed to fetch tokens. ${e}`);
		}

		if (tokens?.data) setTokens([...tokens.data]);
	};

	useEffect(() => {
		fetchTokens();
		fetchCollection();
		fetchProject();
	}, []);

	return (
		<div className="w-full h-full flex flex-col overflow-auto">
			<Head>
				<title>Prism | Collections </title>
			</Head>
			<NavigationBar />
			<AdminNavigationbar
				title={collectionName}
				backLinkText={projectName}
				backLinkHref={`/admin/projects/${query.projectId}`}
			/>

			<div className="py-5 px-10 2xl:px-0">
				<div className="grid grid-cols-7 gap-5 max-w-[1536px] mx-auto">
					<span className="overflow-hidden font-semibold text-2xl"># name</span>
					<span className="overflow-hidden font-semibold text-2xl"># max supply</span>
					<span className="overflow-hidden font-semibold text-2xl"># amount minted</span>
					<span className="overflow-hidden font-semibold text-2xl"># type</span>

					<span className="overflow-hidden font-semibold text-2xl"># tokenID</span>
					<span className="overflow-hidden font-semibold text-2xl"># status</span>
					<span className="overflow-hidden font-semibold text-2xl"># image</span>
				</div>
			</div>
			<div className="flex-1 overflow-auto pb-5">
				{tokens.length === 0 && (
					<div className="flex justify-center items-center h-full">
						<span className="uppercase text-3xl font-bold">YOU DON’T HAVE ANY tokens YET.</span>
					</div>
				)}

				{tokens.map((token: Token, index) => {
					const { name, maxSupply, traitType, paused, id } = token;
					console.log('token', token);
					return (
						<div
							key={id}
							className={`border-black ${
								tokens.length - 1 === index && 'border-b-2'
							} border-t-2 py-2 px-10 2xl:px-0`}
						>
							<div className="grid grid-cols-7 gap-5 max-w-[1536px] mx-auto ">
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{name}
								</span>
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{maxSupply}
								</span>
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{0}
								</span>
								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{traitType}
								</span>

								<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
									{id}
								</span>
								<div className="flex items-center justify-between">
									<div className="max-w-[400px]">
										<button
											onClick={() => onStatusButtonClick(token)}
											className={`w-full ${
												paused ? 'bg-[#FF7C7C]' : 'bg-[#CDFFBC]'
											} text-black font-semibold px-4 border border-black rounded-md py-1`}
										>
											{paused ? 'Paused' : 'Unpaused'}
										</button>
									</div>
								</div>
								<span>
									<a target="__blanket" href={token.image}>
										<FiExternalLink className="text-2xl cursor-pointer" />
									</a>
								</span>
							</div>
						</div>
					);
				})}
			</div>
			<div className="w-full max-w-[300px] mx-auto py-5">
				<Link
					href={`/admin/projects/${query.projectId}/${query.collectionId}/create-token`}
					passHref
				>
					<a>
						<PrimaryButton>
							<p className="font-semibold py-2 uppercase">ADD TOKEN</p>
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

export default CollectionsPage;
