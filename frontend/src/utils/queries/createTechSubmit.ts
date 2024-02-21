import { CreateTechFormData } from "../../models/CreateTechFormData"

export default async function createTechSubmit(
	formData: CreateTechFormData
): Promise<Response> {
	const res = await fetch(`${import.meta.env.VITE_API}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
		credentials: "include",
	})
	if (!res.ok) {
		const errorMessage = await res.json()
		if (res.status === 401) throw new Error(errorMessage.message)
		throw new Error(`An unexpected error occured: ${errorMessage.message}`)
	}
	return res
}
