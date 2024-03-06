import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useParams } from "react-router-dom"
import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTechInfo from "../../utils/queries/getTechInfo"
import { TechInfo } from "../../models/TechInfo"
import EditTechForm from "../../components/EditTechForm"
import Grid from "@mui/material/Grid"
import { CircularProgress } from "@mui/material"

export default function TechDetails() {
	const { techId } = useParams()

	const techDetails: UseQueryResult<TechInfo | null> = useQuery({
		queryKey: ["getTechInfo", techId],
		queryFn: () => getTechInfo(techId),
		enabled: techId != null,
	})

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
			{techDetails.isPending && (
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					sx={{ minHeight: "80vh" }}
				>
					<CircularProgress color="primary" size={80} />
				</Grid>
			)}
			{techDetails.isSuccess && <EditTechForm techDetails={techDetails.data} />}
		</Box>
	)
}
