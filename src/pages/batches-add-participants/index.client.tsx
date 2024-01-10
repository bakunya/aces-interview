import { state } from "../../utils"
import CardParticipant from "../../components/card-participant"

document.addEventListener("DOMContentLoaded", () => {
	const participantsContainer = document.getElementById('container-participants')
	const participants = state<number>('participants', 1)
	let tmpParticipants: { name: string }[] = [{ name: "" }]

	participants.subscribe((v: { data: number, id: string }) => {
		let str = ''
		for (let i = 0; i < v?.data; i++) {
			str += <CardParticipant name={tmpParticipants[i].name} />
		}
		participantsContainer!.innerHTML = str
	})

	document.getElementById('add-participants')!.addEventListener('click', () => {
		const data = Array.from(document.querySelectorAll('.participant-card')).map(v => {
			return {
				name: (v.querySelector('input[name="name"]') as HTMLInputElement).value
			}
		})
		tmpParticipants = [...data, { name: "" }]

		participants.set(participants.getData() + 1)
	})

	document.getElementById('save-participants')!.addEventListener('submit', (e) => {
		e.preventDefault()
		const form = (e.currentTarget as HTMLFormElement)

		const data = Array.from(document.querySelectorAll('.participant-card')).map(v => {
			return {
				name: (v.querySelector('input[name="name"]') as HTMLInputElement).value
			}
		})

		form.querySelector<HTMLInputElement>('input[type="hidden"][name="participants"]')!.value = JSON.stringify(data)
		form.submit()
	})
})