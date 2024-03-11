import { useState } from "react"
import MobileStepper from "@mui/material/MobileStepper"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import {
	Checkbox,
	Dialog,
	DialogContentText,
	DialogTitle,
	DialogContent,
	Divider,
	FormControlLabel,
	FormGroup,
	Grid,
} from "@mui/material"

const steps = [
	{
		label: "Welcome to TechConnect",
		description: `TechConnect allows clients to submit their IT issues 
		and receive support from the technician best suited to solve their issue. This is achieved through the use of a custom matchmaking 
		algorithm. This algorithm takes into account the skills needed to solve the issue and pairs the user with the technician that is proficient in these skills.`,
	},
	{
		label: "Client",
		description: `To use the app you must first select a role, one of these roles is the client. 
			A client can create a support request, including relevent information such as the skills required. 
			After the request is made the client will then be paired with a technician and have the ability communicate through text chat.`,
	},
	{
		label: "Technician",
		description: `Technicians can view all tickets assigned to them and interact with clients through text chat. Once the issue is resolved the technician has the ability to close the ticket.  `,
	},
	{
		label: "Manager",
		description: `Managers have the highest level of privilage, allowing them to create new technicians, edit technicians, and add new skills.`,
	},
]

export default function HelpModal() {
	const hideTutorial = localStorage.getItem("hideTutorial")
	const [open, setOpen] = useState(hideTutorial != "true")
	const [activeStep, setActiveStep] = useState(0)
	const [checked, setChecked] = useState(true)

	function handleNext() {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	function handleBack() {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	function finishTutorial(hideTutorial: boolean) {
		if (hideTutorial) {
			localStorage.setItem("hideTutorial", "true")
		}
		setOpen(false)
	}

	return (
		<Dialog open={open}>
			<DialogTitle textAlign={"center"} fontSize={25} fontWeight={"bold"}>
				{steps[activeStep].label}
			</DialogTitle>
			<Divider />
			<DialogContent>
				<DialogContentText fontSize={19}>
					{steps[activeStep].description}
				</DialogContentText>
			</DialogContent>
			{activeStep === 3 && (
				<Grid marginX="auto">
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={(event) => setChecked(event.target.checked)}
								/>
							}
							label="Don't show again"
						/>
					</FormGroup>
				</Grid>
			)}
			<MobileStepper
				variant="text"
				steps={4}
				position="static"
				activeStep={activeStep}
				nextButton={
					<>
						{activeStep != 3 && (
							<Button size="small" onClick={handleNext}>
								Next
								<KeyboardArrowRight />
							</Button>
						)}
						{activeStep === 3 && (
							<Button
								onClick={() => finishTutorial(checked)}
								autoFocus
								variant="contained"
								color="info"
							>
								Finish
							</Button>
						)}
					</>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						<KeyboardArrowLeft />
						Back
					</Button>
				}
			/>
		</Dialog>
	)
}
