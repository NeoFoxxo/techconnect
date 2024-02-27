import { useEffect, useState } from "react"
import { connection } from "../chatConnection"
import { ChatMessage } from "../../models/ChatMessage"

export default function useChat(
	name: string | undefined,
	ticketId: string | undefined
) {
	const [messages, setMessages] = useState<ChatMessage[]>([])

	async function sendMessage(message: string) {
		try {
			await connection.invoke(
				"SendMessage",
				{ name: name, ticketId: ticketId },
				message
			)
		} catch (error) {
			console.log(`error sending message: ${error}`)
		}
	}

	useEffect(() => {
		connection.invoke("JoinChat", { name: name, ticketId: ticketId })
		connection.on("ReceiveMessage", (name, message) => {
			setMessages((prevMessages) => [...prevMessages, { name, message }])
		})

		return () => {
			connection.invoke("LeaveChat", { name: name, ticketId: ticketId })
			connection.off("ReceiveMessage")
		}
	}, [name, ticketId])

	return { messages, sendMessage }
}