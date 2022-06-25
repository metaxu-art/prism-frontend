import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import PrimaryButton from '_atoms/buttons/Primary';
import LabelPrimaryInput from '_molecules/LabePrimaryInput';

import { StoreContext } from '_utils/context-api/store-context';
import { useRouter } from 'next/router';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import PrimaryTextArea from '_atoms/PrimaryTextArea';
import { Project } from '_utils/interfaces/project';
import axios from 'axios';
import BaseCenterModal from '_atoms/base-modals/CenterModal';

const CreateProjectPage = () => {
	const router = useRouter();
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('');

	const [traitTypes, setTraitTypes] = useState('');
	const [desc, setDesc] = useState('');
	const [isLoading, setLoadingStatus] = useState(false);
	const [projectUrl, setProjectUrl] = useState('');
	const [project, setProject] = useState<Project>();

	const createProject = async () => {
		let receipt;
		try {
			const tx = await signer?.projectContract.createProject(
				name,
				desc,
				signer.address,
				traitTypes.split(',').map((a) => a.trim()),
			);
			receipt = await tx.wait();
		} catch (e) {
			console.error('creating project failed', e);
		}
		return receipt;
	};
	const editProject = async () => {
		let receipt;
		try {
			const tx = await signer?.projectContract.editProject(
				project?.id,
				name,
				desc,
				signer.address,
				traitTypes.split(',').map((a) => a.trim()),
			);
			receipt = await tx.wait();
		} catch (e) {
			console.error('editing project failed', e);
		}
		return receipt;
	};

	const onCreateProjectClick = async () => {
		setLoadingStatus(true);

		let receipt;

		if (project) receipt = await editProject();
		else receipt = await createProject();

		if (receipt) router.push('/admin/projects');

		setLoadingStatus(false);
	};

	const fetchProject = async () => {
		let project;
		try {
			project = await axios.get(`/project/${router.query.projectId}`);
		} catch (e) {
			console.error(`Failed to fetch a project by id ${router.query.projectId}. ${e}`);
		}
		if (project?.data) setProject(project.data);
	};

	useEffect(() => {
		if (router.query.projectId) fetchProject();
	}, [router.query.projectId]);

	useEffect(() => {
		if (project) {
			setName(project.name);
			setTraitTypes(project.traitTypes.join(','));
			setProjectUrl(project.externalUrl || '');
			setDesc(project.description || '');
		}
	}, [project]);

	let btnIsActive = false;

	if (project) {
		btnIsActive =
			name.trim() !== project.name.trim() ||
			traitTypes.trim() !== project.traitTypes.join(',').trim() ||
			projectUrl.trim() !== (project.externalUrl || '').trim() ||
			desc.trim() !== (project.description || '').trim();
	} else {
		btnIsActive =
			name.trim().length !== 0 &&
			traitTypes.trim().length !== 0 &&
			desc.trim().length !== 0 &&
			projectUrl.trim().length !== 0;
	}

	return (
		<div className="w-full h-full overflow-auto">
			<Head>
				<title>Prism | Create Project</title>
			</Head>
			<NavigationBar />
			<div className="mb-16">
				<AdminNavigationbar
					backLinkText="Projects"
					title="Create Project"
					backLinkHref="/admin/projects"
				/>
			</div>

			<div className="w-full max-w-[1536px] mx-auto px-10 2xl:px-0">
				<div className="w-full max-w-[700px]">
					<div className="pb-7">
						<LabelPrimaryInput
							value={name}
							onChange={(e) => setName(e.target.value)}
							label="Add Project Name"
							placeholder="E.g. Project X"
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={traitTypes}
							onChange={(e) => setTraitTypes(e.target.value)}
							label="Trait Types"
							placeholder="armour, skin, body, weapon"
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={signer?.address}
							onChange={(e) => {}}
							label="Project Owner/Chef"
							placeholder="0x492deFs34d...."
						/>
					</div>

					<div className="pb-7">
						<LabelPrimaryInput
							value={projectUrl}
							onChange={(e) => setProjectUrl(e.target.value)}
							label="Project Url"
							placeholder="e.g. https://cyberfrens.co/"
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
						<PrimaryButton isActive={!isLoading && btnIsActive} onClick={onCreateProjectClick}>
							<p className="py-2 uppercase font-bold">
								{project ? 'Edit Project' : 'Create Project'}
							</p>
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

export default CreateProjectPage;
