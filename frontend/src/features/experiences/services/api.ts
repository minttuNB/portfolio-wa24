import config from "../../../config";
import { UUID } from "../../../types";
import { validateExperience, validateExperiences } from "../lib/validate";
import { ExperienceProps } from "../types";

async function read() {
	const data: ExperienceProps[] = await fetch(new URL(`${config.api.url}api/experiences`)).then((res) => res.json());
	const validatedData = validateExperiences(data);
	return validatedData;
}
async function readOne(id: UUID) {
	const data: ExperienceProps = await fetch(new URL(`${config.api.url}api/experiences/${id}`)).then((res) =>
		res.json()
	);
	const validatedData = validateExperience(data);
	return validatedData;
}
export default {
	read,
};
