import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import config from "./config.ts";
import { readFile } from "node:fs/promises";
const app = new Hono();
app.use("/*", cors());
app.use("/static/*", serveStatic({ root: "./" }));
app.get("/json", async (ctx) => {
	return ctx.json({});
});
app.get("/api/projects", async (ctx) => {
	const jsonData = await readFile("projects.json", "utf-8");
	return ctx.json(JSON.parse(await jsonData));
});
app.put("/api/projects", async (ctx) => {
	//TODO: Create HTML form for creating projects to match
});
console.log(`Starting backend server on port ${config.port}`);
serve({
	fetch: app.fetch,
	port: config.port,
});
