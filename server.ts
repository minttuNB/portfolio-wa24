import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import config from "./config.ts";
const app = new Hono();
app.use("/*", cors());
app.use("/static/*", serveStatic({ root: "./" }));
app.get("/json", async (ctx) => {
	return ctx.json({});
});
app.get("/api/projects", async (ctx) => {
	return ctx.json([
		{
			"id": "aedca1bf-2aab-40fc-b007-868f435acdaf",
			"name": "Project 1",
			"description": "Sample project description",
			"date": "Year or a more definite date of project work/completion",
			"url": "https://example.project.party/fantastic",
			"images": [
				"path_to_image_1_can_be_used_as_splash.png",
				"path_to_eventual_image_2_3_4_if_we_want_a_full_project_page.jpg"
			]
		}
	]);
});
console.log(`Starting backend server on port ${config.port}`);
serve({
	fetch: app.fetch,
	port: config.port,
});