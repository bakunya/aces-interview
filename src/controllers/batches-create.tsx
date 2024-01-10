import { Context } from "hono";
import { ulid } from "../utils";
import chunk from 'lodash.chunk';
import { Bindings } from "../binding";
import { Tools } from "../entities/tools";
import getAll from "../repositories/get-all";
import flattenDeep from 'lodash.flattendeep';
import determineSlotType from "../services/determine-slot-type";
import { IContractBatchesCreate } from "../contracts/requests/batches-create";
import { determineBaseGrouping } from "../services/determine-base-grouping";
import { Groups } from "../entities/group";
import { Groupings } from "../entities/grouping";
import { Batch } from "../entities/batch";
import { Persons } from "../entities/person";
import batchCreate from "../repositories/batch.create";
import { Slots } from "../entities/slot";
import { MAX_SESSION_IN_DAY } from "../constant";

export default async function batchesCreateController(c: Context<{ Bindings: Bindings }>) {
	const body = c.env.validated as IContractBatchesCreate
	const usedTools = (await getAll<Tools>(c.env.DB, "tools", { id: { keyword: body.tools } }, "category")).map(v => v.category)
	const slotType = await determineSlotType(usedTools)
	const slots = await getAll<Slots>(c.env.DB, "slots", { slot_type: { keyword: slotType } }, "id")

	const batch = {
		id: ulid(),
		org_id: body.company_id,
		name: body.name,
		date: body.date,
		group_num: 0,
		slot_group: 0,
		slot_type: '',
		on_self: '',
		on_case: '',
		on_f2f: '',
		on_group: '',
		time1: '',
		time2: '',
		time3: '',
		time4: '',
	} as Batch

	const participants = [...body.participants].map(v => ({
		id: ulid(),
		fullname: v,
		username: ulid(),
		batch_id: batch.id,
	})) as unknown as Persons
	const persons = [...participants]
	const baseGroup = determineBaseGrouping(participants.length)
	const chunkOfParticipants = chunk(baseGroup.map((v) => participants.splice(0, v)), MAX_SESSION_IN_DAY)

	const groups = (() => {
		let groupNum = 0
		let i = 0
		
		return flattenDeep(chunkOfParticipants.map((v, _j) => {
			return v.map((_y) => {
				if(i === slots.length) { i = 0 }
				return {
					id: ulid(),
					batch_id: batch.id,
					name: `Group ${++groupNum}`,
					slot_id: slots[i++].id,
					group_ass_id: null,
				}
			})
		}))
	})() as unknown as Groups

	const groupings = (() => {
		let groupNum = -1
		return flattenDeep(chunkOfParticipants.map((v, _j) => {
			return v.map((y, _i) => {
				groupNum += 1
				return y.map(v => ({
					batch_id: batch.id,
					person_id: v.id,
					f2f_ass_id: null,
					case_ass_id: null,
					group_id: groups[groupNum].id,
				}))
			})
		}))
	})() as unknown as Groupings

	batch.slot_type = slotType
	batch.group_num = groups.length

	await batchCreate(c.env.DB, {
		groups,
		persons,
		groupings,
		batches: batch,
	})

	return c.redirect(`/batches/${batch.id}/participant`)
}