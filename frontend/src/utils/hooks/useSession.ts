import { UseQueryResult, useQuery } from "@tanstack/react-query"
import { Session } from "../../models/Session"

async function getSession(): Promise<Response | null> {
	const res = await fetch(`${import.meta.env.VITE_API}/session`, {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	})
	if (!res.ok) {
		if (res.status === 401) {
			return null
		}
		throw new Error(`An unexpected error occured: ${await res.text()}`)
	}
	return res.json()
}

export default function useSession(): UseQueryResult<Session | null, Error> {
	const session: UseQueryResult<Session | null, Error> = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	})

	return session
}
