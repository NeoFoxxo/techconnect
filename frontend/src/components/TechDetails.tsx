import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import useSession from "../../utils/hooks/useSession"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import TechTable from "../../components/TechTable"
import getTechnicans from "../../utils/queries/getTechnicans"
import { CircularProgress } from "@mui/material"
import { Grid } from "@mui/material"
import Error from "../../components/Error"

export default function TechDetails() {
	return (
		<Box>
			{techs.isPending ? (
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					sx={{ minHeight: "80vh" }}
				>
					<CircularProgress color="primary" size={80} />
				</Grid>
			) : session.isError || techs.isError ? (
				<Error />
			) : (
				techs.isSuccess && (
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
							Technicians
						</Typography>
						<Typography
							variant="h6"
							align="center"
							color="text.secondary"
							paragraph
						>
							Select a technician below to edit their details or view their
							profile
						</Typography>
						<TechTable technicians={techs.data} />
					</>
				)
			)}
		</Box>
	)
}
