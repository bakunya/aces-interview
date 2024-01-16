import HTML from '../../layouts/html';
import BatchDetailCard from '../../components/batch-detail-card';
import { Batch } from '../../entities/batch';
import { TGroupSlots } from '../../types/TGroupSlot';
import BatchDetailNavigation from '../../components/batch-detail-navigation';
import { TMinimumAssessor } from '../../types/TMinimumAssessor';

export default function BatchesGroups({ batch, groups, minimumAssessor }: { minimumAssessor: TMinimumAssessor, batch: Batch, groups: TGroupSlots }) {
	return (
		<HTML activeNav={ ['batches'] }>
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
							<BatchDetailNavigation 
								activeLink='group'
								batchId={batch.id}
							/>
						</div>
					</div>
				</section>

				<div class='page-heading'>
					<div class='page-title'>
						<div class='row'>
							<div class='col-12 col-md-6 order-md-1 order-last'>
								<h3>Kelompok Peserta</h3>
								<p class='text-subtitle text-muted'>Detail kelompok peserta dan assessor dalam batch</p>
							</div>
						</div>
					</div>
				</div>
				<section class='section mt-4'>
					<div class='row match-height'>
						<div class='col-12'>
							<div class='card p-3'>
								<div class='table-responsive'>
									<table class='table mb-0 table-xl' style='min-width: 1300px;'>
										<thead>
											<tr>
												<th class='text-left'>No</th>
												<th class='text-left'>Nama</th>
												<th class='text-left'>Peserta</th>
												<th class='text-left'>Sesi Pagi 1</th>
												<th class='text-left'>Sesi Pagi 2</th>
												<th class='text-left'>Sesi Siang 1</th>
												<th class='text-left'>Sesi Siang 2</th>
												<th class='text-left'>Action</th>
											</tr>
										</thead>
										<tbody>
											{ groups.map((x, i) => (
												<tr>
													<td class='text-left fw-bold'>{ i + 1 }</td>
													<td class='text-left'>{ x?.name }</td>
													<td class='text-left'>{ x?.participant_count }</td>
													<td class='text-left'>
														{ x?.slot1 }
													</td>
													<td class='text-left'>
														{ x?.slot2 }
													</td>
													<td class='text-left'>
														{ x?.slot3 }
													</td>
													<td class='text-left'>
														{ x?.slot4 }
													</td>
													<td>
														<button
															// data-action={ `/admin/session/${lgdDetail?.id}/batches/${lgdDetail?.batch_id}/update-assessor/${lgdDetail?.group_identifier}/session/${lgdDetail?.session}/lgd` }
															// data-batch={ lgdDetail?.batch_id }
															// data-session={ lgdDetail?.session }
															// data-group={ lgdDetail?.group_identifier }
															data-role='modal'
															data-render='update-lgd-assessor-in-batch'
															class='btn-update btn btn-sm btn-primary me-2'
														>
															<small>LGD Assessor</small>
														</button>
														<a
															// href={ `/admin/batches/${wwcrDetail?.batch_id}/groups/${wwcrDetail?.group_identifier}/wawancara#groups` }
															class='btn-update btn btn-sm btn-primary'
														>
															<small>Wawancara Assessor</small>
														</a>
													</td>
												</tr>
											)) }
											{/* { Object.keys(grouped).map((v, i) => {
												const c = Object.keys(grouped[v])[0];
												const s1 = grouped[v][c].find((v) => v.session === 'session_1');
												const s2 = grouped[v][c].find((v) => v.session === 'session_2');
												const s3 = grouped[v][c].find((v) => v.session === 'session_3');
												const s4 = grouped[v][c].find((v) => v.session === 'session_4');
												const lgdDetail = grouped[v][c].find((v) => v.serialize_tool_name === 'lgd');
												const wwcrDetail = grouped[v][c].find((v) => v.serialize_tool_name === 'wwcr');

												return (
													<tr>
														<td class='text-left fw-bold'>{ i + 1 }</td>
														<td class='text-left'>{ s1?.name }</td>
														<td class='text-left'>
															{ s1?.original_tool_name }{ ' ' }
															{ s1?.serialize_tool_name === 'lgd' &&
																s1?.assessor?.name &&
																` - ${s1?.assessor?.name}` }
														</td>
														<td class='text-left'>
															{ s2?.original_tool_name }{ ' ' }
															{ s2?.serialize_tool_name === 'lgd' &&
																s2?.assessor?.name &&
																` - ${s2?.assessor?.name}` }
														</td>
														<td class='text-left'>
															{ s3?.original_tool_name }{ ' ' }
															{ s3?.serialize_tool_name === 'lgd' &&
																s3?.assessor?.name &&
																` - ${s3?.assessor?.name}` }
														</td>
														<td class='text-left'>
															{ s4?.original_tool_name }{ ' ' }
															{ s4?.serialize_tool_name === 'lgd' &&
																s4?.assessor?.name &&
																` - ${s4?.assessor?.name}` }
														</td>
														<td>
															<button
																data-action={ `/admin/session/${lgdDetail?.id}/batches/${lgdDetail?.batch_id}/update-assessor/${lgdDetail?.group_identifier}/session/${lgdDetail?.session}/lgd` }
																data-batch={ lgdDetail?.batch_id }
																data-session={ lgdDetail?.session }
																data-group={ lgdDetail?.group_identifier }
																data-role='modal'
																data-render='update-lgd-assessor-in-batch'
																class='btn-update btn btn-sm btn-primary me-2'
															>
																<small>LGD Assessor</small>
															</button>
															<a
																href={ `/admin/batches/${wwcrDetail?.batch_id}/groups/${wwcrDetail?.group_identifier}/wawancara#groups` }
																class='btn-update btn btn-sm btn-primary'
															>
																<small>Wawancara Assessor</small>
															</a>
														</td>
													</tr>
												);
											}) } */}
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
