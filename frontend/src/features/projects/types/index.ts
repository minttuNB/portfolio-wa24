import { z } from "zod";
import { projectSchema } from "../lib/validate";
import { Action } from "../../../types";

type ProjectProps = z.infer<typeof projectSchema>;
type ProjectsProps = {
	projects: ProjectProps[];
	handleProjectMutation: (action: Action, project: ProjectProps) => void;
	isEditMode: boolean;
};
export type { ProjectProps, ProjectsProps };
