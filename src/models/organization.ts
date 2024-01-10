import { TQueryMapping } from '../utils';
import { D1Database } from '@cloudflare/workers-types';
import { IModelContract, ModelAbstract } from './contract';
import { Organization as OrganizationInterface } from '../entities/organization';

export class OrganizationModel extends ModelAbstract implements OrganizationInterface, IModelContract {
	id: string = '';
	name: string = '';

	#DB: D1Database;

	constructor(DB: D1Database, organization?: OrganizationInterface) {
		super();

		if (organization) {
			this.id = organization.id;
			this.name = organization.name;
		}

		this.#DB = DB;

		return this;
	}
}
