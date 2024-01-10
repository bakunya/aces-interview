export interface Slot {
	id: string;
	slot_type: string;
	slot1: string;
	slot2: string;
	slot3: string;
	slot4: string;
}

export interface Slots extends Array<Slot> {}