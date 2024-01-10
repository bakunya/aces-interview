import { Context } from 'hono';
import { Bindings } from '../binding';
import { parseBody } from 'hono/utils/body';

export default async function adminBatchesAddParticipantsPostController(c: Context<{ Bindings: Bindings }>) {
	const id = c.req.param('id');
	const dataJson = await parseBody(c.req)
	const dataParsed = dataJson.participants ? JSON.parse(dataJson.participants as unknown as string) : []

	return c.html(<pre>{JSON.stringify(dataParsed, null, 2)}</pre>)
}
