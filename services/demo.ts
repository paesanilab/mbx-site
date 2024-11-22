import prisma from "../lib/prisma";

export async function getProducts() {
    return prisma.products.findMany();
}
