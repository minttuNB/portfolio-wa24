import { z } from "zod";
import { experienceSchema } from "../lib/validate";

type ExperienceProps = z.infer<typeof experienceSchema>;
type ExperiencesProps = {
	experiences: ExperienceProps[];
};
export type { ExperienceProps, ExperiencesProps };
