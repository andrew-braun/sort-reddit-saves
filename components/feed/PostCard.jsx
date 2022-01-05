import Image from "next/image"
import styles from "./post-card.module.css"

export default function PostCard({ item }) {
	const images = item.preview ? item.preview.images[0] : false

	const imageProperties = {}

	if (images) {
		if (images.resolutions[3]) {
			const res = images.resolutions[3]
			imageProperties.source = res.url
			imageProperties.width = res.width
			imageProperties.height = res.height
		} else {
			imageProperties.source = images.source.url
			imageProperties.width = images.source.width
			imageProperties.height = images.source.height
		}
	}
	return (
		<article className={styles.postCard} key={item.name}>
			{/* <p>{item.initialIndex}</p> */}
			<div className={styles.meta}>
				<a
					href={`https://reddit.com${item.permalink}`}
					className={styles.title}
				>
					{item.title}
				</a>
				<a
					href={`https://reddit.com/r/${item.subreddit}`}
					className={styles.subreddit}
				>
					r/{item.subreddit}
				</a>
			</div>
			{item.preview !== undefined && (
				<a
					className={styles.cardImageContainerLink}
					href={`https://reddit.com${item.permalink}`}
				>
					<Image
						// src={item?.preview?.images[0]?.resolutions[1]?.url}
						src={imageProperties.source}
						alt={item.title}
						className={styles.image}
						width={imageProperties.width}
						height={imageProperties.height}
					/>
				</a>
			)}
		</article>
	)
}
