export default async function addSkillSubmit(
	skillName: string
): Promise<Response> {
	const res = await fetch(`${import.meta.env.VITE_API}/skill`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ SkillName: skillName }),
		credentials: "include",
	})
	if (!res.ok) {
		const errorMessage = await res.json()
		if (res.status === 401) throw new Error(errorMessage.message)
		throw new Error(errorMessage.message)
	}
	return res
}
