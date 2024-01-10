import { D1Database } from "@cloudflare/workers-types";
import { Groups } from "../entities/group";
import { Groupings } from "../entities/grouping";
import { Slots } from "../entities/slot";
import { Persons } from "../entities/person";
import { Batch } from "../entities/batch";

type TParam = {
	groups: Groups;
	groupings: Groupings;
	persons: Persons;
	batches: Batch;
}

export default async function batchCreate(DB: D1Database, { groups, groupings, persons, batches }: TParam) {
	await DB.batch([
		...groups.map(x => DB
			.prepare(`insert into groups (id, batch_id, name, slot_id, group_ass_id) values (?,?,?,?,?)`)
			.bind(x.id, x.batch_id, x.name, x.slot_id, x.group_ass_id)),
		...groupings.map(x => DB
			.prepare(`insert into groupings (batch_id, group_id, person_id, f2f_ass_id, case_ass_id) values (?,?,?,?,?)`)
			.bind(x.batch_id, x.group_id, x.person_id, x.f2f_ass_id, x.case_ass_id)),
		...persons.map(x => DB
			.prepare(`insert into persons (id, batch_id, fullname, username) values (?,?,?,?)`)
			.bind(x.id, x.batch_id, x.fullname, x.username)),
		DB.prepare(`insert into batches 
			(id,org_id,name,date,group_num,slot_group,slot_type,on_self,on_case,on_f2f,on_group,time1,time2,time3,time4) 
			values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
			.bind(batches.id, batches.org_id, batches.name, batches.date, batches.group_num, batches.slot_group, batches.slot_type, batches.on_self, batches.on_case, batches.on_f2f, batches.on_group, batches.time1, batches.time2, batches.time3, batches.time4),
	])
}