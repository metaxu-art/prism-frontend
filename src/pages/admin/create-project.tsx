import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import PrimaryButton from '_atoms/buttons/Primary';
import LabelPrimaryInput from '_molecules/LabePrimaryInput';

import { StoreContext } from '_utils/context-api/store-context';
import { useRouter } from 'next/router';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import PrimaryTextArea from '_atoms/PrimaryTextArea';

const CreateProjectPage = () => {
	const router = useRouter();
	const { signer } = useContext(StoreContext);
	const [name, setName] = useState('');
	const [owner, setOwner] = useState('');
	const [traitTypes, setTraitTypes] = useState('');
	const [desc, setDesc] = useState('');

	const createProject = async () => {
		const traitTypeList = traitTypes.split(',');
		try {
			const tx = await signer?.projectContract.createProject(name, signer.address, traitTypeList);
			await tx.wait();
		} catch (e) {
			console.error('creating project failed', e);
			return;
		}
		router.push('/admin/projects');
	};

	const btnIsActive =
		name.trim().length !== 0 &&
		owner.trim().length !== 0 &&
		traitTypes.trim().length !== 0 &&
		desc.trim().length !== 0;

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

			<div className="w-full max-w-[1536px] mx-auto">
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
							value={owner}
							onChange={(e) => setOwner(e.target.value)}
							label="Project Owner/Chef"
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
						<p className="font-bold text-xl pb-1">Project Description</p>
						<PrimaryTextArea
							onChange={(e) => setDesc(e.target.value)}
							placeholder="CyberFrens is a multiverse Project exploring the intersection and
							capibilities of NFTs accross different virtual worlds."
						>
							{desc}
						</PrimaryTextArea>
					</div>

					<div className="max-w-[250px]">
						<PrimaryButton isActive={btnIsActive} onClick={createProject}>
							<p className="py-2 uppercase font-bold">Create Project</p>
						</PrimaryButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProjectPage;
