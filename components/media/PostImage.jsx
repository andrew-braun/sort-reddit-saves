import Image from "next/image"
import styles from "./postimage.module.css"

export default function PostImage({ item }) {
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
		<a
			className={styles.cardImageContainerLink}
			href={`https://reddit.com${item.permalink}`}
		>
			<Image
				src={imageProperties.source}
				alt={item.title}
				className={styles.image}
				width={imageProperties.width}
				height={imageProperties.height}
			/>
		</a>
	)
}
