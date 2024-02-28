import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Chip from "@mui/material/Chip"
import Grid from "@mui/material/Grid"
import { TechInfo } from "../models/TechInfo"

interface TechInfoProps {
	tech: TechInfo | null
}

export default function TechInfoBox({ tech }: TechInfoProps) {
	return (
		<Box
			width={400}
			border={1}
			borderColor={"text.secondary"}
			boxShadow={2}
			padding={2}
		>
			<Typography variant="h6" align="center" color="text.primary" paragraph>
				{tech?.firstName}
			</Typography>
			<Divider />
			<Typography variant="h6" align="center" color="text.primary" paragraph>
				{tech?.email}
			</Typography>
			<Divider />
			<Grid container justifyContent="center" spacing={1} padding={1}>
				{tech?.skills.map((skill) => {
					return (
						<Grid item>
							<Chip label={skill.name} />
						</Grid>
					)
				})}
			</Grid>
		</Box>
	)
}
