import { User } from "./features/users/types";

type ContextVariables = {
	user: User | null;
};
export type Success<T> = {
	success: true;
	data: T | null;
};
export type Failure = {
	success: false;
	message: string;
};
export type Result<T> = Success<T> | Failure;
export type { ContextVariables };
