import Swal from 'sweetalert2';

export const swalError = (m: string, { willClose, timer }: { timer?: number; willClose?: Function } = {}) => {
	Swal.fire({
		timer,
		text: m,
		icon: 'error',
		title: 'Error',
		willClose: () => {
			if (typeof willClose === 'function') willClose();
		},
	});
};

export const swalSuccess = (m: string, { willClose, timer }: { timer?: number; willClose?: Function } = {}) => {
	Swal.fire({
		timer,
		text: m,
		title: 'Success',
		icon: 'success',
		willClose: () => {
			if (typeof willClose === 'function') willClose();
		},
	});
};
