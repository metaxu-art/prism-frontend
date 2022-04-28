export interface Collection {
	name: string;
	maxInvocations: number;
	projectId: number;
	invocations?: number;
	paused?: boolean;
	locked?: boolean;
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
