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

export interface SupportFormData {
	name: string
	email: string
	title: string
	description: string
	urgency: string
	tags: string[]
}

const SupportSchema = Yup.object().shape({
	name: Yup.string()
		.required("Required")
		.min(3, "Name is too short")
		.max(25, "Name is too long")
		.matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
	email: Yup.string().required("Required").email("Invalid email"),
	title: Yup.string()
		.required("Required")
		.min(5, "Title is too short")
		.max(55, "Title is too long"),
	description: Yup.string()
		.required("Required")
		.min(10, "Description is too short"),
	urgency: Yup.string().required("Required"),
	tags: Yup.array().required("Required").min(1, "Please select a tag"),
})

const urgencyOptions = ["Low", "Normal", "Critical"]
const labelStyle = { paddingBottom: 2 }

const initialValues: SupportFormData = {
	name: "",
	email: "",
	title: "",
	description: "",
	urgency: "",
	tags: [],
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

	const skills = useQuery({
		queryKey: ["getSkills"],
		queryFn: () => getSkills(),
	})

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
								{skills.error && (
									<Alert severity="error">{`Error fetching tags: ${skills.error.message}`}</Alert>
								)}
								<Grid item>
									<FormControl fullWidth>
										<FormLabel htmlFor="name" sx={labelStyle}>
											Name
										</FormLabel>
										<Field
											as={TextField}
											id="name"
											name="name"
											placeholder="Name"
											type="text"
											error={errors.name && touched.name}
											helperText={errors.name && touched.name && errors.name}
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
									<FormLabel htmlFor="tags" sx={labelStyle}>
										Choose Relevant Tags for Your Issue
									</FormLabel>
									<Autocomplete
										multiple
										id="tags"
										value={values.tags}
										loading={skills.isLoading}
										onChange={(_, value) =>
											setFieldValue("tags", value || null)
										}
										onBlur={handleBlur}
										options={skills.data ? skills.data : []}
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
