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
		} else if (images.source) {
			imageProperties.source = images.source.url
			imageProperties.width = images.source.width
			imageProperties.height = images.source.height
		}
	} else {
		imageProperties.source = item.url_overridden_by_dest
		imageProperties.width = "1000px"
		imageProperties.height = "1000px"
	}
	const allowedImageDomains = process.env.images.domains
	const imageDomainIsAllowed = allowedImageDomains.some((domain) =>
		imageProperties.source.includes(domain)
	)
	console.log(imageDomainIsAllowed)

	if (item.title == "How To Recognize The Artists Of Paintings") {
		console.log(item)
	}
	return (
		<a
			className={styles.cardImageContainerLink}
			href={`https://reddit.com${item.permalink}`}
		>
			{imageDomainIsAllowed && (
				<Image
					src={imageProperties.source}
					alt={item.title}
					className={styles.image}
					width={imageProperties.width}
					height={imageProperties.height}
					id={imageProperties.height}
				/>
			)}
			{!imageDomainIsAllowed && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={imageProperties.source}
					alt={item.title}
					className={styles.image}
					width={imageProperties.width}
					height={imageProperties.height}
				/>
			)}
		</a>
	)
}
