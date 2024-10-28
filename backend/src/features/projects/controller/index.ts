import { Hono } from "hono";
import { projectService, ProjectService } from "../service";
import { authenticate } from "../../users/lib/middleware";
import { ContextVariables } from "../../../types";
import { UUID } from "crypto";
import { Project } from "../types";

export const createProjectController = (projectService: ProjectService) => {
	const app = new Hono<{ Variables: ContextVariables }>();
	app.get("/", authenticate(), async (ctx) => {
		const user = ctx.get("user");
		const result = await projectService.list();
		if (result.success === true) {
			if (user && user.role === "admin") {
				return ctx.json(result);
			} else {
				return ctx.json(result.data?.filter((project) => project.published));
			}
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.get("/:id", authenticate(), async (ctx) => {
		const user = ctx.get("user");
		const projectId = (await ctx.req.param("id")) as UUID;
		const result = await projectService.getById(projectId);
		if (result.success === true) {
			if (result.data?.published || (user && user.role === "admin")) {
				return ctx.json(result);
			} else if ((!result.data?.published && !user) || (user && user.role !== "admin")) {
				return ctx.json(
					{
						success: false,
						error: {
							code: 401,
							message: "Error while fetching project: unauthorized",
						},
					},
					401
				);
			}
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.post("/", async (ctx) => {
		const projectData = (await ctx.req.json()) as Project;
		const result = await projectService.create(projectData);
		if (result.success === true) {
			return ctx.json(result, 201);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.patch("/:id", async (ctx) => {
		const projectId = (await ctx.req.param("id")) as UUID;
		const projectData = (await ctx.req.json()) as Partial<Project>;
		const result = await projectService.update(projectId, projectData);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.patch("/:id/publish", async (ctx) => {
		const projectId = (await ctx.req.param("id")) as UUID;
		const result = await projectService.publish(projectId);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.patch("/:id/unpublish", async (ctx) => {
		const projectId = (await ctx.req.param("id")) as UUID;
		const result = await projectService.unpublish(projectId);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.delete("/:id", async (ctx) => {
		const projectId = (await ctx.req.param("id")) as UUID;
		const result = await projectService.remove(projectId);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	return app;
};
export const projectController = createProjectController(projectService);
