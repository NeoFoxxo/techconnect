import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useNavigate } from "react-router-dom"
import { Technician } from "../models/Technician"

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", flex: 1, sortable: false },
	{ field: "firstName", headerName: "First Name", flex: 1, sortable: false },
	{ field: "email", headerName: "Email", flex: 1, sortable: false },
]

export default function TechTable({
	technicians,
}: {
	technicians: readonly Technician[]
}) {
	const navigate = useNavigate()

	function goToTechnician(technicianId: string) {
		navigate(`/manager/techdetails/${technicianId}`)
	}

	return (
		<main>
			{!technicians[0] && (
				<Box paddingTop={5} textAlign="center" marginTop={5}>
					<Typography
						component="h5"
						variant="h5"
						align="center"
						color="text.primary"
						fontWeight="bold"
					>
						No Technicians were found
					</Typography>
				</Box>
			)}
			{technicians[0] && (
				<Box sx={{ maxWidth: 930, marginX: "auto", marginTop: 5 }}>
					<DataGrid
						rows={technicians}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						onRowClick={(params) => goToTechnician(params.id as string)}
					/>
				</Box>
			)}
		</main>
	)
}
