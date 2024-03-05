import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import useIsMobile from "../utils/hooks/useIsMobile"

export default function Error() {
	const isMobile = useIsMobile()

	return (
		<main>
			<Box paddingTop={5} textAlign="center">
				<Container maxWidth="xl">
					<Typography
						component="h1"
						variant={isMobile ? "h3" : "h4"}
						align="center"
						color="text.primary"
						fontWeight="bold"
						gutterBottom
					>
						An unexpected error occured
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						Please refresh the page
					</Typography>
					<Button
						onClick={() => (window.location.href = "/")}
						size="large"
						variant="contained"
						sx={{ marginTop: 4, padding: 2 }}
					>
						Go back
					</Button>
				</Container>
			</Box>
		</main>
	)
}
