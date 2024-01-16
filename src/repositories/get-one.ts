import { D1Database } from "@cloudflare/workers-types";
import { TQueryMapping, queryMapping } from "../utils";
import joinMapping, { TJoinMapping } from "../utils/join-mapping";

export default async function getOne<T>(DB: D1Database, table: string, q?: TQueryMapping, select?: string | string[], j?: TJoinMapping, groupBy?: string[]): Promise<T> {
	const g = groupBy ? ` group by ${groupBy.join(',')}` : ''
	const join = j ? ` ${joinMapping(j)}` : ''
	const s = Array.isArray(select) ? select.join(",") : select

	if(!q) {
		const data = await DB.prepare(`select ${s ?? "*"} from ${table} ${join} ${g}`).first()
		return data as T
	} else {
		const mapping = queryMapping(q)
		const data = await DB.prepare(`select ${s ?? "*"} from ${table} ${join} where ${mapping.stmt} ${g}`).bind(...mapping.binding).first()
		return data as T
	}
}