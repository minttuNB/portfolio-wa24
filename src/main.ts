import { ProjectObject } from "./types.ts";
import { formHandler } from "./create-project.ts";
document.addEventListener("DOMContentLoaded", async () => {
	loadProjects();
	const addProjectLink: HTMLAnchorElement =
		document.querySelector<HTMLAnchorElement>("#add-project")!;
	addProjectLink.addEventListener("click", () => {
		document.querySelector<HTMLElement>("main")!.innerHTML = `<form>
				<h1>Add a project</h1>
				<p id="response-message"></p>
				<label for="name">Project name (required)</label>
				<input type="text" name="name" id="name" placeholder="My fantastic project" required>
				<label for="description">Project description</label><input type="text" name="description" id="description" placeholder="A project solving all the problems in the world, and...">
				<label for="date">Project date</label><input type="date" name="date" id="date">
				<label for="url">Project URL</label><input type="url" name="url" id="url" placeholder="https://episkklutprosjekt.no">
				<label for="image-url">Image URL</label><input type="url" name="image-url" id="image-url">
				<input type="submit" value="Add project">
			</form>`;
		formHandler();
	});
});
const loadProjects = async () => {
	const projectDiv: HTMLDivElement =
		document.querySelector<HTMLDivElement>("#projects")!;
	let data: Promise<ProjectObject[]> = fetch(
		"http://localhost:8080/api/projects"
	).then((r) => r.json());
	(await data).forEach((element: ProjectObject) => {
		projectDiv.innerHTML += `<article><img src="${element.images ? element.images[0] : "https://via.placeholder.com/300"}" alt="${element.name}"><section><h2>${element.name}</h2><p>${
			element.description || "<i>No description provided</i>"
		}</p>${element.url ? `<a class='link-button' href="${element.url}">Learn more</a>`: ""}</section></article>`;
	});
};
