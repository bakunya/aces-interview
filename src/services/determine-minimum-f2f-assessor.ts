import chunk from "lodash.chunk";
import { MAX_SESSION_IN_DAY } from "../constant";

export default function determineMinimumF2FAssessor(groups: number[], maxSessionInDay?: number) {
	const p = chunk(groups, (maxSessionInDay ?? MAX_SESSION_IN_DAY));
	let a = 0;

	p.forEach((v) => {
		let t = 0;

		v.forEach((l) => {
			if (l > t) {
				t = l;
			}
		});

		a += t;
	});

	return a;
}