import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"

export default function Topbar() {
	return (
		<Box>
			<AppBar position="static" sx={{ zIndex: 1 }}>
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<Link to="/">
						<Typography variant="h5" component="div" fontWeight="bold">
							TechConnect
						</Typography>
					</Link>
					<LogoutButton />
				</Toolbar>
			</AppBar>
		</Box>
	)
}
