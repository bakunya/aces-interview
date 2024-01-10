import clsx from 'clsx';
import timeSince from '../utils/time-since';
import { match } from 'ts-pattern';

export default function ListGroup({
	id,
	name,
	href,
	created,
	definition,
	innerHTML,
}: {
	id: string;
	name?: string;
	created?: string;
	definition?: string;
	href: string;
	innerHTML?: boolean;
}) {
	return (
		<div class={clsx('list-group', 'mt-4')} key={id}>
			<a href={href} class='list-group-item list-group-item-action'>
				<div class='d-flex w-100 justify-content-between'>
					<h6 class='mb-3 text-capitalize'>{name}</h6>
					<small>{created}</small>
				</div>
				{match(Boolean(innerHTML))
					.with(true, () => (
						<small
							dangerouslySetInnerHTML={{
								__html: definition ?? '',
							}}
						/>
					))
					.with(false, () => <small>{definition}</small>)
					.exhaustive()}
			</a>
		</div>
	);
}
