import { StatusCode } from "hono/utils/http-status";
import { User } from "./features/users/types";

type ContextVariables = {
	user: User | null;
};
export type ErrorInformation = {
	code: StatusCode;
	message: string;
};
export type Success<T> = {
	success: true;
	data: T | null;
};
export type Failure = {
	success: false;
	error: ErrorInformation;
};
export type Result<T> = Success<T> | Failure;
export type { ContextVariables };
