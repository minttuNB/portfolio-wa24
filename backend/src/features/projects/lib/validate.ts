import { z } from "zod";
import { UUID } from "crypto";

const projectSchema = z.object({
	id: z
		.string()
		.uuid()
		.transform((val) => val as UUID),
	name: z.string(),
	description: z.string().optional(),
	date: z.string().datetime().pipe(z.coerce.date()).optional(),
	url: z
		.string()
		.url()
		.transform((val) => new URL(val))
		.optional(),
	images: z
		.array(
			z
				.string()
				.url()
				.transform((val) => new URL(val))
		)
		.optional(),
	categories: z.array(z.string()).optional(),
	createdAt: z.string().datetime().pipe(z.coerce.date()),
	updatedAt: z.string().datetime().pipe(z.coerce.date()).optional(),
	published: z.boolean(),
});
const projectsSchema = z.array(projectSchema);
const dbProjectSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string().nullable(),
	date: z.string().datetime().pipe(z.coerce.date()).nullable(),
	url: z.string().url().nullable(),
	images: z.string().nullable(),
	categories: z.string().nullable(),
	created_at: z.string().datetime().pipe(z.coerce.date()),
	updated_at: z.string().datetime().pipe(z.coerce.date()).nullable(),
	published: z.boolean(),
});
function validateProject(data: unknown) {
	return projectSchema.parse(data);
}
function validateProjects(data: unknown) {
	return projectsSchema.parse(data);
}
function validateUUID(data: unknown) {
	return projectSchema.pick({ id: true }).parse(data).id;
}
export { projectSchema, projectsSchema, dbProjectSchema, validateProject, validateProjects, validateUUID };
