import React, { useState } from 'react';
import Head from 'next/head';
import NavigationBar from '_organisms/NavigationBar';
import { useRouter } from 'next/router';
import AdminNavigationbar from '_molecules/AdminNavigationbar';
import { Status } from '_utils/enums/status';
import Link from 'next/link';
import PrimaryButton from '_atoms/buttons/Primary';

interface Token {
	id: string;
	amountTokens: number;
	amountMinted: number;
	name: string;
	type: string;
	creator: string;
	status: Status;
}

const dummyTokens: Token[] = [
	{
		id: '0',
		name: 'silver armour',
		amountMinted: 0,
		amountTokens: 0,
		type: 'armour',
		creator: '0xaF3317cB28F219e52C1fd82d78FA981D1Bf3939D',
		status: Status.Paused,
	},
	{
		id: '1',
		name: 'shoes',
		amountMinted: 0,
		amountTokens: 0,
		type: 'shoes',
		creator: '0xaF3317cB28F219e52C1fd82d78FA981D1Bf3939D',
		status: Status.Unpaused,
	},
];

const CollectionsPage = () => {
	const router = useRouter();
	const { query } = router;
	const [tokens, setTokens] = useState<Token[]>([...dummyTokens]);

	const onStatusButtonClick = (collectionId: string, status: Status) => {
		setTokens((oldTokens) => {
			return oldTokens.map((token) => {
				if (token.id === collectionId) {
					token.status = status === Status.Paused ? Status.Unpaused : Status.Paused;
				}
				return token;
			});
		});
	};

	return (
		<div className="w-full h-full flex flex-col overflow-auto">
			<Head>
				<title>Prism | Collections </title>
			</Head>
			<NavigationBar />
			<AdminNavigationbar
				title="CYBERFRENS COLLECTION"
				backLinkText="PROJECT  #1"
				backLinkHref={`/admin/projects/${query.projectId}`}
			/>

			<div className="py-5">
				<div className="grid grid-cols-7 gap-5 max-w-[1536px] mx-auto">
					<span className="overflow-hidden font-semibold text-2xl"># name</span>
					<span className="overflow-hidden font-semibold text-2xl"># amount tokens</span>
					<span className="overflow-hidden font-semibold text-2xl"># amount minted</span>
					<span className="overflow-hidden font-semibold text-2xl"># type</span>
					<span className="overflow-hidden font-semibold text-2xl"># creator</span>
					<span className="overflow-hidden font-semibold text-2xl"># tokenID</span>
					<span className="overflow-hidden font-semibold text-2xl"># status</span>
				</div>
			</div>
			<div className="flex-1 overflow-auto pb-5">
				{tokens.length === 0 && (
					<div className="flex justify-center items-center h-full">
						<span className="uppercase text-3xl font-bold">
							YOU DON’T HAVE ANY collections YET.
						</span>
					</div>
				)}

				{tokens.map(({ name, amountTokens, type, id, amountMinted, creator, status }, index) => (
					<div
						key={id}
						className={`border-black ${
							tokens.length - 1 === index && 'border-b-2'
						} border-t-2 py-2`}
					>
						<div className="grid grid-cols-7 gap-5 max-w-[1536px] mx-auto ">
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{name}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{amountTokens}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{amountMinted}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{type}
							</span>
							<span className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-2xl">
								{creator}
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
							</div>
						</div>
					</div>
				))}
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
		</div>
	);
};

export default CollectionsPage;
