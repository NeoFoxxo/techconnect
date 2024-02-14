import { LoginFormData } from "../../components/LoginForm"

export default async function loginSubmit(
	formData: LoginFormData,
	isManager: boolean
): Promise<Response> {
	const res = await fetch(
		`${import.meta.env.VITE_API}/login?manager=${isManager}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
			credentials: "include",
		}
	)
	if (!res.ok) {
		const errorMessage = await res.json()
		if (res.status === 401) throw new Error(errorMessage.message)
		throw new Error(`An unexpected error occured: ${errorMessage.message}`)
	}
	return res
}
