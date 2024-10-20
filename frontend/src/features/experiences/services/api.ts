import config from "../../../config";

async function read(id?: ReturnType<typeof crypto.randomUUID>) {
	if (id) {
		return fetch(new URL(`${config.api.url}api/experiences/${id}`)).then((res) => res.json());
	} else {
		return fetch(new URL(`${config.api.url}api/experiences`)).then((res) => res.json());
	}
}
export default {
	read,
};
