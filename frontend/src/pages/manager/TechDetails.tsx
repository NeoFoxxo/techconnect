import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CreateTechForm from "../../components/CreateTechForm"
import { useParams } from "react-router-dom"

export default function TechDetails() {
	const { techId } = useParams()
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
				Technician Details
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				View and edit the selected Technician
			</Typography>
			<CreateTechForm />
		</Box>
	)
}
