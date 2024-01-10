import { Context } from 'hono';
import { Bindings } from '../binding';
import Batches from '../pages/batches';
import getAll from '../repositories/get-all';
import { Batches as IBatches } from '../entities/batch';

export default async function batchesListController(c: Context<{ Bindings: Bindings }>) {
	// const x = await c.env.DB.prepare('select distinct slot_type from slots').all();

	// return c.html(<pre>{JSON.stringify(x.results, null, 2)}</pre>);


	const batches = await getAll<IBatches>(c.env.DB, 'batches', undefined, undefined, undefined, "date desc");
	return c.html(<Batches batches={ batches } />);
}
