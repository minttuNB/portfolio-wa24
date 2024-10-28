import { z } from "zod";
import { projectSchema } from "../lib/validate";

type Project = z.infer<typeof projectSchema>;
export type { Project };
