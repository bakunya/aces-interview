import { Context } from "hono";
import { Bindings } from "../binding";

export default function redirectMiddleware(path: string) {
	return (c: Context<{ Bindings: Bindings }>) => {
		return c.redirect(path);
	}
}