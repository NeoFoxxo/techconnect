import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Chat } from "../../models/Chat"
import { ChatMessage } from "../../models/ChatMessage"

interface ChatState {
	chats: Chat[]
}

const initialState: ChatState = {
	chats: [],
}

const chatMessagesSlice = createSlice({
	name: "chatMessages",
	initialState: initialState,
	reducers: {
		addMessage: (
			state,
			action: PayloadAction<{
				chatTicketId: string | null | undefined
				message: ChatMessage
			}>
		) => {
			const { chatTicketId, message } = action.payload
			const chat = state.chats.find((chat) => chat.ticketId === chatTicketId)
			if (chat) {
				chat.messages.push(message)
			} else {
				state.chats.push({ ticketId: chatTicketId, messages: [message] })
			}
		},
	},
})

export const { addMessage } = chatMessagesSlice.actions
export default chatMessagesSlice.reducer
