import clsx from "clsx";

export default function BatchDetailNavigation({ batchId, activeLink }: { batchId: string, activeLink: 'settings' | 'assessor' | 'peserta' | 'group' | 'jadwal' }) {
	return (
		<div class='card mt-3'>
			<div class='card-body'>
				<ul class='nav nav-tabs'>
					<li class='nav-item'>
						<a href={ `/batches/${batchId}/assessor#assessors` } class={clsx(activeLink === 'assessor' && 'active', 'nav-link')}>
							Assessor
						</a>
					</li>
					<li class='nav-item'>
						<a href={ `/batches/${batchId}/participant#participants` } class={clsx(activeLink === 'peserta' && 'active', 'nav-link')}>
							Peserta
						</a>
					</li>
					<li class='nav-item'>
						<a href={ `/batches/${batchId}/group#groups` } class={clsx(activeLink === 'group' && 'active', 'nav-link')}>
							Group
						</a>
					</li>
					<li class='nav-item'>
						<a href={ `/batches/${batchId}/schedule#schedule` } class={clsx(activeLink === 'jadwal' && 'active', 'nav-link')}>
							Jadwal
						</a>
					</li>
					<li class='nav-item'>
						<a href={ `/batches/${batchId}/settings#settings` } class={clsx(activeLink === 'settings' && 'active', 'nav-link')}>
							Settings
						</a>
					</li>
				</ul>
			</div>
		</div>
	)
}