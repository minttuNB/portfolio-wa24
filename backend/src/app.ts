import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "fs/promises";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Project } from "./types";
const app = new Hono();
app.use("*", cors());
app.use("/static/*", serveStatic({ root: "./" }));
app.get("/api/projects", async (ctx) => {
	const jsonData = await readFile("./data/projects.json", "utf-8");
	return ctx.json(JSON.parse(await jsonData) as Project[]);
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
		};
	}
	if (data.description.length > 0) project.description = data.description;
	if (data.date.length !== 0 && typeof new Date(data.date) === null) {
		return ctx.json({ message: "The date is invalid" }, 400);
	} else {
		project.date = new Date(data.date);
	}
	if (data.url.length !== 0) {
		let url: URL;
		try {
			url = new URL(data.url);
		} catch (error) {
			return ctx.json({ message: "The project URL is invalid" }, 400);
		}
		project.url = url;
	}
	if (data["image-url"].length !== 0) {
		let url: URL;
		try {
			url = new URL(data["image-url"]);
		} catch (error) {
			return ctx.json({ message: "The image URL is invalid" }, 400);
		}
		project.images = [url];
	}
	//Update file with new project (TODO: factor out into storage handling functions)
	let jsonData: Project[] = JSON.parse(await readFile("./data/projects.json", "utf-8"));
	jsonData.push(project);
	writeFile("./data/projects.json", JSON.stringify(jsonData, null, 2), {
		encoding: "utf-8",
	});
	return ctx.json(
		{
			message: "Project successfully created",
			"resource-id": project.id,
		},
		201
	);
});
export default app;
