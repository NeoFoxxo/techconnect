import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import CreateSupportRequest from "./pages/client/createSupportRequest"
import Topbar from "./components/Topbar" // Import the Navbar component
import Tech from "./pages/tech/Tech"

export default function App() {
	return (
		<>
			<Topbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/client/createsupportrequest"
					element={<CreateSupportRequest />}
				/>
				<Route path="/tech" element={<Tech />} />
			</Routes>
		</>
	)
}
