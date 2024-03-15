import { useState } from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"

export default function Hamburger({ role }: { role: string | null }) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="open drawer"
				sx={{ mr: 2 }}
				onClick={handleClick}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				{role === "Technician" && (
					<Link to={"/tech"}>
						<MenuItem>Tickets</MenuItem>
					</Link>
				)}
				{role === "Manager" && (
					<Link to={"/manager"}>
						<MenuItem>Technicians</MenuItem>
					</Link>
				)}
				<MenuItem onClick={handleClose}>
					<LogoutButton />
				</MenuItem>
			</Menu>
		</div>
	)
}
