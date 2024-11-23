// /app/api/products/route.ts

import { NextResponse } from "next/server";

import { z } from "zod";
import { productsCreateInputObjectSchema } from "@/prisma/generated/schemas/objects/productsCreateInput.schema";
import { productsUpdateInputObjectSchema } from "@/prisma/generated/schemas/objects/productsUpdateInput.schema";
import { addProduct, deleteProduct, getProduct, getProducts, updateProduct } from "@/services/demo";
// GET: Fetch all products or a single product by ID
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
        // There was an id in the search, so find the product that corresponds to it
        const product = await getProduct({ id: Number(id) });
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } else {
        // There was no id in the get request, so return all of the products
        const products = await getProducts();
        return NextResponse.json(products, { status: 200 });
    }
}

// POST: Add a new product
export async function POST(request: Request) {
    const newProduct = productsCreateInputObjectSchema.parse(await request.json());
    const createdProduct = await addProduct(newProduct);
    return NextResponse.json(createdProduct, { status: 200 });
}

// PUT: Update a product
export async function PUT(request: Request) {
    const validator = z.object({
        id: z.number().int(), // Validate id as an integer
        update: productsUpdateInputObjectSchema, // Use your existing schema for update
    });
    const parsedRequest = validator.parse(await request.json());
    const id = parsedRequest.id;
    const updatedData = parsedRequest.update;
    const updatedProduct = await updateProduct(id, updatedData);
    return NextResponse.json(updatedProduct, { status: 200 });
}

// DELETE: Delete a product
export async function DELETE(request: Request) {
    const validator = z.object({ id: z.number().int() });
    const { id } = validator.parse(await request.json());
    await deleteProduct(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
