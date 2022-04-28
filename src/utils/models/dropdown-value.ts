import { AssetType } from '_utils/enums/asset-type';

export abstract class DropdownValue {
	id: number;
	name: string;
	constructor(id: number, n: string) {
		this.id = id;
		this.name = n;
	}
}

// Standard,
// Trait,
// Master,

export class TraitCollection extends DropdownValue {
	constructor() {
		super(AssetType.TRAIT, 'Trait Collection');
	}
}

export class MasterCollection extends DropdownValue {
	constructor() {
		super(AssetType.MASTER, 'Master Collection');
	}
}

export class CollectionType extends DropdownValue {}
export class TraitType extends DropdownValue {}
