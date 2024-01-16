import { Context } from 'hono';
import { Bindings } from '../binding';
import Batches from '../pages/batches';
import getAll from '../repositories/get-all';
import { Batches as IBatches } from '../entities/batch';

export default async function batchesListController(c: Context<{ Bindings: Bindings }>) {
	const batches = await getAll<IBatches>(c.env.DB, 'batches', undefined, undefined, undefined, "date desc");
	return c.html(<Batches batches={ batches } />);
}
