import { Batch } from "../entities/batch";
import { TMinimumAssessor } from "../types/TMinimumAssessor";

export default function BatchDetailCard({ batch, minimumAssessor }: { minimumAssessor: TMinimumAssessor, batch: Batch }) {
	return (
		<div class='card'>
			<div class='card-content'>
				<div class='card-body py-4 pb-0'>
					<div class='form form-horizontal'>
						<div class='form-body'>
							<div class='row'>
								<div class='col-md-6'>
									<p class='mb-0'>Judul</p>
								</div>
								<div class='col-md-6'>
									<p class='mb-0 text-subtitle text-muted'>{ batch.name }</p>
								</div>
								<div class='col-12'>
									<hr class='my-4' />
								</div>
								<div class='col-md-6'>
									<p class='mb-0'>Jumlah peserta</p>
								</div>
								<div class='col-md-6'>
									{/* <p class='mb-0 text-subtitle text-muted'>{ batch.participant_count ?? 0 }</p> */ }
								</div>
								<div class='col-12'>
									<hr class='my-4' />
								</div>
								<div class='col-md-6'>
									<p class='mb-0'>Tanggal dimulai</p>
								</div>
								<div class='col-md-6'>
									<p class='mb-0 text-subtitle text-muted'>{ batch.date ?? '' }</p>
								</div>
								<div class='col-12'>
									<hr class='my-4' />
								</div>
								<div class='col-md-6'>
									<p class='mb-0'>Minimal assessor LGD</p>
								</div>
								<div class='col-md-6'>
									<p class='mb-0 text-subtitle text-muted'>
										{ minimumAssessor.group }
									</p>
								</div>
								<div class='col-12'>
									<hr class='my-4' />
								</div>
								<div class='col-md-6'>
									<p>Minimal assessor wawancara</p>
								</div>
								<div class='col-md-6'>
									<p class='text-subtitle text-muted'>
										{ minimumAssessor.f2f }
									</p>
								</div>
							</div>
							<form action={ `/admin/batches/${batch.id}/deploy` } class="mt-2 mb-4" method="POST">
								<button type="submit" class="container-fluid btn btn-primary">Deploy</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}