import { Hono } from 'hono'
import staticRoutes from './routes/static-routes'
import { Bindings } from './binding'
import errorRoutes from './routes/error-routes'
import webRoutes from './routes/web-routes'
import ajaxRoutes from './routes/ajax-routes'

const app = new Hono<{ Bindings: Bindings }>()

errorRoutes(app)
staticRoutes(app)
webRoutes(app)
ajaxRoutes(app)

// app.get("/", (c: any) => {
// 	return c.html("Asdasd")
// })

export default app
