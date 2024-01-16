import { Context } from 'hono';
import { Bindings } from '../binding';
import getAll from '../repositories/get-all';
import { Tools } from '../entities/tools';

export default async function ajaxGetToolsController(c: Context<{ Bindings: Bindings }>) {
	const id = c.req.queries('id')
	const q = id ? { id: { keyword: id } } : undefined
	return c.json((await getAll<Tools>(c.env.DB, "tools", q)))
}
