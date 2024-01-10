import { D1Database } from '@cloudflare/workers-types';

export type Bindings = {
	DB: D1Database;
	IS_PROD: boolean;
	locals: Record<any, any>;
	validated: Record<any, any>;
};
