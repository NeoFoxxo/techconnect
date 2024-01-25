import Button from "@mui/material/Button"
import { useMutation } from "@tanstack/react-query"
import useSession from "../utils/hooks/useSession"

async function logoutSubmit(): Promise<Response | null> {
	const res = await fetch(`${import.meta.env.VITE_API}/logout`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	if (!res.ok) {
		if (res.status === 401) {
			return null
		}
		throw new Error(`An unexpected error occured: ${await res.text()}`)
	}
	return res.json()
}

export default function LogoutButton() {
	const session = useSession()
	const logout = useMutation({
		mutationKey: ["logout"],
		mutationFn: logoutSubmit,
	})

	async function onButtonClick() {
		logout.mutate()
		window.location.reload()
	}

	return (
		<>
			{session?.data && (
				<Button color="inherit" onClick={() => onButtonClick()}>
					Logout
				</Button>
			)}
		</>
	)
}
