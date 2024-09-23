import { UUID } from "crypto";

type ProjectObject = {
	id: UUID;
	name: string;
	description?: string;
	date?: Date;
	url?: URL;
	images?: URL[];
};
export type {
	ProjectObject
}