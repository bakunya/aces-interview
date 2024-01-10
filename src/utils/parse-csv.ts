import Papa from 'papaparse';
import { ulidSelector } from './ulid';

export function parseCSV(file: File, headerNames: string[]): Promise<Record<string, string>[]> {
	return new Promise((resolve, reject) => {
		Papa.parse(file, {
			header: true,
			complete: (result) => {
				const r: Record<string, string>[] = [];

				result.data.forEach((v) => {
					const val = v as Record<string, string>;
					const obj: Record<string, string> = {
						id: ulidSelector(),
					};
					headerNames.forEach((n) => {
						if (val[n] === undefined) return;
						obj[n] = val[n];
					});
					r.push(obj);
				});

				resolve(r);
			},
			error: (e) => {
				reject(e);
			},
		});
	});
}
