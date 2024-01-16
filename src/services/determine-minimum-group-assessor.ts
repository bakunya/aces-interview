import { MAX_SESSION_IN_DAY } from "../constant";

export default function determineMinimumGroupAssessor(countGroups: number, maxSessionInDay?: number) {
	return Math.ceil(countGroups / (maxSessionInDay ?? MAX_SESSION_IN_DAY))
}