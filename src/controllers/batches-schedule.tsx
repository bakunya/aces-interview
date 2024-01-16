import { Context } from 'hono';
import { Bindings } from '../binding';
import getAll from '../repositories/get-all';
import { Batch } from '../entities/batch';
import E404 from '../layouts/404';
import getOne from '../repositories/get-one';
import { TGroupingPersonSlotGroups } from '../types/TGroupingPersonSlotGroup';
import BatchesSchedule from '../pages/batches-schedule/index.server';
import { getMinimumAssessor } from '../repositories/get-minimum-assessor';

export default async function batchesScheduleController(c: Context<{ Bindings: Bindings }>) {
	async function getGrouping(batchId: string) {
		const x = await getAll<TGroupingPersonSlotGroups>(
			c.env.DB, 
			'groupings', 
			{ 'groupings.batch_id': { keyword: batchId } }, 
			[
				'groupings.*',
				'persons.id as person_id',
				'persons.fullname as person_fullname',
				'slots.slot1',
				'slots.slot2',
				'slots.slot3',
				'slots.slot4',
				'slots.id as slot_id',
				'groups.group_ass_id',
				'groups.name as group_name',
			],
			{ 
				persons: {
					foreign: 'id',
					reference: 'groupings.person_id',
				},
				groups: {
					foreign: 'id',
					reference: 'groupings.group_id',
				},
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
	
	const groupings = await getGrouping(batches.id)
	const minimumAssessor = await getMinimumAssessor(c.env.DB, batches.id)

	return c.html(<BatchesSchedule batch={batches} minimumAssessor={minimumAssessor} grouping={groupings} />);
}
