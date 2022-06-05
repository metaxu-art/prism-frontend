import { AssetType } from '_utils/enums/asset-type';

export interface Collection {
	id: number;
	name: string;
	projectId: number;
	assetType: AssetType;
	manager: string;
	royalties: number;
	maxInvocation: number;
	paused: boolean;
	locked: boolean;
	amountTokens: number;
	amountMinted: number;
}

// struct Collection {
//     string name;
//     uint256 id; // --> add this to creation  function
//     uint256 projectId;
//     uint256 royalties; // in 1000th e.g. 1000 for 10%
//     address manager; // gets royalties
//     uint256 invocations;
//     uint256 maxInvocations;
//     AssetType assetType;
//     bool paused;
//     bool locked;
//   }

// assetType: 0
// id: BigNumber {_hex: '0x01', _isBigNumber: true}
// invocations: BigNumber {_hex: '0x00', _isBigNumber: true}
// locked: false
// manager: "0x0000000000000000000000000000000000000000"
// maxInvocations: BigNumber {_hex: '0x64', _isBigNumber: true}
// name: "Collection 1"
// paused: true
// projectId: BigNumber {_hex: '0x00', _isBigNumber: true}
// royalties
