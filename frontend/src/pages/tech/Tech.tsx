import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import useSession from "../../utils/hooks/useSession"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Error from "../../components/Error"

export default function Tech() {
	const session = useSession()
	const navigate = useNavigate()

	useEffect(() => {
		if (session?.data === null) {
			navigate("/tech/login")
		}
	}, [session])

	return (
		<Box>
			{session.isPending && (
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					sx={{ minHeight: "80vh" }}
				>
					<CircularProgress color="primary" size={80} />
				</Grid>
			)}
			{session.isError && <Error />}
			{session.isSuccess && (
				<>
					<Typography
						component="h1"
						variant="h3"
						paddingTop={5}
						align="center"
						color="text.primary"
						fontWeight="bold"
						gutterBottom
					>
						Technician
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						Welcome {session.data?.email}
					</Typography>
				</>
			)}
		</Box>
	)
}
