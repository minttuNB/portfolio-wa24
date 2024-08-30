import "./style.css";
import { ProjectObject } from "./types.ts";
document.addEventListener("DOMContentLoaded", async () => {
	const projectDiv: HTMLDivElement =
		document.querySelector<HTMLDivElement>("#projects")!;
	let data: Promise<ProjectObject[]> = fetch("http://localhost:8080/api/projects").then((r) => r.json());
	(await data).forEach((element: ProjectObject) => {
		projectDiv.innerHTML += `<article><h2>${element.name}</h2>${element.description}</article>`;
	});
});
