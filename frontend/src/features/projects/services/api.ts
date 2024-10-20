import config from "../../../config";
import { ProjectProps } from "../../../types";
import { validateProject, validateProjects } from "../lib/validate";

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
	const data: ProjectProps[] = await fetch(new URL(`${config.api.url}api/projects`)).then((res) => res.json());
	const validatedData = validateProjects(data);
	return validatedData;
}
async function readOne(id: ReturnType<typeof crypto.randomUUID>) {
	const data: ProjectProps = await fetch(new URL(`${config.api.url}api/projects/${id}`)).then((res) => res.json());
	const validatedData = validateProject(data);
	return validatedData;
}
async function remove(id: ReturnType<typeof crypto.randomUUID>) {
	return fetch(new URL(`${config.api.url}api/projects/${id}`), {
		method: "DELETE",
	});
}
export default {
	create,
	read,
	remove,
};
