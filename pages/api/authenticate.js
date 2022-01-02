import snoowrap from "snoowrap"

export default function handler(req, res) {
	const clientId = req.body.clientId
	const secret = req.body.secret
	const username = req.body.username
	const password = req.body.password

	const config = {
		userAgent: "Shuffle Saved Posts by thewhiskeyrepublic",
		clientId: process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID,
		clientSecret: process.env.NEXT_PUBLIC_REDDIT_CLIENT_SECRET,
		username: process.env.NEXT_PUBLIC_REDDIT_USER_2,
		password: process.env.NEXT_PUBLIC_REDDIT_PASSWORD_2,
	}

	async function fetchSavedPosts() {
		const r = await new snoowrap(config)
		const savedContent = await r
			.getMe()
			.getSavedContent()
			.catch(console.log((error) => error))
		return savedContent
	}
	return fetchSavedPosts()
}
