import { ulid } from "../utils";

export default function getMatrixSlot(i: (string | null)[], numRows: number, slotType: string) {
	const arr = (() => {
		if(i.length === 1) {
			if(i.includes('group') || i.includes('f2f')) return [i[0], null, null, null]
			return [i[0]]
		}
		if(i.length === 2) {
			if(i.includes('case') && i.includes('self')) return [i[0], i[1]]
			return [i[0], i[1], null, null]
		}
		if(i.length === 3) return [i[0], i[1], i[2], null]
		return i
	})();

	const matrix: (string | null)[][] = [];
	const matrix_new: Record<string, any>[] = [];

	for (let i = 0; i < numRows; i++) {
		const c = i > 0 ? [...matrix[i - 1]] : [...arr];
		const s = c.pop();
		// @ts-ignore
		c.unshift(s);
		matrix.push(c);
	}
	
	console.log(matrix)
	
	while (matrix.length > 0) {
		const c = matrix.shift();

		matrix_new.unshift({
			id: ulid(),
			slot_type: slotType,
			slot1: c?.[0] ?? null,
			slot2: c?.[1] ?? null,
			slot3: c?.[2] ?? null,
			slot4: c?.[3] ?? null,
		})
	}

	return matrix_new;
}