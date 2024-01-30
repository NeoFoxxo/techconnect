export default async function getTags(): Promise<readonly string[]> {
	const res = await fetch(`${import.meta.env.VITE_API}/skill`)
	if (!res.ok) {
		throw new Error(`An unexpected error occured: ${res.status}`)
	}
	return res.json()
}
