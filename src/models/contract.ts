import { TQueryMapping } from '../utils';

export interface IModelContract {
	getOneRelation: (tableName: string) => Promise<void>;
	getManyRelation: (tableName: string) => Promise<void>;
	getOne: (keyword: TQueryMapping) => Promise<void>;
	getMany: (keyword: TQueryMapping) => Promise<any[]>;
	// eslint-disable-next-line
}

export abstract class ModelAbstract implements IModelContract {
	async getOneRelation(_tableName: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async getManyRelation(_tableName: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async getOne(_keyword: TQueryMapping): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async getMany(_keyword: TQueryMapping): Promise<any[]> {
		throw new Error('Method not implemented.');
	}
}
