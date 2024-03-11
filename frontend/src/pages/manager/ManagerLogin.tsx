import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import LoginForm from "../../components/LoginForm"
import { Grid } from "@mui/material"
import DemoAccountBox from "../../components/DemoAccountBox"

export default function ManagerLogin() {
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
				Manager Login
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				Login to your Manager account to create and modify Technicians
			</Typography>
			<Grid container justifyContent="center">
				<Grid item>
					<LoginForm isManager={true} />
				</Grid>
				<Grid item marginTop={5.2}>
					<DemoAccountBox isManager={true} />
				</Grid>
			</Grid>
		</Box>
	)
}
