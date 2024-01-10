import HTML from './html';

export default function E500() {
	return (
		<HTML role='error' css={ ['/compiled/css/error.css'] }>
			<div id='error'>
				<div class='error-page container'>
					<div class='col-md-8 col-12 offset-md-2'>
						<div class='text-center'>
							<img class='img-error' src='/compiled/svg/error-500.svg' alt='Not Found' />
							<h1 class='error-title'>System Error</h1>
							<p class='fs-5 text-gray-600'>The website is currently unaivailable. Try again later or contact the developer.</p>
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
