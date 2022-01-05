import PostImage from "../media/PostImage"
import PostGallery from "../media/PostGallery"
import styles from "./postcard.module.css"

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
			{item.preview !== undefined && !item.is_gallery && (
				<PostImage item={item} />
			)}
			{item.is_gallery === true && <PostGallery item={item} />}
			{item.name.slice(0, 2) === "t1" && (
				<div className={styles.postComment}>
					<p>{item.body_html.replace(/(<([^>]+)>)/gi, "")}</p>
				</div>
			)}
		</article>
	)
}
