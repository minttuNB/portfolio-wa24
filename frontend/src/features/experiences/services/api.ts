import config from "../../../config";
import { UUID } from "../../../types";

async function read(id?: UUID) {
	if (id) {
		return fetch(new URL(`${config.api.url}api/experiences/${id}`)).then((res) => res.json());
	} else {
		return fetch(new URL(`${config.api.url}api/experiences`)).then((res) => res.json());
	}
}
export default {
	read,
};
