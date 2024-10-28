import { dbProjectSchema, validateProject } from "../lib/validate";
import { DbProject, Project } from "../types";

export const fromDb = (project: DbProject) => {
	return validateProject({
		id: project.id,
		name: project.name,
		description: project.description ?? null,
		date: project.date ?? null,
		url: project.url ?? null,
		images: project.images ?? null,
		categories: project.categories ?? null,
		createdAt: project.created_at,
		updatedAt: project.updated_at ?? null,
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
