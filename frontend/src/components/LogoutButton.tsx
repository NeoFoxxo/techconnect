import Button from "@mui/material/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logoutSubmit } from "../utils/queries/logoutSubmit"

export default function LogoutButton() {
	const queryClient = useQueryClient()

	const logout = useMutation({
		mutationKey: ["logout"],
		mutationFn: logoutSubmit,
		onSuccess: () => window.location.reload(),
	})

	async function onButtonClick() {
		logout.mutate()
		await queryClient.invalidateQueries({ queryKey: ["session"] }) // invalidate session cache
	}

	return (
		<Button color="inherit" onClick={() => onButtonClick()}>
			Logout
		</Button>
	)
}
