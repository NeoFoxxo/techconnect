import { CreateTechFormData } from "../../models/CreateTechFormData"
import { Skill } from "../../models/Skill"

export default async function createTechSubmit(
	formData: CreateTechFormData,
	allSkills: readonly Skill[] | undefined
): Promise<Response> {
	// convert skills to skill ids
	const skillIds = formData.skills.map((name) => {
		const skill = allSkills?.find((skill) => skill.name === name)
		return skill?.id
	})

	let skills: { id: number | undefined; rating: number }[] = []

	// assign the skilrating to the related skill and add them both to an object
	skillIds.forEach((skillid, index) => {
		// since i used the same index as the skill array we can find the related skillrating
		let skillRating = formData.skillRating[index]
		skills.push({ id: skillid, rating: skillRating || 1 })
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
		throw new Error(errorMessage.message)
	}
	return res
}
