import config from "../../config";
import { ProjectProps } from "../../types";

async function create(project: Partial<ProjectProps>) {
	return fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`), {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
}
async function read(id?: ReturnType<typeof crypto.randomUUID>) {
	if (id) {
		return fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects/${id}`)).then((res) => res.json());
	} else {
		return fetch(new URL(`${config.apiAddress}:${config.apiPort}/api/projects`)).then((res) => res.json());
	}
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
