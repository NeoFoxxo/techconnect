import { LoginFormData } from "../../components/Login"

export default async function loginSubmit(
	formData: LoginFormData
): Promise<Response> {
	const res = await fetch(`${import.meta.env.VITE_API}/login?useCookies=true`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
		credentials: "include",
	})
	if (!res.ok) {
		if (res.status === 401) throw new Error("Incorrect Credentials")
		throw new Error(`An unexpected error occured: ${await res.text()}`)
	}

	return res
}
