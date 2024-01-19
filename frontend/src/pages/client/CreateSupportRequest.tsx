import Box from "@mui/material/Box"
import SupportForm from "../../components/SupportForm"
import Typography from "@mui/material/Typography"

export default function CreateSupportRequest() {
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
				Submit a support request
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				Fill out the form below to submit your support request
			</Typography>
			<SupportForm />
		</Box>
	)
}
