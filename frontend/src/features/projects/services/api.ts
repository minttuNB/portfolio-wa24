import config from "../../../config";
import { ProjectProps } from "../../../types";
import { projectSchema, projectsSchema } from "../lib/validate";

async function create(project: Partial<ProjectProps>) {
	return fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`), {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
}
async function read() {
	const data: ProjectProps[] = await fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`)).then(
		(res) => res.json()
	);
	return projectsSchema.parse(data);
}
async function readOne(id: ReturnType<typeof crypto.randomUUID>) {
	const data: ProjectProps = await fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects/${id}`)).then(
		(res) => res.json()
	);
	return projectSchema.parse(data);
}
async function remove(id: ReturnType<typeof crypto.randomUUID>) {
	return fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects/${id}`), {
		method: "DELETE",
	});
}
export default {
	create,
	read,
	remove,
};
