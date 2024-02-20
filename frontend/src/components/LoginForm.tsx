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
import loginSubmit from "../utils/queries/loginSubmit"
import useIsMobile from "../utils/hooks/useIsMobile"
import { useMutation } from "@tanstack/react-query"

export interface LoginFormData {
	email: string
	password: string
}

interface LoginProps {
	isManager: boolean
}

const LoginSchema = Yup.object().shape({
	email: Yup.string().required("Required").email("Invalid email"),
	password: Yup.string().required("Required").min(5, "Password is too short"),
})

const labelStyle = { paddingBottom: 2 }

export default function LoginForm({ isManager }: LoginProps) {
	let redirectLink: string = "/tech"

	if (isManager) {
		redirectLink = "/manager"
	}

	const isMobile = useIsMobile()

	const login = useMutation({
		mutationKey: ["loginSubmit"],
		mutationFn: (formData: LoginFormData) => loginSubmit(formData, isManager),
		onSuccess: () => (window.location.href = redirectLink),
	})

	return (
		<Container sx={{ width: isMobile ? "80vh" : "auto", padding: 5 }}>
			<Card sx={{ padding: 3, border: "2px solid #eeee" }}>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={LoginSchema}
					onSubmit={(values, { setSubmitting }) => {
						login.mutate(values)
						setSubmitting(false)
					}}
				>
					{({ errors, touched }) => (
						<Form>
							<Grid container direction={"column"} spacing={2}>
								{login.isSuccess && (
									<Alert severity="success">Successfully Logged In</Alert>
								)}
								{login.isError && (
									<Alert severity="error">{login.error.message}</Alert>
								)}
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
									{login.isPending ? (
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
