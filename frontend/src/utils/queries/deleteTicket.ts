export default async function deleteTicket(
	ticketId: string | undefined
): Promise<Response> {
	const res = await fetch(`${import.meta.env.VITE_API}/ticket/${ticketId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	if (!res.ok) {
		const errorMessage = await res.json()
		if (res.status === 401) throw new Error(errorMessage.message)
		throw new Error(errorMessage.message)
	}
	return res
}
