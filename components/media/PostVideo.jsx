import { Fragment, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import styles from "./postvideo.module.css"

export default function PostVideo({ item }) {
	const isSecureMedia = item.secure_media ? true : false
	const video = item.media
		? item.media.reddit_video
		: item.secure_media.reddit_video

	const imageProperties = {}

	if (video) {
		imageProperties.source = video.fallback_url
		imageProperties.width = video.width
		imageProperties.height = video.height
	} else {
		imageProperties.source = item.url_overridden_by_dest
		imageProperties.width = "1000px"
		imageProperties.height = "1000px"
	}

	const allowedImageDomains = process.env.images.domains
	const imageDomainIsAllowed = allowedImageDomains.some((domain) =>
		imageProperties.source.includes(domain)
	)

	const audio = imageProperties.source.includes("v.redd.it")
		? `https://v.redd.it/${
				imageProperties.source.match("[.it]/(.*?/)")[1]
		  }DASH_audio.mp4`
		: false
	console.log(audio)

	const videoRef = useRef()
	const audioRef = useRef()

	const handleVideoPlay = (event) => {
		if (audioRef.current) {
			audioRef.current.play()
			audioRef.current.currentTime = videoRef.current.currentTime
		}
	}
	const handleVideoPause = (event) => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.currentTime = videoRef.current.currentTime
		}
	}
	const handleVideoPlaying = (event) => {
		console.log("playing")
		if (audioRef.current) {
			try {
				audioRef.current.play()
				audioRef.current.currentTime = videoRef.current.currentTime
			} catch (error) {
				console.log(error)
			}
		}
	}

	console.log(videoRef)

	useEffect(() => {
		if (videoRef.current) {
			// videoRef.current.addEventListener("play", handleVideoPlay)
			videoRef.current.addEventListener("pause", handleVideoPause)
			videoRef.current.addEventListener("playing", handleVideoPlaying)
			videoRef.current.muted = false
		}
	}, [videoRef])

	return (
		<div className={styles.videoContainer}>
			{imageDomainIsAllowed && (
				<Fragment>
					<video
						loop
						controls
						className={styles.video}
						id={`${item.id}-video>`}
						ref={videoRef}
					>
						<source src={imageProperties.source} />
					</video>
					{audio && (
						<audio
							className={styles.videoAudio}
							controls
							src={audio}
							id={`${item.id}-audio>`}
							ref={audioRef}
						/>
					)}
				</Fragment>
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
		</div>
	)
}
