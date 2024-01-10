import { swalError } from '../../client-env/swal';
import { renderModal } from '../../client-env/modal';
import { parseCSV, state, TState } from '../../utils/';

type TAssessor = Record<string, string> & {
	type: null | 'lgd' | 'wwcr';
};

function handleUploadParticipant(participant: TState<Record<string, string>[]>) {
	const tbody = document.getElementById('table-body-preview-peserta')!;

	function updateAction(v: Record<string, string>[]) {
		renderModal('button[data-role="modal"]');

		tbody.querySelectorAll('.btn-update').forEach((el) => {
			const id = (el as HTMLElement).dataset?.id;
			if (!id) return;

			el.addEventListener('click', () => {
				document.querySelector('form.form-update-participant')?.addEventListener('submit', (e) => {
					e.preventDefault();
					const form = e.currentTarget as HTMLFormElement;
					const formData = new FormData(form);
					if (!(formData.get('name') as string)?.trim()) return;
					participant.set(
						v.map((v) => {
							if (v.id === id) return { ...v, name: (formData.get('name') as string)?.trim() } as Record<string, string>;
							return v;
						}),
					);
				});
			});
		});
	}

	function deleteAction(v: Record<string, string>[]) {
		tbody.querySelectorAll('.btn-delete').forEach((el) => {
			const id = (el as HTMLElement).dataset?.id;
			if (!id) return;

			el.addEventListener('click', () => {
				participant.set(v.filter((v) => v.id !== id));
			});
		});
	}

	function renderTable(v: Record<string, string>[]) {
		tbody.innerHTML = v
			.map((v) => {
				return `<tr>
					<td>${v.name}</td>
					<td>
						<button
							data-id='${v.id}'
							data-value='${v.name}'
							data-role="modal"
							data-render="update-participant-preview"
							class="btn-update btn btn-sm btn-primary"
						>Edit</button>
						<button data-id=${v.id} class="btn-delete btn btn-sm btn-danger">Hapus</button>
					</td>
				</tr>`;
			})
			.join('');
	}

	participant.subscribe((v: { id: string; data: Record<string, string>[] }) => {
		renderTable(v.data);
		updateAction(v.data);
		deleteAction(v.data);
	});

	document.getElementById('input-file-peserta')!.addEventListener('change', async (e: Event) => {
		const files = (e.currentTarget as HTMLInputElement)?.files;
		const file = files?.[0];
		if (!file) return;
		const r = await parseCSV(file, ['name', 'age']);
		participant.set(r.filter((v) => Boolean(v.id && v.name)));
	});
}


function handleSaveBatches({ assessors, participant }: { assessors: TState<TAssessor[]>; participant: TState<Record<string, string>[]> }) {
	document.getElementById('save-batches')!.addEventListener('submit', (e) => {
		e.preventDefault();

		const name = (document.querySelector('input[name="name"]') as HTMLInputElement)?.value;
		const company_id = (document.querySelector('select[name="organization_id"]') as unknown as HTMLSelectElement)?.value;
		const date = (document.querySelector('input[name="date"]') as HTMLInputElement)?.value;
		// eslint-disable-next-line
		const tools = Array.from(document.querySelectorAll('select[name="tools[]"]') as NodeListOf<HTMLInputElement>).map((v) => v.value)
			.filter((v: string) => Boolean(v.trim()));

		if (!name) return swalError('Nama batch boleh kosong');
		if (!company_id) return swalError('Nama perusahaan boleh kosong');
		if (!date) return swalError('Hari pelaksanaan tidak boleh kosong');
		if (!Boolean(participant.getData().length)) return swalError('Peserta tidak boleh kosong');

		const lgdAssessors = assessors
			.getData()
			.filter((v: any) => v.type === 'lgd')
			.map((v: any) => v.id);
		const wawancaraAssessors = assessors
			.getData()
			.filter((v: any) => v.type === 'wwcr')
			.map((v: any) => v.id);

		const data = {
			name,
			date,
			tools,
			company_id,
			lgdAssessors,
			wawancaraAssessors,
			participants: participant.getData().map((v) => v.name),
		};

		(document.getElementById('save-batches')!.querySelector('input[name="data"]') as HTMLInputElement).value = JSON.stringify(data);
		(document.getElementById('save-batches') as HTMLFormElement).submit();
	});
}

document.addEventListener('DOMContentLoaded', () => {
	const assessors = state('assessors', [] as TAssessor[]);
	const participant = state('participant', [] as Record<string, string>[]);

	handleUploadParticipant(participant);
	handleSaveBatches({
		assessors,
		participant,
	});
});
