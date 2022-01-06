import { Fragment, useState, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import PostCard from "./PostCard"
import ErrorFallback from "../error/ErrorFallback"
import shuffle from "../../helpers/shuffle"
import styles from "./postfeed.module.css"

export default function PostFeed({ data }) {
	const [shuffledData, setShuffledData] = useState(shuffle(data))

	const handleShuffle = () => {
		setShuffledData(shuffle([...shuffledData]))
	}

	return (
		// <ErrorBoundary FallbackComponent={ErrorFallback}>
		<div className={styles.postFeedContainer}>
			<button className="shuffle-more" onClick={handleShuffle}>
				Shuffle!
			</button>
			<section className={styles.postFeed}>
				{shuffledData.map((item) => (
					<PostCard key={item.name} item={item} />
				))}
			</section>
		</div>
		// </ErrorBoundary>
	)
}
