import { UUID } from "crypto";
import { projectSchema, validateUUID } from "../lib/validate";
import { createProjectRepository, ProjectRepository } from "../repository";
import { Project } from "../types";
import { Result } from "../../../types";
import prisma from "../../../db/client";
export interface ProjectService {
	create: (data: Project) => Promise<Result<Project>>;
	list: () => Promise<Result<Project[]>>;
	getById: (id: UUID) => Promise<Result<Project>>;
	update: (id: UUID, data: Partial<Project>) => Promise<Result<Project>>;
	remove: (id: UUID) => Promise<Result<Project>>;
	publish: (id: UUID) => Promise<Result<Project>>;
	unpublish: (id: UUID) => Promise<Result<Project>>;
}
export const createProjectService = (projectRepository: ProjectRepository) => {
	return {
		create: async (data: Project) => {
			try {
				data = projectSchema.parse({
					...data,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
					published: false,
				});
				return projectRepository.create(data);
			} catch (error) {
				const response: Result<Project> = {
					success: false,
					error: {
						code: 400,
						message: "Error creating the project: invalid project data",
					},
				};
				return response;
			}
		},
		list: projectRepository.list,
		getById: async (id: UUID) => {
			try {
				id = validateUUID(id);
				return projectRepository.getById(id);
			} catch (error) {
				const response: Result<Project> = {
					success: false,
					error: {
						code: 400,
						message: "Error fetching the project: invalid project id",
					},
				};
				return response;
			}
		},
		update: async (id: UUID, data: Partial<Project>) => {
			try {
				id = validateUUID(id);
				return projectRepository.update(id, data);
			} catch (error) {
				const response: Result<Project> = {
					success: false,
					error: {
						code: 400,
						message: "Error updating the project: invalid project id",
					},
				};
				return response;
			}
		},
		remove: async (id: UUID) => {
			try {
				id = validateUUID({ id });
				return projectRepository.remove(id);
			} catch (error) {
				const response: Result<Project> = {
					success: false,
					error: {
						code: 400,
						message: "Error removing the project: invalid project id",
					},
				};
				return response;
			}
		},
		publish: async (id: UUID) => {
			try {
				id = validateUUID({ id });
				return projectRepository.publish(id);
			} catch (error) {
				const response: Result<Project> = {
					success: false,
					error: {
						code: 400,
						message: "Error publishing the project: invalid project id",
					},
				};
				return response;
			}
		},
		unpublish: async (id: UUID) => {
			try {
				id = validateUUID({ id });
				return projectRepository.unpublish(id);
			} catch (error) {
				const response: Result<Project> = {
					success: false,
					error: {
						code: 400,
						message: "Error unpublishing the project: invalid project id",
					},
				};
				return response;
			}
		},
	};
};
export const projectService = createProjectService(createProjectRepository(prisma!));
