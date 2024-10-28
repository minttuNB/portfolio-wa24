import { z } from "zod";
import { projectSchema } from "../lib/validate";

type Project = z.infer<typeof projectSchema>;
type DbProject = {
	id: string;
	name: string;
	description?: string | null;
	date?: Date | null;
	url?: string | null;
	images?: string | null;
	categories?: string | null;
	created_at: Date;
	updated_at: Date | null;
	published: boolean;
};
export type { Project, DbProject };
