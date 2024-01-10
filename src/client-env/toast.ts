import Toastify from 'toastify-js';

export function toastSuccess(text: string) {
	Toastify({
		text,
		style: { background: 'linear-gradient(56deg, rgba(68,255,70,0.4834266470259979) 0%, rgba(37,255,0,0.4778244061296394) 60%)' },
	}).showToast();
}

export function toastError(text: string) {
	Toastify({
		text,
		style: { background: 'linear-gradient(to right, rgb(248 113 113), rgb(220 38 38))' },
	}).showToast();
}
