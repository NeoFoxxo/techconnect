import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Link } from "react-router-dom"

export default function Selector() {
	return (
		<section id="selector">
			<Card className="selector-card">
				<Link to="/client">
					<CardMedia component={"img"} height={140} src="/img/sunset.jpg" />
					<CardContent>
						<Typography variant="h5" align="center" color="text.primary">
							Client
						</Typography>
					</CardContent>
				</Link>
			</Card>
			<Card className="selector-card">
				<Link to="/tech">
					<CardMedia component={"img"} height={140} src="/img/sunset.jpg" />
					<CardContent>
						<Typography variant="h5" align="center" color="text.primary">
							Technician
						</Typography>
					</CardContent>
				</Link>
			</Card>
		</section>
	)
}
