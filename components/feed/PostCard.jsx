import Image from "next/image"
import styles from "./post-card.module.css"

export default function PostCard({ item }) {
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
						src={item.preview.images[0].source.url}
						alt={item.title}
						className={styles.image}
						width={item.preview.images[0].source.width}
						height={item.preview.images[0].source.height}
					/>
				</a>
			)}
		</article>
	)
}
