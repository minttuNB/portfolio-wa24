import { z } from "zod";
import { experienceSchema } from "../lib/validate";

type Experience = z.infer<typeof experienceSchema>;
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
