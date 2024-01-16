import { Context } from 'hono';
import { Bindings } from '../binding';
import { parseBody } from 'hono/utils/body';
import { Organization } from '../entities/organization';
import { ulid } from '../utils';
import organizationCreate from '../repositories/organization.create';

export default async function organizationCreateController(c: Context<{ Bindings: Bindings }>) {
	const body = await parseBody(c.req) as { name: string }
	if (!body?.name) return c.redirect('/organization/new?error-simple-message=Name is required')

	const org: Organization = {
		name: body.name,
		id: ulid()
	}

	await organizationCreate(c.env.DB, org)

	return c.redirect('/organization?success-simple-message=Organization created')
}
