import { FIRST_RENDER } from "../constant";
import { ulidSelector } from "../utils/ulid";
import { OrganizationModel } from "../models/organization";

export default function SelectOrganization({ organization }: { organization: OrganizationModel[] }) {
	const htmxIdReplaceCompanyDropdown = ulidSelector();

	return (
		<div id={ htmxIdReplaceCompanyDropdown }>
			<select class='form-select' name='organization_id'>
				{ organization.map(v => <option value={ v.id }>{ v.name }</option>) }
			</select>
			<button
				type="button"
				data-role='modal'
				data-id={ ulidSelector() }
				data-render={ "create-organization" }
				data-hx-id-replace={ htmxIdReplaceCompanyDropdown }
				class={ `btn btn-primary btn-sm mt-2 container-fluid ${FIRST_RENDER}` }
			>
				Tambahkan Organisasi
			</button>
		</div>
	)
}