export default function StickyBottom({ children }: { children: any }) {
	return (
		<>
			<style
				dangerouslySetInnerHTML={{
					__html: `
						.sticky-bottom-save {
							background-color: white;
						}

						html[data-bs-theme="dark"] .sticky-bottom-save {
							background-color: #1e1e2d;
						}

						@media screen and (min-width: 1200px) {
							.sticky-bottom-save {
								width: calc(100vw - 300px);
							}
						}
					`,
				}}
			/>
			<div class='position-sticky bottom-0 p-3 ms-auto sticky-bottom-save'>{children}</div>
		</>
	);
}
