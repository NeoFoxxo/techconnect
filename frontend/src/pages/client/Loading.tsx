import LinearProgress from "@mui/material/LinearProgress"
import Grid from "@mui/material/Grid"
import { useEffect, useState, useRef } from "react"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

export default function Loading() {
	const [progress, setProgress] = useState(0)
	const [progressText, setProgressText] = useState(0)
	const [buffer, setBuffer] = useState(10)
	const navigate = useNavigate()

	const progressUpdates = [
		"Retrieving technicians from the database",
		"Identifying technicians with the necessary skills",
		"Determining the current workload of each technician",
		"Computing compatibility scores for each technician",
		"Ranking technicians based on compatibility scores to find the best match",
		"Establishing your connection to the live text chat",
	]

	const progressRef = useRef(() => {})
	useEffect(() => {
		progressRef.current = () => {
			if (Math.round(progress) >= 100) {
				navigate("/client/support")
			}
			const diff = 18
			const diff2 = Math.random() * 10
			setProgress(progress + diff)
			setBuffer(progress + diff + diff2)
		}
	})

	useEffect(() => {
		const progressTimer = setInterval(() => {
			progressRef.current()
		}, 1000)

		const progressTextTimer = setInterval(() => {
			setProgressText((prevProgressText) => {
				if (prevProgressText < 5) {
					return prevProgressText + 1
				} else {
					return prevProgressText
				}
			})
		}, 1000)

		return () => {
			clearInterval(progressTimer)
			clearInterval(progressTextTimer)
		}
	}, [])

	return (
		<Grid>
			<Typography
				component="h1"
				variant="h3"
				paddingTop={5}
				align="center"
				color="text.primary"
				fontWeight="bold"
				gutterBottom
			>
				Finding Technician
			</Typography>
			<LinearProgress
				variant="buffer"
				value={progress}
				valueBuffer={buffer}
				sx={{
					height: 10,
					borderRadius: 2,
					width: "50%",
					marginX: "auto",
					marginY: 5,
				}}
			/>
			<Typography variant="h6" align="center" color="text.secondary" paragraph>
				{progressUpdates[progressText]}
			</Typography>
		</Grid>
	)
}
