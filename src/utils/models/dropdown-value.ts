import { AssetType } from '_utils/enums/asset-type';

export abstract class DropdownValue {
	id: number;
	name?: string;
	constructor(id: number, n?: string) {
		this.id = id;
		this.name = n;
	}
}

// Standard,
// Trait,
// Master,

export class AssetTypeFactory {
	static getAssetType(assetType: AssetType) {
		switch (assetType) {
			case AssetType.Trait:
				return new CollectionType(AssetType.Trait, 'Trait');
			case AssetType.Standard:
				return new CollectionType(AssetType.Standard, 'Other');
			case AssetType.Master:
				return new CollectionType(AssetType.Master, 'Master');

			default:
				throw new Error(`No such assetType ${assetType}`);
		}
	}
}

export class TraitCollection extends DropdownValue {
	constructor() {
		super(AssetType.Trait, 'Trait Collection');
	}
}

export class MasterCollection extends DropdownValue {
	constructor() {
		super(AssetType.Master, 'Master Collection');
	}
}

export class OtherCollection extends DropdownValue {
	constructor() {
		super(AssetType.Standard, 'Master Collection');
	}
}

export class AssetTypeStandard extends DropdownValue {
	constructor() {
		super(AssetType.Trait, 'Standard');
	}
}

export class CollectionType extends DropdownValue {}

export class TraitType extends DropdownValue {}
