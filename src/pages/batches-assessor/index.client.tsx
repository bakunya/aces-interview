// import axios from '@libs/adapters/axios';
// import { SESSIONS } from '../../constant';
// import { toastError, toastSuccess } from '@libs/presentations/toast';

// async function store(body: Record<string, string | number | boolean>) {
// 	const formData = {
// 		value: body.value as string,
// 		session: body.session as string,
// 	};
// 	const r = await axios.post(`admin/batches/${body.batchId}/set-session-assessor/${body.assessorId}/${body.type}`, formData);
// 	return r.data;
// }

// function hideCheckbox(t: { status: number; result: number }[], type: 'lgd' | 'wwcr'): void {
// 	t.forEach((v, i) => {
// 		const totalChecked = document.querySelectorAll(`input.check-${type}.session_${i + 1}:checked`).length;
// 		if (totalChecked >= v.result) {
// 			document.querySelectorAll(`input.check-${type}.session_${i + 1}:not(:checked)`).forEach((el) => {
// 				(el as HTMLInputElement).classList.add('d-none');
// 			});
// 		} else {
// 			document.querySelectorAll(`input.check-${type}.session_${i + 1}:not(:checked)`).forEach((el) => {
// 				(el as HTMLInputElement).classList.remove('d-none');
// 			});
// 		}
// 	});
// }

// function hideActionButton(type: 'lgd' | 'wwcr', assessorId: string) {
// 	const haveCheckedInput = document.querySelector(`tr.${type}.assessor-id-${assessorId} input.check-${type}:checked`);
// 	if (haveCheckedInput) {
// 		document.querySelectorAll(`tr.${type}.assessor-id-${assessorId} > td.action > *`).forEach((el) => {
// 			el.classList.add('d-none');
// 		});
// 	} else {
// 		document.querySelectorAll(`tr.${type}.assessor-id-${assessorId} > td.action > *`).forEach((el) => {
// 			el.classList.remove('d-none');
// 		});
// 	}
// }

// document.addEventListener('DOMContentLoaded', async () => {
// 	const batchId = ((document.querySelector('input.check-lgd') ?? document.querySelector('input.check-wwcr')) as HTMLInputElement)?.dataset
// 		?.batch;
// 	const lgd_s = (await Promise.all(
// 		SESSIONS.map((v) => axios.get(`admin/batches/${batchId}/total-session/${v}/assessor/lgd`)),
// 	)) as unknown as { status: number; result: number }[];
// 	const wwcr_s = (await Promise.all(
// 		SESSIONS.map((v) => axios.get(`admin/batches/${batchId}/total-session/${v}/assessor/wwcr`)),
// 	)) as unknown as { status: number; result: number }[];
// 	hideCheckbox(lgd_s, 'lgd');
// 	hideCheckbox(wwcr_s, 'wwcr');

// 	const changeHandler = (t: 'wwcr' | 'lgd', hideCheckbox?: Function) => async (e: any) => {
// 		const el = e.target as HTMLInputElement;
// 		try {
// 			await store({
// 				type: t,
// 				value: Boolean(el.checked),
// 				batchId: el?.dataset?.batch ?? '',
// 				session: el?.dataset?.session ?? '',
// 				assessorId: el?.dataset?.assessor ?? '',
// 			});
// 			toastSuccess('Successfully saved.');
// 			hideActionButton(t, el?.dataset?.assessor ?? '');
// 			if (hideCheckbox instanceof Function) hideCheckbox();
// 		} catch (error: any) {
// 			console.log(error.message);
// 			toastError('Failed to Update');
// 		}
// 	};

// 	document.querySelectorAll('input.check-lgd').forEach((v) => {
// 		v.addEventListener(
// 			'change',
// 			changeHandler('lgd', () => hideCheckbox(lgd_s, 'lgd')),
// 		);
// 	});

// 	document.querySelectorAll('input.check-wwcr').forEach((v) => {
// 		v.addEventListener(
// 			'change',
// 			changeHandler('wwcr', () => hideCheckbox(wwcr_s, 'wwcr')),
// 		);
// 	});
// });
