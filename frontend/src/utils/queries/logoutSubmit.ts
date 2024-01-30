export async function logoutSubmit(): Promise<Response | null> {
	const res = await fetch(`${import.meta.env.VITE_API}/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	if (!res.ok) {
		if (res.status === 401) {
			return null
		}
		throw new Error(`An unexpected error occured: ${await res.text()}`)
	}
	return res
}
