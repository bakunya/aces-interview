import { D1Database } from "@cloudflare/workers-types";
import { TQueryMapping, queryMapping } from "../utils";
import joinMapping, { TJoinMapping } from "../utils/join-mapping";

export default async function getAll<T>(DB: D1Database, table: string, q?: TQueryMapping, select?: string | string[], j?: TJoinMapping, orderBy?: string, groupBy?: string[]): Promise<T> {
	const g = groupBy ? ` group by ${groupBy.join(',')}` : ''
	const join = j ? ` ${joinMapping(j)}` : ''
	const s = Array.isArray(select) ? select.join(",") : select
	const o = orderBy ? ` order by ${orderBy}` : ''

	if(!q) {
		const data = await DB.prepare(`select ${s ?? "*"} from ${table} ${join} ${g} ${o}`).all()
		return data.results as T
	} else {
		const mapping = queryMapping(q)
		const data = await DB.prepare(`select ${s ?? "*"} from ${table} ${join} where ${mapping.stmt} ${g} ${o}`).bind(...mapping.binding).all()
		return data.results as T
	}
}