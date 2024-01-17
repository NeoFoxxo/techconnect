import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

export default function Selector() {
	const cardSx = {
		margin: "10px",
		border: "2px solid white",
		"&:hover": { border: "2px solid #1976d2", boxShadow: 3 },
	}

	return (
		<Grid container xs justifyContent={"center"}>
			<Card sx={cardSx}>
				<Link to="/client">
					<CardMedia
						component={"img"}
						height={140}
						src="/img/sunset.jpg"
						sx={{ height: "40vh", width: "auto" }}
					/>
					<CardContent>
						<Typography variant="h5" align="center" color="text.primary">
							Client
						</Typography>
					</CardContent>
				</Link>
			</Card>
			<Card sx={cardSx}>
				<Link to="/tech">
					<CardMedia
						component={"img"}
						height={140}
						src="/img/sunset.jpg"
						sx={{ height: "40vh", width: "auto" }}
					/>
					<CardContent>
						<Typography variant="h5" align="center" color="text.primary">
							Technician
						</Typography>
					</CardContent>
				</Link>
			</Card>
		</Grid>
	)
}
