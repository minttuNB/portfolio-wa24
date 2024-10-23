import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "fs/promises";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { UUID } from "crypto";
import { Project } from "./features/projects/types";
import { Experience } from "./features/experiences/types";
import { ContextVariables } from "./types";
import { authenticate } from "./features/users/lib/middleware";
const app = new Hono<{ Variables: ContextVariables }>();
app.use(
	"/*",
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use("/static/*", serveStatic({ root: "./" }));
app.get("/api/projects", authenticate(), async (ctx) => {
	const jsonData = await getProjects();
	if (ctx.get("user")) return ctx.json(jsonData);
	else return ctx.json(jsonData.filter((project) => project.published === true));
});
app.put("/api/projects", async (ctx) => {
	let data = await ctx.req.json();
	let project: Project;
	//Validate fields and build object
	if (data.name.length === 0) {
		return ctx.json({ message: "The project name cannot be empty" }, 400);
	} else {
		project = {
			id: crypto.randomUUID(),
			name: data.name,
			createdAt: new Date(),
			published: false,
		};
	}
	if (data.description && data.description.length > 0) project.description = data.description;
	if (data.date && data.date.length !== 0 && typeof new Date(data.date) === null) {
		return ctx.json({ message: "The date is invalid" }, 400);
	} else {
		project.date = new Date(data.date);
	}
	if (data.url && data.url.length !== 0) {
		let url: URL;
		try {
			url = new URL(data.url);
		} catch (error) {
			return ctx.json({ message: "The project URL is invalid" }, 400);
		}
		project.url = url;
	}
	if (data["images"] && data["images"].length !== 0) {
		let url: URL;
		try {
			url = new URL(data["images"][0]);
		} catch (error) {
			return ctx.json({ message: "The image URL is invalid" }, 400);
		}
		project.images = [url];
	}
	if (data.categories && data.categories.length !== 0) {
		project.categories = data.categories;
	}
	//Update file with new project (TODO: factor out into storage handling functions)
	let jsonData: Project[] = await getProjects();
	jsonData.push(project);
	writeProjects(jsonData);
	return ctx.json(
		{
			message: "Project successfully created",
			"resource-id": project.id,
		},
		201
	);
});
app.patch("/api/projects/:id", async (ctx) => {
	const projectId = (await ctx.req.param("id")) as UUID;
	let projectsData = await getProjects();
	let incomingProjectData = (await ctx.req.json()) as Project;
	let foundProject = projectsData.find((project) => project.id === projectId);
	if (foundProject) {
		//hardcoded published only
		foundProject.published = incomingProjectData.published;
		writeProjects(projectsData);
		ctx.status(204);
		return ctx.body(null);
	}
	return ctx.json({ message: "The given project ID doesn't match any existing projects." }, 400);
});
app.delete("/api/projects/:id", async (ctx) => {
	const projectId = (await ctx.req.param("id")) as UUID;
	let jsonData = await getProjects();
	jsonData = jsonData.filter((project) => project.id !== projectId);
	writeProjects(jsonData);
	ctx.status(204);
	return ctx.body(null);
});
app.get("/api/experiences", async (ctx) => {
	const jsonData = await readFile("./data/experiences.json", "utf-8");
	return ctx.json(JSON.parse(await jsonData) as Experience[]);
});
async function getProjects() {
	return JSON.parse(await readFile("./data/projects.json", "utf-8")) as Project[];
}
function writeProjects(data: Project[]) {
	writeFile("./data/projects.json", JSON.stringify(data, null, 2), {
		encoding: "utf-8",
	});
}
export default app;
