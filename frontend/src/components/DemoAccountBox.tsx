import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

export default function DemoAccountBox({ isManager }: { isManager: boolean }) {
	const demoAccounts = [
		{ email: "mike@gmail.com", password: "Password!1" },
		{ email: "lucy@gmail.com", password: "Password!1" },
		{ email: "jack@gmail.com", password: "Password1!" },
		{ email: "joe@gmail.com", password: "Password!1" },
	]

	if (isManager) {
		return (
			<Box
				width={"100%"}
				border={1}
				borderColor={"text.secondary"}
				boxShadow={2}
				padding={2}
			>
				<Typography variant="h6" align="center" color="text.primary" paragraph>
					Demo Account
				</Typography>
				<Divider />
				<Typography variant="body1" textAlign={"center"} padding={2}>
					will@techconnect.com - Password!1
				</Typography>
			</Box>
		)
	}

	return (
		<Box
			width={"100%"}
			border={1}
			borderColor={"text.secondary"}
			boxShadow={2}
			padding={2}
		>
			<Typography variant="h6" align="center" color="text.primary" paragraph>
				Demo Accounts
			</Typography>
			<Divider />
			<List>
				{demoAccounts.map((account, index) => (
					<ListItem key={index}>
						<Typography variant="body1">
							{account.email} - {account.password}
						</Typography>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
