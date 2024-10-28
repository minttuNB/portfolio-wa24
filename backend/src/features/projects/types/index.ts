import { z } from "zod";
import { projectSchema } from "../lib/validate";

type Project = z.infer<typeof projectSchema>;
type DbProject = {
	id: string;
	name: string;
	description?: string;
	date?: string;
	url?: string;
	images?: string;
	categories?: string;
	created_at: string;
	updated_at: string;
	published: boolean;
};
export type { Project, DbProject };
