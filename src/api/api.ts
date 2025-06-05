import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_URL_API,
	headers: {
		"Content-Type": "application/json",
	},
});

export { api };
