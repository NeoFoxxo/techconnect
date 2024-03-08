import { CreateTechFormData } from "../models/CreateTechFormData"
import { EditTechFormData } from "../models/EditTechFormData"
import { Skill } from "../models/Skill"

export default function prepareSkills(
	formData: EditTechFormData | CreateTechFormData,
	allSkills: readonly Skill[] | undefined
): { id: number | undefined; rating: number }[] {
	// convert skills to skill ids
	const skillIds = formData?.skills?.map((name) => {
		const skill = allSkills?.find((skill) => skill.name === name)
		return skill?.id
	})
	let skills: { id: number | undefined; rating: number }[] = []

	skillIds?.forEach((skillid, index) => {
		//@ts-expect-error
		let skillRating = formData?.skillRating[index]
		skills.push({ id: skillid, rating: skillRating })
	})

	return skills
}
