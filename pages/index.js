import useSWR from "swr"
import Head from "next/head"
import styles from "../styles/home.module.css"

import PostFeed from "../components/feed/PostFeed"

export default function Home() {
	const fetchData = async () => {
		const bodyData = { currentPostFullname: "t3_rtuh19" }
		try {
			const response = await fetch(
				"http://localhost:3000/api/saved-posts-dev",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(bodyData),
				}
			)
			const rawData = await response.json()
			const indexedData = await rawData.data.map((post, postIndex) => ({
				...post,
				initialIndex: postIndex,
			}))

			const data = indexedData.flat(3)

			return data
		} catch (error) {
			console.log(error)
			return error
		}
	}

	const { data, error } = useSWR("/api/saved-posts-dev", fetchData)

	if (error)
		return (
			<p>
				Wow, you have terrible taste. We can&lsquo;t work with this!
				<p>
					Just kidding--there was a problem. That&lsquo;s our bad. Your saved
					posts are probably amazing.
				</p>
			</p>
		)

	if (!data) return <p>Loading...</p>

	if (data && typeof data !== undefined) {
		// console.log(data.flat(3))
		// console.log(data.forEach((set) => console.log(set.data)))
		// data[0].data.map((item) => console.log(item.preview.enabled))
		return (
			<div className={styles.container}>
				<Head>
					<title>Shuffled Saved Posts</title>
					<meta name="description" content="Shuffle your saved reddit posts!" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				{data[0] && <PostFeed data={data} />}
			</div>
		)
	}
}
