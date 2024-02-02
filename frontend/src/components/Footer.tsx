import { Box, Typography } from "@mui/material"

export default function Footer() {
	return (
		<footer>
			<Box
				bgcolor="primary.main"
				color="white"
				paddingY={2}
				display="flex"
				justifyContent="center"
				alignItems="center"
				position={"static"}
				width={"100%"}
				bottom={0}
			>
				<Typography paragraph marginY={"auto"}>
					© TechConnect 2024
				</Typography>
			</Box>
		</footer>
	)
}
