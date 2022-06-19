import { AssetType } from '_utils/enums/asset-type';

export interface Token {
	id: number;
	name: string;
	description: string;
	assetType: AssetType;
	collectionId: number;
	locked: boolean;
	maxSupply: number;
	amountMinted: number;
	paused: boolean;
	priceInWei: string;
	projectId: number;
	traitType: string;
	image: string;
	creator: string;
}

// export interface Token {
// 	id: number;
// 	assetType: AssetType;
// 	collectionId: number;
// 	locked: boolean;
// 	maxSupply: number;
// 	amountMinted: number;
// 	name: string;
// 	paused: boolean;
// 	priceInWei: string;
// 	projectId: number;
// 	traitType: string;
// 	image: string;
// 	description: string;
// 	creator: string;
// }
