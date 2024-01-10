import { Context } from 'hono';
import { Bindings } from '../binding';
import getAll from '../repositories/get-all';
import { Batch } from '../entities/batch';
import E404 from '../layouts/404';
import getOne from '../repositories/get-one';
import { TGroupingPersonSlotGroups } from '../types/TGroupingPersonSlotGroup';
import BatchesSchedule from '../pages/batches-schedule/index.server';

export default async function batchesAssessorController(c: Context<{ Bindings: Bindings }>) {
	async function getGroupAssessor(batchId: string) {
		const x = await getAll<any>(
			c.env.DB, 
			'groups', 
			{ 'groups.batch_id': { keyword: batchId } }, 
			[
				'groups.group_ass_id',
				'assessors.*',
			],
			{ 
				assessors: {
					foreign: 'id',
					reference: 'groups.group_ass_id',
				},
			}
		);

		return x
	}

	async function getF2FAssessor(batchId: string) {
		const x = await getAll<any>(
			c.env.DB, 
			'groupings', 
			{ 'groupings.batch_id': { keyword: batchId } }, 
			[
				'DISTINCT groupings.f2f_ass_id',
				'assessors.*',
			],
			{ 
				assessors: {
					foreign: 'id',
					reference: 'groupings.f2f_ass_id',
				},
			}
		);

		return x
	}

	const batches = await getOne<Batch>(c.env.DB, 'batches', { id: { keyword: c.req.param('id') } });
	if(!batches) return c.html(<E404 />)
	
	const f2fAssesors = await getF2FAssessor(batches.id)
	const groupAssesors = await getGroupAssessor(batches.id)

	return c.html(
		<div>
			{/* <pre>{JSON.stringify(f2fAssesors, null, 2)}</pre> */}
			<pre>{JSON.stringify(groupAssesors, null, 2)}</pre>
		</div>
	);
}
