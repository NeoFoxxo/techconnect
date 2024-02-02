import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTicketInfo from "../../utils/queries/getTicketInfo"
import { useNavigate, useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import useSession from "../../utils/hooks/useSession"
import { useEffect } from "react"
import TicketInfo from "../../components/TicketInfo"
import Divider from "@mui/material/Divider"

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
	const session = useSession()
	const navigate = useNavigate()

	useEffect(() => {
		if (session?.data === null) {
			navigate("/tech/login")
		}
	}, [session])

	const ticket: UseQueryResult<TicketInfo> = useQuery({
		queryKey: ["getTicketInfo", ticketId],
		queryFn: () => getTicketInfo(ticketId),
		enabled: ticketId != undefined,
	})

	return (
		<Box paddingX={5}>
			<Typography
				component="h1"
				variant="h3"
				paddingTop={2}
				align="center"
				color="text.primary"
				fontWeight="bold"
				gutterBottom
			>
				Current Ticket
			</Typography>
			<Divider />
			{ticket.isLoading && (
				<Grid container justifyContent="center" alignItems="center">
					<CircularProgress color="primary" size={80} />
				</Grid>
			)}
			{ticket.isSuccess && (
				<Grid container wrap={"wrap"}>
					<Grid item flex={1}>
						<Typography
							variant="h5"
							padding={2}
							align="center"
							color="text.primary"
							fontWeight="bold"
						>
							Chat
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant="h5"
							padding={2}
							align="center"
							color="text.primary"
							fontWeight="bold"
						>
							Current Ticket
						</Typography>
						<TicketInfo ticket={ticket.data} />
						<Typography
							variant="h5"
							padding={3}
							align="center"
							color="text.primary"
							fontWeight="bold"
						>
							Voice Chat
						</Typography>
						<TicketInfo ticket={ticket.data} />
					</Grid>
				</Grid>
			)}
		</Box>
	)
}
