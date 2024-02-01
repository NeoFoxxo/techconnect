import { useQuery } from "@tanstack/react-query"
import getTicketInfo from "../../utils/queries/getTicketInfo"
import { useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"

export interface TicketInfo {
	id: number
	clientName: string
	title: string
	description: string
	urgency: string
	skills: string[]
}

export default function Ticket() {
	const { ticketId } = useParams()
	const ticket = useQuery({
		queryKey: ["getTicketInfo"],
		queryFn: () => getTicketInfo(ticketId),
		enabled: ticketId != undefined,
	})

	return (
		<Box>
			{ticket.isLoading && (
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					sx={{ minHeight: "80vh" }}
				>
					<CircularProgress color="primary" size={80} />
				</Grid>
			)}
			{ticket.isSuccess && (
				<>
					<Typography
						component="h1"
						variant="h3"
						paddingTop={5}
						align="center"
						color="text.primary"
						fontWeight="bold"
						gutterBottom
					>
						Current Tickets
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						{ticket.data.clientName}: {ticket.data.title}
					</Typography>
				</>
			)}
		</Box>
	)
}
