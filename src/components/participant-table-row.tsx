import { FIRST_RENDER } from '../constant';
import { ulidSelector } from '../utils/ulid';

export default function ParticipantTableRow({
	name,
	id,
	username,
	password,
	num,
}: {
	name: string;
	id: string;
	username: string;
	password: string;
	num: number;
}) {
	const idReplace = ulidSelector();

	return (
		<tr id={ idReplace }>
			<td>
				<input type="checkbox" name="participant_id[]" value={id} class="form-check-input" />
			</td>
			<td class='fw-bold'>{ num }</td>
			<td>{ name }</td>
			<td>
				<small>{ username }</small>
			</td>
			<td>
				<small>{ password }</small>
			</td>
			<td>
				<button
					data-id={ id }
					data-num={ num }
					data-role='modal'
					data-participant-id={ id }
					data-participant-name={ name }
					data-participant-username={ username }
					data-participant-password={ password }
					data-hx-id-replace={ idReplace }
					data-render='update-participant'
					class={ `btn-update btn btn-sm btn-primary ${FIRST_RENDER}` }
				>
					<small>Update</small>
				</button>
			</td>
		</tr>
	);
}
