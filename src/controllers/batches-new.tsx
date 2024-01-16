import { Context } from 'hono';
import { Bindings } from '../binding';
import BatchesNew from '../pages/batches-new/index.server';
import getAll from '../repositories/get-all';
import { Tools } from '../entities/tools';
import { Organization } from '../entities/organization';
import getOne from '../repositories/get-one';

export default async function batchesNewController(c: Context<{ Bindings: Bindings }>) {
	const tools = await getAll<Tools>(c.env.DB, 'tools', undefined, undefined, undefined, "id desc")
	const org = await getOne<Organization>(c.env.DB, 'organizations', { id: { keyword: c.req.param('org_id') } })

	return c.html(<BatchesNew tools={ tools } organization={ org } />);
}
