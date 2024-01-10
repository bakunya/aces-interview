export interface Batch {
	id: string;
	org_id: string;
	name: string;
	date: string;
	group_num: number;
	slot_group: number;
	slot_type: string;
	on_self: string;
	on_case: string;
	on_f2f: string;
	on_group: string;
	time1: string;
	time2: string;
	time3: string;
	time4: string;
}

export interface Batches extends Array<Batch> {}