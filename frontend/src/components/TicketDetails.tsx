import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { TicketInfo } from "../models/TicketInfo"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { useState } from "react"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import deleteTicket from "../utils/queries/deleteTicket"

interface TicketInfoProps {
	ticket: TicketInfo
	ticketId: string | undefined
	closeTicket: () => Promise<void>
}

export default function TicketDetails({
	ticket,
	ticketId,
	closeTicket,
}: TicketInfoProps) {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const submitDeleteTicket = useMutation({
		mutationKey: ["deleteTicket", ticketId],
		mutationFn: (ticketId: string | undefined) => deleteTicket(ticketId),
	})

	async function deleteTicketAndReset(ticketId: string | undefined) {
		await closeTicket()
		submitDeleteTicket.mutate(ticketId)
		handleClose()
	}

	return (
		<Box
			width={400}
			border={1}
			borderColor={"text.secondary"}
			boxShadow={2}
			padding={2}
		>
			<Typography variant="h6" align="center" color="text.primary" paragraph>
				{ticket.clientName}
			</Typography>
			<Divider />
			<Typography
				variant="h6"
				fontSize={"medium"}
				align="center"
				color="text.secondary"
				paragraph
				paddingTop={2}
			>
				{ticket.description}
			</Typography>
			<Divider />
			<Grid container justifyContent="center" spacing={1} padding={1}>
				{ticket.skillNames.map((skill) => {
					return (
						<Grid item>
							<Chip label={skill} />
						</Grid>
					)
				})}
			</Grid>
			<Grid container justifyContent="center" spacing={1} paddingTop={1.8}>
				<Button variant="contained" onClick={handleOpen}>
					Close Ticket
				</Button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle textAlign={"center"} fontSize={25} fontWeight={"bold"}>
						Close Ticket
					</DialogTitle>
					<Divider />
					<DialogContent>
						<DialogContentText fontSize={19}>
							Are you sure you want to close the current ticket? All data will
							be lost
						</DialogContentText>
					</DialogContent>
					<Grid justifyContent="center" spacing={1} paddingY={2} container>
						<DialogActions>
							<Button autoFocus onClick={handleClose} variant="contained">
								No
							</Button>
							<Button
								onClick={() => deleteTicketAndReset(ticketId)}
								autoFocus
								variant="contained"
								color="error"
							>
								Close Ticket
							</Button>
						</DialogActions>
					</Grid>
				</Dialog>
			</Grid>
		</Box>
	)
}
