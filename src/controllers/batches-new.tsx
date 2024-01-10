import { Context } from 'hono';
import { Bindings } from '../binding';
import BatchesNew from '../pages/batches-new/index.server';
import { OrganizationModel } from '../models/organization';
import getAll from '../repositories/get-all';
import { Tools } from '../entities/tools';

export default async function batchesNewController(c: Context<{ Bindings: Bindings }>) {
	const organization = new OrganizationModel(c.env.DB, { name: "PT. Best", id: "1" })
	const tools = await getAll<Tools>(c.env.DB, 'tools', undefined, undefined, undefined, "id desc")
	return c.html(<BatchesNew tools={tools} organization={ [organization] } />);
}
