import { TechInfo } from "../../models/TechInfo"

export default async function getTechInfo(
	techId: string | undefined
): Promise<TechInfo | null> {
	const res = await fetch(`${import.meta.env.VITE_API}/ticket/info/${techId}`, {
		credentials: "include",
	})
	if (!res.ok) {
		if (res.status === 404) {
			return null
		}
		throw new Error(`An unexpected error occured: ${res.status}`)
	}
	return res.json()
}
