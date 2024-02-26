import { Field, Form, Formik } from "formik"
import { Button, Container, Grid, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import * as Yup from "yup"

interface SendChatFormProps {
	sendMessage: (message: string) => Promise<void>
}

const SendChatSchema = Yup.object().shape({
	message: Yup.string().required("Message Required"),
})

export default function SendChatForm({ sendMessage }: SendChatFormProps) {
	return (
		<Container>
			<Formik
				initialValues={{ message: "" }}
				validationSchema={SendChatSchema}
				onSubmit={(values, { resetForm }) => {
					sendMessage(values.message)
					resetForm()
				}}
			>
				{({ errors }) => (
					<Form>
						<Grid
							container
							justifyContent="center"
							alignItems={"center"}
							spacing={1}
							paddingTop={1.8}
						>
							<Field
								as={TextField}
								id="message"
								name="message"
								label="Message"
								error={errors.message}
								helperText={errors.message && errors.message}
							/>
							<Grid item>
								<Button
									type="submit"
									size="large"
									sx={{ height: "60px", marginBottom: "7px" }}
									variant="contained"
									color="primary"
								>
									<SendIcon />
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Container>
	)
}
