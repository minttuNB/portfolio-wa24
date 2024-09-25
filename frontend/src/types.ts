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
	handleProjectMutation: (action: Action, project: ProjectProps) => void;
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
export const actions = {
	add: "add",
	remove: "remove",
  };
  
type Action = (typeof actions)[keyof typeof actions];
export type {
	ProjectProps,
	ProjectsProps,
	ExperienceProps,
	ExperiencesProps,
	CreateProjectFormProps,
	Action
};
