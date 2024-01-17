import Selector from "../../components/Selector"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

export default function Home() {
	return (
		<main>
			<Box
				sx={{
					// bgcolor: "#eeee",
					pt: 5,
					pb: 29,
				}}
			>
				<Container maxWidth="xl">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						fontWeight="bold"
						gutterBottom
					>
						Welcome to TechConnect
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						Please choose your role
					</Typography>

					<Selector />
				</Container>
			</Box>
		</main>
	)
}
