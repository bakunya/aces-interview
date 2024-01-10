import { D1Database } from "@cloudflare/workers-types";
import { TQueryMapping, queryMapping } from "../utils";
import joinMapping, { TJoinMapping } from "../utils/join-mapping";

export default async function getOne<T>(DB: D1Database, table: string, q?: TQueryMapping, select?: string | string[], j?: TJoinMapping): Promise<T> {
	const join = j ? ` ${joinMapping(j)}` : ''
	const s = Array.isArray(select) ? select.join(",") : select

	if(!q) {
		const data = await DB.prepare(`select ${s ?? "*"} from ${table} ${join}`).first()
		return data as T
	} else {
		const mapping = queryMapping(q)
		console.log(`select ${s ?? "*"} from ${table} ${join} where ${mapping.stmt}`)
		const data = await DB.prepare(`select ${s ?? "*"} from ${table} ${join} where ${mapping.stmt}`).bind(...mapping.binding).first()
		return data as T
	}
}