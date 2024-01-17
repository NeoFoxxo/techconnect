import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import {
	Autocomplete,
	Button,
	Card,
	Container,
	FormControl,
	FormLabel,
	Grid,
	TextField,
} from "@mui/material"

interface FormValues {
	username: string
	email: string
	issue: string
	urgency: string
	tags: string[]
}

const SignUpSchema = Yup.object().shape({
	username: Yup.string()
		.required("Required")
		.required("Required")
		.min(3, "Username is too short")
		.max(20, "Username is too long")
		.matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),

	email: Yup.string().email("Invalid email").required("Required"),

	issue: Yup.string().required("Required").min(5, "Issue is too short"),
	urgency: Yup.string().required("Required"),
	tags: Yup.array().required("Required").min(1, "Please select a tag"),
})

export default function SupportForm() {
	const tags = ["Group Policy", "Nginx", "Azure", "AWS", "Password Reset"]
	const urgencyOptions = ["Low", "Normal", "Critical"]
	const labelStyle = { paddingBottom: 2 }

	const initialValues: FormValues = {
		username: "",
		email: "",
		issue: "",
		urgency: "",
		tags: [],
	}

	return (
		<Container sx={{ width: "55%", padding: 3 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeeeee" }}>
				<Formik
					initialValues={initialValues}
					validationSchema={SignUpSchema}
					onSubmit={(values, { setSubmitting }) => {
						console.log(values)
						setSubmitting(false)
					}}
				>
					{({ errors, touched, values, setFieldValue, handleBlur }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="username" sx={labelStyle}>
											Username
										</FormLabel>
										<Field
											as={TextField}
											id="username"
											name="username"
											placeholder="Username"
											type="text"
											error={errors.username && touched.username}
											helperText={
												errors.username && touched.username && errors.username
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
										<FormLabel htmlFor="issue" sx={labelStyle}>
											Describe Your Issue
										</FormLabel>
										<Field
											as={TextField}
											multiline
											rows={2}
											id="issue"
											name="issue"
											type="textarea"
											error={errors.issue && touched.issue}
											helperText={errors.issue && touched.issue && errors.issue}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<FormLabel htmlFor="urgency" sx={labelStyle}>
										Problem Urgency
									</FormLabel>
									<Autocomplete
										disablePortal
										id="urgency"
										value={values.urgency}
										onChange={(_, value) =>
											setFieldValue("urgency", value || null)
										}
										onBlur={handleBlur}
										options={urgencyOptions}
										sx={{ paddingTop: 2 }}
										renderInput={(params) => (
											<TextField
												{...params}
												error={!!errors.urgency && touched.urgency}
												helperText={
													errors.urgency && touched.urgency && errors.urgency
												}
												label="Urgency"
											/>
										)}
									/>
								</Grid>
								<Grid item>
									<FormLabel htmlFor="tags" sx={labelStyle}>
										Choose Relevant Tags for Your Issue
									</FormLabel>
									<Autocomplete
										multiple
										id="tags"
										value={values.tags}
										onChange={(_, value) =>
											setFieldValue("tags", value || null)
										}
										onBlur={handleBlur}
										options={tags}
										sx={{ paddingTop: 2 }}
										renderInput={(params) => (
											<TextField
												{...params}
												error={!!errors.tags && touched.tags}
												helperText={errors.tags && touched.tags && errors.tags}
												label="Select Tags"
												placeholder="Tags"
											/>
										)}
									/>
								</Grid>
								<Grid
									item
									display={"flex"}
									justifyContent={"center"}
									marginTop={2}
								>
									<Button type="submit" variant="contained" size="large">
										Submit
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
				{/* {errorMsg && <div className="text-red-600">{errorMsg}</div>} */}
				{/* {successMsg && <div className="text-base-content">{successMsg}</div>} */}
			</Card>
		</Container>
	)
}
