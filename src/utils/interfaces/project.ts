import { Collection } from './collection';

export interface Project {
	id: number;
	name: string;
	owner: string;
	traitTypes: string[];
	description?: string;
	externalUrl?: string;
	collections?: Collection[];
}
