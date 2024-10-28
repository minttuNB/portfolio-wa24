import { z } from "zod";
import { dbProjectSchema, projectSchema } from "../lib/validate";

type Project = z.infer<typeof projectSchema>;
type DbProject = z.infer<typeof dbProjectSchema>;
export type { Project, DbProject };
