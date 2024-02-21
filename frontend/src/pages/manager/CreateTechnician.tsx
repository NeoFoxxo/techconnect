import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CreateTechForm from "../../components/CreateTechForm"

export default function CreateTechnician() {
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
				Create a new Technician
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				Fill out the form below to add a new Technician account
			</Typography>
			<CreateTechForm />
		</Box>
	)
}
