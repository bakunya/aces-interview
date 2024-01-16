import { determineBaseGrouping } from "../services/determine-base-grouping"
import determineMinimumF2FAssessor from "../services/determine-minimum-f2f-assessor"
import determineMinimumGroupAssessor from "../services/determine-minimum-group-assessor"
import { TMinimumAssessor } from "../types/TMinimumAssessor"
import getOne from "./get-one"

export async function getMinimumAssessor(DB: D1Database, batchId: string): Promise<TMinimumAssessor> {
	const participantCount = (await getOne<{count: number}>(DB, 'groupings', { batch_id: { keyword: batchId } }, 'COUNT(person_id) as count')).count
	const baseGroup = determineBaseGrouping(participantCount)
	return {
		f2f: determineMinimumF2FAssessor(baseGroup),
		group: determineMinimumGroupAssessor(baseGroup.length)
	}
}