import * as z from "zod";
import { Context, Next } from "hono";
import { Bindings } from "../../binding";
import { parseBody } from "hono/utils/body";
import { IContractBatchesCreate } from "../../contracts/requests/batches-create";

export default async function batchesCreateValidation(c: Context<{Bindings: Bindings}>, next: Next) {
	const body = await parseBody(c.req)
	if(!body?.data) return c.redirect('/batches/new?error-message=invalid body')
	const data = JSON.parse(body.data as string)

	const schema = z.object({
		company_id: z.string(),
		name: z.string().min(3).max(255),
		date: z.string().min(10).max(10),
		tools: z.array(z.string().min(3).max(3)).max(4),
		participants: z.array(z.string().min(3).max(255)).max(114),
	})

	try {
		const validated = schema.parse(data)
		c.env.validated = validated as IContractBatchesCreate
		return (await next())
	} catch (err) {
		const error = err as z.ZodError
		const message = error.errors[0].message
		return c.redirect(`/batches/new?error-message=${message}`)
	}
}