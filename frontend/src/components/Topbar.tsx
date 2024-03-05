import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"
import useIsMobile from "../utils/hooks/useIsMobile"
import useSession from "../utils/hooks/useSession"
import { Button, Grid } from "@mui/material"

export default function Topbar() {
	const isMobile = useIsMobile()
	const session = useSession()

	return (
		<Box>
			<AppBar position="static" sx={{ zIndex: 1 }}>
				<Toolbar sx={{ justifyContent: isMobile ? "space-between" : "center" }}>
					<Link to="/">
						<Typography variant="h5" component="div" fontWeight="bold">
							TechConnect
						</Typography>
					</Link>
					<Grid>
						{session?.data?.role === "Technician" && (
							<>
								<Link to={"/tech"}>
									<Button color="inherit" sx={{ paddingX: 2 }}>
										Tickets
									</Button>
								</Link>
							</>
						)}
						{session?.data?.role === "Manager" && (
							<>
								<Link to={"/manager"}>
									<Button color="inherit" sx={{ paddingX: 2 }}>
										Technicians
									</Button>
								</Link>
							</>
						)}
						{session?.data && <LogoutButton />}
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
