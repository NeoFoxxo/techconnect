import * as signalR from "@microsoft/signalr"

let connection: signalR.HubConnection

async function startConnection() {
	connection = new signalR.HubConnectionBuilder()
		.withUrl(`${import.meta.env.VITE_API}/chat`)
		.build()
	try {
		await connection.start()
		console.log("Chat connected to server")
	} catch (error) {
		console.log(`Error connecting to chat server: ${error}`)
	}
}

startConnection()

export { connection }
