import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function Tech() {
	// TODO: if user is not authed redirect to tech login

	return (
		<Box>
			<Typography
				component="h1"
				variant="h3"
				paddingTop={5}
				align="center"
				color="text.primary"
				fontWeight="bold"
				gutterBottom
			>
				Technician Login
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				Login to your technician account
			</Typography>
			<Typography
				variant="body1"
				align="center"
				color="text.secondary"
				paragraph
			>
				Welcome
			</Typography>
		</Box>
	)
}
