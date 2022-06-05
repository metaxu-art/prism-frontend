export interface Project {
	id: number;
	name: string;
	owner: string;
	traitTypes: string[];
	collections: number;
	description?: string;
	externalUrl?: string;
}
