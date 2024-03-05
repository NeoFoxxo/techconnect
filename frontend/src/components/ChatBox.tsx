import { Box, Grid, Typography } from "@mui/material"

import { ChatMessage } from "../models/ChatMessage"
import SendChatForm from "./SendChatForm"
import useIsMobile from "../utils/hooks/useIsMobile"
import { useEffect, useRef } from "react"

interface ChatBoxProps {
	messages: readonly ChatMessage[]
	sendMessage: (message: string) => Promise<void>
}

export default function ChatBox({ messages, sendMessage }: ChatBoxProps) {
	const latestMessage = useRef<HTMLDivElement | null>(null)

	const isMobile = useIsMobile()

	useEffect(() => {
		latestMessage?.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	return (
		<Box
			width={isMobile ? "90%" : "100%"}
			boxShadow={1}
			padding={3}
			marginX={"auto"}
			height={isMobile ? "600px" : "400px"}
			maxHeight={isMobile ? "600px" : "400px"}
			display={"flex"}
			flexDirection={"column"}
		>
			<Grid
				flexGrow={1}
				maxHeight={"88%"}
				direction={"column"}
				overflow={"auto"}
			>
				{!messages[0] && (
					<Typography
						variant={isMobile ? "h6" : "subtitle1"}
						color="text.secondary"
						align="center"
						paragraph
						paddingX={2}
					>
						Send a message
					</Typography>
				)}
				{messages &&
					messages.map((message) => {
						if (message.name === "System") {
							return (
								<Typography
									variant={isMobile ? "h5" : "h6"}
									color="text.primary"
									paragraph
									align="center"
									paddingX={2}
								>
									<b>{message.name}:</b> {message.message}
								</Typography>
							)
						}
						return (
							<Typography
								variant={isMobile ? "h6" : "subtitle1"}
								color="text.primary"
								paragraph
								paddingX={2}
							>
								<b>{message.name}:</b> {message.message}
							</Typography>
						)
					})}
				<div ref={latestMessage}></div>
			</Grid>
			<SendChatForm sendMessage={sendMessage} />
		</Box>
	)
}
