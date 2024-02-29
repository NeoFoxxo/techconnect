import { Box, Typography } from "@mui/material"

import { ChatMessage } from "../models/ChatMessage"
import SendChatForm from "./SendChatForm"

interface ChatBoxProps {
	messages: readonly ChatMessage[]
	sendMessage: (message: string) => Promise<void>
}

export default function ChatBox({ messages, sendMessage }: ChatBoxProps) {
	return (
		<Box width={"90%"} boxShadow={1} padding={5} marginX={"auto"}>
			{!messages[0] && (
				<Typography
					variant="h6"
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
								variant="h5"
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
							variant="h6"
							color="text.primary"
							paragraph
							paddingX={2}
						>
							<b>{message.name}:</b> {message.message}
						</Typography>
					)
				})}
			<SendChatForm sendMessage={sendMessage} />
		</Box>
	)
}
