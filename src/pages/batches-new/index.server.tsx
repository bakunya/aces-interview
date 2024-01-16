import HTML from '../../layouts/html';
import StickyBottom from '../../components/sticky-bottom';
import { Tool, Tools } from '../../entities/tools';
import groupBy from 'lodash.groupby'
import clsx from 'clsx';
import { Organization } from '../../entities/organization';

export default function BatchesNew({ organization, tools }: { tools: Tools, organization: Organization }) {
	return (
		<HTML role='admin' activeNav={ ['batches'] } js={ ['/js/batches-new.js'] }>
			<input type="hidden" name="org_id" value={organization.id} />
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
								<h3>Batch {organization.name}</h3>
								<p class='text-subtitle text-muted'>Buat Batch Baru</p>
							</div>
							<div class='col-12 col-md-6 order-md-2 order-first d-flex justify-content-end'>
								<nav aria-label='breadcrumb' class='breadcrumb-header float-start float-lg-end'>
									<ol class='breadcrumb'>
										<li class='breadcrumb-item'>
											<a href='/admin/batches'>Batches</a>
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
											<div class='form form-horizontal'>
												<div class='form-body'>
													<div class='row'>
														<div class='col-md-4'>
															<label for='first-name-horizontal'>Judul</label>
														</div>
														<div class='col-md-8 form-group'>
															<input
																type='text'
																id='first-name-horizontal'
																class='form-control'
																name='name'
																placeholder='Judul'
																required
															/>
														</div>
														<div class='col-12 mt-2'></div>
														<div class='col-md-4'>
															<label for='peserta-file-input'>Tanggal</label>
														</div>
														<div class='col-md-8'>
															<input
																type='date'
																class='form-control'
																name='date'
																placeholder='Select date..'
															/>
														</div>
														<div class='col-12 mt-4'></div>
														<div class='col-md-4'>
															<label for='peserta-file-input'>Peserta</label>
														</div>
														<div class='col-md-8'>
															<input type='file' id='input-file-peserta' accept='.csv' />
														</div>
														<div class='col-12 my-4'>
															<hr />
														</div>
														<div class='col-md-4'>
															<label>Tools</label>
														</div>
														<div class='col-md-8'>
															{ Object.values(groupBy(tools, (v: Tool) => v.category))
																.map((v, i) => (
																	<select class={clsx('form-select', i > 0 && "mt-2")} name='tools[]'>
																		<option value="" selected>
																			-- { v[0].category} --
																		</option>
																		{
																			v.map(x => (
																				<option value={ x.id }>
																					{ x.title }
																				</option>
																			))
																		}
																	</select>
																)) }
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class='col-md-6 col-12'>
								<div class='card'>
									<div class='card-header'>
										<h4 class='mb-3 card-title'>Preview</h4>
										<p class='card-subtitle'>Semua data peserta</p>
									</div>
									<div class='card-content overflow-auto'>
										<div class='table-responsive px-3' style='min-width: 500px;'>
											<table class='table table-sm'>
												<thead>
													<tr>
														<th>Name</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody id='table-body-preview-peserta'></tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</section>
			</div>
			<StickyBottom>
				<div class='row justify-content-end'>
					<div class='col-12 col-md-6'>
						<form action='/batches/create' method='post' id='save-batches'>
							<input type='hidden' name='data' />
							<button class='btn btn-primary container-fluid m-0'>Save</button>
						</form>
					</div>
				</div>
			</StickyBottom>
		</HTML>
	);
}
