export default function CardParticipant({ name }: { name?: string }) {
	return (
		<div class='card p-3 participant-card'>
			<div class="card-body">
				<div class='form form-horizontal' method='post' action='/admin/composing/new'>
					<div class='form-body'>
						<div class='row'>
							<div class='col-12'>
								<label for='first-name-horizontal'>Nama Peserta</label>
							</div>
							<div class='col-md-12 form-group mt-3 mb-0'>
								<input
									required
									name='name'
									type='text'
									class='form-control'
									id='first-name-horizontal'
									value={ name ?? "" }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}