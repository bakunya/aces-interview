import HTML from './html';

export default function E404() {
	return (
		<HTML role='error' css={ ['/compiled/css/error.css'] }>
			<div id='error'>
				<div class='error-page container'>
					<div class='col-md-8 col-12 offset-md-2'>
						<div class='text-center'>
							<img class='img-error' src='/compiled/svg/error-404.svg' alt='Not Found' />
							<h1 class='error-title'>NOT FOUND</h1>
							<p class='fs-5 text-gray-600'>The page you are looking not found.</p>
							<a href='/from-error' class='btn btn-lg btn-outline-primary mt-3'>
								Go Home
							</a>
						</div>
					</div>
				</div>
			</div>
		</HTML>
	);
}
