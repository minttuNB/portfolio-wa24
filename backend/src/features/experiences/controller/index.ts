import { Hono } from "hono";
import { experienceService, ExperienceService } from "../service";
import { authenticate } from "../../users/lib/middleware";
import { UUID } from "crypto";
import { Experience } from "../types";

export const createExperienceController = (experienceService: ExperienceService) => {
	const app = new Hono();
	app.get("/", async (ctx) => {
		const result = await experienceService.list();
		if (result.success === true) {
			return ctx.json(result);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.get("/:id", async (ctx) => {
		const experienceId = (await ctx.req.param("id")) as UUID;
		const result = await experienceService.getById(experienceId);
		if (result.success === true) {
			return ctx.json(result);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.post("/", async (ctx) => {
		const experienceData = (await ctx.req.json()) as Experience;
		const result = await experienceService.create(experienceData);
		if (result.success === true) {
			return ctx.json(result, 201);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.patch("/:id", async (ctx) => {
		const experienceId = (await ctx.req.param("id")) as UUID;
		const experienceData = (await ctx.req.json()) as Partial<Experience>;
		const result = await experienceService.update(experienceId, experienceData);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.patch("/:id/publish", async (ctx) => {
		const experienceId = (await ctx.req.param("id")) as UUID;
		const result = await experienceService.publish(experienceId);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.patch("/:id/unpublish", async (ctx) => {
		const experienceId = (await ctx.req.param("id")) as UUID;
		const result = await experienceService.unpublish(experienceId);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	app.delete("/:id", async (ctx) => {
		const experienceId = (await ctx.req.param("id")) as UUID;
		const result = await experienceService.remove(experienceId);
		if (result.success === true) {
			return ctx.body(null, 204);
		} else {
			return ctx.json(result, result.error.code);
		}
	});
	return app;
};
export const experienceController = createExperienceController(experienceService);
