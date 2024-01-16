import { Context } from 'hono';
import { Bindings } from '../binding';
import Organizations from '../pages/organizations';
import { TOrganizationListDetail } from '../types/TOrganizationListDetail';

export default async function organizationListController(c: Context<{ Bindings: Bindings }>) {
	const orgs = (await c.env.DB.prepare(`
		select 
			organizations.id as org_id, 
			organizations.name as org_name,
			COUNT(batches.id) as batches_count,
			MAX(strftime('%Y', batches.date)) as year
		from organizations
		left join batches on organizations.id = batches.org_id
		group by organizations.id
		order by year desc
	`).all()).results

	const persons = (await c.env.DB.prepare(`
		select 
			organizations.id as org_id,
			COUNT(persons.id) as persons_count
		from persons
		join batches on batches.id = persons.batch_id
		join organizations on organizations.id = batches.org_id
		group by organizations.id
	`).all()).results

	for (let i = 0; i < orgs.length; i++) {
		orgs[i].persons_count = persons.find((v: any) => v.org_id === orgs[i].org_id)?.persons_count
	}

	return c.html(<Organizations orgs={ orgs as TOrganizationListDetail } />);
}
