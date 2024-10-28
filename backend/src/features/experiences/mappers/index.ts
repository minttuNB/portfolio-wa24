import { validateExperience } from "../lib/validate";
import { DbExperience, Experience } from "../types";

export const fromDb = (experience: DbExperience) => {
	return validateExperience({
		id: experience.id,
		name: experience.name,
		description: experience.description ?? null,
		fromDate: new Date(experience.from_date),
		toDate: experience.to_date ? new Date(experience.to_date) : null,
		createdAt: new Date(experience.created_at),
		updatedAt: experience.updated_at ? new Date(experience.updated_at) : null,
		published: experience.published,
	});
};
export const toDb = (experience: Experience) => {
	return {
		id: experience.id,
		name: experience.name,
		description: experience.description ?? "",
		from_date: experience.fromDate.toISOString(),
		to_date: experience.toDate ? experience.toDate?.toISOString() : null,
		created_at: experience.createdAt.toISOString(),
		updated_at: experience.updatedAt ? experience.updatedAt?.toISOString() : null,
		published: experience.published,
	};
};
