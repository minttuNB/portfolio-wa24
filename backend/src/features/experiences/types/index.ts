import { UUID } from "crypto";

type Experience = {
	id: UUID;
	name: string;
	description?: string;
	fromDate: Date;
	toDate?: Date;
	published: boolean;
};
export type { Experience };
