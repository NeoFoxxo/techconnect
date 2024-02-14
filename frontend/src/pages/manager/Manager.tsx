import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import useSession from "../../utils/hooks/useSession"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Error from "../../components/Error"
import TicketTable from "../../components/TicketTable"
import { useQuery } from "@tanstack/react-query"
import getTickets from "../../utils/queries/getTickets"

export interface Ticket {
	id: number
	clientName: string
	title: string
	urgency: string
}

export default function Manager() {
	const session = useSession()
	const navigate = useNavigate()

	useEffect(() => {
		if (session?.data === null) {
			navigate("/manager/login")
		}
	}, [session])

	return (
		<Box>
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
					Manager
				</Typography>
				<Typography
					variant="h5"
					align="center"
					color="text.secondary"
					paragraph
				>
					Welcome {session.data?.firstName} the {session.data?.role}
				</Typography>
				<Typography
					variant="h6"
					align="center"
					color="text.secondary"
					paragraph
				>
					Show all technicians and modify them
				</Typography>
			</>
		</Box>
	)
}
