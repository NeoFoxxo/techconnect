import { Skill } from "../../models/Skill"

export default async function getSkills(): Promise<readonly Skill[]> {
	const res = await fetch(`${import.meta.env.VITE_API}/skill`)
	if (!res.ok) {
		throw new Error(`An unexpected error occured: ${res.status}`)
	}
	return res.json()
}
