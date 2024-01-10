import { Group } from "../entities/group";

export type TGroupSlots = (Group & {
	slot1: string;
	slot2: string;
	slot3: string;
	slot4: string;
	slot_id: string;
})[]