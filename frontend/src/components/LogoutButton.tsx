import Button from "@mui/material/Button"
import { useMutation } from "@tanstack/react-query"
import useSession from "../utils/hooks/useSession"
import { logoutSubmit } from "../utils/queries/logoutSubmit"

export default function LogoutButton() {
	const session = useSession()

	const logout = useMutation({
		mutationKey: ["logout"],
		mutationFn: logoutSubmit,
		onSuccess: () => window.location.reload(),
	})

	async function onButtonClick() {
		logout.mutate()
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
