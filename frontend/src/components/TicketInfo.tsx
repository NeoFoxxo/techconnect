import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { TicketInfo } from "../pages/tech/Ticket"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"

interface TicketInfoProps {
	ticket: TicketInfo
}

export default function TicketInfo({ ticket }: TicketInfoProps) {
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
				{ticket.skills.map((skill) => {
					return (
						<Grid item>
							<Chip label={skill} />
						</Grid>
					)
				})}
			</Grid>
			<Grid container justifyContent="center" spacing={1} paddingTop={1.8}>
				<Button variant="contained">Close Ticket</Button>
			</Grid>
		</Box>
	)
}
