export interface Assessor {
	id: string;
	fullname: string;
	username: string;
}

export interface Assessors extends Array<Assessor> {}