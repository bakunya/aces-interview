import HTML from '../../layouts/html';
import { Batch } from '../../entities/batch';
import { Persons } from '../../entities/person';
import BatchDetailCard from '../../components/batch-detail-card';
import ParticipantTableRow from '../../components/participant-table-row';
import BatchDetailNavigation from '../../components/batch-detail-navigation';

export default function BatchesParticipants({ batch, participants }: { participants: Persons, batch: Batch }) {
	return (
		<HTML activeNav={ ['batches'] } js={ ['/js/batches-participant.js'] }>
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
							<BatchDetailCard batch={ batch } />
						</div>
						<div class='col-12' id='participants'>
							<BatchDetailNavigation
								activeLink='peserta'
								batchId={ batch.id }
							/>
						</div>
					</div>
				</section>
				<div class='page-heading'>
					<div class='page-title'>
						<div class='row'>
							<div class='col-12 col-md-6 order-md-1 order-last'>
								<h3>Peserta</h3>
								<p class='text-subtitle text-muted'>Daftar semua peserta yang terlibat</p>
							</div>
						</div>
					</div>
				</div>
				<section class='section'>
					<div class='row match-height'>
						<div class='col-12'>
							<div class='card p-3'>
								<div class="justify-content-end d-flex flex-wrap">
									<a class="btn btn-primary" href={ `/batches/${batch.id}/add-participants` }>Add Participant</a>
									<form action={ `/batches/${batch.id}/participant-bulk-delete` } class="m-0" method='post' id="participant-delete-bulk">
										<input type="hidden" name="participant_id" />
										<button type="submit" class="btn btn-danger ms-2">Delete Selected</button>
									</form>
								</div>
								<div class='table-responsive mt-3'>
									<table class='table mb-0' style='min-width: 900px'>
										<thead>
											<tr>
												<th>#</th>
												<th>No</th>
												<th>Nama</th>
												<th>Username</th>
												<th>Password</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{ participants.map((v, i) => (
												<ParticipantTableRow
													id={ v.id }
													num={ i + 1 }
													name={ v.fullname }
													username={ v.username }
													password={ "password" }
												/>
											)) }
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</HTML>
	);
}
