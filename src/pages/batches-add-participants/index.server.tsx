import HTML from '../../layouts/html';
import { Batch } from '../../entities/batch';
import BatchDetailCard from '../../components/batch-detail-card';
import BatchDetailNavigation from '../../components/batch-detail-navigation';
import { TMinimumAssessor } from '../../types/TMinimumAssessor';

export default function BatchesAddParticipants({ batch, minimumAssessor }: { minimumAssessor: TMinimumAssessor, batch: Batch }) {
	let num = 0;

	return (
		<HTML activeNav={ ['batches'] } js={ ['/js/batches-add-participants.js'] }>
			<div id='main'>
				<header class='mb-3'>
					<a href='#' class='burger-btn d-block d-xl-none'>
						<i class='bi bi-justify fs-3'></i>
					</a>
				</header>
				<div class='page-heading'>
					<div class='page-title'>
						<div class='row'>
							<div class='col-12 col-md-6 order-md-1 order-last'>
								<h3 class='text-capitalize'>{ batch.name }</h3>
								<p class='text-subtitle text-muted'>Detail peserta dan jadwal di { batch.name }</p>
							</div>
							<div class='col-12 col-md-6 order-md-2 order-first d-flex justify-content-end'>
								<nav aria-label='breadcrumb' class='breadcrumb-header float-start float-lg-end'>
									<ol class='breadcrumb'>
										<li class='breadcrumb-item'>
											<a href='/admin/composing'>Composing</a>
										</li>
										<li class='breadcrumb-item active' aria-current='page'>
											Detail
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
				<section class='section'>
					<div class='row match-height'>
						<div class='col-md-6 col-12'>
							<BatchDetailCard batch={ batch } minimumAssessor={minimumAssessor} />
						</div>
						<div class='col-12' id='groups'>
							<BatchDetailNavigation batchId={batch.id} activeLink='peserta' />
						</div>
					</div>
				</section>

				<div class='page-heading'>
					<div class='page-title'>
						<div class='row'>
							<div class='col-12 col-md-6 order-md-1 order-last'>
								<h3>Tambah Peserta</h3>
								<p class='text-subtitle text-muted'>Tambahkan peserta baru</p>
							</div>
						</div>
					</div>
				</div>
				<section class='section mt-4'>
					<div class='row match-height'>
						<div class='col-12 col-md-8'>
							<div id="container-participants"></div>
							<div class="d-flex flex-wrap justify-content-end mt-3">
								<button id="add-participants" class="btn btn-secondary">
									Add More Participants
								</button>
								<form method="post" class="m-0" id="save-participants">
									<input type="hidden" name="participants" />
									<button class="btn btn-primary ms-2">
										Save Settings
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		</HTML>
	);
}
