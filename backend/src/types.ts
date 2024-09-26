import { UUID } from "crypto";

type Project = {
	id: UUID;
	name: string;
	description?: string;
	date?: Date;
	url?: URL;
	images?: URL[];
	categories?: string[];
};
export type { Project };
