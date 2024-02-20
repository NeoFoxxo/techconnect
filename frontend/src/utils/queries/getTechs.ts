import { Technician } from "../../models/Technician"

export default async function getTechs(): Promise<readonly Technician[]> {
	const res = await fetch(`${import.meta.env.VITE_API}/tech`, {
		credentials: "include",
	})
	if (!res.ok) {
		throw new Error(`${res.status}`)
	}
	return res.json()
}
