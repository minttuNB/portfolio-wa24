import { readFile } from "fs/promises";
import prisma from "../src/db/client";
import { toDb as experienceToDb } from "../src/features/experiences/mappers";
import { toDb as projectToDb } from "../src/features/projects/mappers";
import { experiencesSchema } from "../src/features/experiences/lib/validate";
import { projectsSchema } from "../src/features/projects/lib/validate";

const createExperiences = async () => {
	const experiences = experiencesSchema.parse(JSON.parse(await readFile("data/experiences.json", "utf-8")));
	await Promise.all(
		experiences.map(async (experience) => {
			await prisma.experience.create({
				data: {
					...experienceToDb(experience),
				},
			});
		})
	);
};
const createProjects = async () => {
	const projects = projectsSchema.parse(JSON.parse(await readFile("data/projects.json", "utf-8")));
	await Promise.all(
		projects.map(async (project) => {
			await prisma.project.create({
				data: {
					...projectToDb(project),
				},
			});
		})
	);
};
async function main() {
	console.log(`Seeding is starting.`);
	await createExperiences();
	await createProjects();
	console.log(`Seeding finished.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
