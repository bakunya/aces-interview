export type TCreateOrganization = {
	id: string;
	hxIdReplace: string;
};

export function CreateOrganization({
	id,
	hxIdReplace,
}: TCreateOrganization): HTMLElement {
	if (typeof window === 'undefined') throw Error('This function is only available in the browser');

	const container = document.createElement('div');
	container.id = id;
	container.tabIndex = -1;
	container.role = 'dialog';
	container.className = 'modal fade text-left';
	container.setAttribute('aria-hidden', 'true');

	container.innerHTML = (
		<div class='modal-dialog modal-dialog-centered modal-dialog-scrollable' role='document'>
			<div class='modal-content'>
				<div class='modal-header'>
					<h4 class='modal-title'>Tambahkan Perusahaan</h4>
					<button type='button' class='close' data-bs-dismiss='modal' aria-label='Close'>
						<i data-feather='x'></i>
					</button>
				</div>
				<form
					hx-swap='outerHTML'
					hx-target={`#${hxIdReplace}`}
					class='mb-0 form-update-participant'
					hx-post={`/component/company/create`}
				>
					<div class='modal-body'>
						<div class='form-group'>
							<input class='form-control' type='text' name='name' placeholder="Nama Perusahaan" />
						</div>
					</div>
					<div class='modal-footer'>
						<button type='button' class='btn btn-light-secondary' data-bs-dismiss='modal'>
							<i class='bx bx-x d-block d-sm-none'></i>
							<span class='d-none d-sm-block'>Close</span>
						</button>
						<button type='submit' class='btn btn-primary ms-1' data-bs-dismiss='modal'>
							<i class='bx bx-check d-block d-sm-none'></i>
							<span class='d-none d-sm-block'>Create</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	) as string;

	// @ts-ignore
	window?.htmx?.process(container);

	return container;
}
