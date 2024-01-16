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
		const f = sqlEscapeString(value.foreign).includes(".") ? sqlEscapeString(value.foreign) : `${sqlEscapeString(key)}.${sqlEscapeString(value.foreign)}`
		str += ` ${sqlEscapeString(value?.join ?? "join")} ${sqlEscapeString(key)} ON ${sqlEscapeString(value.reference)} ${sqlEscapeString(value?.stmt ?? "=")} ${f}`
	}

	return str
}