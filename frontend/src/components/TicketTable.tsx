import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { SxProps, Theme } from "@mui/material/styles"
import { Ticket } from "../pages/tech/Tech"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

function getRowColor(urgency: string): SxProps<Theme> | undefined {
	if (urgency === "Critical") {
		return { fontWeight: "bold", color: "#f50707" }
	} else if (urgency === "Normal") {
		return { color: "#0099ff" }
	} else {
		return {}
	}
}

export default function TicketTable({
	tickets,
}: {
	tickets: readonly Ticket[]
}) {
	return (
		<main>
			{!tickets[0] && (
				<Box paddingTop={5} textAlign="center" marginTop={5}>
					<Typography
						component="h5"
						variant="h5"
						align="center"
						color="text.primary"
						fontWeight="bold"
					>
						You currently have 0 tickets! 🥳
					</Typography>
				</Box>
			)}
			{tickets[0] && (
				<TableContainer
					component={Paper}
					sx={{ maxWidth: 900, marginX: "auto", marginTop: 5 }}
				>
					<Table aria-label="ticket table">
						<TableHead>
							<TableRow>
								<TableCell>Ticket ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Subject</TableCell>
								<TableCell>Urgency</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tickets.map((ticket) => (
								<TableRow key={ticket.id}>
									<TableCell component="th" scope="row">
										{ticket.id}
									</TableCell>
									<TableCell component="th" scope="row">
										{ticket.clientName}
									</TableCell>
									<TableCell component="th" scope="row">
										{ticket.title}
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										sx={getRowColor(ticket.urgency)}
									>
										{ticket.urgency}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</main>
	)
}
