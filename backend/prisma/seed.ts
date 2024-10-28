import { readFile } from "fs/promises";
import prisma from "../src/db/client";
import { toDb as experienceToDb } from "../src/features/experiences/mappers";
import { experiencesSchema } from "../src/features/experiences/lib/validate";

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
async function main() {
	console.log(`Seeding is starting.`);
	await createExperiences();
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
