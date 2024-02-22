import { CreateTechFormData } from "../../models/CreateTechFormData"

export default async function createTechSubmit(
	formData: CreateTechFormData
): Promise<Response> {
	let skills: { name: string; rating: number }[] = []

	// assign the skilrating to the related skill and add them both to an object
	formData.skills.forEach((skill, index) => {
		// since i used the same index as the skill array we can find the related skillrating
		let skillRating = formData.skillRating[index]
		skills.push({ name: skill, rating: skillRating || 1 })
	})

	const res = await fetch(`${import.meta.env.VITE_API}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			FirstName: formData.firstname,
			Email: formData.email,
			Password: formData.password,
			Skills: skills,
		}),
		credentials: "include",
	})
	if (!res.ok) {
		const errorMessage = await res.json()
		if (res.status === 401) throw new Error(errorMessage.message)
		throw new Error(`An unexpected error occured: ${errorMessage.message}`)
	}
	return res
}
