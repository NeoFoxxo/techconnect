import { CreateTechFormData } from "../../models/CreateTechFormData"
import { Skill } from "../../models/Skill"
import prepareSkills from "../prepareSkills"

export default async function createTechSubmit(
	formData: CreateTechFormData,
	allSkills: readonly Skill[] | undefined
): Promise<Response> {
	const skills = prepareSkills(formData, allSkills)

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
		throw new Error(errorMessage.message)
	}
	return res
}
