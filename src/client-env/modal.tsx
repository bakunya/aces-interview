import { Modal } from 'bootstrap';
import { FIRST_RENDER } from '../constant';
import { TCreateOrganization } from '../components/modals/create-organization';
import { TUpdateParticipantPreview } from '../components/modals/update-participant-preview';

const Modals = async (props: { [key: string]: any }) => {
	switch (props.render) {
		case 'update-participant-preview':
			/* eslint-disable-next-line */
			const { UpdateParticipantPreview } = await import('../components/modals/update-participant-preview');
			return UpdateParticipantPreview(props as TUpdateParticipantPreview);
		case 'create-organization':
			/* eslint-disable-next-line */
			const { CreateOrganization } = await import('../components/modals/create-organization');
			return CreateOrganization(props as TCreateOrganization);
		default:
			console.log(props.render)
			throw Error('Modal Element not found!');
	}
};

export function renderModal(selector: string) {
	const container = document.getElementById('modal-root');
	if (!container) return;

	document.querySelectorAll(selector).forEach((el) => {
		const dataset = (el as HTMLElement).dataset as { render: string; id: string; role: string } & Record<string, string>;
		if (!dataset.render) return;

		el.classList.remove(FIRST_RENDER);
		el.addEventListener('click', async (e) => {
			const content = await Modals(dataset);
			container.appendChild(content);

			const mEl = document.getElementById(dataset.id)!;
			const modal = new Modal(mEl);

			modal.show();
			mEl.addEventListener('hidden.bs.modal', (e) => {
				container.innerHTML = '';
				mEl.remove();
			});
		});
	});
}

export function renderModalAfterTrigger() {
	renderModal(`button[data-role="modal"].${FIRST_RENDER}`);
}

export function initModal() {
	renderModal('button[data-role="modal"]');
}
