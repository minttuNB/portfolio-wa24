import { UUID } from "crypto";

type Experience = {
	id: UUID;
	name: string;
	description?: string;
	fromDate: Date;
	toDate?: Date;
	createdAt: Date;
	updatedAt?: Date;
	published: boolean;
};
type DbExperience = {
	id: string;
	name: string;
	description?: string;
	from_date: string;
	to_date?: string;
	created_at: string;
	updated_at?: string;
	published: boolean;
};
export type { Experience, DbExperience };
