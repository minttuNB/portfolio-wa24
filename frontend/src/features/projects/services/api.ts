import config from "../../../config";
import { UUID } from "../../../types";
import { validateProject, validateProjects } from "../lib/validate";
import { ProjectProps } from "../types";

async function create(project: Partial<ProjectProps>) {
	return fetch(new URL(`${config.api.url}api/v1/projects`), {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
}
async function read() {
	const data = await fetch(new URL(`${config.api.url}api/v1/projects`), {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
	console.log(data);
	if (data.success === true) {
		const validatedData = validateProjects(data.data);
		return validatedData;
	} else if (data.success === false) {
		throw new Error(data.error.message);
	}
}
// @ts-expect-error
async function readOne(id: UUID) {
	const data = await fetch(new URL(`${config.api.url}api/v1/projects/${id}`)).then((res) => res.json());
	if (data.success === true) {
		const validatedData = validateProject(data.data);
		return validatedData;
	} else if (data.success === false) {
		throw new Error(data.error.message);
	}
}
async function update(project: Partial<ProjectProps>) {
	return fetch(new URL(`${config.api.url}api/v1/projects/${project.id}`), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
}
async function publish(id: UUID) {
	return fetch(new URL(`${config.api.url}api/v1/projects/${id}/publish`), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
	});
}
async function unpublish(id: UUID) {
	return fetch(new URL(`${config.api.url}api/v1/projects/${id}/unpublish`), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
	});
}
async function remove(id: UUID) {
	return fetch(new URL(`${config.api.url}api/v1/projects/${id}`), {
		method: "DELETE",
	});
}
export default {
	create,
	read,
	update,
	publish,
	unpublish,
	remove,
};
