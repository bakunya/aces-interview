import { match } from 'ts-pattern';
import SidebarAdmin from '../components/sidebar.admin';

export default function HTML({
	children,
	activeNav,
	js = [],
	css = [],
	role = 'admin',
	title = 'aces',
}: {
	role?: string;
	children: any;
	js?: string[];
	css?: string[];
	title?: string;
	activeNav?: string[];
}) {
	return (
		<html lang='en'>
			<head>
				<title>{title}</title>
				<meta charset='UTF-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='shortcut icon' href='/compiled/svg/favicon.svg' type='image/x-icon' />
				<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css' />
				<link rel='stylesheet' href='/compiled/css/app.css' />
				<link rel='stylesheet' href='/compiled/css/app-dark.css' />
				<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css' />
				{css.map((item: any, index: number) => (
					<link key={index} rel='stylesheet' href={item} />
				))}
			</head>
			<body>
				<script src='/static/js/initTheme.js'></script>
				<div id='app'>
					{match(role)
						.with('admin', () => <SidebarAdmin activeNav={activeNav ?? []} />)
						.otherwise(() => null)}
					{children}
				</div>
				<div id='modal-root'></div>
				<script src='https://unpkg.com/htmx.org@1.9.6'></script>
				<script src='https://unpkg.com/hyperscript.org@0.9.7'></script>
				<script src='/extensions/perfect-scrollbar/perfect-scrollbar.min.js'></script>
				<script src='/static/js/components/dark.js'></script>
				<script src='/compiled/js/app.js'></script>
				<script src='/js/index.js' type='module'></script>
				{js.map((item: any, index: number) => (
					<script key={index} src={item} />
				))}
			</body>
		</html>
	);
}
