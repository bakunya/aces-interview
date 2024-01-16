import HTML from '../../layouts/html';
import { Batch } from '../../entities/batch';
import StickyBottom from '../../components/sticky-bottom';
import BatchDetailCard from '../../components/batch-detail-card';
import { TGroupingPersonSlotGroups } from '../../types/TGroupingPersonSlotGroup';
import groupBy from 'lodash.groupby';
import BatchDetailNavigation from '../../components/batch-detail-navigation';
import { TMinimumAssessor } from '../../types/TMinimumAssessor';

export default function BatchesSchedule({
	batch,
	grouping,
	minimumAssessor
}: {
	batch: Batch;
	minimumAssessor: TMinimumAssessor;
	grouping: TGroupingPersonSlotGroups
}) {
	let num = 0;

	return (
		<HTML activeNav={ ['batches'] } js={ ['/js/batches-schedule.js'] }>
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
						<div class='col-12' id='schedule'>
							<BatchDetailNavigation
								activeLink='jadwal'
								batchId={ batch.id }
							/>
						</div>
					</div>
				</section>

				<div class='page-heading'>
					<div class='page-title'>
						<div class='row'>
							<div class='col-12 col-md-6 order-md-1 order-last'>
								<h3>Jadwal</h3>
								<p class='text-subtitle text-muted'>Detail jadwal peserta dan assessor dalam batch</p>
							</div>
						</div>
					</div>
				</div>
				<section class='section mt-4'>
					<div class='row match-height'>
						<div class='col-12'>
							{ Object.values(groupBy(grouping, x => x.group_id)).map(v => (
								<div class='card p-3'>
									<div class='card-header'>
										<h4 class='card-title'>{ v[0].group_name }</h4>
									</div>
									<div class='table-responsive'>
										<table class='table mb-0 table-xl' style='min-width: 1300px;'>
											<thead>
												<tr>
													<th class='text-center'>#</th>
													<th class='text-center'>No</th>
													<th class='text-center'>Nama</th>
													<th class='text-center'>Sesi Pagi 1</th>
													<th class='text-center'>Sesi Pagi 2</th>
													<th class='text-center'>Sesi Siang 1</th>
													<th class='text-center'>Sesi Siang 2</th>
												</tr>
											</thead>
											<tbody>
												{ v.map(x => (
													<tr>
														<td class='text-center fw-bold'>
															{ x?.person_id && (
																<input
																	type='checkbox'
																	name='swap'
																	class='swap form-check-input'
																	value={ x.person_id }
																/>
															) }
														</td>
														<td class='text-center fw-bold'>{ ++num }</td>
														<td class='text-center'>{ x?.person_fullname }</td>
														<td class='text-center'>
															{ x?.slot1 }
														</td>
														<td class='text-center'>
															{ x?.slot2 }
														</td>
														<td class='text-center'>
															{ x?.slot3 }
														</td>
														<td class='text-center'>
															{ x?.slot4 }
														</td>
													</tr>
												)) }
											</tbody>
										</table>
									</div>
								</div>
							)) }
							{/* { Object.keys(grouped).map((v, i) => (
								<div class='card p-3'>
									<div class='card-header'>
										<h4 class='card-title'>{ grouped[v][Object.keys(grouped[v])[0]][0].name }</h4>
									</div>
									<div class='table-responsive'>
										<table class='table mb-0 table-xl' style='min-width: 1300px;'>
											<thead>
												<tr>
													<th class='text-center'>#</th>
													<th class='text-center'>No</th>
													<th class='text-center'>Nama</th>
													<th class='text-center'>Sesi Pagi 1</th>
													<th class='text-center'>Sesi Pagi 2</th>
													<th class='text-center'>Sesi Siang 1</th>
													<th class='text-center'>Sesi Siang 2</th>
												</tr>
											</thead>
											<tbody>
												{ Object.keys(grouped[v]).map((c, j) => {
													num += 1;
													const s1 = grouped[v][c].find((v) => v.session === 'session_1');
													const s2 = grouped[v][c].find((v) => v.session === 'session_2');
													const s3 = grouped[v][c].find((v) => v.session === 'session_3');
													const s4 = grouped[v][c].find((v) => v.session === 'session_4');
													const name =
														s1?.participant?.name ??
														s2?.participant?.name ??
														s3?.participant?.name ??
														s4?.participant?.name;

													return (
														<tr>
															<td class='text-center fw-bold'>
																{ s1?.participant_id && (
																	<input
																		type='checkbox'
																		name='swap'
																		class='swap form-check-input'
																		value={ s1.participant_id }
																	/>
																) }
															</td>
															<td class='text-center fw-bold'>{ num }</td>
															<td class='text-center'>{ name }</td>
															<td class='text-center'>
																{ s1?.original_tool_name } { s1?.assessor?.name && ` - ${s1?.assessor?.name}` }
															</td>
															<td class='text-center'>
																{ s2?.original_tool_name } { s2?.assessor?.name && ` - ${s2?.assessor?.name}` }
															</td>
															<td class='text-center'>
																{ s3?.original_tool_name } { s3?.assessor?.name && ` - ${s3?.assessor?.name}` }
															</td>
															<td class='text-center'>
																{ s4?.original_tool_name } { s4?.assessor?.name && ` - ${s4?.assessor?.name}` }
															</td>
														</tr>
													);
												}) }
											</tbody>
										</table>
									</div>
								</div>
							)) } */}
						</div>
					</div>
				</section>
			</div>
			<StickyBottom>
				<div class='row justify-content-end'>
					<div class='col-12 col-md-6'>
						<form action={ `/admin/batches/${batch.id}/schedule/swap` } method='POST' id='swap-schedule'>
							<input type='hidden' name='participant_ids[]' />
							<input type='hidden' name='participant_ids[]' />
							<button class='btn btn-primary container-fluid m-0'>Swap Jadwal</button>
						</form>
					</div>
				</div>
			</StickyBottom>
		</HTML>
	);
}
