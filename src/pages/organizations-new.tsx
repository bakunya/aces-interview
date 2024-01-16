import HTML from "../layouts/html";

export default function OrganizationNew() {
	return (
		<HTML role='admin' activeNav={ ['organization'] }>
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
								<h3>Organization</h3>
								<p class='text-subtitle text-muted'>Buat Organisasi Baru</p>
							</div>
							<div class='col-12 col-md-6 order-md-2 order-first d-flex justify-content-end'>
								<nav aria-label='breadcrumb' class='breadcrumb-header float-start float-lg-end'>
									<ol class='breadcrumb'>
										<li class='breadcrumb-item'>
											<a href='/admin/batches'>Organization</a>
										</li>
										<li class='breadcrumb-item active' aria-current='page'>
											New
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
				<section class='section'>
					<section id='basic-horizontal-layouts'>
						<div class='row match-height'>
							<div class='col-md-6 col-12'>
								<div class='card'>
									<div class='card-content'>
										<div class='card-body py-4'>
											<form class='form form-horizontal mb-0' method="post" action="/organization/create">
												<div class='form-body'>
													<div class='row'>
														<div class='col-md-4'>
															<label for='first-name-horizontal'>Nama Organisasi</label>
														</div>
														<div class='col-md-8 form-group'>
															<input
																type='text'
																id='first-name-horizontal'
																class='form-control'
																name='name'
																placeholder='Nama'
																required
															/>
														</div>
														<div class='col-12 d-flex justify-content-end'>
															<button class="mt-2 btn btn-primary">Simpan</button>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</section>
			</div>
		</HTML>
	);
}
