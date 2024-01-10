import { initModal, renderModalAfterTrigger } from './modal';

document.addEventListener('htmx:afterRequest', async (e: any) => {
	const { initToastHtmxAfterRequest } = await import('./response-message');
	initToastHtmxAfterRequest(e);
	renderModalAfterTrigger();
});

document.addEventListener('htmx:responseError', async (e: any) => {
	const { initToastHtmxResponseError } = await import('./response-message');
	initToastHtmxResponseError(e);
});

document.addEventListener('DOMContentLoaded', async () => {
	const { initSwal, initToast } = await import('./response-message');
	initSwal();
	initModal();
	initToast();
});
