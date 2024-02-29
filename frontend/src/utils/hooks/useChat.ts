import { useEffect, useState } from "react"
import { connection } from "../chatConnection"
import { ChatMessage } from "../../models/ChatMessage"

export default function useChat(
	name: string | undefined | null,
	ticketId: string | undefined | null
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
			console.log(`Error sending message: ${error}`)
		}
	}

	async function closeTicket() {
		try {
			await connection.invoke("CloseTicket", { name: name, ticketId: ticketId })
		} catch (error) {
			console.log(`Error closing ticket: ${error}`)
		}
	}

	connection.invoke("JoinChat", { name: name, ticketId: ticketId })

	useEffect(() => {
		connection.on("ReceiveMessage", (name, message) => {
			setMessages((prevMessages) => [...prevMessages, { name, message }])
		})

		connection.on("CloseTicket", () => {
			setMessages((prevMessages) => [
				...prevMessages,
				{
					name: "System",
					message: "Ticket has been closed, refreshing in 3 seconds",
				},
			])

			setTimeout(() => {
				sessionStorage.clear()
				location.reload()
			}, 3000)
		})

		return () => {
			connection.invoke("LeaveChat", { name: name, ticketId: ticketId })
			connection.off("ReceiveMessage")
			connection.off("CloseTicket")
		}
	}, [name, ticketId])

	return { messages, sendMessage, closeTicket }
}
