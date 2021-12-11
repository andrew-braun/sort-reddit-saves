export default function handler(req, res) {
	async function fetchData() {
		try {
			const response = await fetch(
				"https://oauth.reddit.com/user/slightlyindiscrete43/saved",
				{
					Authorization: "Bearer 660577390722-_5t65RwrHTbou2JlzfWKwJhpHqro1A",
				}
			)
			const data = await response.json()

			res.status(200).json({ data: data })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}
}
