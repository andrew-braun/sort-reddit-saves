import { Fragment, useState, useEffect } from "react"
import PostCard from "./PostCard"
import shuffle from "../../helpers/shuffle"
import styles from "./post-feed.module.css"

export default function PostFeed({ data }) {
	const [shuffledData, setShuffledData] = useState(data)

	const handleShuffle = () => {
		setShuffledData(shuffle([...shuffledData]))
	}

	return (
		<Fragment>
			<button className="shuffle-more" onClick={handleShuffle}>
				Shuffle!
			</button>
			{shuffledData.map((item) => (
				<PostCard key={item.name} item={item} />
			))}
		</Fragment>
	)
}
