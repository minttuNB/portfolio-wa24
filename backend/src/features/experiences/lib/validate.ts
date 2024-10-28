import { UUID } from "crypto";
import { z } from "zod";

const experienceSchema = z.object({
	id: z
		.string()
		.uuid()
		.transform((val) => val as UUID),
	name: z.string(),
	description: z.string().optional(),
	fromDate: z.string().datetime().pipe(z.coerce.date()),
	toDate: z.string().datetime().pipe(z.coerce.date()).optional(),
	createdAt: z.string().datetime().pipe(z.coerce.date()),
	updatedAt: z.string().datetime().pipe(z.coerce.date()).optional(),
	published: z.boolean(),
});
const experiencesSchema = z.array(experienceSchema);
const dbExperienceSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string().nullable(),
	from_date: z.string().datetime().pipe(z.coerce.date()),
	to_date: z.string().datetime().pipe(z.coerce.date()).nullable(),
	created_at: z.string().datetime().pipe(z.coerce.date()),
	updated_at: z.string().datetime().pipe(z.coerce.date()).nullable(),
	published: z.boolean(),
});
function validateExperience(data: unknown) {
	return experienceSchema.parse(data);
}
function validateExperiences(data: unknown) {
	return experiencesSchema.parse(data);
}
export { experienceSchema, experiencesSchema, dbExperienceSchema, validateExperience, validateExperiences };
