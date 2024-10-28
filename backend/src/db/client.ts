import { PrismaClient } from "@prisma/client";
import { env } from "../lib/env";
let prisma;

if (env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	let globalWithPrisma = global as typeof globalThis & {
		prisma: PrismaClient;
	};
	if (!globalWithPrisma.prisma) {
		globalWithPrisma.prisma = new PrismaClient();
	}
	prisma = globalWithPrisma.prisma;
}
export default prisma;
export type DB = typeof prisma;
