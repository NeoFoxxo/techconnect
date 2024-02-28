import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"
import ChatBox from "../../components/ChatBox"
import useChat from "../../utils/hooks/useChat"
import { TechInfo } from "../../models/TechInfo"
import { useEffect } from "react"
import Error from "../../components/Error"
import getTechInfo from "../../utils/queries/getTechInfo"
import TechInfoBox from "../../components/TechInfoBox"

export default function Support() {
	const navigate = useNavigate()
	const ticketId = sessionStorage.getItem("ticket")
	const techId = sessionStorage.getItem("tech")
	const name = sessionStorage.getItem("name")

	useEffect(() => {
		if (ticketId === null || techId === null || name === null) {
			navigate("/client/createsupportrequest")
		}
	}, [ticketId, techId, name])

	const tech: UseQueryResult<TechInfo | null> = useQuery({
		queryKey: ["getTechInfo", techId],
		queryFn: () => getTechInfo(techId),
		enabled: techId != null,
	})

	const { messages, sendMessage } = useChat(name, ticketId)

	return (
		<Box paddingX={5} width={"90%"} marginX="auto">
			<Typography
				component="h1"
				variant="h3"
				paddingTop={2}
				align="center"
				color="text.primary"
				fontWeight="bold"
				gutterBottom
			>
				Support
			</Typography>
			<Divider />
			{tech.isLoading && (
				<Grid container justifyContent="center" alignItems="center">
					<CircularProgress color="primary" size={80} />
				</Grid>
			)}
			{tech.isSuccess && (
				<Grid container wrap={"wrap"}>
					<Grid item flex={1}>
						<Typography
							variant="h5"
							padding={2}
							align="center"
							color="text.primary"
							fontWeight="bold"
						>
							Chat
						</Typography>
						<ChatBox messages={messages} sendMessage={sendMessage} />
					</Grid>
					<Grid item>
						<Typography
							variant="h5"
							padding={2}
							align="center"
							color="text.primary"
							fontWeight="bold"
						>
							Technician Details
						</Typography>
						<TechInfoBox tech={tech.data} />
					</Grid>
				</Grid>
			)}
			{tech.isError && <Error />}
		</Box>
	)
}
