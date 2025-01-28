import config from "../../../config";
import { UUID } from "../../../types";
import { validateExperience, validateExperiences } from "../lib/validate";
import { ExperienceProps } from "../types";

async function create(experience: Partial<ExperienceProps>) {
	return fetch(new URL(`${config.api.url}api/v1/experiences`), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(experience),
	});
}
async function read() {
	const data = await fetch(new URL(`${config.api.url}api/v1/experiences`)).then((res) => res.json());
	if (data.success === true) {
		const validatedData = validateExperiences(data.data);
		return validatedData;
	} else if (data.success === false) {
		throw new Error(data.error.message);
	}
}
async function readOne(id: UUID) {
	const data = await fetch(new URL(`${config.api.url}api/v1/experiences/${id}`)).then((res) => res.json());
	if (data.success === true) {
		const validatedData = validateExperience(data.data);
		return validatedData;
	} else if (data.success === false) {
		throw new Error(data.error.message);
	}
}
async function update(experience: Partial<ExperienceProps>) {
	return fetch(new URL(`${config.api.url}api/v1/experiences/${experience.id}`), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(experience),
	});
}
async function publish(id: UUID) {
	return fetch(new URL(`${config.api.url}api/v1/experiences/${id}/publish`), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
	});
}
async function unpublish(id: UUID) {
	return fetch(new URL(`${config.api.url}api/v1/experiences/${id}/unpublish`), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
	});
}
async function remove(id: UUID) {
	return fetch(new URL(`${config.api.url}api/v1/experiences/${id}`), {
		method: "DELETE",
	});
}
export default {
	create,
	read,
	readOne,
	update,
	publish,
	unpublish,
	remove,
};
