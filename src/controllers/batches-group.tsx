import { Context } from 'hono';
import E404 from '../layouts/404';
import { Bindings } from '../binding';
import getAll from '../repositories/get-all';
import { Batch } from '../entities/batch';
import getOne from '../repositories/get-one';
import { TGroupSlots } from '../types/TGroupSlot';
import BatchesGroups from '../pages/batches-group/index.server';
import { getMinimumAssessor } from '../repositories/get-minimum-assessor';

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

		const participantCount = (
			await c.env.DB.prepare(`
				SELECT 
					count(person_id) as person_count,
					group_id
				FROM groupings
				WHERE batch_id = ?
				GROUP BY group_id
			`).bind(batchId).all()
		).results

		return x.map((group) => {
			const count = participantCount.find((x) => x.group_id === group.id)
			return {
				...group,
				participant_count: count?.person_count || 0
			}
		}) as TGroupSlots
	}

	const batches = await getOne<Batch>(c.env.DB, 'batches', { id: { keyword: c.req.param('id') } })
	if(!batches) return c.html(<E404 />)
	
	const groups = await getGroups(batches.id)
	const minimumAssessor = await getMinimumAssessor(c.env.DB, batches.id)

	return c.html(<BatchesGroups batch={batches} groups={groups} minimumAssessor={minimumAssessor} />);
}
