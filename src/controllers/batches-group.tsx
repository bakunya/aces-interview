import { Context } from 'hono';
import { Bindings } from '../binding';
import getAll from '../repositories/get-all';
import { Batch } from '../entities/batch';
import E404 from '../layouts/404';
import getOne from '../repositories/get-one';
import BatchesSchedule from '../pages/batches-schedule/index.server';
import { TGroupSlots } from '../types/TGroupSlot';
import BatchesGroups from '../pages/batches-group/index.server';

export default async function batchesGroupController(c: Context<{ Bindings: Bindings }>) {
	async function getGroups(batchId: string) {
		const x = await getAll<TGroupSlots>(
			c.env.DB, 
			'groups', 
			{ 'groups.batch_id': { keyword: batchId } }, 
			[
				'groups.*',
				'slots.slot1',
				'slots.slot2',
				'slots.slot3',
				'slots.slot4',
				'slots.id as slot_id'
			],
			{ 
				slots: {
					foreign: 'id',
					reference: 'groups.slot_id',
				}
			}
		);

		return x
	}

	const batches = await getOne<Batch>(c.env.DB, 'batches', { id: { keyword: c.req.param('id') } });
	if(!batches) return c.html(<E404 />)
	
	const groups = await getGroups(batches.id)

	return c.html(<BatchesGroups batch={batches} groups={groups} />);
}
