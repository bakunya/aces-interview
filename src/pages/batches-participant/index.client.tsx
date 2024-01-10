import { swalError } from "../../client-env/swal"
import Swal from "sweetalert2"

function handleParticipantDeleteBulk() {
	const form = document.querySelector<HTMLFormElement>("form#participant-delete-bulk")
	if(!form) return

	form.addEventListener("submit", async (e) => {
		e.preventDefault()
		
		const participantIDs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="participant_id[]"]'))
			.filter(v => v.checked)
			.map(v => v.value)
		if(participantIDs.length === 0) return swalError("No participant selected")

		const { isConfirmed } = await Swal.fire({
			icon: "warning",
			title: "Are you sure?",
			showCancelButton: true,
			cancelButtonText: "No, keep it",
			confirmButtonText: "Yes, delete it!",
			text: `Are you sure you want to delete ${participantIDs.length} participant(s)?`,
		})
		if(!isConfirmed) return

		form.querySelector<HTMLInputElement>('input[type="hidden"][name="participant_id"]')!.value = JSON.stringify(participantIDs)
		form.submit()
	})
}

document.addEventListener("DOMContentLoaded", () => {
	handleParticipantDeleteBulk()
})