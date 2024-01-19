export default async function loginSubmit(formData: {
	email: string
	password: string
}) {
	try {
		const res = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		if (!res.ok) {
			return {
				success: false,
				error: `An error occured when logging in: ${res.statusText}`,
			}
		}
		return { success: true, error: null }
	} catch (error) {
		return {
			success: false,
			error: `An error occured when logging in: ${error}`,
		}
	}
}
