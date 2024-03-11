import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import useSession from "../../utils/hooks/useSession"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import TechTable from "../../components/TechTable"
import getTechs from "../../utils/queries/getTechs"
import { Button, CircularProgress } from "@mui/material"
import { Grid } from "@mui/material"
import Error from "../../components/Error"

export default function Manager() {
	const session = useSession()
	const navigate = useNavigate()

	useEffect(() => {
		if (session?.data === null) {
			navigate("/manager/login")
		}
	}, [session])

	const techs = useQuery({
		queryKey: ["getTechnicians"],
		enabled: session.data?.id != undefined, // only query when the id is defined
		queryFn: () => getTechs(),
		retry: false,
	})

	if (techs.error?.message === "403") {
		navigate("/manager/login")
	}

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
					<Grid>
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
							Select a technician below to view or edit their details
						</Typography>
						<Grid
							textAlign="center"
							justifyContent={"center"}
							spacing={5}
							container
						>
							<Grid item>
								<Link to="createtech">
									<Button variant="contained">Create New Technician</Button>
								</Link>
							</Grid>
							<Grid item>
								<Link to="addskill">
									<Button variant="contained">Add New Skill</Button>
								</Link>
							</Grid>
						</Grid>
						<TechTable technicians={techs.data} />
					</Grid>
				)
			)}
		</Box>
	)
}
