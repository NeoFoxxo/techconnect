import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LoginForm from "../../components/LoginForm"

export default function TechLogin() {
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
			<LoginForm />
		</Box>
	)
}
