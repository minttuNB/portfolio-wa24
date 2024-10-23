import { UUID } from "crypto";

type Role = "user" | "admin";
type User = {
	id: UUID;
	name: string;
	role: Role;
};
export type { User };
