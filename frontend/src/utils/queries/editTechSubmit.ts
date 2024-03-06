import { EditTechFormData } from "../../models/EditTechFormData"
import { Skill } from "../../models/Skill"
import prepareSkills from "../prepareSkills"

export default async function editTechSubmit(
	formData: EditTechFormData,
	allSkills: readonly Skill[] | undefined
): Promise<Response> {
	const skills = prepareSkills(formData, allSkills)

	const res = await fetch(
		`${import.meta.env.VITE_API}/tech/edit/${formData.id}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				FirstName: formData.firstName,
				Email: formData.email,
				Skills: skills,
			}),
			credentials: "include",
		}
	)
	if (!res.ok) {
		const errorMessage = await res.json()
		throw new Error(errorMessage.message)
	}
	return res
}
