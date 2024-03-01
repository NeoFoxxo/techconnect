import { ChatMessage } from "./ChatMessage"

export interface Chat {
	ticketId: string | null | undefined
	messages: ChatMessage[]
}
