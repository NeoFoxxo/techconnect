import Box from "@mui/material/Box"
import SupportForm from "../../components/SupportForm"
import Typography from "@mui/material/Typography"
import useIsMobile from "../../utils/hooks/useIsMobile"

export default function CreateSupportRequest() {
	const isMobile = useIsMobile()
	return (
		<Box>
			<Typography
				component="h1"
				variant={isMobile ? "h3" : "h4"}
				paddingTop={5}
				align="center"
				color="text.primary"
				fontWeight="bold"
				gutterBottom
			>
				Submit a support request
			</Typography>
			<Typography
				variant={isMobile ? "h5" : "subtitle1"}
				align="center"
				color="text.secondary"
				paragraph
			>
				Fill out the form below to submit your support request
			</Typography>
			<SupportForm />
		</Box>
	)
}
