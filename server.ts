import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import config from "./config.ts";
import { readFile, writeFile } from "node:fs/promises";
//TODO: separate types file for backend to separate frontend and backend properly
import { ProjectObject } from "./src/types.ts";
const app = new Hono();
app.use("*", cors());
app.use("/static/*", serveStatic({ root: "./" }));
app.get("/api/projects", async (ctx) => {
	const jsonData = await readFile("projects.json", "utf-8");
	return ctx.json(JSON.parse(await jsonData));
});
app.put("/api/projects", async (ctx) => {
	let data = await ctx.req.json();
	let projectObject: ProjectObject;
	//Validate fields and build object
	if (data.name.length === 0) {
		return ctx.json({ message: "The project name cannot be empty" }, 400);
	}
	else{
		projectObject  = {
			id: crypto.randomUUID(),
			name: data.name
		};
	}
	if (data.date.length !== 0 && typeof new Date(data.date) === null) {
		return ctx.json({ message: "The date is invalid" }, 400);
	}
	else{
		projectObject.date = new Date(data.date);
	}
	if (data.url.length !== 0) {
		let url: URL;
		try {
			url = new URL(data.url);
		} catch (error) {
			return ctx.json({ message: "The project URL is invalid" }, 400);
		}
		projectObject.url = new URL(url)
	}
	if (data["image-url"].length !== 0) {
		let url: URL;
		try {
			url = new URL(data["image-url"]);
		} catch (error) {
			return ctx.json({ message: "The image URL is invalid" }, 400);
		}
		projectObject.images = [ url ];
	}
	//Update file with new project (TODO: factor out into storage handling functions)
	let jsonData: ProjectObject[] = JSON.parse(await readFile("projects.json", "utf-8"));
	jsonData.push(projectObject);
	writeFile("projects.json", JSON.stringify(jsonData), { encoding: "utf-8"});
	return ctx.json({ message: "Project successfully created", "resource-id": projectObject.id }, 201);
});
console.log(`Starting backend server on port ${config.port}`);
serve({
	fetch: app.fetch,
	port: config.port,
});
