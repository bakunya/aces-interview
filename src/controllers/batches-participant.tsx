import { Context } from 'hono';
import { Bindings } from '../binding';
import { Batch } from '../entities/batch';
import E404 from '../layouts/404';
import getOne from '../repositories/get-one';
import BatchesGroups from '../pages/batches-group/index.server';
import getAll from '../repositories/get-all';
import BatchesParticipants from '../pages/batches-participant/index.server';
import { Persons } from '../entities/person';

export default async function batchesParticipantController(c: Context<{ Bindings: Bindings }>) {
	const batches = await getOne<Batch>(c.env.DB, 'batches', { id: { keyword: c.req.param('id') } });
	if(!batches) return c.html(<E404 />)
	
	const participants = await getAll<Persons>(c.env.DB, 'persons', { batch_id: { keyword: batches.id } })

	return c.html(<BatchesParticipants batch={batches} participants={participants} />);
}
