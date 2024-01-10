import { Hono } from 'hono';
import { Bindings } from '../binding';
import { serveStatic } from 'hono/cloudflare-workers';

export default function staticRoutes(app: Hono<{ Bindings: Bindings }>) {
	app.use('/js/*', serveStatic({ root: './' }));
	app.use('/css/*', serveStatic({ root: './' }));
	app.use('/static/*', serveStatic({ root: './' }));
	app.use('/compiled/*', serveStatic({ root: './' }));
	app.use('/extensions/*', serveStatic({ root: './' }));
}
