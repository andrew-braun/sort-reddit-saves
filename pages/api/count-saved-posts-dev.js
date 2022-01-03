import snoowrap from "snoowrap"

export default async function handler(req, res) {
	// const clientId = req.body.clientId
	// const secret = req.body.secret
	// const username = req.body.username
	// const password = req.body.password

	const currentPostFullname = await req.body.currentPostFullname

	const config = {
		userAgent: "Shuffle Saved Posts by thewhiskeyrepublic",
		clientId: process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID,
		clientSecret: process.env.NEXT_PUBLIC_REDDIT_CLIENT_SECRET,
		username: process.env.NEXT_PUBLIC_REDDIT_USER_2,
		password: process.env.NEXT_PUBLIC_REDDIT_PASSWORD_2,
	}

	try {
		const r = new snoowrap(config)

		const savedContent = await r.getMe().getSavedContent({
			count: 25,
			limit: 2,
		})
		// const moreContent = await savedContent.fetchMore({ amount: 25 })

		await res.status(200).json({
			data: savedContent,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
