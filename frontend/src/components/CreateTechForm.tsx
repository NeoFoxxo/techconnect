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
import { useMutation, useQuery } from "@tanstack/react-query"
import getSkills from "../utils/queries/getSkills"
import { CreateTechFormData } from "../models/CreateTechFormData"
import createTechSubmit from "../utils/queries/createTechSubmit"
import { Fragment } from "react"

const TechSchema = Yup.object().shape({
	firstname: Yup.string()
		.required("Required")
		.min(3, "Name is too short")
		.max(25, "Name is too long")
		.matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
	email: Yup.string().required("Required").email("Invalid email"),
	password: Yup.string()
		.required("Required")
		.min(5, "Password is too short")
		.matches(/^(?=.*[a-z])/, "Must contain a lowercase letter")
		.matches(/^(?=.*[A-Z])/, "Must contain an uppercase letter")
		.matches(/^(?=.*\d)/, "Must contain a digit")
		.matches(/^(?=.*[@$!%*?&])/, "Must contain a special character"),
	skills: Yup.array().required("Required").min(1, "Please select a skill"),
})

const labelStyle = { paddingBottom: 2 }

const initialValues: CreateTechFormData = {
	firstname: "",
	email: "",
	password: "",
	skills: [],
	skillRating: [],
}

export default function CreateTechForm() {
	const isMobile = useIsMobile()

	const createTech = useMutation({
		mutationKey: ["createTechnician"],
		mutationFn: (formData: CreateTechFormData) =>
			createTechSubmit(formData, allSkills.data),
		onSuccess: () => (window.location.href = "/manager"),
	})

	const allSkills = useQuery({
		queryKey: ["getSkills"],
		queryFn: () => getSkills(),
	})

	// extract skill names
	const skills = allSkills.data?.map((skill) => skill.name)

	return (
		<Container sx={{ width: isMobile ? "50%" : "auto", padding: 3 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeeeee" }}>
				<Formik
					initialValues={initialValues}
					validationSchema={TechSchema}
					onSubmit={(values, { setFieldError }) => {
						if (values.firstname.toLowerCase() === "system") {
							setFieldError("firstname", "Please input a valid first name")
						} else {
							createTech.mutate(values)
						}
					}}
				>
					{({ errors, touched, values, setFieldValue, handleBlur }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								{createTech.isSuccess && (
									<Alert severity="success">
										Successfully Created Technician
									</Alert>
								)}
								{createTech.isError && (
									<Alert severity="error">{createTech.error.message}</Alert>
								)}
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="firstname" sx={labelStyle}>
											First Name
										</FormLabel>
										<Field
											as={TextField}
											id="firstname"
											name="firstname"
											placeholder="First Name"
											type="text"
											error={errors.firstname && touched.firstname}
											helperText={
												errors.firstname &&
												touched.firstname &&
												errors.firstname
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
									<FormControl fullWidth>
										<FormLabel htmlFor="password" sx={labelStyle}>
											Password
										</FormLabel>
										<Field
											as={TextField}
											id="password"
											name="password"
											type="password"
											error={errors.password && touched.password}
											helperText={
												errors.password && touched.password && errors.password
											}
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
										loading={allSkills.isLoading}
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
								{values.skills[0] && (
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
									{values.skills.map((skill, index) => (
										<Fragment key={index}>
											<FormLabel htmlFor="rating">{skill}</FormLabel>
											<Slider
												onChange={(_, value) => {
													let ratings = [...values.skillRating]
													ratings[index] = (value as number) || 1
													setFieldValue("skillRating", ratings)
												}}
												id={`${skill}Rating`}
												aria-label={`${skill}Rating`}
												valueLabelDisplay="auto"
												step={1}
												marks
												value={values.skillRating[index] || 1}
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
									{createTech.isPending ? (
										<CircularProgress />
									) : (
										<Button type="submit" variant="contained" size="large">
											Create Technician
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
