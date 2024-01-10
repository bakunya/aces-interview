import { Context } from "hono";
import { Bindings } from "../binding";
import { IContractBatchesBulkDelete } from "../contracts/requests/batches-participant-bulk-delete";
import getAll from "../repositories/get-all";
import { Persons } from "../entities/person";
import getOne from "../repositories/get-one";
import { Slots } from "../entities/slot";
import { determineBaseGrouping } from "../services/determine-base-grouping";
import chunk from "lodash.chunk";
import { MAX_SESSION_IN_DAY } from "../constant";
import flattenDeep from "lodash.flattendeep";
import { queryMapping, ulid } from "../utils";
import { Groups } from "../entities/group";
import { Groupings } from "../entities/grouping";

export default async function batchesParticipantBulkDeleteController(c: Context<{ Bindings: Bindings }>) {
	async function execQuery(): Promise<void> {
		const queryM = queryMapping({ id: { keyword: participant_id } })

		await c.env.DB.batch([
			c.env.DB.prepare('delete from groups where batch_id = ?').bind(batch_id),
			c.env.DB.prepare('delete from groupings where batch_id = ?').bind(batch_id),
			c.env.DB.prepare(`delete from persons where ${queryM.stmt}`).bind(...queryM.binding),
			c.env.DB.prepare('update batches set group_num = ? where id = ?').bind(groups.length, batch_id),
			...groups.map(x => c.env.DB
				.prepare(`insert into groups (id, batch_id, name, slot_id, group_ass_id) values (?,?,?,?,?)`)
				.bind(x.id, x.batch_id, x.name, x.slot_id, x.group_ass_id)),
			...groupings.map(x => c.env.DB
				.prepare(`insert into groupings (batch_id, group_id, person_id, f2f_ass_id, case_ass_id) values (?,?,?,?,?)`)
				.bind(x.batch_id, x.group_id, x.person_id, x.f2f_ass_id, x.case_ass_id))
		])
	}


	const { batch_id, participant_id } = c.env.validated as IContractBatchesBulkDelete

	const participants = await getAll<Persons>(c.env.DB, 'persons', { batch_id: { keyword: batch_id }, id: { stmt: 'AND', keyword: participant_id, exclude: true } })
	const slotType = (await getOne<Record<'slot_type', string>>(c.env.DB, 'batches', { id: { keyword: batch_id } }, 'slot_type')).slot_type
	const slots = await getAll<Slots>(c.env.DB, "slots", { slot_type: { keyword: slotType } }, "id")

	const baseGroup = determineBaseGrouping(participants.length)
	const chunkOfParticipants = chunk(baseGroup.map((v) => participants.splice(0, v)), MAX_SESSION_IN_DAY)
	const groups = (() => {
		let groupNum = 0
		let i = 0
		return flattenDeep(chunkOfParticipants.map((v, _j) => {
			return v.map((_y) => {
				if(i === slots.length) { i = 0 }
				return {
					batch_id,
					id: ulid(),
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
					batch_id: batch_id,
					person_id: v.id,
					f2f_ass_id: null,
					case_ass_id: null,
					group_id: groups[groupNum].id,
				}))
			})
		}))
	})() as unknown as Groupings

	await execQuery()

	return c.redirect(`/batches/${batch_id}/participant`)
}