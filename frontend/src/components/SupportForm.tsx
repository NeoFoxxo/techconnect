import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
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
	TextField,
} from "@mui/material"
import supportSubmit from "../utils/api/supportSubmit"
import useIsMobile from "../utils/hooks/useIsMobile"

export interface SupportFormValues {
	username: string
	email: string
	issue: string
	urgency: string
	tags: string[]
}

const SupportSchema = Yup.object().shape({
	username: Yup.string()
		.required("Required")
		.min(3, "Username is too short")
		.max(20, "Username is too long")
		.matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
	email: Yup.string().required("Required").email("Invalid email"),
	issue: Yup.string().required("Required").min(10, "Issue is too short"),
	urgency: Yup.string().required("Required"),
	tags: Yup.array().required("Required").min(1, "Please select a tag"),
})

const tags = ["Group Policy", "Nginx", "Azure", "AWS", "Password Reset"]
const urgencyOptions = ["Low", "Normal", "Critical"]
const labelStyle = { paddingBottom: 2 }

export default function SupportForm() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [isLoading, setLoading] = useState(false)
	const isMobile = useIsMobile()

	const initialValues: SupportFormValues = {
		username: "",
		email: "",
		issue: "",
		urgency: "",
		tags: [],
	}

	async function handleSubmit(formData: SupportFormValues) {
		setLoading(true)
		const result = await supportSubmit(formData)
		if (result.error) {
			setErrorMsg(result.error)
			setLoading(false)
		} else {
			setErrorMsg(null)
			setLoading(false)
		}
	}

	return (
		<Container sx={{ width: isMobile ? "50%" : "auto", padding: 3 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeeeee" }}>
				<Formik
					initialValues={initialValues}
					validationSchema={SupportSchema}
					onSubmit={(values, { setSubmitting }) => {
						handleSubmit(values)
						setSubmitting(false)
					}}
				>
					{({ errors, touched, values, setFieldValue, handleBlur }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
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
									{isLoading ? (
										<CircularProgress />
									) : (
										<Button type="submit" variant="contained" size="large">
											Submit
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
