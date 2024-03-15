import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"
import useIsMobile from "../utils/hooks/useIsMobile"
import useSession from "../utils/hooks/useSession"
import { Button, Grid } from "@mui/material"
import Hamburger from "./Hamburger"

export default function Topbar() {
	const isMobile = useIsMobile()
	const session = useSession()

	return (
		<Box>
			<AppBar position="static" sx={{ zIndex: 1 }}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Link to="/">
						<Typography variant="h5" component="div" fontWeight="bold">
							TechConnect
						</Typography>
					</Link>
					<Grid>
						{!isMobile && (
							<>
								{session?.data && (
									<Hamburger role={session?.data?.role ?? null} />
								)}
							</>
						)}
						{isMobile && (
							<>
								{session?.data?.role === "Technician" && (
									<Link to={"/tech"}>
										<Button color="inherit" sx={{ paddingX: 2 }}>
											Tickets
										</Button>
									</Link>
								)}
								{session?.data?.role === "Manager" && (
									<Link to={"/manager"}>
										<Button color="inherit" sx={{ paddingX: 2 }}>
											Technicians
										</Button>
									</Link>
								)}
								{session?.data && <LogoutButton />}
								<a
									href="https://github.com/NeoFoxxo/techconnect"
									target="_blank"
									style={{ paddingLeft: 15 }}
								>
									<img
										src="/img/github.svg"
										height={"30"}
										width={"30"}
										style={{ verticalAlign: "middle" }}
									/>
								</a>
							</>
						)}
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
