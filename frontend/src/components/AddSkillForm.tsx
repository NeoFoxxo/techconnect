import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import {
	Alert,
	Button,
	Card,
	CircularProgress,
	Container,
	FormControl,
	FormLabel,
	Grid,
	TextField,
} from "@mui/material"
import useIsMobile from "../utils/hooks/useIsMobile"
import { useMutation } from "@tanstack/react-query"
import addSkillSubmit from "../utils/queries/addSkill"

const AddSkillSchema = Yup.object().shape({
	skill: Yup.string()
		.required("Skill Required")
		.min(3, "Skill is too short")
		.max(15, "Skill is too long"),
})

const labelStyle = { paddingBottom: 2 }

export default function AddSkillForm() {
	const isMobile = useIsMobile()

	const addSkill = useMutation({
		mutationKey: ["addSkillSubmit"],
		mutationFn: (formData: { skill: string }) => addSkillSubmit(formData.skill),
	})

	return (
		<Container sx={{ width: isMobile ? "80vh" : "auto", padding: 5 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeee" }}>
				<Formik
					initialValues={{ skill: "" }}
					validationSchema={AddSkillSchema}
					onSubmit={(values, { setSubmitting }) => {
						addSkill.mutate(values)
						setSubmitting(false)
					}}
				>
					{({ errors, touched }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								{addSkill.isSuccess && (
									<Alert severity="success">Successfully Added Skill</Alert>
								)}
								{addSkill.isError && (
									<Alert severity="error">{addSkill.error.message}</Alert>
								)}
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="skill" sx={labelStyle}>
											Skill
										</FormLabel>
										<Field
											as={TextField}
											id="skill"
											name="skill"
											type="skill"
											error={errors.skill && touched.skill}
											helperText={errors.skill && touched.skill && errors.skill}
										/>
									</FormControl>
								</Grid>
								<Grid
									item
									display={"flex"}
									justifyContent={"center"}
									marginTop={2}
								>
									{addSkill.isPending ? (
										<CircularProgress />
									) : (
										<Button type="submit" variant="contained" size="large">
											Add Skill
										</Button>
									)}
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Card>
		</Container>
	)
}
