import { dbProjectSchema, validateProject } from "../lib/validate";
import { DbProject, Project } from "../types";

export const fromDb = (project: DbProject) => {
	return validateProject({
		id: project.id,
		name: project.name,
		description: project.description ?? undefined,
		date: project.date ? project.date?.toISOString() : undefined,
		url: project.url ?? undefined,
		images: project.images ? JSON.parse(project.images) : undefined,
		categories: project.categories ? JSON.parse(project.categories) : undefined,
		createdAt: project.created_at.toISOString(),
		updatedAt: project.updated_at ? project.updated_at?.toISOString() : undefined,
		published: project.published,
	});
};
export const toDb = (project: Project) => {
	return {
		id: project.id,
		name: project.name,
		description: project.description ?? null,
		date: project.date ?? null,
		url: project.url ? project.url?.toString() : null,
		images: project.images ? JSON.stringify(project.images) : null,
		categories: project.categories ? JSON.stringify(project.categories) : null,
		created_at: project.createdAt,
		updated_at: project.updatedAt ?? null,
		published: project.published,
	};
};
export const partialToDb = (project: Partial<Project>) => {
	const modifiedParts = {} as DbProject;
	Object.entries(project).forEach(([key, value]) => {
		if (key === "url") {
			modifiedParts.url = value.toString();
		} else if (key === "images") {
			modifiedParts.images = JSON.stringify(value);
		} else if (key === "categories") {
			modifiedParts.categories = JSON.stringify(value);
		}
	});
	return dbProjectSchema.partial().parse({ project, ...modifiedParts });
};
