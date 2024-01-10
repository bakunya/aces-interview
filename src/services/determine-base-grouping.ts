export function determineBaseGrouping(population: number) {
	const n = Number(population);
	if (isNaN(n) || n < 1) return [];
	if (n < 7) return [n];
	if (n === 7) return [4, 3];
	if (n === 8) return [4, 4];
	if (n === 9) return [5, 4];
	if (n === 10) return [5, 5];
	if (n === 11) return [4, 4, 3];
	if (n === 12) return [4, 4, 4];
	if (n === 13) return [5, 4, 4];
	if (n === 14) return [5, 5, 4];

	const jmlGrup = n % 20 < 5 ? Math.floor(n / 5) : Math.ceil(n / 5);
	const tmp = Array(jmlGrup).fill(5);
	const mod1 = n % 20;
	if (n % 5 === 0) return tmp;
	if (mod1 < 5) {
		const ss = tmp.length - (mod1 + 1);
		return tmp.map((x, i) => (i > ss ? 6 : x));
	} else {
		const mod2 = mod1 % 5;
		const ss = tmp.length - (mod2 - 6) * -1;
		return tmp.map((x, i) => (i > ss ? 4 : x));
	}
}