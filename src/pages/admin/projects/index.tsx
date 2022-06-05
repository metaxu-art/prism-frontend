import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import PrimaryButton from '_atoms/buttons/Primary';
import { StoreContext } from '_utils/context-api/store-context';
import { Project } from '_utils/interfaces/project';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import axios from 'axios';

const ProjectsPage = () => {
	const { signer } = useContext(StoreContext);
	const [projects, setProjects] = useState<Partial<Project>[]>([]);

	const fetchProjects = async () => {
		let projects;
		try {
			projects = await axios.get('/projects');
			// console.log('projects', projects.data);
		} catch (e) {
			console.error('failed fetching projects from prism project contract', e);
		}
		if (projects?.data) setProjects([...projects.data]);
	};

	const toBase64 = (file: File) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	useEffect(() => {
		fetchProjects();
	}, []);

	return (
		<div className="w-full h-full flex flex-col">
			<Head>
				<title>Prism | Admin Projects</title>
			</Head>

			<NavigationBar />

			<AdminNavigationbar backLinkText="Home" title="Projects" backLinkHref="/" />

			<div className="py-5 px-10 2xl:px-0">
				<div className="grid grid-cols-5 gap-5 max-w-[1536px] mx-auto">
					<span className="overflow-hiden whitespace-nowrap text-ellipsis font-semibold text-2xl">
						# name
					</span>
					<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
						# creator
					</span>
					<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
						# collections
					</span>
				</div>
			</div>

			<div className="flex-1 overflow-auto pb-5">
				{projects.length === 0 && (
					<div className="flex justify-center items-center h-full px-10 2xl:px-0">
						<span className="uppercase text-3xl font-bold">YOU DON’T HAVE ANY PROJECTS YET.</span>
					</div>
				)}

				{projects.map(({ id, name, collections, owner }, index) => (
					<div
						key={id}
						className={`border-black ${
							projects.length - 1 === index && 'border-b-2'
						} border-t-2 py-2 px-10 2xl:px-0`}
					>
						<div className="grid grid-cols-5 gap-5 max-w-[1536px] mx-auto ">
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{name}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{owner}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{collections}
							</span>
							<div className="flex items-center justify-between">
								<div className="max-w-[400px]">
									<Link href={`/admin/projects/${id}`} passHref>
										<a>
											<button className="w-full bg-black text-white px-4 rounded-md py-2">
												View Collection
											</button>
										</a>
									</Link>
								</div>
								<FiEdit className="cursor-pointer text-2xl" />
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="w-full max-w-[300px] mx-auto py-5">
				<Link href="/admin/create-project" passHref>
					<a>
						<PrimaryButton>
							<p className="font-semibold py-2 uppercase">ADD NEW PROJECT</p>
						</PrimaryButton>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default ProjectsPage;

/* <Row>
	<div className={`flex-1 w-1/5 max-w-[300px] pr-6`}>
		<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold">
			#Name
		</span>
	</div>
	<RowItemElipsisText textSize="lg"></RowItemElipsisText>
	<RowItemElipsisText textSize="lg">#Creator</RowItemElipsisText>
	<RowItemElipsisText textSize="lg">#Master NFTs</RowItemElipsisText>
	<RowItemElipsisText textSize="lg">#Collections</RowItemElipsisText>
	<RowItemElipsisText></RowItemElipsisText>
</Row> */

// <Row key={id} hasBottomBorder hasTopBorder={index === 0}>
// 	<RowItemElipsisText>{name}</RowItemElipsisText>
// 	<RowItemElipsisText>{creator}</RowItemElipsisText>
// 	<RowItemElipsisText>{masterNfts}</RowItemElipsisText>
// 	<RowItemElipsisText>{collections}</RowItemElipsisText>
// 	<RowItem isCenter>
// 		<Link href={{ pathname: `/admin/projects/${id}` }}>
// 			<a>
// 				<FiEdit className="text-3xl cursor-pointer" />
// 			</a>
// 		</Link>
// 	</RowItem>
// </Row>
