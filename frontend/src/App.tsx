import { Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import CreateSupportRequest from "./pages/client/CreateSupportRequest"
import Topbar from "./components/Topbar"
import Tech from "./pages/tech/Tech"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import TechLogin from "./pages/tech/TechLogin"
import NotFound from "./pages/notfound/NotFound"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Ticket from "./pages/tech/Ticket"
import ManagerLogin from "./pages/manager/ManagerLogin"
import Manager from "./pages/manager/Manager"
import CreateTechnician from "./pages/manager/CreateTechnician"
import TechDetails from "./pages/manager/TechDetails"
import AddSkill from "./pages/manager/AddSkill"
import Support from "./pages/client/Support"

const darkTheme = createTheme({
	palette: {
		mode: "light",
	},
})

export default function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Topbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/client/createsupportrequest"
					element={<CreateSupportRequest />}
				/>
				<Route path="/client/support" element={<Support />} />
				<Route path="/tech" element={<Tech />} />
				<Route path="/tech/login" element={<TechLogin />} />
				<Route path="/tech/ticket/:ticketId" element={<Ticket />} />
				<Route path="/manager" element={<Manager />} />
				<Route path="/manager/login" element={<ManagerLogin />} />
				<Route path="/manager/createtech" element={<CreateTechnician />} />
				<Route path="/manager/techdetails/:techId" element={<TechDetails />} />
				<Route path="/manager/addskill" element={<AddSkill />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ReactQueryDevtools initialIsOpen={false} />
		</ThemeProvider>
	)
}
