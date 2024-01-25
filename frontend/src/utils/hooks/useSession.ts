import { UseQueryResult, useQuery } from "@tanstack/react-query"

interface Session extends Response {
	email: string
	isEmailConfirmed: boolean
}

async function getSession(): Promise<Response | null> {
	const res = await fetch(`${import.meta.env.VITE_API}/manage/info`, {
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
	const session = useQuery({
		queryKey: ["session"],
		queryFn: getSession,
	})

	return session
}
