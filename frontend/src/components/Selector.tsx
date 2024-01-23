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
	const cardMediaSx = {
		height: "28vh",
		width: "auto",
	}

	return (
		<Grid container justifyContent={"center"} paddingTop={8}>
			<Grid item>
				<Card sx={cardSx}>
					<Link to="/client/createsupportrequest">
						<CardMedia
							component={"img"}
							src="/img/sunset.jpg"
							sx={cardMediaSx}
						/>
						<CardContent>
							<Typography variant="h5" align="center" color="text.primary">
								Client
							</Typography>
						</CardContent>
					</Link>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={cardSx}>
					<Link to="/tech">
						<CardMedia
							component={"img"}
							src="/img/sunset.jpg"
							sx={cardMediaSx}
						/>
						<CardContent>
							<Typography variant="h5" align="center" color="text.primary">
								Technician
							</Typography>
						</CardContent>
					</Link>
				</Card>
			</Grid>
			<Grid item>
				<Card sx={cardSx}>
					<Link to="/manager">
						<CardMedia
							component={"img"}
							src="/img/sunset.jpg"
							sx={cardMediaSx}
						/>
						<CardContent>
							<Typography variant="h5" align="center" color="text.primary">
								Manager
							</Typography>
						</CardContent>
					</Link>
				</Card>
			</Grid>
		</Grid>
	)
}
