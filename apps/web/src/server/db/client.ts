import { PrismaClient } from "@prisma/client"

import { env } from "../../env/server.mjs";

// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

const SILENT_DEV = true

export const prisma: PrismaClient =
    // @ts-ignore
    global.prisma ||
    new PrismaClient({
        log: env.NODE_ENV === "development" 
            ? (SILENT_DEV ? [] : ["query", "error", "warn"]) 
            : ["error"],
    });

if (env.NODE_ENV !== "production") {
    // @ts-ignore
    global.prisma = prisma;
}
