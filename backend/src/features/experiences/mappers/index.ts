import { dbExperienceSchema, validateExperience } from "../lib/validate";
import { DbExperience, Experience } from "../types";

export const fromDb = (experience: DbExperience) => {
	return validateExperience({
		id: experience.id,
		name: experience.name,
		description: experience.description ?? undefined,
		fromDate: experience.from_date.toISOString(),
		toDate: experience.to_date ? experience.to_date.toISOString() : undefined,
		createdAt: experience.created_at.toISOString(),
		updatedAt: experience.updated_at ? experience.updated_at.toISOString() : undefined,
		published: experience.published,
	});
};
export const toDb = (experience: Experience) => {
	return dbExperienceSchema.parse({
		id: experience.id,
		name: experience.name,
		description: experience.description ?? null,
		from_date: experience.fromDate.toISOString(),
		to_date: experience.toDate ? experience.toDate.toISOString() : null,
		created_at: experience.createdAt.toISOString(),
		updated_at: experience.updatedAt ? experience.updatedAt.toISOString() : null,
		published: experience.published,
	});
};
export const partialToDb = (experience: Partial<Experience>) => {
	return dbExperienceSchema.partial().parse(experience);
};
