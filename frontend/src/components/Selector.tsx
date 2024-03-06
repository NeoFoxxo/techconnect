import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"
import useIsMobile from "../utils/hooks/useIsMobile"

const cardSx = {
	margin: "10px",
	border: "2px solid white",
	"&:hover": { border: "2px solid #1976d2", boxShadow: 3 },
}
const cardMediaSx = {
	height: "28vh",
	width: "auto",
}

export default function Selector() {
	const hasTicket = sessionStorage.getItem("ticket")

	let clientLink: string = "/client/createsupportrequest"

	if (hasTicket) {
		clientLink = "/client/support"
	}

	const isMobile = useIsMobile()
	return (
		<Grid container justifyContent={"center"} paddingTop={isMobile ? 8 : 1}>
			<Grid item>
				<Card sx={cardSx}>
					<Link to={clientLink}>
						<CardMedia
							component={"img"}
							src="/img/client.jpg"
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
						<CardMedia component={"img"} src="/img/tech.jpg" sx={cardMediaSx} />
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
							src="/img/manager.jpg"
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
