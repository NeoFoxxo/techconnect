import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LoginForm from "../../components/LoginForm"
import DemoAccountBox from "../../components/DemoAccountBox"
import { Grid } from "@mui/material"

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
			<Grid container justifyContent="center">
				<Grid item>
					<LoginForm isManager={false} />
				</Grid>
				<Grid item marginTop={5.2}>
					<DemoAccountBox isManager={false} />
				</Grid>
			</Grid>
		</Box>
	)
}
