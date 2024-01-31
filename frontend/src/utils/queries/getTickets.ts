import { Ticket } from "../../pages/tech/Tech"

export default async function getTickets(
	userId: string | undefined
): Promise<readonly Ticket[]> {
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
