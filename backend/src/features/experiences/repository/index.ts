import { UUID } from "crypto";
import { Result } from "../../../types";
import { Experience } from "../types";
import { DB } from "../../../db/client";
import { fromDb, partialToDb, toDb } from "../mappers";

export interface ExperienceRepository {
	create: (data: Experience) => Promise<Result<Experience>>;
	list: () => Promise<Result<Experience[]>>;
	getById: (id: UUID) => Promise<Result<Experience>>;
	update: (id: UUID, data: Partial<Experience>) => Promise<Result<Experience>>;
	remove: (id: UUID) => Promise<Result<Experience>>;
	publish: (id: UUID) => Promise<Result<Experience>>;
	unpublish: (id: UUID) => Promise<Result<Experience>>;
}
export const createExperienceRepository = (db: DB): ExperienceRepository => {
	const create = async (data: Experience) => {
		try {
			await db.experience.create({
				data: toDb(data),
			});
			const response: Result<Experience> = {
				success: true,
				data: data,
			};
			return response;
		} catch (error) {
			const response: Result<Experience> = {
				success: false,
				error: {
					code: 500,
					message: "Error creating the experience: Internal server error",
				},
			};
			return response;
		}
	};
	const list = async () => {
		try {
			const results = await db.experience.findMany();
			const mappedResults = results.map((experience) => fromDb(experience));
			const response: Result<Experience[]> = {
				success: true,
				data: mappedResults,
			};
			return response;
		} catch (error) {
			console.log(JSON.stringify(error, null, 2));
			const response: Result<Experience[]> = {
				success: false,
				error: {
					code: 500,
					message: "Error listing experiences: Internal server error",
				},
			};
			return response;
		}
	};
	const getById = async (id: UUID) => {
		try {
			const result = await db.experience.findUniqueOrThrow({
				where: {
					id,
				},
			});
			const mappedResult = fromDb(result);
			const response: Result<Experience> = {
				success: true,
				data: mappedResult,
			};
			return response;
		} catch (error) {
			const response: Result<Experience> = {
				success: false,
				error: {
					code: 404,
					message: "Error fetching the experience: Experience not found",
				},
			};
			return response;
		}
	};
	const update = async (id: UUID, data: Partial<Experience>) => {
		try {
			await db.experience.update({
				where: {
					id,
				},
				data: {
					...partialToDb(data),
				},
			});
			const response: Result<Experience> = {
				success: true,
				data: null,
			};
			return response;
		} catch (error) {
			const response: Result<Experience> = {
				success: false,
				error: {
					code: 500,
					message: "Error updating the experience: Internal server error",
				},
			};
			return response;
		}
	};
	const remove = async (id: UUID) => {
		try {
			await db.experience.delete({
				where: {
					id,
				},
			});
			const response: Result<Experience> = {
				success: true,
				data: null,
			};
			return response;
		} catch (error) {
			const response: Result<Experience> = {
				success: false,
				error: {
					code: 404,
					message: "Error removing the experience: Experience not found",
				},
			};
			return response;
		}
	};
	const handlePublishing = async (id: UUID, value: boolean) => {
		try {
			await db.experience.update({
				where: {
					id,
				},
				data: {
					published: value,
				},
			});
			const response: Result<Experience> = {
				success: true,
				data: null,
			};
			return response;
		} catch (error) {
			const response: Result<Experience> = {
				success: false,
				error: {
					code: 404,
					message: `${
						value === true ? "Error publishing the experience" : "Error unpublishing the experience"
					}: experience not found`,
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
