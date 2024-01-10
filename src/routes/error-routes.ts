import { Hono } from 'hono';
import { Bindings } from '../binding';

export default function errorRoutes(app: Hono<{ Bindings: Bindings }>) {
	app.onError((err, ctx) => {
		console.log(err.stack);

		if (ctx.req.header().accept === 'application/json') {
			return ctx.json({ error: err.message }, 500, {
				'Content-Type': 'application/json',
			});
		}
		if (ctx.req.header('HX-Request') === 'true') return ctx.text('Server Error', 500);

		return ctx.html("Server Error", 500);
	});
}
