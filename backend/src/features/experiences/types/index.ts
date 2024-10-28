import { z } from "zod";
import { dbExperienceSchema, experienceSchema } from "../lib/validate";

type Experience = z.infer<typeof experienceSchema>;
type DbExperience = z.infer<typeof dbExperienceSchema>;
export type { Experience, DbExperience };
