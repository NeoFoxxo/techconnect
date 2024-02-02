import TableCell from "@mui/material/TableCell"
import { SxProps, Theme } from "@mui/material/styles"
import { Ticket } from "../pages/tech/Tech"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"

function getRowColor(urgency: string): SxProps<Theme> | undefined {
	if (urgency === "Critical") {
		return { fontWeight: "bold", color: "#f50707" }
	} else if (urgency === "Normal") {
		return { color: "#0099ff" }
	} else {
		return {}
	}
}

const columns: GridColDef[] = [
	{ field: "id", headerName: "Ticket ID", flex: 1, sortable: false },
	{ field: "clientName", headerName: "Name", flex: 1, sortable: false },
	{
		field: "title",
		headerName: "Subject",
		flex: 2,
		sortable: false,
	},
	{
		field: "urgency",
		headerName: "Urgency",
		flex: 1,
		sortable: false,
		renderCell: (params) => (
			<TableCell sx={getRowColor(params.value)} component={"div"}>
				{params.value}
			</TableCell>
		),
	},
]

export default function TicketTable({
	tickets,
}: {
	tickets: readonly Ticket[]
}) {
	const navigate = useNavigate()

	function goToTicket(ticketId: number) {
		navigate(`/tech/ticket/${ticketId}`)
	}

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
				<Box sx={{ maxWidth: 930, marginX: "auto", marginTop: 5 }}>
					<DataGrid
						rows={tickets}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						onRowClick={(params) => goToTicket(params.id as number)}
					/>
				</Box>
			)}
		</main>
	)
}
