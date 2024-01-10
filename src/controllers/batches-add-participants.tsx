import { Context } from 'hono';
import { Bindings } from '../binding';
import { Batch } from '../entities/batch';
import getOne from '../repositories/get-one';
import BatchesAddParticipants from '../pages/batches-add-participants/index.server';

export default async function batchesAddParticipantsController(c: Context<{ Bindings: Bindings }>) {
	const id = c.req.param('id');
	const batch = await getOne<Batch>(c.env.DB, 'batches', {id: { keyword: id }});
	return c.html(<BatchesAddParticipants batch={batch} />);
}
