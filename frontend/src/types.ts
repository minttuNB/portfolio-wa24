import { FormEvent } from "react";

type ProjectProps = {
	id: ReturnType<typeof crypto.randomUUID>;
	name: string;
	description?: string;
	date?: Date;
	url?: URL;
	images?: URL[];
	categories?: string[];
	published: boolean;
};
type ProjectsProps = {
	projects: ProjectProps[];
	handleProjectMutation: (action: Action, project: ProjectProps) => void;
	isEditMode: boolean;
};
type ExperienceProps = {
	id: ReturnType<typeof crypto.randomUUID>;
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
	update: "update",
	remove: "remove",
};

type Action = (typeof actions)[keyof typeof actions];
export type { ProjectProps, ProjectsProps, ExperienceProps, ExperiencesProps, CreateProjectFormProps, Action };
