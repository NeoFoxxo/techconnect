import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTicketInfo from "../../utils/queries/getTicketInfo"
import { useNavigate, useParams } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import useSession from "../../utils/hooks/useSession"
import { useEffect } from "react"
import Divider from "@mui/material/Divider"
import { TicketInfo } from "../../models/TicketInfo"
import TicketDetails from "../../components/TicketDetails"
import ChatBox from "../../components/ChatBox"
import useChat from "../../utils/hooks/useChat"

export default function Ticket() {
	const { ticketId } = useParams()
	const session = useSession()
	const navigate = useNavigate()

	const ticket: UseQueryResult<TicketInfo> = useQuery({
		queryKey: ["getTicketInfo", ticketId],
		queryFn: () => getTicketInfo(ticketId),
		enabled: ticketId != undefined && session.data?.id != undefined,
	})

	const { messages, sendMessage, closeTicket } = useChat(
		session.data?.firstName,
		ticketId
	)

	useEffect(() => {
		if (session?.data === null) {
			navigate("/tech/login")
		}
	}, [session])

	// prevents techs from viewing tickets not assigned to them (messy i know)
	if (ticket.isSuccess) {
		if (ticket.data?.techId != session?.data?.id) {
			navigate("/tech")
		}
	}

	return (
		<Box paddingX={5} width={"90%"} marginX="auto">
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
						<ChatBox messages={messages} sendMessage={sendMessage} />
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
						<TicketDetails
							ticket={ticket.data}
							ticketId={ticketId}
							closeTicket={closeTicket}
						/>
					</Grid>
				</Grid>
			)}
		</Box>
	)
}
