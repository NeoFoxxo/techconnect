import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useState } from "react"
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
import loginSubmit from "../utils/api/loginSubmit"
import useIsMobile from "../utils/hooks/useIsMobile"

const LoginSchema = Yup.object().shape({
	email: Yup.string().required("Required").email("Invalid email"),
	password: Yup.string().required("Required").min(5, "Password is too short"),
})

const labelStyle = { paddingBottom: 2 }

export default function LoginForm() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [isLoading, setLoading] = useState(false)
	const isMobile = useIsMobile()

	async function handleSubmit(formData: { email: string; password: string }) {
		setLoading(true)
		const result = await loginSubmit(formData)
		if (result.error) {
			setErrorMsg(result.error)
			setLoading(false)
		} else {
			setErrorMsg(null)
			setLoading(false)
		}
	}

	return (
		<Container sx={{ width: isMobile ? "80vh" : "auto", padding: 5 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeeeee" }}>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={LoginSchema}
					onSubmit={(values, { setSubmitting }) => {
						handleSubmit(values)
						setSubmitting(false)
					}}
				>
					{({ errors, touched }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
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
