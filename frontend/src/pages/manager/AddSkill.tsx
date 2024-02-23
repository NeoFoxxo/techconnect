import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import AddSkillForm from "../../components/AddSkillForm"

export default function AddSkill() {
	return (
		<Box>
			<Typography
				component="h1"
				variant="h3"
				paddingTop={5}
				align="center"
				color="text.primary"
				fontWeight="bold"
				gutterBottom
			>
				Add Skill
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" paragraph>
				Add a new skill to be assigned to technicians and tickets
			</Typography>
			<AddSkillForm />
		</Box>
	)
}
