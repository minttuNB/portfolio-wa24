import config from "../../../config";
import { UUID } from "../../../types";
import { validateProject, validateProjects } from "../lib/validate";
import { ProjectProps } from "../types";

async function create(project: Partial<ProjectProps>) {
	return fetch(new URL(`${config.api.url}api/projects`), {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
}
async function read() {
	const data: ProjectProps[] = await fetch(new URL(`${config.api.url}api/projects`), {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
	const validatedData = validateProjects(data);
	return validatedData;
}
// @ts-expect-error
async function readOne(id: UUID) {
	const data: ProjectProps = await fetch(new URL(`${config.api.url}api/projects/${id}`)).then((res) => res.json());
	const validatedData = validateProject(data);
	return validatedData;
}
async function update(project: Partial<ProjectProps>) {
	return fetch(new URL(`${config.api.url}api/projects/${project.id}`), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
}
async function remove(id: UUID) {
	return fetch(new URL(`${config.api.url}api/projects/${id}`), {
		method: "DELETE",
	});
}
export default {
	create,
	read,
	update,
	remove,
};
