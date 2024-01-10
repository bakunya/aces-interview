import { sqlEscapeString } from "./sql-escape-string"

export type TJoinMapping = {
	[key: string]: {
		stmt?: string,
		join?: string,
		reference: string,
		foreign: string,
	}
}

export default function joinMapping(t: TJoinMapping) {
	let str = ''
	
	for (const [key, value] of Object.entries(t)) {
		str += ` ${sqlEscapeString(value?.join ?? "join")} ${sqlEscapeString(key)} ON ${sqlEscapeString(value.reference)} ${sqlEscapeString(value?.stmt ?? "=")} ${sqlEscapeString(key)}.${sqlEscapeString(value.foreign)}`
	}

	return str
}