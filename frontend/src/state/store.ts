import { configureStore } from "@reduxjs/toolkit"
import chatMessagesReducer from "./chatMessages/chatMessages"

export const store = configureStore({
	reducer: {
		chatMessages: chatMessagesReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
