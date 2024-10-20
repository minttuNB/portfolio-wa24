export default {
	api: {
		port: 8080,
		baseURL: "http://localhost",
		get url() {
			if (this.port) return new URL(`${this.baseURL}:${this.port}`);
			else return new URL(`${this.baseURL}`);
		},
	},
};
