import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { projectController } from "./features/projects/controller";
import { experienceController } from "./features/experiences/controller";
import { env } from "./lib/env";
const app = new Hono();
app.use(
	"/*",
	cors({
		origin: env.FRONTEND_URL,
		credentials: true,
	})
);
app.use("/static/*", serveStatic({ root: "./" }));
app.route("/api/v1/projects", projectController);
app.route("/api/v1/experiences", experienceController);
export default app;
