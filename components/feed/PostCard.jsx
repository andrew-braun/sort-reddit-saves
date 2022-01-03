import Image from "next/image"
import styles from "./post-card.module.css"

export default function PostCard({ item }) {
	return (
		<article key={item.name}>
			{item.preview !== undefined && (
				<a href={`https://reddit.com${item.permalink}`}>
					<Image
						src={item?.preview?.images[0]?.resolutions[1]?.url}
						alt={item.title}
						// layout="fill"
						width="108px"
						height="192px"
					/>
				</a>
			)}
			<a href={`https://reddit.com${item.permalink}`}>{item.title}</a>
			<span className={styles.subreddit}>{item.subreddit}</span>
			<p>{item.initialIndex}</p>
		</article>
	)
}
