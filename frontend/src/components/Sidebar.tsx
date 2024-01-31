import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"

const drawerWidth = 240

export default function Sidebar() {
	return (
		<Box>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
						zIndex: -1,
					},
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						<ListItem>
							<Typography
								variant="h5"
								color="text.primary"
								marginX={"auto"}
								paragraph
							>
								Open Tickets
							</Typography>
						</ListItem>
						<Divider />
						{[
							"Joe: Reset Password",
							"Joe: Sharepoint Link",
							"Mike: Server Outage",
						].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
				</Box>
			</Drawer>
		</Box>
	)
}
