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
import supportSubmit from "../utils/queries/supportSubmit"
import useIsMobile from "../utils/hooks/useIsMobile"
import { useQuery } from "@tanstack/react-query"
import getSkills from "../utils/queries/getSkills"
import { SupportFormData } from "../models/SupportFormData"

const SupportSchema = Yup.object().shape({
	clientName: Yup.string()
		.required("Name Required")
		.min(3, "Name is too short")
		.max(25, "Name is too long")
		.matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
	clientEmail: Yup.string().required("Email Required").email("Invalid email"),
	title: Yup.string()
		.required("Required")
		.min(5, "Title is too short")
		.max(55, "Title is too long"),
	description: Yup.string()
		.required("Description Required")
		.min(10, "Description is too short"),
	urgency: Yup.string().required("Urgency Required"),
	skills: Yup.array().required("Required").min(1, "Please select a tag"),
})

const urgencyOptions = ["Low", "Normal", "Critical"]
const labelStyle = { paddingBottom: 2 }

const initialValues: SupportFormData = {
	clientName: "",
	clientEmail: "",
	title: "",
	description: "",
	urgency: "",
	skills: [],
}

export default function SupportForm() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [isLoading, setLoading] = useState(false)
	const isMobile = useIsMobile()

	async function handleSubmit(formData: SupportFormData) {
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
					validationSchema={SupportSchema}
					onSubmit={(values, { setSubmitting }) => {
						console.log(values)
						setSubmitting(false)
					}}
				>
					{({ errors, touched, values, setFieldValue, handleBlur }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
								{allSkills.error && (
									<Alert severity="error">{`Error fetching tags: ${allSkills.error.message}`}</Alert>
								)}
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="clientName" sx={labelStyle}>
											Name
										</FormLabel>
										<Field
											as={TextField}
											id="clientName"
											name="clientName"
											placeholder="Name"
											type="text"
											error={errors.clientName && touched.clientName}
											helperText={
												errors.clientName &&
												touched.clientName &&
												errors.clientName
											}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="clientEmail" sx={labelStyle}>
											Email
										</FormLabel>
										<Field
											as={TextField}
											id="clientEmail"
											name="clientEmail"
											placeholder="example@email.com"
											type="email"
											error={errors.clientEmail && touched.clientEmail}
											helperText={
												errors.clientEmail &&
												touched.clientEmail &&
												errors.clientEmail
											}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="title" sx={labelStyle}>
											Issue Title
										</FormLabel>
										<Field
											as={TextField}
											id="title"
											name="title"
											type="textarea"
											error={errors.title && touched.title}
											helperText={errors.title && touched.title && errors.title}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="description" sx={labelStyle}>
											Describe Your Issue In Detail
										</FormLabel>
										<Field
											as={TextField}
											multiline
											rows={2}
											id="description"
											name="description"
											type="textarea"
											error={errors.description && touched.description}
											helperText={
												errors.description &&
												touched.description &&
												errors.description
											}
										/>
									</FormControl>
								</Grid>
								<Grid item>
									<FormLabel htmlFor="urgency" sx={labelStyle}>
										Issue Urgency
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
									<FormLabel htmlFor="skills" sx={labelStyle}>
										Choose Relevant Tags for Your Issue
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
