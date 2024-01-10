export interface Grouping {
	batch_id: string;
	group_id: string;
	person_id: string;
	f2f_ass_id: string;
	case_ass_id: string;
}

export interface Groupings extends Array<Grouping> {}