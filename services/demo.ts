import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

export async function getProducts() {
    return await prisma.products.findMany();
}

export async function getProduct(where: Prisma.productsWhereUniqueInput) {
    return await prisma.products.findUnique({
        where,
    });
}

export async function updateProduct(id: number, data: Prisma.productsUpdateInput) {
    return await prisma.products.update({ where: { id }, data });
}

export async function addProduct(newProduct: Prisma.productsCreateInput) {
    return await prisma.products.create({
        data: newProduct,
    });
}

// DON'T create this for tables that you don't actually need to potentially delete things from
// Could be used accidentally or misused maliciously to get rid of important data
export async function deleteProduct(id: number) {
    return await prisma.products.delete({
        where: { id },
    });
}
