import { D1Database } from "@cloudflare/workers-types";
import { Organization } from "../entities/organization";

export default async function organizationCreate(DB: D1Database, org: Organization) {
	await DB.prepare(`insert into organizations (id, name) values (?,?)`).bind(org.id, org.name).run() 
}