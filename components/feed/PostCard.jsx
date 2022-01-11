import PostImage from "../media/PostImage"
import PostGallery from "../media/PostGallery"
import PostVideo from "../media/PostVideo"
import styles from "./postcard.module.css"

export default function PostCard({ item }) {
	let isMedia = item.media || item.secure_media ? true : false

	let itemMedia

	if (isMedia) {
		itemMedia = <PostVideo item={item} />
	} else if (item.preview !== undefined && !item.is_gallery) {
		itemMedia = <PostImage item={item} />
	} else if (item.removed_by_category && item.url_overridden_by_dest) {
		itemMedia = <PostImage item={item} />
	} else if (item.is_gallery === true) {
		itemMedia = <PostGallery item={item} />
	} else if (item.name.slice(0, 2) === "t1") {
		itemMedia = (
			<div className={styles.postComment}>
				<p>{item.body_html.replace(/(<([^>]+)>)/gi, "")}</p>
			</div>
		)
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

			{itemMedia}
		</article>
	)
}
