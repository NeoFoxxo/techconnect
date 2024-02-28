import { TechInfo } from "../../models/TechInfo"

export default async function getTechInfo(
	techId: string | undefined | null
): Promise<TechInfo | null> {
	const res = await fetch(`${import.meta.env.VITE_API}/tech/info/${techId}`, {
		credentials: "include",
	})
	if (!res.ok) {
		if (res.status === 404) {
			return null
		}
		const errorMessage = await res.json()
		throw new Error(errorMessage.message)
	}
	return res.json()
}
