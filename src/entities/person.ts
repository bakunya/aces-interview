export interface Person {
	id: string;
	batch_id: string;
	fullname: string;
	username: string;
}

export interface Persons extends Array<Person> {}