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

export default function Tech() {
	const session = useSession()
	const navigate = useNavigate()

	useEffect(() => {
		if (session?.data === null) {
			navigate("/tech/login")
		}
	}, [session])

	const tickets = useQuery({
		queryKey: ["getTickets"],
		enabled: session.data?.id != undefined, // only query when the id is defined
		queryFn: () => getTickets(session.data?.id),
	})

	return (
		<Box>
			{tickets.isPending ? (
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					sx={{ minHeight: "80vh" }}
				>
					<CircularProgress color="primary" size={80} />
				</Grid>
			) : session.isError || tickets.isError ? (
				<Error />
			) : (
				tickets.isSuccess && (
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
							Welcome {session.data?.firstName} the {session.data?.role}
						</Typography>
						<TicketTable tickets={tickets.data} />
					</>
				)
			)}
		</Box>
	)
}
