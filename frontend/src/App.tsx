import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Client from "./pages/client/Client"

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/client" element={<Client />} />
		</Routes>
	)
}
