export interface Group {
	id: string;
	batch_id: string;
	name: string;
	slot_id: string;
	group_ass_id: string;
}

export interface Groups extends Array<Group> {}