import { Fragment, useState, useEffect } from "react"
import PostCard from "./PostCard"
import shuffle from "../../helpers/shuffle"
import styles from "./postfeed.module.css"

export default function PostFeed({ data }) {
	const [shuffledData, setShuffledData] = useState(shuffle(data))

	const handleShuffle = () => {
		setShuffledData(shuffle([...shuffledData]))
	}

	return (
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
	)
}
