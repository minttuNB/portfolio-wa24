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
		from_date: experience.fromDate,
		to_date: experience.toDate ?? null,
		created_at: experience.createdAt,
		updated_at: experience.updatedAt ?? null,
		published: experience.published,
	});
};
export const partialToDb = (experience: Partial<Experience>) => {
	return dbExperienceSchema.partial().parse(experience);
};
