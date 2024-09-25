import { UUID } from "crypto";
import { FormEvent } from "react";

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
type CreateProjectFormProps = {
	onCreateProjectFormSubmitted: (event: FormEvent<HTMLFormElement>) => void;
};
export type {
	ProjectProps,
	ProjectsProps,
	ExperienceProps,
	ExperiencesProps,
	CreateProjectFormProps,
};
