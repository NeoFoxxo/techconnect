import Selector from "../../components/Selector"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import useIsMobile from "../../utils/hooks/useIsMobile"

export default function Home() {
	const isMobile = useIsMobile()
	return (
		<main>
			<Box paddingTop={5}>
				<Container maxWidth="xl">
					<Typography
						component="h1"
						variant={isMobile ? "h2" : "h3"}
						align="center"
						color="text.primary"
						fontWeight="bold"
						gutterBottom
					>
						Welcome to TechConnect
					</Typography>
					<Typography
						variant={isMobile ? "h5" : "h6"}
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
