import { Context } from 'hono';
import { Bindings } from '../binding';
import OrganizationNew from '../pages/organizations-new';

export default async function organizationNewController(c: Context<{ Bindings: Bindings }>) {
	return c.html(<OrganizationNew />);
}
