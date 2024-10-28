import { UUID } from "crypto";
import { experienceSchema, validateUUID } from "../lib/validate";
import { createExperienceRepository, ExperienceRepository } from "../repository";
import { Experience } from "../types";
import { Result } from "../../../types";
import prisma from "../../../db/client";
export interface ExperienceService {
	create: (data: Experience) => Promise<Result<Experience>>;
	list: () => Promise<Result<Experience[]>>;
	getById: (id: UUID) => Promise<Result<Experience>>;
	update: (id: UUID, data: Partial<Experience>) => Promise<Result<Experience>>;
	remove: (id: UUID) => Promise<Result<Experience>>;
	publish: (id: UUID) => Promise<Result<Experience>>;
	unpublish: (id: UUID) => Promise<Result<Experience>>;
}
export const createExperienceService = (experienceRepository: ExperienceRepository) => {
	return {
		create: async (data: Experience) => {
			try {
				data = experienceSchema.parse({
					...data,
					id: crypto.randomUUID(),
					createdAt: new Date().toISOString(),
					published: true, //true by default due to unfinished authentication system - unpublished invisible to guests
				});
				return experienceRepository.create(data);
			} catch (error) {
				const response: Result<Experience> = {
					success: false,
					error: {
						code: 400,
						message: "Error creating the experience: invalid experience data",
					},
				};
				return response;
			}
		},
		list: experienceRepository.list,
		getById: async (id: UUID) => {
			try {
				id = validateUUID(id);
				return experienceRepository.getById(id);
			} catch (error) {
				const response: Result<Experience> = {
					success: false,
					error: {
						code: 400,
						message: "Error fetching the experience: invalid experience id",
					},
				};
				return response;
			}
		},
		update: async (id: UUID, data: Partial<Experience>) => {
			try {
				id = validateUUID(id);
				return experienceRepository.update(id, data);
			} catch (error) {
				const response: Result<Experience> = {
					success: false,
					error: {
						code: 400,
						message: "Error updating the experience: invalid experience id",
					},
				};
				return response;
			}
		},
		remove: async (id: UUID) => {
			try {
				id = validateUUID({ id });
				return experienceRepository.remove(id);
			} catch (error) {
				const response: Result<Experience> = {
					success: false,
					error: {
						code: 400,
						message: "Error removing the experience: invalid experience id",
					},
				};
				return response;
			}
		},
		publish: async (id: UUID) => {
			try {
				id = validateUUID({ id });
				return experienceRepository.publish(id);
			} catch (error) {
				const response: Result<Experience> = {
					success: false,
					error: {
						code: 400,
						message: "Error publishing the experience: invalid experience id",
					},
				};
				return response;
			}
		},
		unpublish: async (id: UUID) => {
			try {
				id = validateUUID({ id });
				return experienceRepository.unpublish(id);
			} catch (error) {
				const response: Result<Experience> = {
					success: false,
					error: {
						code: 400,
						message: "Error unpublishing the experience: invalid experience id",
					},
				};
				return response;
			}
		},
	};
};
export const experienceService = createExperienceService(createExperienceRepository(prisma!));
