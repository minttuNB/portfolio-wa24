import { UUID } from "crypto";

type ProjectProps = {
	id: UUID;
	name: string;
	description?: string;
	date?: Date;
	url?: URL;
	images?: URL[];
};
type ProjectsProps = {
	projects: ProjectProps[];
};
export type { ProjectProps, ProjectsProps };
