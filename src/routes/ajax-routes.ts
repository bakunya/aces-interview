import { Bindings } from "../binding";
import { Hono } from "hono";
import ajaxGetToolsController from "../controllers/ajax.get-tools";
import ajaxGetSlotsController from "../controllers/ajax.get-slots";

export default function ajaxRoutes(app: Hono<{ Bindings: Bindings }>) {
	app.get('/ajax/tools', ajaxGetToolsController)
	app.get('/ajax/slots', ajaxGetSlotsController)
}
