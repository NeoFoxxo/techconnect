import { Ticket } from "../../models/Ticket"

export default async function getTickets(
	userId: string | undefined
): Promise<Ticket[]> {
	const res = await fetch(`${import.meta.env.VITE_API}/ticket/${userId}`, {
		credentials: "include",
	})
	if (!res.ok) {
		if (res.status === 404) {
			return []
		}
		throw new Error(`An unexpected error occured: ${res.status}`)
	}
	return res.json()
}
