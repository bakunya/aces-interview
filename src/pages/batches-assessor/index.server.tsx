import { match } from 'ts-pattern';
import HTML from '../../layouts/html';
import { AssessorModel } from '../../model/assessor';
import { BatchModel } from '../../model/batch';
import { ulidSelector } from '../../utils/ulid';
import NewColumnAssessor from '../../components/new-column-assessor';
import BatchDetailCard from '../../components/batch-detail-card';
import { Assessors } from '../../entities/assessor';
import { Batch } from '../../entities/batch';
import BatchDetailNavigation from '../../components/batch-detail-navigation';

type TProps = {
	batch: Batch;
	f2fAssessor: Assessors;
	groupAssessor: Assessors;
	notUsedAssessors: Assessors;
}

export default function BatchesDetail({ batch, notUsedAssessors, groupAssessor, f2fAssessor }: TProps) {
	return (
		<HTML activeNav={ ['batches'] } js={ ['/js/batches-detail.js'] }>
			<input type='hidden' name='store' id='store' value={ JSON.stringify(notUsedAssessors) } />
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
						<div class='col-12' id='assessors'>
							<BatchDetailNavigation
								activeLink='assessor'
								batchId={ batch.id }
							/>
						</div>
					</div>
				</section>

				<div class='page-heading'>
					<div class='page-title'>
						<div class='row'>
							<div class='col-12 col-md-6 order-md-1 order-last'>
								<h3>Assessor Group</h3>
								<p class='text-subtitle text-muted'>Daftar semua assessor Group yang terlibat</p>
							</div>
						</div>
					</div>
				</div>
				{/* { batch?.session_count_not_set_with_lgd_assessor !== undefined &&
					batch?.session_count_not_set_with_lgd_assessor > 0 && (
						<div class='alert alert-light-danger alert-dismissible show fade'>
							<i class='bi bi-exclamation-circle'></i> Terdapat{ ' ' }
							<strong>{ batch?.session_count_not_set_with_lgd_assessor } kelompok</strong> yang belum diatur LGD
							assessornya
							<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
						</div>
					) } */}
				<section class='section'>
					<div class='row match-height'>
						<div class='col-12'>
							<div class='card p-3'>
								<div class='table-responsive'>
									<table class='table mb-0' style='min-width: 800px;'>
										<thead>
											<tr>
												<th>No</th>
												<th>Nama</th>
												<th>Sesi Pagi 1</th>
												<th>Sesi Pagi 2</th>
												<th>Sesi Siang 1</th>
												<th>Sesi Siang 2</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody id='lgd-tbody'>
											{ Array.from({ length: batch.slot_lgd_assessors }).map((_, i) => {
												const r = batch.lgd_assessors ? batch.lgd_assessors[i] : null;
												const t = (r && lgdAssessors ? lgdAssessors[r.id] : {}) as AssessorInBatch;
												const haveChecked = Object.values(t).some((v) => v);
												return match(Boolean(r))
													.with(false, () => (
														<NewColumnAssessor
															num={ i + 1 }
															render='add-assessor-in-batch'
															action={ `/admin/batches/${batch.id}/add-assessor/lgd` }
														/>
													))
													.otherwise(() => (
														<tr class={ `lgd assessor-id-${r?.id}` } style='height:45px;'>
															<td class='fw-bold'>{ i + 1 }</td>
															<td>{ r?.name }</td>
															{ Object.entries(t).map((l) => (
																<td>
																	<input
																		data-session={ l[0] }
																		data-batch={ batch.id }
																		data-assessor={ r?.id }
																		checked={ Boolean(l[1]) }
																		type='checkbox'
																		class={ `check-lgd form-check-input ${l[0]}` }
																	/>
																</td>
															)) }
															<td class='action'>
																<button
																	data-role='modal'
																	data-id={ ulidSelector() }
																	data-render='add-assessor-in-batch'
																	data-current={ r ? JSON.stringify(r) : '{}' }
																	data-action={ `/admin/batches/${batch.id}/update-assessor/${r?.id}/lgd` }
																	class={ `mx-1 btn btn-sm btn-primary ${haveChecked ? 'd-none' : ''
																		}` }
																>
																	<svg
																		xmlns='http://www.w3.org/2000/svg'
																		width='16'
																		height='16'
																		fill='currentColor'
																		class='bi bi-pencil'
																		viewBox='0 0 16 16'
																	>
																		<path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
																	</svg>
																</button>
																<form
																	method='post'
																	class={ `d-inline ${haveChecked ? 'd-none' : ''}` }
																	action={ `/admin/batches/${batch.id}/delete-assessor/${r?.id}/lgd` }
																>
																	<button class='mx-1 btn btn-sm btn-danger'>
																		<svg
																			xmlns='http://www.w3.org/2000/svg'
																			width='16'
																			height='16'
																			fill='currentColor'
																			class='bi bi-trash'
																			viewBox='0 0 16 16'
																		>
																			<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
																			<path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
																		</svg>
																	</button>
																</form>
															</td>
														</tr>
													));
											}) }
										</tbody>
									</table>
								</div>
								<div class='d-flex justify-content-end mt-4'>
									<button
										hx-trigger='click'
										hx-swap='beforeend'
										hx-target='#lgd-tbody'
										hx-put={ `/component/batch/${batch.id}/add-slot-assessor/lgd` }
										class={ 'btn btn-primary tambah-slot-lgd' }
									>
										Tambah Slot
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{ Array.isArray(batch.wwcr_assessors) && (
					<>
						<div class='p-0 m-0 row mb-3'>
							<div class='p-0 m-0 col-12'>
								<hr />
							</div>
						</div>
						<div class='page-heading'>
							<div class='page-title'>
								<div class='row'>
									<div class='col-12 col-md-6 order-md-1 order-last'>
										<h3>Assessor Wawancara</h3>
										<p class='text-subtitle text-muted'>Daftar semua assessor wawancara yang terlibat</p>
									</div>
								</div>
							</div>
						</div>
						{ batch?.session_count_not_set_with_wwcr_assessor !== undefined &&
							batch?.session_count_not_set_with_wwcr_assessor > 0 && (
								<div class='alert alert-light-danger alert-dismissible show fade'>
									<i class='bi bi-exclamation-circle'></i> Terdapat{ ' ' }
									<strong>{ batch?.session_count_not_set_with_wwcr_assessor } peserta</strong> yang belum diatur wawancara
									assessornya
									<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
								</div>
							) }
						<section class='section'>
							<div class='row match-height'>
								<div class='col-12'>
									<div class='card p-3'>
										<div class='table-responsive'>
											<table class='table mb-0' style='min-width: 800px;'>
												<thead>
													<tr>
														<th>No</th>
														<th>Nama</th>
														<th>Sesi Pagi 1</th>
														<th>Sesi Pagi 2</th>
														<th>Sesi Siang 1</th>
														<th>Sesi Siang 2</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody id='wwcr-tbody'>
													{ Array.from({ length: batch.slot_wwcr_assessors }).map((_, i) => {
														const r = batch.wwcr_assessors ? batch.wwcr_assessors[i] : null;
														const t = (
															r && wawancaraAssessors ? wawancaraAssessors[r.id] : {}
														) as AssessorInBatch;
														const haveChecked = Object.values(t).some((v) => v);
														return match(Boolean(r))
															.with(false, () => (
																<NewColumnAssessor
																	num={ i + 1 }
																	render='add-assessor-in-batch'
																	action={ `/admin/batches/${batch.id}/add-assessor/wwcr` }
																/>
															))
															.otherwise(() => (
																<tr class={ `wwcr assessor-id-${r?.id}` } style='height:45px;'>
																	<td class='fw-bold'>{ i + 1 }</td>
																	<td>{ r?.name }</td>
																	{ Object.entries(t).map((l) => (
																		<td>
																			<input
																				data-session={ l[0] }
																				data-batch={ batch.id }
																				data-assessor={ r?.id }
																				type='checkbox'
																				checked={ Boolean(l[1]) }
																				class={ `check-wwcr form-check-input ${l[0]}` }
																			/>
																		</td>
																	)) }
																	<td class='action'>
																		<button
																			data-role='modal'
																			data-id={ ulidSelector() }
																			data-render='add-assessor-in-batch'
																			data-current={ r ? JSON.stringify(r) : '{}' }
																			data-action={ `/admin/batches/${batch.id}/update-assessor/${r?.id}/wwcr` }
																			class={ `mx-1 btn btn-sm btn-primary ${haveChecked ? 'd-none' : ''
																				}` }
																		>
																			<svg
																				xmlns='http://www.w3.org/2000/svg'
																				width='16'
																				height='16'
																				fill='currentColor'
																				class='bi bi-pencil'
																				viewBox='0 0 16 16'
																			>
																				<path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z' />
																			</svg>
																		</button>
																		<form
																			method='post'
																			class={ `d-inline ${haveChecked ? 'd-none' : ''}` }
																			action={ `/admin/batches/${batch.id}/delete-assessor/${r?.id}/wwcr` }
																		>
																			<button class='mx-1 btn btn-sm btn-danger'>
																				<svg
																					xmlns='http://www.w3.org/2000/svg'
																					width='16'
																					height='16'
																					fill='currentColor'
																					class='bi bi-trash'
																					viewBox='0 0 16 16'
																				>
																					<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z' />
																					<path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z' />
																				</svg>
																			</button>
																		</form>
																	</td>
																</tr>
															));
													}) }
												</tbody>
											</table>
										</div>
										<div class='d-flex justify-content-end mt-4'>
											<button
												hx-trigger='click'
												hx-swap='beforeend'
												hx-target='#wwcr-tbody'
												hx-put={ `/component/batch/${batch.id}/add-slot-assessor/wwcr` }
												class={ 'btn btn-primary tambah-slot-wwcr' }
											>
												Tambah Slot
											</button>
										</div>
									</div>
								</div>
							</div>
						</section>
					</>
				) }
			</div>
		</HTML>
	);
}
