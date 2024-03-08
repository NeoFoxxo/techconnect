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
import useIsMobile from "../../utils/hooks/useIsMobile"

export default function Ticket() {
	const { ticketId } = useParams()
	const session = useSession()
	const navigate = useNavigate()
	const isMobile = useIsMobile()

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
		<Box
			paddingX={isMobile ? 5 : 0}
			width={isMobile ? "90%" : "100%"}
			marginX="auto"
			paddingBottom={5}
		>
			<Typography
				component="h1"
				variant={isMobile ? "h3" : "h4"}
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
				<Grid container wrap={"wrap"} justifyContent={"center"}>
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
							Ticket Info
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
