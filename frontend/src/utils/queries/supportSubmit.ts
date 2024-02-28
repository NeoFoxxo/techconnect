import { Skill } from "../../models/Skill"
import { SupportFormData } from "../../models/SupportFormData"

export default async function supportSubmit(
	formData: SupportFormData,
	allSkills: readonly Skill[] | undefined
): Promise<Response> {
	// convert skills to skill ids
	const skillIds = formData.skills.map((name) => {
		const skill = allSkills?.find((skill) => skill.name === name)
		return skill?.id
	})

	const res = await fetch(`${import.meta.env.VITE_API}/support`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			clientName: formData.clientName,
			clientEmail: formData.clientEmail,
			title: formData.title,
			description: formData.description,
			urgency: formData.urgency,
			skills: skillIds,
		}),
		credentials: "include",
	})
	if (!res.ok) {
		const errorMessage = await res.json()
		throw new Error(errorMessage.message)
	}
	const data = await res.json()
	sessionStorage.setItem("ticket", data.ticket.toString())
	sessionStorage.setItem("tech", data.tech.toString())
	sessionStorage.setItem("name", formData.clientName)
	return res
}
