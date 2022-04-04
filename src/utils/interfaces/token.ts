export interface Token {
	attributes: string[];
	collection_name: string;
	description: string;
	external_url: string;
	image: string;
	name: string;
	platform: string;
	tokenID: number;
	website: string;
}
//     string name;
//     uint256 maxSupply;
//     uint256 tokenPriceInWei;
//     uint256 projectId;
//     uint256 collectionId;
//     uint256 masterTokenId;
//     string tokenURI;
//     bool paused;
//     bool locked;

export interface Master extends Token {
	traitIds: string[];
}
