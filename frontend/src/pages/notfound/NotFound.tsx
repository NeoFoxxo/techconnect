import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"

export default function NotFound() {
	return (
		<main>
			<Box paddingTop={5} textAlign="center">
				<Container maxWidth="xl">
					<Typography
						component="h1"
						variant="h3"
						align="center"
						color="text.primary"
						fontWeight="bold"
						gutterBottom
					>
						The Page You Were Looking For Was Not Found
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
