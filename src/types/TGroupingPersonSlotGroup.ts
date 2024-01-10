import { Grouping } from "../entities/grouping";

export type TGroupingPersonSlotGroups = (Grouping & {
	person_fullname: string;
	slot1: string;
	slot2: string;
	slot3: string;
	slot4: string;
	slot_id: string;
	group_name: string;
	group_ass_id: string;
})[]