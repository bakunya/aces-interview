import { match } from 'ts-pattern';
import HTML from '../layouts/html';
import { Tools } from '../entities/tools';
import { Batches } from '../entities/batch';
import ListGroup from '../components/list-group';

export default function Batches({ batches }: { batches: Batches }) {
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
								<h3>Batches</h3>
								<p class='text-subtitle text-muted'>Daftar Batch</p>
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
						<div class='border-bottom card-header d-flex justify-content-between align-items-center mb-0'>
							<h4 class='card-title'>#</h4>
							<a href='/batches/new' class='btn btn-primary'>
								Buat Batches
							</a>
						</div>
						<div class='card-body p-4 pt-0'>
							{ match(batches.length)
								.with(0, () => <p class='text-muted text-center mt-4'>Tidak ada batch</p>)
								.otherwise(() =>
									batches.map((v, i) => (
										<ListGroup id={ v.id } name={ v.name } created={ v.date } href={ `/batches/${v.id}/participant` } />
									)),
								) }
						</div>
					</div>
				</section>
			</div>
		</HTML>
	);
}
