import { D1Database } from "@cloudflare/workers-types";
import { TQueryMapping, queryMapping } from "../utils";

export default async function deleteAll<T>(DB: D1Database, table: string, q: TQueryMapping): Promise<T> {
	const mapping = queryMapping(q)
	const data = await DB.prepare(`delete from ${table} where ${mapping.stmt}`).bind(...mapping.binding).all()
	return data.results as T
}