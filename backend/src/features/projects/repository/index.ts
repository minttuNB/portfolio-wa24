import { UUID } from "crypto";
import { DB } from "../../../db/client";
import { Result } from "../../../types";
import { Project } from "../types";
import { fromDb, partialToDb, toDb } from "../mappers";
export interface ProjectRepository {
	create: (data: Project) => Promise<Result<Project>>;
	list: () => Promise<Result<Project[]>>;
	getById: (id: UUID) => Promise<Result<Project>>;
	update: (id: UUID, data: Partial<Project>) => Promise<Result<Project>>;
	remove: (id: UUID) => Promise<Result<Project>>;
	publish: (id: UUID) => Promise<Result<Project>>;
	unpublish: (id: UUID) => Promise<Result<Project>>;
}
export const createProjectRepository = (db: DB): ProjectRepository => {
	const create = async (data: Project) => {
		try {
			db.project.create({
				data: toDb(data),
			});
			const response: Result<Project> = {
				success: true,
				data: data,
			};
			return response;
		} catch (error) {
			const response: Result<Project> = {
				success: false,
				error: {
					code: 500,
					message: "Error creating the project: Internal server error",
				},
			};
			return response;
		}
	};
	const list = async () => {
		try {
			const results = await db.project.findMany();
			const mappedResults = results.map((project) => fromDb(project));
			const response: Result<Project[]> = {
				success: true,
				data: mappedResults,
			};
			return response;
		} catch (error) {
			console.log(JSON.stringify(error, null, 2));
			const response: Result<Project[]> = {
				success: false,
				error: {
					code: 500,
					message: "Error listing projects: Internal server error",
				},
			};
			return response;
		}
	};
	const getById = async (id: UUID) => {
		try {
			const result = await db.project.findUniqueOrThrow({
				where: {
					id,
				},
			});
			const mappedResult = fromDb(result);
			const response: Result<Project> = {
				success: true,
				data: mappedResult,
			};
			return response;
		} catch (error) {
			const response: Result<Project> = {
				success: false,
				error: {
					code: 404,
					message: "Error fetching the project: Project not found",
				},
			};
			return response;
		}
	};
	const update = async (id: UUID, data: Partial<Project>) => {
		try {
			db.project.update({
				where: {
					id,
				},
				data: {
					...partialToDb(data),
				},
			});
			const response: Result<Project> = {
				success: true,
				data: null,
			};
			return response;
		} catch (error) {
			const response: Result<Project> = {
				success: false,
				error: {
					code: 500,
					message: "Error updating the project: Internal server error",
				},
			};
			return response;
		}
	};
	const remove = async (id: UUID) => {
		try {
			await db.project.delete({
				where: {
					id,
				},
			});
			const response: Result<Project> = {
				success: true,
				data: null,
			};
			return response;
		} catch (error) {
			const response: Result<Project> = {
				success: false,
				error: {
					code: 404,
					message: "Error removing the project: Project not found",
				},
			};
			return response;
		}
	};
	const handlePublishing = async (id: UUID, value: boolean) => {
		try {
			db.project.update({
				where: {
					id,
				},
				data: {
					published: value,
				},
			});
			const response: Result<Project> = {
				success: true,
				data: null,
			};
			return response;
		} catch (error) {
			const response: Result<Project> = {
				success: false,
				error: {
					code: 404,
					message: `${
						value === true ? "Error publishing the project" : "Error unpublishing the project"
					}: project not found`,
				},
			};
			return response;
		}
	};
	return {
		create,
		list,
		getById,
		update,
		remove,
		publish: (id: UUID) => handlePublishing(id, true),
		unpublish: (id: UUID) => handlePublishing(id, false),
	};
};
