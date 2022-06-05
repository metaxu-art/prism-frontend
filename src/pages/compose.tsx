import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EditNFTView from '_organisms/compose/EditNFTView';
import NFTView from '_organisms/compose/NFTView';
import { StoreContext } from '_utils/context-api/store-context';
import { Token } from '_utils/interfaces/token';
import NavigationBar from '_organisms/NavigationBar';
import Head from 'next/head';

const ComposePage = () => {
	const { signer } = useContext(StoreContext);
	const router = useRouter();
	useEffect(() => {
		if (!signer) router.push('/');
	}, []);
	const [selectedTraits, setSelectedTraits] = useState<Token[]>([]);

	const onTraitToggled = (trait: Token, checked: boolean) => {
		if (checked) setSelectedTraits((oldTraits) => [...oldTraits, trait]);
		else
			setSelectedTraits((oldTraits) =>
				oldTraits.filter((currentTrait) => currentTrait.id !== trait.id),
			);
	};

	const onUnselectedAllButtonClick = () => {
		setSelectedTraits([]);
	};

	const onTraitArrowUpClicked = (tokenId: number) => {
		const tempTraits = [...selectedTraits];
		const token = tempTraits.find((trait) => tokenId === trait.id);
		if (token) {
			const index = tempTraits.indexOf(token);
			tempTraits.splice(index, 1);
			tempTraits.splice(index + 1, 0, token);
			setSelectedTraits(tempTraits);
		}
	};

	const onTraitArrowDownClicked = (tokenId: number) => {
		const tempTraits = [...selectedTraits];
		const token = tempTraits.find((trait) => tokenId === trait.id);
		if (token) {
			const index = tempTraits.indexOf(token);
			if (index !== 0) {
				tempTraits.splice(index, 1);
				tempTraits.splice(index - 1, 0, token);
				setSelectedTraits(tempTraits);
			}
		}
	};
	return (
		<div
			style={{
				backgroundImage: 'url("/images/background-image.png")',
			}}
			className="relative w-screen h-screen flex flex-col overflow-y-auto"
		>
			<Head>
				<title>Prism | Compose NFTs</title>
			</Head>
			<NavigationBar />
			<div className="flex-1 w-full overflow-hidden mx-auto flex justify-center items-center">
				<div className="w-full h-full flex">
					<NFTView selectedTraits={selectedTraits} />
					<EditNFTView
						onUnselectedButtonClick={onUnselectedAllButtonClick}
						onTraitToggled={onTraitToggled}
						selectedTraits={selectedTraits}
						setSelectedTraits={setSelectedTraits}
						onTraitArrowUpClicked={onTraitArrowUpClicked}
						onTraitArrowDownClicked={onTraitArrowDownClicked}
					/>
				</div>
			</div>
		</div>
	);
};
export default ComposePage;
