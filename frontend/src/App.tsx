import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Client from "./pages/client/Client"
import Topbar from "./components/Topbar" // Import the Navbar component

export default function App() {
	return (
		<>
			<Topbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/client" element={<Client />} />
			</Routes>
		</>
	)
}