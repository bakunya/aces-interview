import * as z from "zod";
import { Context, Next } from "hono";
import { Bindings } from "../../binding";
import { parseBody } from "hono/utils/body";
import { IContractBatchesBulkDelete } from "../../contracts/requests/batches-participant-bulk-delete";

export default async function batchesParticipantBulkDeleteValidator(c: Context<{Bindings: Bindings}>, next: Next) {
	const body = await parseBody(c.req)
	if(!body?.participant_id) return c.redirect('/batches/new?error-message=invalid body')
	const participantId = JSON.parse(body.participant_id as string)
	const batchId = c.req.param('id')!

	const schema = z.object({
		batch_id: z.string().min(3),
		participant_id: z.array(z.string().min(1).max(255)).max(114),
	})

	try {
		const validated = schema.parse({
			batch_id: batchId,
			participant_id: participantId
		})
		c.env.validated = validated as IContractBatchesBulkDelete
		return (await next())
	} catch (err) {
		const error = err as z.ZodError
		const message = error.errors[0].message
		return c.redirect(`/batches/new?error-message=${message}`)
	}
}