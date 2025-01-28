import { User } from "../types";
const users: User[] = [
	{
		id: "dba76a8c-6bc1-4d92-b00f-7361faf71681",
		name: "minttu",
		role: "admin",
	},
];
const parseCookie = (cookie: string) => {
	return Object.fromEntries(cookie.split(";").map((cookie) => cookie.trim().split("=")));
};

export function getUser(request: Request): User | null {
	const cookies = parseCookie(request.headers.get("Cookie") ?? "");
	const id = cookies["user.id"];
	return users.find((user) => user.id === id) ?? null;
}
