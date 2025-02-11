import { PrismaClient } from "@prisma/client";

// Singleton function to create a PrismaClient instance
const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Use `globalThis` to maintain a single instance of PrismaClient
if (!globalThis.prismaGlobal) {
    globalThis.prismaGlobal = prismaClientSingleton();
}

// Assign PrismaClient instance to `prisma` for reuse
const prisma = globalThis.prismaGlobal;

// Export the singleton PrismaClient instance
export default prisma;

// Ensure singleton in development environment
if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
