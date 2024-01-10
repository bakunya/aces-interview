import { sqlEscapeString } from './sql-escape-string';

export type TQueryMapping = Record<
	string,
	{
		keyword: string | number | (string | number)[];
		like?: boolean;
		exclude?: boolean;
		stmt?: 'OR' | 'AND' | 'NOT';
	}
>;

export function queryMapping(s: TQueryMapping): { stmt: string; binding: any[] } {
	let p = '';

	// mapping statement
	Object.keys(s).forEach((k, i) => {
		let q = '';

		if (i === 0) {
			if (s[k].like && !Array.isArray(s[k].keyword)) {
				q += `${sqlEscapeString(k)} LIKE %?`;
			} else if (Array.isArray(s[k].keyword)) {
				if (s[k].exclude) {
					// @ts-ignore
					q += `${sqlEscapeString(k)} NOT IN (${s[k].keyword.map(() => '?').join(',')})`;
				} else {
					// @ts-ignore
					q += `${sqlEscapeString(k)} IN (${s[k].keyword.map(() => '?').join(',')})`;
				}
			} else if (!s[k].like) {
				q += ` ${sqlEscapeString(k)} = ?`;
			}
		} else {
			if (s[k].like && !Array.isArray(s[k].keyword)) {
				q += ` ${s[k].stmt} ${sqlEscapeString(k)} LIKE %?`;
			} else if (Array.isArray(s[k].keyword)) {
				if (s[k].exclude) {
					// @ts-ignore
					q += ` ${s[k].stmt} ${sqlEscapeString(k)} NOT IN (${s[k].keyword.map(() => '?').join(',')})`;
				} else {
					// @ts-ignore
					q += ` ${s[k].stmt} ${sqlEscapeString(k)} IN (${s[k].keyword.map(() => '?').join(',')})`;
				}
			} else if (!s[k].like) {
				q += ` ${s[k].stmt} ${sqlEscapeString(k)} = ?`;
			}
		}

		p += q;
	});

	return {
		stmt: p,
		binding: Object.keys(s)
			.map((k) => s[k].keyword)
			.flat(),
	};
}
