import { SupportFormData } from "../../models/SupportFormData"

export default async function supportSubmit(formData: SupportFormData) {
	try {
		const res = await fetch("/api/support", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		if (!res.ok) {
			return {
				success: false,
				error: `An error occured when submitting your support request: ${res.statusText}`,
			}
		}
		return { success: true, error: null }
	} catch (error) {
		return {
			success: false,
			error: `An error occured when submitting your support request: ${error}`,
		}
	}
}
