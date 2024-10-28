import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "fs/promises";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Experience } from "./features/experiences/types";
import { projectController } from "./features/projects/controller";
const app = new Hono();
app.use(
	"/*",
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use("/static/*", serveStatic({ root: "./" }));
app.route("/api/v1/projects", projectController);
app.get("/api/experiences", async (ctx) => {
	const jsonData = await readFile("./data/experiences.json", "utf-8");
	return ctx.json(JSON.parse(await jsonData) as Experience[]);
});
export default app;
