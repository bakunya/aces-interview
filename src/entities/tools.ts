export interface Tool {
	id: string;
	category: string;
	title: string;
	version: string;
}

export interface Tools extends Array<Tool> {}
