import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import {
	Alert,
	Autocomplete,
	Button,
	Card,
	CircularProgress,
	Container,
	FormControl,
	FormLabel,
	Grid,
	Slider,
	TextField,
} from "@mui/material"
import useIsMobile from "../utils/hooks/useIsMobile"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import getSkills from "../utils/queries/getSkills"
import { Fragment } from "react"
import { EditTechFormData } from "../models/EditTechFormData"
import { TechInfo } from "../models/TechInfo"
import editTechSubmit from "../utils/queries/editTechSubmit"

const TechSchema = Yup.object().shape({
	firstName: Yup.string()
		.required("Required")
		.min(3, "Name is too short")
		.max(25, "Name is too long")
		.matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
	email: Yup.string().required("Required").email("Invalid email"),
	skills: Yup.array().required("Required").min(1, "Please select a skill"),
})

const labelStyle = { paddingBottom: 2 }

export default function EditTechForm({
	techDetails,
}: {
	techDetails: TechInfo | null | undefined
}) {
	const isMobile = useIsMobile()
	const queryClient = useQueryClient()

	const editTech = useMutation({
		mutationKey: ["createTechnician"],
		mutationFn: (formData: EditTechFormData) =>
			editTechSubmit(formData, allSkills.data),
		onSuccess: async () =>
			await queryClient.invalidateQueries({
				queryKey: ["getTechInfo", techDetails?.id],
			}),
	})

	const allSkills = useQuery({
		queryKey: ["getSkills"],
		queryFn: () => getSkills(),
	})

	const initialValues: EditTechFormData = {
		id: techDetails?.id,
		firstName: techDetails?.firstName,
		email: techDetails?.email,
		skills: techDetails?.skills.map((skill) => skill.name),
		skillRating: techDetails?.skills.map((skill) => skill.rating),
	}

	const skills = allSkills.data?.map((skill) => skill.name)

	return (
		<Container sx={{ width: isMobile ? "50%" : "auto", padding: 3 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeeeee" }}>
				<Formik
					initialValues={initialValues}
					validationSchema={TechSchema}
					onSubmit={(values, { setFieldError }) => {
						if (values?.firstName?.toLowerCase() === "system") {
							setFieldError("firstName", "Please input a valid first name")
						} else {
							editTech.mutate(values)
						}
					}}
				>
					{({ errors, touched, values, setFieldValue, handleBlur }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								{editTech.isSuccess && (
									<Alert severity="success">
										Successfully Edited Technician
									</Alert>
								)}
								{editTech.isError && (
									<Alert severity="error">{editTech.error.message}</Alert>
								)}
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="firstName" sx={labelStyle}>
											First Name
										</FormLabel>
										<Field
											as={TextField}
											id="firstName"
											name="firstName"
											placeholder="First Name"
											type="text"
											error={errors.firstName && touched.firstName}
											helperText={
												errors.firstName &&
												touched.firstName &&
												errors.firstName
											}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="email" sx={labelStyle}>
											Email
										</FormLabel>
										<Field
											as={TextField}
											id="email"
											name="email"
											placeholder="example@email.com"
											type="email"
											error={errors.email && touched.email}
											helperText={errors.email && touched.email && errors.email}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<FormLabel htmlFor="skills" sx={labelStyle}>
										Technician Skills
									</FormLabel>
									<Autocomplete
										multiple
										id="skills"
										value={values.skills}
										onChange={(_, value) =>
											setFieldValue("skills", value || null)
										}
										onBlur={handleBlur}
										options={skills ? skills : []}
										sx={{ paddingTop: 2 }}
										renderInput={(params) => (
											<TextField
												{...params}
												error={!!errors.skills && touched.skills}
												helperText={
													errors.skills && touched.skills && errors.skills
												}
												label="Select Skills"
												placeholder="Skills"
											/>
										)}
									/>
								</Grid>
								{values?.skills && (
									<Grid
										item
										display={"flex"}
										justifyContent={"center"}
										marginTop={2}
									>
										<FormLabel htmlFor="rating" sx={labelStyle}>
											Proficiency In The Selected Skill(s)
										</FormLabel>
									</Grid>
								)}
								<Grid
									item
									display={"flex"}
									marginX={"auto"}
									flexDirection={"column"}
									alignItems={"center"}
									width={300}
								>
									{values?.skills?.map((skill, index) => (
										<Fragment key={index}>
											<FormLabel htmlFor="rating">{skill}</FormLabel>
											<Slider
												onChange={(_, value) => {
													//@ts-expect-error
													let ratings = [...values?.skillRating]
													ratings[index] = value || 1
													setFieldValue("skillRating", ratings)
												}}
												id={`${skill}Rating`}
												aria-label={`${skill}Rating`}
												valueLabelDisplay="auto"
												step={1}
												marks
												value={values?.skillRating![index] || 1}
												min={1}
												max={10}
											/>
										</Fragment>
									))}
								</Grid>
								<Grid
									item
									display={"flex"}
									justifyContent={"center"}
									marginTop={2}
								>
									{editTech.isPending ? (
										<CircularProgress />
									) : (
										<Button type="submit" variant="contained" size="large">
											Edit Technician
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
