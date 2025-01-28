import type { MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { getUser } from "./auth";

export const authenticate = (): MiddlewareHandler => {
	return async function authenticate(ctx, next) {
		const user = getUser(ctx.req.raw);
		//if (!user) throw new HTTPException(401);
		if (user) ctx.set("user", user);
		await next();
	};
};
