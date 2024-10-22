import { z } from "zod";

const projectSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string().optional(),
	date: z.string().datetime().optional(),
	url: z.string().url().optional(),
	images: z.array(z.string().url()).optional(),
	categories: z.array(z.string()).optional(),
	createdAt: z.string().datetime(),
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
