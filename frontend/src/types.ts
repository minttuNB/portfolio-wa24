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
type ExperienceProps = {
	id: UUID;
	name: string;
	description?: string;
	fromDate: Date;
	toDate?: Date;
};
type ExperiencesProps = {
	experiences: ExperienceProps[];
};
export type { ProjectProps, ProjectsProps, ExperienceProps, ExperiencesProps };
