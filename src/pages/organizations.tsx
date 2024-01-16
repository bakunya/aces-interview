import { match } from 'ts-pattern';
import HTML from '../layouts/html';
import { TOrganizationListDetail } from '../types/TOrganizationListDetail';

export default function Organizations({ orgs }: { orgs: TOrganizationListDetail }) {
	return (
		<HTML activeNav={ ['organization'] }>
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
								<h3>Organizations</h3>
								<p class='text-subtitle text-muted'>Daftar Organisasi</p>
							</div>
							<div class='col-12 col-md-6 order-md-2 order-first d-flex justify-content-end'>
								<nav aria-label='breadcrumb' class='breadcrumb-header float-start float-lg-end'>
									<ol class='breadcrumb'>
										<li class='breadcrumb-item'>
											<a href='#'>Admin</a>
										</li>
										<li class='breadcrumb-item active' aria-current='page'>
											Batches
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
				<section class='section'>
					<div class='card'>
						<div class='card-header d-flex justify-content-between align-items-center mb-0'>
							<h4 class='card-title'>#</h4>
							<a href='/organization/new' class='btn btn-primary'>
								Buat Organisasi
							</a>
						</div>
					</div>
					<div class='card'>
						<div class='card-body p-4'>
							{ match(orgs.length)
								.with(0, () => <p class='text-muted text-center mt-4'>Tidak ada data organisasi</p>)
								.otherwise(() =>
									<div class='table-responsive'>
										<table class='table mb-0 table-xl'>
											<thead>
												<tr>
													<th class='text-start'>Nama</th>
													<th class='text-start'>Batch</th>
													<th class='text-start'>Head</th>
													<th class='text-start'>Year</th>
													<th class='text-start'>New</th>
												</tr>
											</thead>
											<tbody>
												{ orgs.map(v => (
													<tr>
														<td class='text-start'>
															{ v.org_name }
														</td>
														<td class='text-start'>
															{ v.batches_count }
														</td>
														<td class='text-start'>
															{ v.persons_count }
														</td>
														<td class='text-start'>
															{ v.year }
														</td>
														<td class="text-start">
															<a href={ `/batches/new/${v.org_id}` } class='btn btn-primary'>
																<i class="bi bi-plus"></i>
															</a>
														</td>
													</tr>
												)) }
											</tbody>
										</table>
									</div>
								) }
						</div>
					</div>
				</section>
			</div>
		</HTML>
	);
}
