module.exports = {
	api: {
		uri: "https://api.awau.moe/health",
		name: "API",
		method: "GET",
		code: 401
	},
	gitlab: {
		uri: "https://owo.codes/help",
		name: "GitLab",
		method: "HEAD",
		code: 200
	},
	mastodon: {
		uri: "https://uwu.social/about",
		name: "Mastodon",
		method: "HEAD",
		code: 200
	},
	matrix: {
		uri: "https://yuri.im/_matrix/federation/v1",
		name: "Matrix",
		method: "HEAD",
		code: 400
	}
};