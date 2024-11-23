import { z } from "zod";

export const ProductsScalarFieldEnumSchema = z.enum([
    "id",
    "image_url",
    "name",
    "status",
    "price",
    "stock",
    "available_at",
]);
