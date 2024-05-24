module.exports = {
	globDirectory: 'progressive_web_apps/',
	globPatterns: [
		'**/*.{html,js}'
	],
	swDest: 'progressive_web_apps/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^q/
	]
};