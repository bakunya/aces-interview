import { Context } from 'hono';
import { Bindings } from '../binding';
import getAll from '../repositories/get-all';
import { Slots } from '../entities/slot';

export default async function ajaxGetSlotsController(c: Context<{ Bindings: Bindings }>) {
	const slot_type = c.req.queries('slot_type')
	const q = slot_type ? { slot_type: { keyword: slot_type } } : undefined
	return c.json((await getAll<Slots>(c.env.DB, "slots", q)))
}
