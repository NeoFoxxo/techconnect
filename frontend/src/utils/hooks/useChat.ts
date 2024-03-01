import { useEffect } from "react"
import { connection } from "../chatConnection"
import { ChatMessage } from "../../models/ChatMessage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { addMessage } from "../../state/chatMessages/chatMessages"

export default function useChat(
	name: string | undefined | null,
	ticketId: string | undefined | null
) {
	// get the chat messages for the ticket from redux
	const messages: ChatMessage[] = useSelector(
		(state: RootState) =>
			state.chatMessages.chats.find((chat) => chat.ticketId === ticketId)
				?.messages || []
	)

	const dispatch = useDispatch()

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
			const chatMessage: ChatMessage = { name: name, message: message }
			dispatch(addMessage({ chatTicketId: ticketId, message: chatMessage }))
		})

		connection.on("CloseTicket", () => {
			const closeTicketMessage: ChatMessage = {
				name: "System",
				message: "Ticket has been closed, refreshing in 3 seconds",
			}
			dispatch(
				addMessage({ chatTicketId: ticketId, message: closeTicketMessage })
			)
			setTimeout(() => {
				sessionStorage.clear()
				location.reload()
			}, 3000)
		})

		return () => {
			connection.off("ReceiveMessage")
			connection.off("CloseTicket")
		}
	}, [name, ticketId])

	return { messages, sendMessage, closeTicket }
}
