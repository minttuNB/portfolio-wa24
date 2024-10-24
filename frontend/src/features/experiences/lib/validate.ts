import { z } from "zod";
import { UUID } from "../../../types";

const experienceSchema = z.object({
	id: z
		.string()
		.uuid()
		.transform((val) => val as UUID),
	name: z.string(),
	description: z.string().optional(),
	fromDate: z.string().datetime().pipe(z.coerce.date()),
	toDate: z.string().datetime().optional().pipe(z.coerce.date()),
	createdAt: z.string().datetime().pipe(z.coerce.date()).optional(),
	published: z.boolean().optional(),
});
const experiencesSchema = z.array(experienceSchema);
function validateExperience(data: unknown) {
	return experienceSchema.parse(data);
}
function validateExperiences(data: unknown) {
	return experiencesSchema.parse(data);
}
export { experienceSchema, experiencesSchema, validateExperience, validateExperiences };
