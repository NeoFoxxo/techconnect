import { TicketInfo } from "../../pages/tech/Ticket"

export default async function getTicketInfo(
	ticketId: string | undefined
): Promise<TicketInfo[] | null> {
	const res = await fetch(
		`${import.meta.env.VITE_API}/ticket/info/${ticketId}`,
		{
			credentials: "include",
		}
	)
	if (!res.ok) {
		if (res.status === 404) {
			return null
		}
		throw new Error(`An unexpected error occured: ${res.status}`)
	}
	return res.json()
}
