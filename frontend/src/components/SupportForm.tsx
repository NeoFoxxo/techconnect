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

const SignUpSchema = Yup.object().shape({
	username: Yup.string()
		.required("Required")
		.required("Required")
		.min(3, "Username is too short")
		.max(20, "Username is too long")
		.matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),

	email: Yup.string().email("Invalid email").required("Required"),

	issue: Yup.string().required("Required").min(5, "Issue is too short"),
})

export default function SupportForm() {
	const tags = ["Group Policy", "Nginx", "MacOS"]
	const operatingSystems = ["Linux", "Windows", "MacOS"]
	const labelStyle = { paddingBottom: 2 }
	return (
		<Container sx={{ width: "55%", padding: 3 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeeeee" }}>
				<Formik
					initialValues={{
						username: "",
						email: "",
						issue: "",
					}}
					validationSchema={SignUpSchema}
					onSubmit={(values, { setSubmitting }) => {
						// Convert username to lowercase before submitting
						values.username = values.username.toLowerCase()
						console.log(values)
						setSubmitting(false)
					}}
				>
					{({ errors, touched }) => (
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
									<FormLabel htmlFor="os" sx={labelStyle}>
										Select your operating system
									</FormLabel>
									<Autocomplete
										disablePortal
										id="os"
										options={operatingSystems}
										sx={{ width: 300 }}
										renderInput={(params) => (
											<TextField {...params} label="OS" />
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
										options={tags}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Select Tags"
												placeholder="Tags"
											/>
										)}
										sx={{ width: "500px" }}
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
