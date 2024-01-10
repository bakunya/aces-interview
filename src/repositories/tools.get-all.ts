import { D1Database } from "@cloudflare/workers-types";
import { Tools } from "../entities/tools";

export default async function toolGetAll(DB: D1Database): Promise<Tools> {
	const x = await DB.prepare("select * from tools").all()
	return x.results as unknown as Tools
}