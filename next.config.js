const allowedImageDomains = [
	"*.redditmedia.com",
	"*.redd.it",
	"a.thumbs.redditmedia.com",
	"i.redd.it",
	"v.redd.it",
	"preview.redd.it",
	"external-preview.redd.it",
	"i.imgur.com",
	"www.reddit.com",
]

module.exports = {
	reactStrictMode: true,
	images: {
		domains: allowedImageDomains,
	},
	env: {
		images: {
			domains: allowedImageDomains,
		},
	},
}
