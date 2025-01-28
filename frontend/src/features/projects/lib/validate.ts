import { z } from "zod";
import { UUID } from "../../../types";

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
	createdAt: z.string().datetime().pipe(z.coerce.date()).optional(),
	updatedAt: z.string().datetime().pipe(z.coerce.date()).optional(),
	published: z.boolean(),
});
const projectsSchema = z.array(projectSchema);
function validateProject(data: unknown) {
	return projectSchema.parse(data);
}
function validateProjects(data: unknown) {
	return projectsSchema.parse(data);
}
export { projectSchema, projectsSchema, validateProject, validateProjects };
