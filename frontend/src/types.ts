import { FormEvent } from "react";
type UUID = ReturnType<typeof crypto.randomUUID> | `${string}-${string}-${string}-${string}-${string}`;
type CreateProjectFormProps = {
	onCreateProjectFormSubmitted: (event: FormEvent<HTMLFormElement>) => void;
};
export const actions = {
	add: "add",
	update: "update",
	remove: "remove",
};

type Action = (typeof actions)[keyof typeof actions];
export type { UUID, CreateProjectFormProps, Action };
