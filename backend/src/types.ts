import { UUID } from "crypto";

type Project = {
	id: UUID;
	name: string;
	description?: string;
	date?: Date;
	url?: URL;
	images?: URL[];
	categories?: string[];
	createdAt: Date;
	published: boolean;
};
type Experience = {
	id: UUID;
	name: string;
	description?: string;
	fromDate: Date;
	toDate?: Date;
	published: boolean;
};
export type { Project, Experience };
