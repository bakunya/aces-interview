// import { swalError } from '@libs/presentations/swal';

// document.addEventListener('DOMContentLoaded', () => {
// 	const form = document.getElementById('swap-schedule')! as HTMLFormElement;
// 	form.addEventListener('submit', (e) => {
// 		e.preventDefault();
// 		const els = document.querySelectorAll('input.swap:checked')!;

// 		if (els.length !== 2) return swalError('Pilih hanya 2 peserta');
// 		form.querySelectorAll('input[name="participant_ids[]"]').forEach((v, i) => {
// 			(v as HTMLInputElement).value = (els[i] as HTMLInputElement).value;
// 		});

// 		form.submit();
// 	});
// });
