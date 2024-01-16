export type TOrganizationDetail = {
	org_id: string;
	org_name: string;
	year: number;
	persons_count: number;
	batches_count: number;
}

export type TOrganizationListDetail = TOrganizationDetail[]