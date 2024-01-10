import { swalError, swalSuccess } from './swal';
import { toastError, toastSuccess } from './toast';

export function initToastHtmxAfterRequest(e: any) {
	if (
		e?.detail?.successful &&
		(e?.detail?.requestConfig?.verb === 'put' ||
			e?.detail?.requestConfig?.verb === 'post' ||
			e?.detail?.requestConfig?.verb === 'delete')
	) {
		toastSuccess('Successfully saved.');
	}
}

export function initToastHtmxResponseError(e: any) {
	toastError(e?.detail?.xhr?.responseText ?? e?.detail?.xhr?.response);
}

export function initSwal() {
	const errorMessage = new URLSearchParams(window.location.search).get('error-message');
	const successMessage = new URLSearchParams(window.location.search).get('success-message');

	if (successMessage) {
		swalSuccess(successMessage, {
			timer: 1000,
			willClose: () => window.history.replaceState({}, document.title, window.location.pathname),
		});
	}

	if (errorMessage) {
		swalError(errorMessage, {
			willClose: () => window.history.replaceState({}, document.title, window.location.pathname),
		});
	}
}

export function initToast() {
	const errorMessage = new URLSearchParams(window.location.search).get('error-simple-message');
	const successMessage = new URLSearchParams(window.location.search).get('success-simple-message');
	window.history.replaceState({}, document.title, window.location.pathname);

	if (successMessage) {
		toastSuccess(successMessage);
	}

	if (errorMessage) {
		toastError(errorMessage);
	}
}
