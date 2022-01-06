import Image from "next/image"
import styles from "./postgallery.module.css"

export default function PostGallery({ item }) {
	if (typeof item.media_metadata === "undefined") {
		return <p>Failed to load gallery</p>
	}
	const images = Object.entries(item.media_metadata)

	console.log(images)

	const imageProperties = images.map((image) => {
		const imageId = image[0]
		const imageSize = image[1].p[3] ? image[1].p[3] : image[1].s[0]

		const data = {
			id: imageId,
			source: imageSize.u,
			width: imageSize.x,
			height: imageSize.y,
		}
		return data
	})

	const galleryElement = imageProperties.map((image) => (
		<a
			key={`${item.name}-${image.id}`}
			className={styles.cardImageContainerLink}
			href={`https://reddit.com${item.permalink}`}
		>
			<Image
				src={image.source}
				alt={item.title}
				className={styles.image}
				width={image.width}
				height={image.height}
			/>
		</a>
	))

	return galleryElement
}
