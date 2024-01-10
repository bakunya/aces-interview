export default function timeSince(date: string): string {
	try {
		const d = new Date(date);
		if (d.toString() === 'Invalid Date') throw Error('invalid date');

		// @ts-ignore
		const seconds = Math.floor((new Date() - d) / 1000);
		let interval = seconds / 31536000;

		if (interval > 1) {
			return Math.floor(interval) + ' years ago';
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + ' months ago';
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + ' days ago';
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + ' hours ago';
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + ' minutes ago';
		}
		return Math.floor(seconds) + ' seconds ago';
	} catch (err) {
		console.log(err);
		return date;
	}
}
